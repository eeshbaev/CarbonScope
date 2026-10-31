import { computeAssessmentEmissions, type Scope1LineKey } from '../calculations';
import type { Scope3FieldKey } from '../data/scope3Factors';
import type { Scope2FieldKey } from '../types/scopeInputs';
import { normalizeCompanyKey } from './companyIdentity';
import { listReportingMonths } from './reportingMonths';
import type { Locale } from '../i18n';
import type { Assessment, ReportingPeriod } from '../types';

export function filterCompanyAssessments(
  all: Assessment[],
  companyName: string,
  excludeId?: string
): Assessment[] {
  const key = normalizeCompanyKey(companyName);
  return all
    .filter(
      (a) =>
        a.id !== excludeId &&
        normalizeCompanyKey(a.companyName) === key &&
        a.finalizedAt &&
        !a.isDraft
    )
    .sort(
      (a, b) =>
        new Date(a.reportingStartDate).getTime() - new Date(b.reportingStartDate).getTime()
    );
}

/** Finalized reports of the same company and the same period length, oldest first. */
export function comparablePeers(all: Assessment[], current: Assessment): Assessment[] {
  return filterCompanyAssessments(all, current.companyName, current.id).filter(
    (a) => a.reportingPeriod === current.reportingPeriod
  );
}

function startsBefore(a: Assessment, current: Assessment): boolean {
  return new Date(a.reportingStartDate).getTime() < new Date(current.reportingStartDate).getTime();
}

/** Most recent comparable report that starts before the current one (never a later period). */
export function findPriorFinalizedAssessment(
  all: Assessment[],
  current: Assessment
): Assessment | null {
  const prior = comparablePeers(all, current).filter((a) => startsBefore(a, current));
  return prior.length ? prior[prior.length - 1] : null;
}

/** Base period for targets: the earliest comparable report that starts before the current one. */
export function findBaseAssessment(all: Assessment[], current: Assessment): Assessment | null {
  const prior = comparablePeers(all, current).filter((a) => startsBefore(a, current));
  return prior.length ? prior[0] : null;
}

export type ComparisonBasis = 'total' | 'scope12';

function scope3Coverage(a: Assessment): string {
  if ((a.scope3Emissions ?? 0) <= 0) return 'none';
  return a.scope3?.includeFuelEnergyUpstream ? 'with-cat3' : 'without-cat3';
}

/**
 * Totals that can be compared like for like. When Scope 3 coverage differs between the two
 * reports, compare Scope 1 + 2 only so that adding Scope 3 does not look like an increase.
 */
export function comparableTotals(
  current: Assessment,
  other: Assessment
): { current: number; other: number; basis: ComparisonBasis } {
  if (scope3Coverage(current) === scope3Coverage(other)) {
    return { current: current.totalEmissions, other: other.totalEmissions, basis: 'total' };
  }
  return {
    current: current.scope1Emissions + current.scope2Emissions,
    other: other.scope1Emissions + other.scope2Emissions,
    basis: 'scope12',
  };
}

export function percentChange(current: number, previous: number): number | null {
  if (!Number.isFinite(previous) || previous <= 0) return null;
  return ((current - previous) / previous) * 100;
}

export type ComparisonInsight = {
  kind: 'total' | 'scope12' | 'scope1' | 'scope2' | 'scope3' | 'electricity_month';
  percent: number;
  labelKey: 'vsPriorPeriod' | 'vsPriorYear' | 'electricityMonth';
  monthLabel?: string;
};

/** Compares with a prior report of the same period length (callers pass findPriorFinalizedAssessment). */
export function buildComparisonInsights(
  current: Assessment,
  prior: Assessment | null,
  locale: Locale
): ComparisonInsight[] {
  if (!prior || prior.reportingPeriod !== current.reportingPeriod) return [];
  const insights: ComparisonInsight[] = [];
  const periodKey = current.reportingPeriod === '1_year' ? 'vsPriorYear' : 'vsPriorPeriod';

  const totals = comparableTotals(current, prior);
  const totalPct = percentChange(totals.current, totals.other);
  if (totalPct !== null) {
    insights.push({ kind: totals.basis, percent: totalPct, labelKey: periodKey });
  }

  const s1Pct = percentChange(current.scope1Emissions, prior.scope1Emissions);
  if (s1Pct !== null && Math.abs(s1Pct) >= 1) {
    insights.push({ kind: 'scope1', percent: s1Pct, labelKey: periodKey });
  }

  const s2Pct = percentChange(current.scope2Emissions, prior.scope2Emissions);
  if (s2Pct !== null && Math.abs(s2Pct) >= 1) {
    insights.push({ kind: 'scope2', percent: s2Pct, labelKey: periodKey });
  }

  if (totals.basis === 'total') {
    const s3Pct = percentChange(current.scope3Emissions ?? 0, prior.scope3Emissions ?? 0);
    if (s3Pct !== null && Math.abs(s3Pct) >= 1) {
      insights.push({ kind: 'scope3', percent: s3Pct, labelKey: periodKey });
    }
  }

  const monthInsight = compareLatestElectricityMonth(current, prior, locale);
  if (monthInsight) insights.push(monthInsight);

  return insights.slice(0, 4);
}

function compareLatestElectricityMonth(
  current: Assessment,
  prior: Assessment,
  locale: Locale
): ComparisonInsight | null {
  const cur = current.scope2.electricity;
  if (!cur.useMonthly) return null;

  const months = listReportingMonths(
    current.reportingStartDate,
    current.reportingPeriod,
    locale
  );
  if (months.length < 2) return null;

  const lastIdx = months.length - 1;
  const lastKey = months[lastIdx].key;
  const prevKey = months[lastIdx - 1].key;
  const lastVal = cur.monthly[lastKey] ?? 0;
  const prevVal = cur.monthly[prevKey] ?? 0;
  if (lastVal <= 0 || prevVal <= 0) return null;

  const pct = percentChange(lastVal, prevVal);
  if (pct === null || Math.abs(pct) < 1) return null;

  return {
    kind: 'electricity_month',
    percent: pct,
    labelKey: 'electricityMonth',
    monthLabel: months[lastIdx].label,
  };
}

export type TrendPoint = {
  id: string;
  label: string;
  total: number;
  scope1: number;
  scope2: number;
  scope3: number;
  startISO: string;
};

/** Finalized reports of a company; pass `period` to keep only reports of the same length. */
export function buildCompanyTrend(
  all: Assessment[],
  companyName: string,
  locale: Locale,
  period?: ReportingPeriod
): TrendPoint[] {
  const key = normalizeCompanyKey(companyName);
  const unique = all.filter(
    (a) =>
      normalizeCompanyKey(a.companyName) === key &&
      a.finalizedAt &&
      !a.isDraft &&
      (!period || a.reportingPeriod === period)
  );
  return unique
    .sort((a, b) => new Date(a.reportingStartDate).getTime() - new Date(b.reportingStartDate).getTime())
    .map((a) => {
      const months = listReportingMonths(a.reportingStartDate, a.reportingPeriod, locale);
      const label =
        months[0]?.label ??
        new Date(a.reportingStartDate).toLocaleDateString(undefined, {
          month: 'short',
          year: 'numeric',
        });
      return {
        id: a.id,
        label,
        total: a.totalEmissions,
        scope1: a.scope1Emissions,
        scope2: a.scope2Emissions,
        scope3: a.scope3Emissions ?? 0,
        startISO: a.reportingStartDate,
      };
    });
}

export type EmissionDriverKey = Scope1LineKey | Scope2FieldKey | Scope3FieldKey | 'cat3FuelEnergy';

/** Single largest emitting line across Scope 1, 2 (location-based) and 3. */
export function getLargestEmissionDriver(assessment: Assessment): {
  key: EmissionDriverKey;
  emissionsT: number;
} {
  const e = computeAssessmentEmissions(assessment);
  const drivers: { key: EmissionDriverKey; emissionsT: number }[] = [
    ...(Object.entries(e.scope1ByLine) as [Scope1LineKey, number][]).map(([key, v]) => ({
      key,
      emissionsT: v,
    })),
    ...(Object.entries(e.scope2ByLine) as [Scope2FieldKey, number][]).map(([key, v]) => ({
      key,
      emissionsT: v,
    })),
    ...(Object.entries(e.scope3ByField) as [Scope3FieldKey, number][]).map(([key, v]) => ({
      key,
      emissionsT: v,
    })),
    { key: 'cat3FuelEnergy', emissionsT: e.scope3ByCategory.cat3FuelEnergy },
  ];
  // Ties (e.g. all zero) resolve to the first line, matching the v1 behaviour (diesel).
  return drivers.reduce((best, d) => (d.emissionsT > best.emissionsT ? d : best), drivers[0]);
}
