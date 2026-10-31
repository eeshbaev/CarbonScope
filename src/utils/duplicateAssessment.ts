import { assessmentToDraft } from '../calculations';
import { computeReportingEndDate } from './reportingDates';
import { emptyScope1V2, emptyScope2V2, emptyScope3 } from '../types/scopeInputs';
import type { Assessment, AssessmentDraft } from '../types';

/** Copy company profile and structure; clear all fuel/electricity/value-chain amounts for the next reporting period. */
export function duplicateForNextPeriod(source: Assessment): AssessmentDraft {
  const draft = assessmentToDraft(source);
  const period = source.reportingPeriod;

  // The next period starts the day after the previous one ends (its exclusive end date).
  const nextStart = source.reportingStartDate
    ? computeReportingEndDate(source.reportingStartDate, period)
    : source.reportingStartDate;

  return {
    id: undefined,
    companyName: draft.companyName,
    countryCode: draft.countryCode,
    country: draft.country,
    industry: draft.industry,
    reportingPeriod: draft.reportingPeriod,
    reportingStartDate: nextStart,
    // Keep market-based instrument settings (supplier contracts usually carry over); clear amounts.
    scope1: emptyScope1V2(),
    scope2: { ...emptyScope2V2(), market: { ...draft.scope2.market, renewableKwh: 0 } },
    scope3: {
      ...emptyScope3(),
      currency: draft.scope3.currency,
      includeFuelEnergyUpstream: draft.scope3.includeFuelEnergyUpstream,
    },
    notes: '',
    // Company profile, boundary and data-quality choices usually carry over to the next period.
    profile: draft.profile,
    boundary: draft.boundary,
    dataQuality: draft.dataQuality,
  };
}
