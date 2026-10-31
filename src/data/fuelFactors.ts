/**
 * Versioned Scope 1 / Scope 2 (non-grid) / Scope 3 Category 3 factor dataset.
 *
 * Source: UK Government (DESNZ) Greenhouse gas reporting: conversion factors 2026, flat file
 * (ghg-conversion-factors-2026-flat-format-revised.xlsx). Values are copied at the publication's
 * precision; the DESNZ row each one comes from is noted next to it. See docs/FACTOR_SOURCES.md
 * for how the values were obtained and checked.
 *
 * Combustion factors are kg CO₂e per unit split by gas: CO₂, plus CH₄ and N₂O already converted
 * to CO₂e with IPCC AR5 GWP100 (DESNZ basis). Fossil ("100% mineral") variants are used so the
 * factors are not tied to UK biofuel blending rates.
 *
 * Bump FUEL_FACTOR_DATASET.version whenever any number in this file changes. Saved assessments keep
 * the emissions calculated at the time and record the version they used.
 */

export const FUEL_FACTOR_DATASET = {
  version: '2026.3',
  referenceYear: '2026',
  gwpBasis: 'IPCC AR5 (GWP100)',
  sources: 'UK Government (DESNZ) GHG conversion factors 2026 (flat file, revised) · IPCC AR5 GWP100',
} as const;

/** Scope 1 combustion fuels (stationary and mobile). */
export type Scope1FuelKey = 'diesel' | 'petrol' | 'naturalGas' | 'lpg' | 'heatingOil' | 'coal';

/** Standard (stored) unit for each fuel. */
export type FuelStandardUnit = 'liters' | 'kwh' | 'kg';

export interface GasSplit {
  /** kg CO₂ per unit */
  co2: number;
  /** kg CO₂e of CH₄ per unit */
  ch4: number;
  /** kg CO₂e of N₂O per unit */
  n2o: number;
}

export interface FuelFactor extends GasSplit {
  unit: FuelStandardUnit;
  /** Well-to-tank (upstream extraction, refining, transport) kg CO₂e per unit — Scope 3 Cat. 3. */
  wtt: number;
}

export const SCOPE1_FUELS: Scope1FuelKey[] = [
  'diesel',
  'petrol',
  'naturalGas',
  'lpg',
  'heatingOil',
  'coal',
];

export const FUEL_FACTORS: Record<Scope1FuelKey, FuelFactor> = {
  // Fuels › Liquid fuels › Diesel (100% mineral diesel) › litres; WTT- fuels, same row
  diesel: { unit: 'liters', co2: 2.62818, ch4: 0.00029, n2o: 0.03308, wtt: 0.62409 },
  // Fuels › Liquid fuels › Petrol (100% mineral petrol) › litres
  petrol: { unit: 'liters', co2: 2.33955, ch4: 0.0082, n2o: 0.00597, wtt: 0.60664 },
  // Fuels › Gaseous fuels › Natural gas (100% mineral blend) › kWh (Gross CV)
  naturalGas: { unit: 'kwh', co2: 0.18405, ch4: 0.00028, n2o: 0.00009, wtt: 0.03021 },
  // Fuels › Gaseous fuels › LPG › litres
  lpg: { unit: 'liters', co2: 1.55491, ch4: 0.00136, n2o: 0.00086, wtt: 0.18551 },
  // Fuels › Liquid fuels › Burning oil (kerosene / heating oil) › litres
  heatingOil: { unit: 'liters', co2: 2.52782, ch4: 0.00674, n2o: 0.00559, wtt: 0.53078 },
  // Fuels › Solid fuels › Coal (industrial) › tonnes ÷ 1000
  coal: { unit: 'kg', co2: 2.39047, ch4: 0.00764, n2o: 0.01693, wtt: 0.41815 },
};

export function fuelFactorTotal(key: Scope1FuelKey): number {
  const f = FUEL_FACTORS[key];
  return Math.round((f.co2 + f.ch4 + f.n2o) * 100000) / 100000;
}

/** Refrigerants (fugitive emissions). kg CO₂e per kg released — DESNZ 2026 'Refrigerant & other'. */
export type RefrigerantKey = 'r410a' | 'r32' | 'r134a' | 'r404a' | 'r407c' | 'r290' | 'r744';

export const REFRIGERANTS: { key: RefrigerantKey; label: string; gwp: number }[] = [
  { key: 'r410a', label: 'R-410A', gwp: 1924 },
  { key: 'r32', label: 'R-32', gwp: 677 },
  { key: 'r134a', label: 'R-134a', gwp: 1300 },
  { key: 'r404a', label: 'R-404A', gwp: 3943 },
  { key: 'r407c', label: 'R-407C', gwp: 1624 },
  { key: 'r290', label: 'R-290 (propane)', gwp: 0.06 },
  { key: 'r744', label: 'R-744 (CO₂)', gwp: 1 },
];

export function getRefrigerantGwp(key: RefrigerantKey): number {
  return REFRIGERANTS.find((r) => r.key === key)?.gwp ?? 0;
}

/** Scope 2 purchased heat, steam and cooling (location-based defaults). */
export const HEAT_FACTORS = {
  /** DESNZ 2026 Heat and steam › District heat and steam, kg CO₂e/kWh delivered. */
  districtHeat: 0.17529,
  /** DESNZ 2026 Heat and steam (same factor for purchased steam), kg CO₂e/kWh. */
  steam: 0.17529,
  /**
   * District cooling has no DESNZ factor. Assumption: electricity-driven chillers with a
   * coefficient of performance of 4, so the factor is the grid factor ÷ 4.
   */
  coolingCop: 4,
  /**
   * Battery EV consumption for converting km to kWh, derived from DESNZ 2026: managed-assets
   * BEV average car 0.02951 kg CO₂e/km ÷ (UK generation 0.13096 + T&D 0.01299) ≈ 0.205 kWh/km.
   */
  evKwhPerKm: 0.205,
} as const;

/** Scope 3 Category 3 (fuel- and energy-related activities) for purchased energy. */
export const UPSTREAM_ENERGY_FACTORS = {
  /**
   * Grid T&D losses + well-to-tank of generation and of T&D, as a share of the generation factor.
   * DESNZ 2026 UK: (0.01299 + 0.03682 + 0.00359) ÷ 0.13096 = 0.408. Applied to every country's
   * grid factor as an approximation.
   */
  electricityShareOfGrid: 0.408,
  /**
   * DESNZ 2026: WTT heat and steam 0.03341 + WTT distribution loss 0.00176
   * + district heat distribution loss 0.00945, kg CO₂e/kWh.
   */
  heatPerKwh: 0.04462,
} as const;
