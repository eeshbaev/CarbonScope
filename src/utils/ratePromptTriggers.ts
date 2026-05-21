/** Lifetime new company saves that may trigger the rate prompt. */
export const RATE_PROMPT_COMPANY_COUNTS = [8, 12, 18] as const;

/** Lifetime company deletes that may trigger the rate prompt. */
export const RATE_PROMPT_DELETE_COUNTS = [8, 12, 18] as const;

export function shouldPromptRateForCompanyCount(count: number): boolean {
  return (RATE_PROMPT_COMPANY_COUNTS as readonly number[]).includes(count);
}

export function shouldPromptRateForDeleteCount(count: number): boolean {
  return (RATE_PROMPT_DELETE_COUNTS as readonly number[]).includes(count);
}
