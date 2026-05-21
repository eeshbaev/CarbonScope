import type { CategoryInput } from '../types/scopeInputs';
import type { ReportingMonth } from './reportingMonths';

export type CategoryProgress = {
  filled: number;
  total: number;
};

export function computeCategoryProgress(
  input: CategoryInput,
  months: ReportingMonth[]
): CategoryProgress {
  if (months.length > 0 && input.useMonthly) {
    const filled = months.filter((m) => (input.monthly[m.key] ?? 0) > 0).length;
    return { filled, total: months.length };
  }
  return {
    filled: input.total > 0 ? 1 : 0,
    total: 1,
  };
}

export type ScopeProgressLine = {
  fieldKey: string;
  label: string;
  filled: number;
  total: number;
};
