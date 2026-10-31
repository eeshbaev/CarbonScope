/**
 * Versioned Scope 1 / Scope 2 (non-grid) / Scope 3 Category 3 factor dataset.
 *
 * Combustion factors are kg CO₂e per unit, split by gas (CO₂, CH₄, N₂O) and already
 * GWP-weighted with IPCC AR5 100-year values. Totals for diesel, petrol and natural gas match
 * the values used since v1.0 (2.68 / 2.31 / 0.183) so existing results do not move.
 * Other values are rounded indicative averages based on the UK DESNZ/DEFRA 2024
 * conversion factors and IPCC 2006 defaults. Verify before regulated disclosure.
 *
 * Bump FUEL_FACTOR_DATASET.version whenever any number in this file changes.
 */

export const FUEL_FACTOR_DATASET = {
  version: '2026.2',
  referenceYear: '2024',
  gwpBasis: 'IPCC AR5 (GWP100)',
  sources: 'DESNZ/DEFRA GHG conversion factors 2024 · IPCC 2006 Guidelines · IPCC AR5 GWPs',
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
  diesel: { unit: 'liters', co2: 2.649, ch4: 0.0003, n2o: 0.0307, wtt: 0.61 },
  petrol: { unit: 'liters', co2: 2.297, ch4: 0.0073, n2o: 0.0057, wtt: 0.6 },
  naturalGas: { unit: 'kwh', co2: 0.18263, ch4: 0.00027, n2o: 0.0001, wtt: 0.03 },
  lpg: { unit: 'liters', co2: 1.5546, ch4: 0.0012, n2o: 0.0013, wtt: 0.18 },
  heatingOil: { unit: 'liters', co2: 2.5326, ch4: 0.0055, n2o: 0.0021, wtt: 0.53 },
  coal: { unit: 'kg', co2: 2.3793, ch4: 0.0007, n2o: 0.019, wtt: 0.39 },
};

export function fuelFactorTotal(key: Scope1FuelKey): number {
  const f = FUEL_FACTORS[key];
  return Math.round((f.co2 + f.ch4 + f.n2o) * 100000) / 100000;
}

/** Refrigerants (fugitive HFC emissions). GWP = kg CO₂e per kg released. */
export type RefrigerantKey = 'r410a' | 'r32' | 'r134a' | 'r404a' | 'r407c' | 'r290' | 'r744';

export const REFRIGERANTS: { key: RefrigerantKey; label: string; gwp: number }[] = [
  { key: 'r410a', label: 'R-410A', gwp: 1924 },
  { key: 'r32', label: 'R-32', gwp: 677 },
  { key: 'r134a', label: 'R-134a', gwp: 1300 },
  { key: 'r404a', label: 'R-404A', gwp: 3943 },
  { key: 'r407c', label: 'R-407C', gwp: 1624 },
  { key: 'r290', label: 'R-290 (propane)', gwp: 3 },
  { key: 'r744', label: 'R-744 (CO₂)', gwp: 1 },
];

export function getRefrigerantGwp(key: RefrigerantKey): number {
  return REFRIGERANTS.find((r) => r.key === key)?.gwp ?? 0;
}

/** Scope 2 purchased heat, steam and cooling (location-based defaults). */
export const HEAT_FACTORS = {
  /** District heating, kg CO₂e/kWh delivered. */
  districtHeat: 0.179,
  /** Purchased steam, kg CO₂e/kWh delivered. */
  steam: 0.179,
  /** District cooling assumed electricity-driven chillers: grid factor ÷ COP. */
  coolingCop: 4,
  /** Average EV consumption for converting km to kWh. */
  evKwhPerKm: 0.18,
} as const;

/** Scope 3 Category 3 (fuel- and energy-related activities) for purchased energy. */
export const UPSTREAM_ENERGY_FACTORS = {
  /** Grid T&D losses + well-to-tank of generation, as a share of the location grid factor. */
  electricityShareOfGrid: 0.3,
  /** Well-to-tank + distribution losses for heat and steam, kg CO₂e/kWh. */
  heatPerKwh: 0.04,
} as const;
