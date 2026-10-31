import { isCurrencyCode, type CurrencyCode } from '../data/currencies';
import { REFRIGERANTS, SCOPE1_FUELS, type RefrigerantKey, type Scope1FuelKey } from '../data/fuelFactors';
import { SCOPE3_FIELDS, type Scope3FieldKey } from '../data/scope3Factors';

export type Scope1FieldKey = Scope1FuelKey;
export type Scope2FieldKey = 'electricity' | 'evKm' | 'districtHeat' | 'steam' | 'districtCooling';
export type ScopeFieldKey = Scope1FieldKey | Scope2FieldKey;

export const SCOPE2_FIELDS: Scope2FieldKey[] = [
  'electricity',
  'evKm',
  'districtHeat',
  'steam',
  'districtCooling',
];

/** Per fuel/utility: either period total OR sum of monthly values. */
export interface CategoryInput {
  useMonthly: boolean;
  /** Period total in the line's standard unit when useMonthly is false. */
  total: number;
  /** YYYY-MM → amount for that calendar month in the reporting window. */
  monthly: Record<string, number>;
}

export const emptyCategoryInput = (): CategoryInput => ({
  useMonthly: false,
  total: 0,
  monthly: {},
});

/** kg of each refrigerant topped up / lost during the period. */
export type RefrigerantInputs = Record<RefrigerantKey, number>;

export type Scope1InputsV2 = Record<Scope1FuelKey, CategoryInput> & {
  refrigerants: RefrigerantInputs;
};

/** Market-based Scope 2 instruments (GHG Protocol Scope 2 Guidance). */
export interface MarketBasedInputs {
  /** Supplier-specific electricity emission factor, kg CO₂e/kWh (null = not provided). */
  supplierFactor: number | null;
  /** kWh covered by renewable certificates / PPAs (GOs, RECs, I-RECs). */
  renewableKwh: number;
  /** Residual mix factor for uncovered kWh, kg CO₂e/kWh (null = use grid average). */
  residualMixFactor: number | null;
  /** Supplier-specific factor for district heat / steam, kg CO₂e/kWh (null = default). */
  heatSupplierFactor: number | null;
}

export type Scope2InputsV2 = Record<Scope2FieldKey, CategoryInput> & {
  market: MarketBasedInputs;
};

export const emptyRefrigerants = (): RefrigerantInputs => {
  const out = {} as RefrigerantInputs;
  for (const r of REFRIGERANTS) out[r.key] = 0;
  return out;
};

export const emptyMarketBased = (): MarketBasedInputs => ({
  supplierFactor: null,
  renewableKwh: 0,
  residualMixFactor: null,
  heatSupplierFactor: null,
});

export const emptyScope1V2 = (): Scope1InputsV2 => {
  const out = { refrigerants: emptyRefrigerants() } as Scope1InputsV2;
  for (const k of SCOPE1_FUELS) out[k] = emptyCategoryInput();
  return out;
};

export const emptyScope2V2 = (): Scope2InputsV2 => {
  const out = { market: emptyMarketBased() } as Scope2InputsV2;
  for (const k of SCOPE2_FIELDS) out[k] = emptyCategoryInput();
  return out;
};

/** Legacy flat shape (pre-monthly). */
export interface LegacyScope1 {
  dieselLiters?: number;
  petrolLiters?: number;
  naturalGasKwh?: number;
}

export interface LegacyScope2 {
  electricityKwh?: number;
}

function positive(v: unknown): number {
  return typeof v === 'number' && Number.isFinite(v) && v > 0 ? v : 0;
}

function optionalFactor(v: unknown): number | null {
  return typeof v === 'number' && Number.isFinite(v) && v >= 0 ? v : null;
}

function migrateCategory(raw: unknown): CategoryInput {
  if (typeof raw !== 'object' || raw === null) return emptyCategoryInput();
  const c = raw as Partial<CategoryInput>;
  const monthly: Record<string, number> = {};
  if (c.monthly && typeof c.monthly === 'object') {
    for (const [k, v] of Object.entries(c.monthly)) monthly[k] = positive(v);
  }
  return { useMonthly: c.useMonthly === true, total: positive(c.total), monthly };
}

export function isScope1V2(raw: unknown): boolean {
  return (
    typeof raw === 'object' &&
    raw !== null &&
    'diesel' in raw &&
    typeof (raw as { diesel: unknown }).diesel === 'object'
  );
}

export function migrateScope1Inputs(raw: unknown): Scope1InputsV2 {
  const out = emptyScope1V2();
  if (typeof raw !== 'object' || raw === null) return out;
  if (isScope1V2(raw)) {
    const src = raw as Record<string, unknown>;
    for (const k of SCOPE1_FUELS) out[k] = migrateCategory(src[k]);
    const refr = (src.refrigerants ?? {}) as Record<string, unknown>;
    for (const r of REFRIGERANTS) out.refrigerants[r.key] = positive(refr[r.key]);
    return out;
  }
  const legacy = raw as LegacyScope1;
  out.diesel.total = positive(legacy.dieselLiters);
  out.petrol.total = positive(legacy.petrolLiters);
  out.naturalGas.total = positive(legacy.naturalGasKwh);
  return out;
}

export function migrateScope2Inputs(raw: unknown): Scope2InputsV2 {
  const out = emptyScope2V2();
  if (typeof raw !== 'object' || raw === null) return out;
  const src = raw as Record<string, unknown>;
  if ('electricity' in src) {
    for (const k of SCOPE2_FIELDS) out[k] = migrateCategory(src[k]);
    const m = (src.market ?? {}) as Record<string, unknown>;
    out.market = {
      supplierFactor: optionalFactor(m.supplierFactor),
      renewableKwh: positive(m.renewableKwh),
      residualMixFactor: optionalFactor(m.residualMixFactor),
      heatSupplierFactor: optionalFactor(m.heatSupplierFactor),
    };
    return out;
  }
  out.electricity.total = positive((raw as LegacyScope2).electricityKwh);
  return out;
}

export function supportsMonthlyEntry(period: '6_months' | '1_year'): boolean {
  return period === '6_months' || period === '1_year';
}

/** Scope 3 data: period totals per value-chain line plus options. */
export type Scope3Inputs = Record<Scope3FieldKey, number> & {
  /** Currency of spend-based lines (defaults from the company country). */
  currency?: CurrencyCode;
  /** USD per 1 unit of currency, used when currency is 'OTHER'. */
  customUsdRate?: number | null;
  /** Add the automatic Category 3 estimate derived from Scope 1 & 2 inputs. */
  includeFuelEnergyUpstream: boolean;
};

export const emptyScope3 = (): Scope3Inputs => {
  const out = { includeFuelEnergyUpstream: false } as Scope3Inputs;
  for (const f of SCOPE3_FIELDS) out[f.key] = 0;
  return out;
};

/** Older assessments have no (or partial) Scope 3 data; coerce anything unexpected to zero. */
export function migrateScope3Inputs(raw: unknown): Scope3Inputs {
  const out = emptyScope3();
  if (typeof raw !== 'object' || raw === null) return out;
  const src = raw as Record<string, unknown>;
  for (const f of SCOPE3_FIELDS) out[f.key] = positive(src[f.key]);
  out.includeFuelEnergyUpstream = src.includeFuelEnergyUpstream === true;
  if (isCurrencyCode(src.currency)) out.currency = src.currency;
  out.customUsdRate = optionalFactor(src.customUsdRate);
  return out;
}

/** Deep-ish copy so drafts never share nested objects with saved assessments. */
export function cloneCategoryInput(c: CategoryInput): CategoryInput {
  return { ...c, monthly: { ...c.monthly } };
}

export function cloneScope1(s: Scope1InputsV2): Scope1InputsV2 {
  const out = { refrigerants: { ...s.refrigerants } } as Scope1InputsV2;
  for (const k of SCOPE1_FUELS) out[k] = cloneCategoryInput(s[k]);
  return out;
}

export function cloneScope2(s: Scope2InputsV2): Scope2InputsV2 {
  const out = { market: { ...s.market } } as Scope2InputsV2;
  for (const k of SCOPE2_FIELDS) out[k] = cloneCategoryInput(s[k]);
  return out;
}
