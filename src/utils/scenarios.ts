import { computeEmissions } from '../calculations';
import { HEAT_FACTORS } from '../data/fuelFactors';
import { resolveCategoryTotal } from './scopeFieldInputs';
import { boundaryShare, type Assessment } from '../types';

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

/** Add an amount to a category, spreading it evenly over months when monthly entry is used. */
function addToCategory<T extends { useMonthly: boolean; total: number; monthly: Record<string, number> }>(
  input: T,
  amount: number
): T {
  const keys = Object.keys(input.monthly);
  if (input.useMonthly && keys.length > 0) {
    const monthly: Record<string, number> = {};
    for (const k of keys) monthly[k] = (input.monthly[k] ?? 0) + amount / keys.length;
    return { ...input, monthly };
  }
  return { ...input, total: input.total + amount };
}

/**
 * Fleet EV shift: X% of petrol is replaced by battery EVs. The petrol litres removed are turned
 * into km driven, and the same km are added back as grid electricity (charged on site).
 */
function applyFleetEv(
  scope1: Assessment['scope1'],
  scope2: Assessment['scope2'],
  fleetEvPct: number
): { scope1: Assessment['scope1']; scope2: Assessment['scope2'] } {
  const share = Math.min(Math.max(fleetEvPct, 0), 100) / 100;
  const litresRemoved = resolveCategoryTotal(scope1.petrol) * share;
  const evKwh = litresRemoved * HEAT_FACTORS.petrolCarKmPerLitre * HEAT_FACTORS.evKwhPerKm;
  return {
    scope1: { ...scope1, petrol: scaleCategory(scope1.petrol, -fleetEvPct) },
    scope2: { ...scope2, electricity: addToCategory(scope2.electricity, evKwh) },
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
  let scope2Inputs: Assessment['scope2'] = {
    ...assessment.scope2,
    electricity: scaleCategory(assessment.scope2.electricity, adj.electricityPct),
  };
  if (adj.fleetEvPct > 0) {
    const shifted = applyFleetEv(scope1Inputs, scope2Inputs, adj.fleetEvPct);
    scope1Inputs = shifted.scope1;
    scope2Inputs = shifted.scope2;
  }

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
    share: boundaryShare(assessment.boundary),
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