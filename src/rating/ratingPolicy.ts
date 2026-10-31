/**
 * Rating policy — earn the rating before asking for it.
 *
 * Value → success → natural pause → native review request. Never after deletes, errors,
 * onboarding or during data entry; never with a custom "rate us" pre-prompt (review gating).
 * Pure functions so the policy is unit-tested; storage lives in ratingService.ts.
 */

/** Moments where the user has just received real value. */
export type ValueMoment =
  /** A PDF report was generated and the share sheet closed. */
  | 'report_shared'
  /** A finalized report showed a comparison with an earlier period of the same company. */
  | 'comparison_seen';

export interface RatingState {
  /** User rated from Settings or confirmed rating: stop asking. */
  rated: boolean;
  /** Times the native prompt was requested automatically. */
  requests: number;
  /** ISO time of the last automatic request. */
  lastRequestAt: string | null;
  /** Count of value moments per kind. */
  moments: Partial<Record<ValueMoment, number>>;
  /** Distinct days (YYYY-MM-DD) on which value moments happened. */
  valueDays: string[];
}

export const EMPTY_RATING_STATE: RatingState = {
  rated: false,
  requests: 0,
  lastRequestAt: null,
  moments: {},
  valueDays: [],
};

/** Minimum gap between automatic requests (the OS also rate-limits). */
export const RATING_COOLDOWN_DAYS = 120;
/** Lifetime cap on automatic requests. */
export const RATING_MAX_REQUESTS = 3;

export function recordMoment(state: RatingState, moment: ValueMoment, now: Date): RatingState {
  const day = now.toISOString().slice(0, 10);
  return {
    ...state,
    moments: { ...state.moments, [moment]: (state.moments[moment] ?? 0) + 1 },
    valueDays: state.valueDays.includes(day) ? state.valueDays : [...state.valueDays, day].slice(-30),
  };
}

/**
 * Eligible when the user has received value repeatedly — a shared report or a period-over-period
 * comparison, on at least two different days — and we have not asked recently.
 */
export function isEligibleForReview(state: RatingState, now: Date): boolean {
  if (state.rated) return false;
  if (state.requests >= RATING_MAX_REQUESTS) return false;
  if (state.lastRequestAt) {
    const days = (now.getTime() - new Date(state.lastRequestAt).getTime()) / 86_400_000;
    if (days < RATING_COOLDOWN_DAYS) return false;
  }
  const shared = state.moments.report_shared ?? 0;
  const compared = state.moments.comparison_seen ?? 0;
  return shared + compared >= 2 && state.valueDays.length >= 2;
}

export function markRequested(state: RatingState, now: Date): RatingState {
  return { ...state, requests: state.requests + 1, lastRequestAt: now.toISOString() };
}
