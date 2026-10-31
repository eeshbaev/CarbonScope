import { computeEmissions } from '../calculations';
import { boundaryShare, type Assessment } from '../types';
import { computeScenarioTotals, DEFAULT_SCENARIO } from '../utils/scenarios';

export type LeverKind = 'renewable' | 'ev' | 'gas' | 'diesel';

export interface RevealSummary {
  /** Line key of the single biggest source and its share of the total (0–100). */
  driver: string | null;
  driverPct: number;
  lever: LeverKind | null;
  /** t CO₂e saved by the lever. */
  leverValue: number;
}

/** Biggest source and a concrete, quantified first lever for the onboarding reveal. */
export function revealSummary(a: Assessment): RevealSummary {
  const e = computeEmissions({
    scope1: a.scope1,
    scope2: a.scope2,
    scope3: a.scope3,
    countryCode: a.countryCode,
    gridFactorOverride: a.electricityFactor,
    share: boundaryShare(a.boundary),
  });
  const lines: [string, number][] = [
    ...Object.entries(e.scope1ByLine),
    ...Object.entries(e.scope2ByLine),
  ];
  const total = a.totalEmissions;
  const top = lines.sort((x, y) => y[1] - x[1])[0];
  const driver = top && top[1] > 0 && total > 0 ? top[0] : null;
  const driverPct = driver ? Math.round((top[1] / total) * 100) : 0;

  const base = computeScenarioTotals(a, DEFAULT_SCENARIO).total;
  const candidates: [LeverKind, number][] = [
    // Renewable tariff: market-based electricity → ~0 (shown against location-based line).
    ['renewable', e.scope2ByLine.electricity ?? 0],
    ['ev', base - computeScenarioTotals(a, { ...DEFAULT_SCENARIO, fleetEvPct: 25 }).total],
    ['gas', base - computeScenarioTotals(a, { ...DEFAULT_SCENARIO, gasPct: -10 }).total],
    ['diesel', base - computeScenarioTotals(a, { ...DEFAULT_SCENARIO, dieselPct: -10 }).total],
  ];
  const best = candidates.sort((x, y) => y[1] - x[1])[0];
  return {
    driver,
    driverPct,
    lever: best[1] > 0 ? best[0] : null,
    leverValue: Math.max(best[1], 0),
  };
}
