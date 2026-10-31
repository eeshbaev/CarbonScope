import { currencyForCountry, toUsd2022, type CurrencyCode } from './data/currencies';
import { getElectricityFactorForCountry } from './data/emissionFactors';
import {
  FUEL_FACTOR_DATASET,
  FUEL_FACTORS,
  HEAT_FACTORS,
  REFRIGERANTS,
  SCOPE1_FUELS,
  UPSTREAM_ENERGY_FACTORS,
  fuelFactorTotal,
  type Scope1FuelKey,
} from './data/fuelFactors';
import { DEFAULT_INDUSTRY, type IndustryKey } from './data/industries';
import {
  SCOPE3_FIELDS,
  scope3FactorFor,
  type Scope3CategoryKey,
  type Scope3FieldKey,
} from './data/scope3Factors';
import type { Assessment, AssessmentDraft } from './types';
import {
  SCOPE2_FIELDS,
  cloneScope1,
  cloneScope2,
  type Scope2FieldKey,
} from './types/scopeInputs';
import { resolveCategoryTotal } from './utils/scopeFieldInputs';

/** tCO₂e by greenhouse gas for Scope 1 (CO₂e-weighted, IPCC AR5). */
export interface GasBreakdown {
  co2: number;
  ch4: number;
  n2o: number;
  hfc: number;
}

export type Scope1LineKey = Scope1FuelKey | 'refrigerants';

/** Full emissions breakdown, all values in tCO₂e for the reporting period. */
export interface EmissionsBreakdown {
  scope1: number;
  scope1ByGas: GasBreakdown;
  scope1ByLine: Record<Scope1LineKey, number>;
  /** Location-based Scope 2 (grid averages + default heat factors). */
  scope2Location: number;
  /** Market-based Scope 2 (certificates → supplier → residual mix → grid). */
  scope2Market: number;
  scope2ByLine: Record<Scope2FieldKey, number>;
  scope3: number;
  scope3ByCategory: Record<Scope3CategoryKey, number>;
  scope3ByField: Record<Scope3FieldKey, number>;
  /** Scope 1 + location-based Scope 2 + Scope 3. */
  total: number;
  gridFactor: number;
  spendCurrency: CurrencyCode;
}

export interface EmissionsInput {
  scope1: AssessmentDraft['scope1'];
  scope2: AssessmentDraft['scope2'];
  scope3: AssessmentDraft['scope3'];
  countryCode: string;
  /** Override the location grid factor (scenario modelling). */
  gridFactorOverride?: number;
}

export function resolveSpendCurrency(
  scope3: AssessmentDraft['scope3'],
  countryCode: string
): CurrencyCode {
  return scope3.currency ?? currencyForCountry(countryCode);
}

export function computeEmissions(input: EmissionsInput): EmissionsBreakdown {
  const { scope1, scope2, scope3 } = input;
  const countryCode = input.countryCode || 'US';
  const grid =
    input.gridFactorOverride != null && input.gridFactorOverride > 0
      ? input.gridFactorOverride
      : getElectricityFactorForCountry(countryCode);

  // ---- Scope 1: combustion (by gas) + refrigerants (HFCs)
  const gasKg = { co2: 0, ch4: 0, n2o: 0, hfc: 0 };
  const scope1ByLine = { refrigerants: 0 } as Record<Scope1LineKey, number>;
  let wttKg = 0;
  for (const key of SCOPE1_FUELS) {
    const qty = resolveCategoryTotal(scope1[key]);
    const f = FUEL_FACTORS[key];
    gasKg.co2 += qty * f.co2;
    gasKg.ch4 += qty * f.ch4;
    gasKg.n2o += qty * f.n2o;
    scope1ByLine[key] = (qty * fuelFactorTotal(key)) / 1000;
    wttKg += qty * f.wtt;
  }
  for (const r of REFRIGERANTS) {
    gasKg.hfc += (scope1.refrigerants?.[r.key] ?? 0) * r.gwp;
  }
  scope1ByLine.refrigerants = gasKg.hfc / 1000;
  const scope1ByGas: GasBreakdown = {
    co2: gasKg.co2 / 1000,
    ch4: gasKg.ch4 / 1000,
    n2o: gasKg.n2o / 1000,
    hfc: gasKg.hfc / 1000,
  };
  const scope1Total = scope1ByGas.co2 + scope1ByGas.ch4 + scope1ByGas.n2o + scope1ByGas.hfc;

  // ---- Scope 2: location-based
  const elecKwh = resolveCategoryTotal(scope2.electricity);
  const evKwh = resolveCategoryTotal(scope2.evKm) * HEAT_FACTORS.evKwhPerKm;
  const heatKwh = resolveCategoryTotal(scope2.districtHeat);
  const steamKwh = resolveCategoryTotal(scope2.steam);
  const coolingKwh = resolveCategoryTotal(scope2.districtCooling);
  const coolingFactor = grid / HEAT_FACTORS.coolingCop;

  const scope2ByLine: Record<Scope2FieldKey, number> = {
    electricity: (elecKwh * grid) / 1000,
    evKm: (evKwh * grid) / 1000,
    districtHeat: (heatKwh * HEAT_FACTORS.districtHeat) / 1000,
    steam: (steamKwh * HEAT_FACTORS.steam) / 1000,
    districtCooling: (coolingKwh * coolingFactor) / 1000,
  };
  const scope2Location = SCOPE2_FIELDS.reduce((acc, k) => acc + scope2ByLine[k], 0);

  // ---- Scope 2: market-based (GHG Protocol Scope 2 Guidance hierarchy)
  const m = scope2.market;
  const covered = Math.min(m.renewableKwh, elecKwh);
  const uncoveredFactor = m.supplierFactor ?? m.residualMixFactor ?? grid;
  const heatMarketFactor = m.heatSupplierFactor;
  const scope2Market =
    ((elecKwh - covered) * uncoveredFactor) / 1000 +
    scope2ByLine.evKm +
    (heatMarketFactor != null
      ? ((heatKwh + steamKwh) * heatMarketFactor) / 1000
      : scope2ByLine.districtHeat + scope2ByLine.steam) +
    scope2ByLine.districtCooling;

  // ---- Scope 3
  const spendCurrency = resolveSpendCurrency(scope3, countryCode);
  const scope3ByField = {} as Record<Scope3FieldKey, number>;
  const scope3ByCategory: Record<Scope3CategoryKey, number> = {
    cat1Purchased: 0,
    cat3FuelEnergy: 0,
    cat4Transport: 0,
    cat5Waste: 0,
    cat6Travel: 0,
    cat7Commuting: 0,
  };
  for (const f of SCOPE3_FIELDS) {
    const qty = scope3[f.key] ?? 0;
    const base =
      f.unit === 'currency' ? toUsd2022(qty, spendCurrency, scope3.customUsdRate) : qty;
    const t = (base * scope3FactorFor(f, countryCode)) / 1000;
    scope3ByField[f.key] = t;
    scope3ByCategory[f.category] += t;
  }
  if (scope3.includeFuelEnergyUpstream) {
    const electricityLikeKg =
      (elecKwh * grid + evKwh * grid + coolingKwh * coolingFactor) *
      UPSTREAM_ENERGY_FACTORS.electricityShareOfGrid;
    const heatKg = (heatKwh + steamKwh) * UPSTREAM_ENERGY_FACTORS.heatPerKwh;
    scope3ByCategory.cat3FuelEnergy = (wttKg + electricityLikeKg + heatKg) / 1000;
  }
  const scope3Total = Object.values(scope3ByCategory).reduce((a, b) => a + b, 0);

  return {
    scope1: scope1Total,
    scope1ByGas,
    scope1ByLine,
    scope2Location,
    scope2Market,
    scope2ByLine,
    scope3: scope3Total,
    scope3ByCategory,
    scope3ByField,
    total: scope1Total + scope2Location + scope3Total,
    gridFactor: grid,
    spendCurrency,
  };
}

/** Breakdown for a saved assessment (recomputed from its inputs). */
export function computeAssessmentEmissions(
  assessment: Pick<Assessment, 'scope1' | 'scope2' | 'scope3' | 'countryCode' | 'electricityFactor'>
): EmissionsBreakdown {
  return computeEmissions({
    scope1: assessment.scope1,
    scope2: assessment.scope2,
    scope3: assessment.scope3,
    countryCode: assessment.countryCode,
    gridFactorOverride: assessment.electricityFactor,
  });
}

export function calculateScope1Emissions(scope1: AssessmentDraft['scope1']): number {
  let kg = 0;
  for (const key of SCOPE1_FUELS) kg += resolveCategoryTotal(scope1[key]) * fuelFactorTotal(key);
  for (const r of REFRIGERANTS) kg += (scope1.refrigerants?.[r.key] ?? 0) * r.gwp;
  return kg / 1000;
}

export function buildAssessment(
  draft: AssessmentDraft,
  id: string,
  options?: { finalize?: boolean }
): Assessment {
  const countryCode = draft.countryCode || 'US';
  const e = computeEmissions({
    scope1: draft.scope1,
    scope2: draft.scope2,
    scope3: draft.scope3,
    countryCode,
  });

  return {
    id,
    companyName: draft.companyName.trim(),
    countryCode,
    country: draft.country,
    industry: (draft.industry || DEFAULT_INDUSTRY) as IndustryKey,
    reportingPeriod: draft.reportingPeriod || '1_year',
    reportingStartDate: draft.reportingStartDate,
    scope1: cloneScope1(draft.scope1),
    scope2: cloneScope2(draft.scope2),
    scope3: { ...draft.scope3 },
    scope1Emissions: e.scope1,
    scope2Emissions: e.scope2Location,
    scope2MarketEmissions: e.scope2Market,
    scope3Emissions: e.scope3,
    scope1ByGas: e.scope1ByGas,
    totalEmissions: e.total,
    electricityFactor: e.gridFactor,
    fuelFactorVersion: FUEL_FACTOR_DATASET.version,
    updatedAt: new Date().toISOString(),
    isDraft: !options?.finalize,
    finalizedAt: options?.finalize ? new Date().toISOString() : undefined,
    notes: (draft.notes ?? '').trim(),
  };
}

export function assessmentToDraft(assessment: Assessment): AssessmentDraft {
  return {
    id: assessment.id,
    companyName: assessment.companyName,
    countryCode: assessment.countryCode,
    country: assessment.country,
    industry: assessment.industry,
    reportingPeriod: assessment.reportingPeriod,
    reportingStartDate: assessment.reportingStartDate,
    scope1: cloneScope1(assessment.scope1),
    scope2: cloneScope2(assessment.scope2),
    scope3: { ...assessment.scope3 },
    notes: assessment.notes ?? '',
    clientTag: assessment.clientTag ?? '',
  };
}

export function formatEmissions(value: number): string {
  if (value >= 1000) return value.toFixed(0);
  if (value >= 10) return value.toFixed(1);
  if (value >= 0.01) return value.toFixed(2);
  return value.toFixed(4);
}
