import { computeEmissions } from '../calculations';
import type { Assessment } from '../types';

export type ScenarioAdjustments = {
  electricityPct: number;
  dieselPct: number;
  petrolPct: number;
  gasPct: number;
  fleetEvPct: number;
  customGridFactor?: number;
};

export const DEFAULT_SCENARIO: ScenarioAdjustments = {
  electricityPct: 0,
  dieselPct: 0,
  petrolPct: 0,
  gasPct: 0,
  fleetEvPct: 0,
};

function scaleCategory<T extends { total: number; monthly: Record<string, number> }>(
  input: T,
  pct: number
): T {
  const factor = 1 + pct / 100;
  const monthly: Record<string, number> = {};
  for (const [k, v] of Object.entries(input.monthly)) {
    monthly[k] = v * factor;
  }
  return {
    ...input,
    total: input.total * factor,
    monthly,
  };
}

/** Petrol reduction from fleet EV shift (portion of petrol). */
function applyFleetEv(scope1: Assessment['scope1'], fleetEvPct: number) {
  const petrolReduction = -fleetEvPct;
  return {
    ...scope1,
    petrol: scaleCategory(scope1.petrol, petrolReduction),
  };
}

export function computeScenarioTotals(
  assessment: Assessment,
  adj: ScenarioAdjustments
): { scope1: number; scope2: number; scope3: number; total: number } {
  let scope1Inputs: Assessment['scope1'] = {
    ...assessment.scope1,
    diesel: scaleCategory(assessment.scope1.diesel, adj.dieselPct),
    petrol: scaleCategory(assessment.scope1.petrol, adj.petrolPct),
    naturalGas: scaleCategory(assessment.scope1.naturalGas, adj.gasPct),
  };
  if (adj.fleetEvPct > 0) {
    scope1Inputs = applyFleetEv(scope1Inputs, adj.fleetEvPct);
  }

  const scope2Inputs: Assessment['scope2'] = {
    ...assessment.scope2,
    electricity: scaleCategory(assessment.scope2.electricity, adj.electricityPct),
  };

  // Same grid factor as the saved report unless the user models a different one.
  const e = computeEmissions({
    scope1: scope1Inputs,
    scope2: scope2Inputs,
    scope3: assessment.scope3,
    countryCode: assessment.countryCode,
    gridFactorOverride:
      adj.customGridFactor != null && adj.customGridFactor > 0
        ? adj.customGridFactor
        : assessment.electricityFactor,
  });
  return { scope1: e.scope1, scope2: e.scope2Location, scope3: e.scope3, total: e.total };
}

export function getBaselineTotals(assessment: Assessment) {
  return {
    scope1: assessment.scope1Emissions,
    scope2: assessment.scope2Emissions,
    scope3: assessment.scope3Emissions ?? 0,
    total: assessment.totalEmissions,
  };
}