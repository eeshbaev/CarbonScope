import type { Locale } from '../i18n';
import type { CategoryInput, Scope1FieldKey, Scope2FieldKey } from '../types/scopeInputs';
import type {
  ReportingPeriod,
  ResolvedScope1Totals,
  ResolvedScope2Totals,
  Scope1Inputs,
  Scope2Inputs,
} from '../types';
import { listReportingMonths, type ReportingMonth } from './reportingMonths';

export function sumMonthlyValues(monthly: Record<string, number>): number {
  return Object.values(monthly).reduce((acc, v) => acc + (Number.isFinite(v) ? v : 0), 0);
}

export function resolveCategoryTotal(input: CategoryInput | undefined): number {
  if (!input) return 0;
  if (input.useMonthly) {
    return sumMonthlyValues(input.monthly);
  }
  return input.total;
}

export function resolveScope1Totals(scope1: Scope1Inputs): ResolvedScope1Totals {
  return {
    dieselLiters: resolveCategoryTotal(scope1.diesel),
    petrolLiters: resolveCategoryTotal(scope1.petrol),
    naturalGasKwh: resolveCategoryTotal(scope1.naturalGas),
  };
}

export function resolveScope2Totals(scope2: Scope2Inputs): ResolvedScope2Totals {
  return {
    electricityKwh: resolveCategoryTotal(scope2.electricity),
  };
}

export function setScope1Field(
  scope1: Scope1Inputs,
  field: Scope1FieldKey,
  next: CategoryInput
): Scope1Inputs {
  return { ...scope1, [field]: next };
}

export function setScope2Field(
  scope2: Scope2Inputs,
  field: Scope2FieldKey,
  next: CategoryInput
): Scope2Inputs {
  return { ...scope2, [field]: next };
}

export function toggleCategoryMonthly(
  input: CategoryInput,
  useMonthly: boolean,
  monthKeys: string[]
): CategoryInput {
  if (!useMonthly) {
    return { ...input, useMonthly: false };
  }
  const monthly = { ...input.monthly };
  for (const key of monthKeys) {
    if (monthly[key] === undefined) monthly[key] = 0;
  }
  return {
    useMonthly: true,
    total: sumMonthlyValues(monthly),
    monthly,
  };
}

export function updateCategoryTotal(input: CategoryInput, total: number): CategoryInput {
  if (input.useMonthly) {
    return input;
  }
  return { ...input, total };
}

export function updateCategoryMonth(
  input: CategoryInput,
  monthKey: string,
  value: number
): CategoryInput {
  const monthly = { ...input.monthly, [monthKey]: value };
  return {
    useMonthly: true,
    total: sumMonthlyValues(monthly),
    monthly,
  };
}

export function getReportingMonthsForDraft(
  startISO: string,
  period: ReportingPeriod,
  locale: Locale
): ReportingMonth[] {
  if (!startISO) return [];
  return listReportingMonths(startISO, period, locale);
}
