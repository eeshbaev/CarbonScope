import { EMISSION_FACTORS } from '../constants';
import { SCOPE3_FIELDS, type Scope3FieldKey } from '../data/scope3Factors';
import { normalizeCompanyKey } from './companyIdentity';
import { listReportingMonths } from './reportingMonths';
import type { Locale } from '../i18n';
import type { Assessment, ReportingPeriod } from '../types';
import { resolveScope1Totals, resolveScope2Totals } from './scopeFieldInputs';

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

export function findPriorFinalizedAssessment(
  all: Assessment[],
  current: Assessment
): Assessment | null {
  const peers = filterCompanyAssessments(all, current.companyName, current.id);
  const currentStart = new Date(current.reportingStartDate).getTime();
  const prior = peers.filter((a) => new Date(a.reportingStartDate).getTime() < currentStart);
  return prior.length ? prior[prior.length - 1] : peers[peers.length - 1] ?? null;
}

export function percentChange(current: number, previous: number): number | null {
  if (!Number.isFinite(previous) || previous <= 0) return null;
  return ((current - previous) / previous) * 100;
}

export type ComparisonInsight = {
  kind: 'total' | 'scope1' | 'scope2' | 'scope3' | 'electricity_month';
  percent: number;
  labelKey: 'vsPriorPeriod' | 'vsPriorYear' | 'electricityMonth';
  monthLabel?: string;
};

export function buildComparisonInsights(
  current: Assessment,
  prior: Assessment | null,
  locale: Locale
): ComparisonInsight[] {
  if (!prior) return [];
  const insights: ComparisonInsight[] = [];

  const totalPct = percentChange(current.totalEmissions, prior.totalEmissions);
  if (totalPct !== null) {
    insights.push({
      kind: 'total',
      percent: totalPct,
      labelKey:
        current.reportingPeriod === '1_year' && prior.reportingPeriod === '1_year'
          ? 'vsPriorYear'
          : 'vsPriorPeriod',
    });
  }

  const s1Pct = percentChange(current.scope1Emissions, prior.scope1Emissions);
  if (s1Pct !== null && Math.abs(s1Pct) >= 1) {
    insights.push({ kind: 'scope1', percent: s1Pct, labelKey: 'vsPriorPeriod' });
  }

  const s2Pct = percentChange(current.scope2Emissions, prior.scope2Emissions);
  if (s2Pct !== null && Math.abs(s2Pct) >= 1) {
    insights.push({ kind: 'scope2', percent: s2Pct, labelKey: 'vsPriorPeriod' });
  }

  const s3Pct = percentChange(current.scope3Emissions ?? 0, prior.scope3Emissions ?? 0);
  if (s3Pct !== null && Math.abs(s3Pct) >= 1) {
    insights.push({ kind: 'scope3', percent: s3Pct, labelKey: 'vsPriorPeriod' });
  }

  const monthInsight = compareLatestElectricityMonth(current, prior, locale);
  if (monthInsight) insights.push(monthInsight);

  return insights.slice(0, 3);
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

export function buildCompanyTrend(
  all: Assessment[],
  companyName: string,
  locale: Locale
): TrendPoint[] {
  const key = normalizeCompanyKey(companyName);
  const unique = all.filter(
    (a) => normalizeCompanyKey(a.companyName) === key && a.finalizedAt && !a.isDraft
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

export type EmissionDriverKey = 'diesel' | 'petrol' | 'naturalGas' | 'electricity' | Scope3FieldKey;

export function getLargestEmissionDriver(assessment: Assessment): {
  key: EmissionDriverKey;
  emissionsT: number;
} {
  const s1 = resolveScope1Totals(assessment.scope1);
  const factor = assessment.electricityFactor;

  const drivers: { key: EmissionDriverKey; emissionsT: number }[] = [
    {
      key: 'diesel',
      emissionsT: (s1.dieselLiters * EMISSION_FACTORS.diesel) / 1000,
    },
    {
      key: 'petrol',
      emissionsT: (s1.petrolLiters * EMISSION_FACTORS.petrol) / 1000,
    },
    {
      key: 'naturalGas',
      emissionsT: (s1.naturalGasKwh * EMISSION_FACTORS.naturalGas) / 1000,
    },
    {
      key: 'electricity',
      emissionsT: (resolveScope2Totals(assessment.scope2).electricityKwh * factor) / 1000,
    },
    ...SCOPE3_FIELDS.map((f) => ({
      key: f.key as EmissionDriverKey,
      emissionsT: ((assessment.scope3?.[f.key] ?? 0) * f.factor) / 1000,
    })),
  ];

  return drivers.reduce((best, d) => (d.emissionsT > best.emissionsT ? d : best), drivers[0]);
}
