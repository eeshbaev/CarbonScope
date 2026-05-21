import { getElectricityFactorForCountry } from './data/emissionFactors';
import { DEFAULT_INDUSTRY, type IndustryKey } from './data/industries';
import { EMISSION_FACTORS } from './constants';
import type { Assessment, AssessmentDraft } from './types';
import { resolveScope1Totals, resolveScope2Totals } from './utils/scopeFieldInputs';

export function calculateScope1Emissions(scope1: AssessmentDraft['scope1']): number {
  const { dieselLiters, petrolLiters, naturalGasKwh } = resolveScope1Totals(scope1);
  const diesel = dieselLiters * EMISSION_FACTORS.diesel;
  const petrol = petrolLiters * EMISSION_FACTORS.petrol;
  const gas = naturalGasKwh * EMISSION_FACTORS.naturalGas;
  return (diesel + petrol + gas) / 1000;
}

export function calculateScope2Emissions(
  scope2: AssessmentDraft['scope2'],
  countryCode: string
): number {
  const { electricityKwh } = resolveScope2Totals(scope2);
  const factor = getElectricityFactorForCountry(countryCode);
  return (electricityKwh * factor) / 1000;
}

export function buildAssessment(
  draft: AssessmentDraft,
  id: string,
  options?: { finalize?: boolean }
): Assessment {
  const scope1Emissions = calculateScope1Emissions(draft.scope1);
  const countryCode = draft.countryCode || 'US';
  const scope2Emissions = calculateScope2Emissions(draft.scope2, countryCode);
  const electricityFactor = getElectricityFactorForCountry(countryCode);

  return {
    id,
    companyName: draft.companyName.trim(),
    countryCode,
    country: draft.country,
    industry: (draft.industry || DEFAULT_INDUSTRY) as IndustryKey,
    reportingPeriod: draft.reportingPeriod || '1_year',
    reportingStartDate: draft.reportingStartDate,
    scope1: draft.scope1,
    scope2: draft.scope2,
    scope1Emissions,
    scope2Emissions,
    totalEmissions: scope1Emissions + scope2Emissions,
    electricityFactor,
    updatedAt: new Date().toISOString(),
    isDraft: !options?.finalize,
    finalizedAt: options?.finalize ? new Date().toISOString() : undefined,
    notes: (draft.notes ?? '').trim(),
  };
}

function cloneCategoryInput(c: Assessment['scope1']['diesel']) {
  return { ...c, monthly: { ...c.monthly } };
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
    scope1: {
      diesel: cloneCategoryInput(assessment.scope1.diesel),
      petrol: cloneCategoryInput(assessment.scope1.petrol),
      naturalGas: cloneCategoryInput(assessment.scope1.naturalGas),
    },
    scope2: {
      electricity: cloneCategoryInput(assessment.scope2.electricity),
    },
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
