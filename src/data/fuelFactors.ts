/**
 * Versioned Scope 1 / Scope 2 (non-grid) / Scope 3 Category 3 factor dataset.
 *
 * Source: UK Government (DESNZ) Greenhouse gas reporting: conversion factors 2026, flat file
 * (ghg-conversion-factors-2026-flat-format-revised.xlsx). Values are copied at the publication's
 * precision; the DESNZ row each one comes from is noted next to it. See docs/FACTOR_SOURCES.md
 * for how the values were obtained and checked.
 *
 * Combustion factors are kg CO₂e per unit split by gas. DESNZ publishes on IPCC AR5; CarbonScope
 * restates them on the current IPCC AR6 GWP100 basis (GHG Protocol GWP table, Aug 2024) from the
 * DESNZ gas masses: CH₄ (fossil) × 29.8, N₂O × 273. Fossil ("100% mineral") variants are used so
 * the factors are not tied to UK biofuel blending rates. Well-to-tank values are published as
 * CO₂e only and stay on the DESNZ (AR5) basis.
 *
 * Bump FUEL_FACTOR_DATASET.version whenever any number in this file changes. Saved assessments keep
 * the emissions calculated at the time and record the version they used.
 */

export const FUEL_FACTOR_DATASET = {
  version: '2026.4',
  referenceYear: '2026',
  gwpBasis: 'IPCC AR6 (GWP100)',
  sources: 'UK Government (DESNZ) GHG conversion factors 2026 (flat file, revised), restated to IPCC AR6 GWP100 (GHG Protocol table, Aug 2024)',
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
  diesel: { unit: 'liters', co2: 2.62818, ch4: 0.00031, n2o: 0.03408, wtt: 0.62409 },
  // Fuels › Liquid fuels › Petrol (100% mineral petrol) › litres
  petrol: { unit: 'liters', co2: 2.33955, ch4: 0.00873, n2o: 0.00615, wtt: 0.60664 },
  // Fuels › Gaseous fuels › Natural gas (100% mineral blend) › kWh (Gross CV)
  naturalGas: { unit: 'kwh', co2: 0.18405, ch4: 0.0003, n2o: 0.00009, wtt: 0.03021 },
  // Fuels › Gaseous fuels › LPG › litres
  lpg: { unit: 'liters', co2: 1.55491, ch4: 0.00145, n2o: 0.00089, wtt: 0.18551 },
  // Fuels › Liquid fuels › Burning oil (kerosene / heating oil) › litres
  heatingOil: { unit: 'liters', co2: 2.52782, ch4: 0.00717, n2o: 0.00576, wtt: 0.53078 },
  // Fuels › Solid fuels › Coal (industrial) › tonnes ÷ 1000
  coal: { unit: 'kg', co2: 2.39047, ch4: 0.00813, n2o: 0.01744, wtt: 0.41815 },
};

export function fuelFactorTotal(key: Scope1FuelKey): number {
  const f = FUEL_FACTORS[key];
  return Math.round((f.co2 + f.ch4 + f.n2o) * 100000) / 100000;
}

/**
 * Refrigerants (fugitive emissions), kg CO₂e per kg released, IPCC AR6 GWP100 (GHG Protocol GWP
 * table, Aug 2024). Blends are mass-weighted: R-410A = 50% HFC-32 + 50% HFC-125;
 * R-404A = 44% HFC-125 + 52% HFC-143a + 4% HFC-134a; R-407C = 23% HFC-32 + 25% HFC-125 + 52% HFC-134a.
 */
export type RefrigerantKey = 'r410a' | 'r32' | 'r134a' | 'r404a' | 'r407c' | 'r290' | 'r744';

export const REFRIGERANTS: { key: RefrigerantKey; label: string; gwp: number }[] = [
  { key: 'r410a', label: 'R-410A', gwp: 2256 },
  { key: 'r32', label: 'R-32', gwp: 771 },
  { key: 'r134a', label: 'R-134a', gwp: 1530 },
  { key: 'r404a', label: 'R-404A', gwp: 4728 },
  { key: 'r407c', label: 'R-407C', gwp: 1908 },
  { key: 'r290', label: 'R-290 (propane)', gwp: 0.02 },
  { key: 'r744', label: 'R-744 (CO₂)', gwp: 1 },
];

export function getRefrigerantGwp(key: RefrigerantKey): number {
  return REFRIGERANTS.find((r) => r.key === key)?.gwp ?? 0;
}

/** Scope 2 purchased heat, steam and cooling (location-based defaults). */
export const HEAT_FACTORS = {
  /** DESNZ 2026 Heat and steam › District heat and steam (0.17529 AR5), AR6: kg CO₂e/kWh delivered. */
  districtHeat: 0.17538,
  /** Same DESNZ factor for purchased steam, AR6. */
  steam: 0.17538,
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
  /**
   * Average petrol car distance per litre, for the fleet-EV scenario. DESNZ 2026 average petrol
   * car 0.16152 kg CO₂e/km ÷ average-biofuel-blend petrol 2.075 kg CO₂e/L = 0.0778 L/km.
   */
  petrolCarKmPerLitre: 12.85,
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
