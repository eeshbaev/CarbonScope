import { SCOPE3_FIELDS, type Scope3FieldKey } from '../data/scope3Factors';

export type Scope1FieldKey = 'diesel' | 'petrol' | 'naturalGas';
export type Scope2FieldKey = 'electricity';
export type ScopeFieldKey = Scope1FieldKey | Scope2FieldKey;

/** Per fuel/utility: either period total OR sum of monthly values. */
export interface CategoryInput {
  useMonthly: boolean;
  /** Period total (L or kWh) when useMonthly is false. */
  total: number;
  /** YYYY-MM → amount for that calendar month in the reporting window. */
  monthly: Record<string, number>;
}

export const emptyCategoryInput = (): CategoryInput => ({
  useMonthly: false,
  total: 0,
  monthly: {},
});

export interface Scope1InputsV2 {
  diesel: CategoryInput;
  petrol: CategoryInput;
  naturalGas: CategoryInput;
}

export interface Scope2InputsV2 {
  electricity: CategoryInput;
}

export const emptyScope1V2 = (): Scope1InputsV2 => ({
  diesel: emptyCategoryInput(),
  petrol: emptyCategoryInput(),
  naturalGas: emptyCategoryInput(),
});

export const emptyScope2V2 = (): Scope2InputsV2 => ({
  electricity: emptyCategoryInput(),
});

/** Legacy flat shape (pre-monthly). */
export interface LegacyScope1 {
  dieselLiters?: number;
  petrolLiters?: number;
  naturalGasKwh?: number;
}

export interface LegacyScope2 {
  electricityKwh?: number;
}

export function isScope1V2(raw: unknown): raw is Scope1InputsV2 {
  return (
    typeof raw === 'object' &&
    raw !== null &&
    'diesel' in raw &&
    typeof (raw as Scope1InputsV2).diesel === 'object'
  );
}

export function migrateScope1Inputs(raw: LegacyScope1 | Scope1InputsV2): Scope1InputsV2 {
  if (isScope1V2(raw)) {
    return {
      diesel: { ...emptyCategoryInput(), ...raw.diesel, monthly: { ...raw.diesel.monthly } },
      petrol: { ...emptyCategoryInput(), ...raw.petrol, monthly: { ...raw.petrol.monthly } },
      naturalGas: {
        ...emptyCategoryInput(),
        ...raw.naturalGas,
        monthly: { ...raw.naturalGas.monthly },
      },
    };
  }
  return {
    diesel: { useMonthly: false, total: raw.dieselLiters ?? 0, monthly: {} },
    petrol: { useMonthly: false, total: raw.petrolLiters ?? 0, monthly: {} },
    naturalGas: { useMonthly: false, total: raw.naturalGasKwh ?? 0, monthly: {} },
  };
}

export function migrateScope2Inputs(raw: LegacyScope2 | Scope2InputsV2): Scope2InputsV2 {
  if (typeof raw === 'object' && raw !== null && 'electricity' in raw) {
    const e = (raw as Scope2InputsV2).electricity;
    return {
      electricity: { ...emptyCategoryInput(), ...e, monthly: { ...e.monthly } },
    };
  }
  return {
    electricity: { useMonthly: false, total: raw.electricityKwh ?? 0, monthly: {} },
  };
}

export function supportsMonthlyEntry(period: '6_months' | '1_year'): boolean {
  return period === '6_months' || period === '1_year';
}

/** Scope 3 activity data: period totals per value-chain line (units per field definition). */
export type Scope3Inputs = Record<Scope3FieldKey, number>;

export const emptyScope3 = (): Scope3Inputs => {
  const out = {} as Scope3Inputs;
  for (const f of SCOPE3_FIELDS) out[f.key] = 0;
  return out;
};

/** Older assessments have no Scope 3 data; coerce anything unexpected to zero. */
export function migrateScope3Inputs(raw: unknown): Scope3Inputs {
  const out = emptyScope3();
  if (typeof raw !== 'object' || raw === null) return out;
  const src = raw as Record<string, unknown>;
  for (const f of SCOPE3_FIELDS) {
    const v = src[f.key];
    out[f.key] = typeof v === 'number' && Number.isFinite(v) && v > 0 ? v : 0;
  }
  return out;
}
