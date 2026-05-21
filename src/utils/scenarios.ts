import {
  calculateScope1Emissions,
  calculateScope2Emissions,
} from '../calculations';
import type { Assessment } from '../types';
import { resolveScope1Totals, resolveScope2Totals } from './scopeFieldInputs';

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
): { scope1: number; scope2: number; total: number } {
  let scope1Inputs = {
    diesel: scaleCategory(assessment.scope1.diesel, adj.dieselPct),
    petrol: scaleCategory(assessment.scope1.petrol, adj.petrolPct),
    naturalGas: scaleCategory(assessment.scope1.naturalGas, adj.gasPct),
  };
  if (adj.fleetEvPct > 0) {
    scope1Inputs = applyFleetEv(scope1Inputs, adj.fleetEvPct);
  }

  const scope2Inputs = {
    electricity: scaleCategory(assessment.scope2.electricity, adj.electricityPct),
  };

  const scope1 = calculateScope1Emissions(scope1Inputs);
  let scope2: number;
  if (adj.customGridFactor != null && adj.customGridFactor > 0) {
    const { electricityKwh } = resolveScope2Totals(scope2Inputs);
    scope2 = (electricityKwh * adj.customGridFactor) / 1000;
  } else {
    scope2 = calculateScope2Emissions(scope2Inputs, assessment.countryCode);
  }

  return { scope1, scope2, total: scope1 + scope2 };
}

export function getBaselineTotals(assessment: Assessment) {
  return {
    scope1: assessment.scope1Emissions,
    scope2: assessment.scope2Emissions,
    total: assessment.totalEmissions,
  };
}