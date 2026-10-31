import { assessmentToDraft } from '../calculations';
import { monthsForPeriod, parseISODate, toISODateString } from './reportingDates';
import { emptyCategoryInput, emptyScope3 } from '../types/scopeInputs';
import type { Assessment, AssessmentDraft } from '../types';

function clearedCategory() {
  return emptyCategoryInput();
}

/** Copy company profile and structure; clear all fuel/electricity/value-chain amounts for the next reporting period. */
export function duplicateForNextPeriod(source: Assessment): AssessmentDraft {
  const draft = assessmentToDraft(source);
  const period = source.reportingPeriod;
  const months = monthsForPeriod(period);

  let nextStart = source.reportingStartDate;
  if (source.reportingStartDate) {
    const start = parseISODate(source.reportingStartDate);
    start.setMonth(start.getMonth() + months);
    nextStart = toISODateString(start);
  }

  return {
    id: undefined,
    companyName: draft.companyName,
    countryCode: draft.countryCode,
    country: draft.country,
    industry: draft.industry,
    reportingPeriod: draft.reportingPeriod,
    reportingStartDate: nextStart,
    scope1: {
      diesel: clearedCategory(),
      petrol: clearedCategory(),
      naturalGas: clearedCategory(),
    },
    scope2: {
      electricity: clearedCategory(),
    },
    scope3: emptyScope3(),
    notes: '',
  };
}
