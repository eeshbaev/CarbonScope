import {
  computeAssessmentEmissions,
  factorStamp,
  formatEmissions,
  type EmissionsBreakdown,
} from '../calculations';
import type { EmissionCategoryKey } from '../data/categoryEmblems';
import { USD_DEFLATOR_TO_2022, usdPerUnit } from '../data/currencies';
import {
  FUEL_FACTORS,
  FUEL_FACTOR_DATASET,
  HEAT_FACTORS,
  REFRIGERANTS,
  SCOPE1_FUELS,
  fuelFactorTotal,
} from '../data/fuelFactors';
import { CATEGORY_LINES, getLineInput } from '../data/inputLines';
import { SCOPE3_FIELDS } from '../data/scope3Factors';
import type { Locale } from '../i18n';
import type { TranslationKeys } from '../i18n/locales/en';
import type { Assessment } from '../types';
import { formatAppNumber } from './appLocale';
import { lineLabel } from './lineLabels';
import { formatResolvedInputLine } from './scopeInputDisplay';
import { resolveCategoryTotal } from './scopeFieldInputs';
import { standardUnitAbbr } from './unitLabels';

export interface ReportRow {
  key: string;
  category?: EmissionCategoryKey;
  label: string;
  value: string;
}

/** Lines always shown in summaries even when zero (v1 core inputs). */
const ALWAYS_SHOWN = new Set(['diesel', 'petrol', 'naturalGas', 'electricity']);

export function reportBreakdown(assessment: Assessment): EmissionsBreakdown {
  return computeAssessmentEmissions(assessment);
}

/** Activity data rows for Scope 1, 2 and 3 (inputs, not emissions). */
export function buildInputRows(
  assessment: Assessment,
  t: TranslationKeys,
  locale: Locale,
  spendCurrency: string
): ReportRow[] {
  const rows: ReportRow[] = [];
  for (const line of CATEGORY_LINES) {
    const input = getLineInput(assessment, line.key);
    const qty = resolveCategoryTotal(input);
    if (!ALWAYS_SHOWN.has(line.key) && qty <= 0) continue;
    rows.push({
      key: line.key,
      category: line.key,
      label: lineLabel(t, line.key),
      value: formatResolvedInputLine(
        qty,
        line.kind,
        assessment.reportingPeriod,
        input.useMonthly,
        t,
        locale
      ),
    });
  }
  for (const r of REFRIGERANTS) {
    const kg = assessment.scope1.refrigerants?.[r.key] ?? 0;
    if (kg <= 0) continue;
    rows.push({
      key: `refrigerant-${r.key}`,
      category: 'refrigerants',
      label: `${t.scope1.refrigerantsShort} — ${r.label}`,
      value: `${formatAppNumber(kg, locale)} ${t.units.kgAbbr}`,
    });
  }
  const m = assessment.scope2.market;
  if (m.renewableKwh > 0) {
    rows.push({
      key: 'renewableKwh',
      label: t.scope2.market.renewableKwh,
      value: `${formatAppNumber(m.renewableKwh, locale)} ${t.units.kwh}`,
    });
  }
  for (const f of SCOPE3_FIELDS) {
    const qty = assessment.scope3[f.key] ?? 0;
    if (qty <= 0) continue;
    rows.push({
      key: f.key,
      category: f.key,
      label: t.scope3.fields[f.key],
      value: `${formatAppNumber(qty, locale)} ${f.unit === 'currency' ? (spendCurrency === 'OTHER' ? t.scope3.otherCurrency : spendCurrency) : t.scope3.units[f.unit]}`,
    });
  }
  return rows;
}

/** Scope 1 tCO₂e by gas — stored snapshot when available, otherwise recomputed. */
export function buildGasRows(
  assessment: Assessment,
  breakdown: EmissionsBreakdown,
  t: TranslationKeys,
  tco2eLabel: string
): ReportRow[] {
  // Reports saved before the split was recorded show a recalculate note instead of rows
  // recomputed with today's factors, which would not add up to the stored Scope 1 total.
  if (!assessment.scope1ByGas) return [];
  void breakdown;
  const gases = assessment.scope1ByGas;
  return (['co2', 'ch4', 'n2o', 'hfc', 'bioNonCo2'] as const)
    .filter((g) => (gases[g] ?? 0) > 0 || g === 'co2')
    .map((g) => ({
      key: g,
      label: t.results.gases[g],
      value: `${formatEmissions(gases[g] ?? 0)} ${tco2eLabel}`,
    }));
}

/** Human-readable description of how the market-based figure was derived. */
export function describeMarketBasis(
  assessment: Assessment,
  t: TranslationKeys,
  locale: Locale
): string {
  const m = assessment.scope2.market;
  const r = t.results;
  const parts: string[] = [];
  if (m.renewableKwh > 0) {
    parts.push(r.marketCertificates.replace('{kwh}', formatAppNumber(m.renewableKwh, locale)));
  }
  if (m.supplierFactor != null) {
    parts.push(r.marketSupplier.replace('{factor}', formatAppNumber(m.supplierFactor, locale)));
  } else if (m.residualMixFactor != null) {
    parts.push(r.marketResidual.replace('{factor}', formatAppNumber(m.residualMixFactor, locale)));
  } else {
    parts.push(r.marketGrid);
  }
  if (m.heatSupplierFactor != null) {
    parts.push(r.marketHeat.replace('{factor}', formatAppNumber(m.heatSupplierFactor, locale)));
  }
  return parts.join('; ');
}

/** Methodology rows (label → value) for the PDF report. */
export function buildMethodologyRows(
  assessment: Assessment,
  breakdown: EmissionsBreakdown,
  t: TranslationKeys,
  locale: Locale,
  countryName: string
): ReportRow[] {
  const r = t.results;
  const kg = t.common.kgCo2e;
  const rows: ReportRow[] = [];
  rows.push({
    key: 'fuelDataset',
    label: r.pdfFuelDataset,
    value: `${assessment.fuelFactorVersion ?? '2026.1'} · ${FUEL_FACTOR_DATASET.referenceYear} · ${FUEL_FACTOR_DATASET.gwpBasis}`,
  });
  const usedFuels = SCOPE1_FUELS.filter(
    (k) => k === 'diesel' || k === 'petrol' || k === 'naturalGas' || breakdown.scope1ByLine[k] > 0
  );
  rows.push({
    key: 'fuels',
    label: r.pdfScope1Factors,
    value: usedFuels
      .map((k) => {
        const f = FUEL_FACTORS[k];
        const unit = standardUnitAbbr(t, CATEGORY_LINES.find((l) => l.key === k)!.kind);
        const split =
          f.nonCo2 != null
            ? `CH₄+N₂O ${f.nonCo2}; biogenic CO₂ ${f.biogenicCo2} outside scopes`
            : `CO₂ ${f.co2}, CH₄ ${f.ch4}, N₂O ${f.n2o}`;
        return `${lineLabel(t, k)} ${formatAppNumber(fuelFactorTotal(k), locale)} ${kg}/${unit} (${split})`;
      })
      .join('; '),
  });
  const refr = REFRIGERANTS.filter((x) => (assessment.scope1.refrigerants?.[x.key] ?? 0) > 0);
  if (refr.length) {
    rows.push({
      key: 'refrigerants',
      label: r.pdfRefrigerants,
      value: refr.map((x) => `${x.label} ${x.gwp}`).join('; '),
    });
  }
  rows.push({
    key: 'grid',
    label: r.pdfScope2Factor,
    value: `${assessment.electricityFactor} ${kg}${t.units.perKwh} (${countryName})`,
  });
  const heatUsed =
    breakdown.scope2ByLine.districtHeat > 0 ||
    breakdown.scope2ByLine.steam > 0 ||
    breakdown.scope2ByLine.districtCooling > 0 ||
    breakdown.scope2ByLine.evKm > 0;
  if (heatUsed) {
    rows.push({
      key: 'heat',
      label: r.pdfHeatFactors,
      value: `${t.scope2.districtHeat} ${HEAT_FACTORS.districtHeat}, ${t.scope2.steam} ${HEAT_FACTORS.steam} ${kg}${t.units.perKwh}; ${t.scope2.districtCooling}: grid ÷ ${HEAT_FACTORS.coolingCop}; EV ${HEAT_FACTORS.evKwhPerKm} ${t.units.kwh}/${t.units.kmAbbr}`,
    });
  }
  rows.push({ key: 'market', label: r.pdfMarketBasis, value: describeMarketBasis(assessment, t, locale) });
  if (breakdown.scope3ByCategory.cat1Purchased > 0 && SCOPE3_FIELDS.some((f) => f.unit === 'currency' && (assessment.scope3[f.key] ?? 0) > 0)) {
    rows.push({
      key: 'spend',
      label: r.pdfSpendConversion,
      value: r.spendConversion
        .replace(
          '{currency}',
          breakdown.spendCurrency === 'OTHER' ? t.scope3.otherCurrency : breakdown.spendCurrency
        )
        .replace(
          '{rate}',
          String(usdPerUnit(breakdown.spendCurrency, assessment.scope3.customUsdRate) ?? '—')
        )
        .replace('{deflator}', USD_DEFLATOR_TO_2022.toFixed(4)),
    });
  }
  if (assessment.restatement) {
    const rs = assessment.restatement;
    rows.push({
      key: 'restatement',
      label: r.restatementTitle,
      value: r.restatementBody
        .replace('{previous}', formatEmissions(rs.previousTotal))
        .replace('{stamp}', rs.previousStamp)
        .replace('{current}', formatEmissions(assessment.totalEmissions))
        .replace('{factor}', `${rs.factorEffect >= 0 ? '+' : '−'}${formatEmissions(Math.abs(rs.factorEffect))}`)
        .replace('{activity}', `${rs.activityEffect >= 0 ? '+' : '−'}${formatEmissions(Math.abs(rs.activityEffect))}`)
        .replace(/\{unit\}/g, 'tCO₂e'),
    });
  }
  rows.push({ key: 'datasets', label: r.pdfFactorVersion, value: factorStamp(assessment) });
  if (assessment.scope3.includeFuelEnergyUpstream) {
    rows.push({ key: 'cat3', label: r.pdfCat3Basis, value: r.cat3Basis });
  }
  return rows;
}
