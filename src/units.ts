/**
 * Internal standard units: liters (liquid fuels), kWh (energy), kg (solid fuels),
 * km (distance), tCO₂e (output). Each input kind offers display units that convert
 * to the standard unit by a constant multiplier.
 */

export type UnitKind = 'fuel' | 'gas' | 'electricity' | 'mass' | 'distance';

export type FuelVolumeUnit = 'liters' | 'gallons';
export type GasEnergyUnit = 'kwh' | 'm3';
export type ElectricityUnit = 'kwh' | 'mwh';
export type MassUnit = 'kg' | 'tonnes';
export type DistanceUnit = 'km' | 'miles';
export type DisplayUnit = FuelVolumeUnit | GasEnergyUnit | ElectricityUnit | MassUnit | DistanceUnit;

export const LITERS_PER_GALLON = 3.78541;
export const KWH_PER_M3_GAS = 10.55;
export const KWH_PER_MWH = 1000;
export const KG_PER_TONNE = 1000;
export const KM_PER_MILE = 1.609344;

/** Display units per kind; the first entry is the standard unit (multiplier 1). */
export const UNIT_OPTIONS: Record<UnitKind, { unit: DisplayUnit; toStandard: number }[]> = {
  fuel: [
    { unit: 'liters', toStandard: 1 },
    { unit: 'gallons', toStandard: LITERS_PER_GALLON },
  ],
  gas: [
    { unit: 'kwh', toStandard: 1 },
    { unit: 'm3', toStandard: KWH_PER_M3_GAS },
  ],
  electricity: [
    { unit: 'kwh', toStandard: 1 },
    { unit: 'mwh', toStandard: KWH_PER_MWH },
  ],
  mass: [
    { unit: 'kg', toStandard: 1 },
    { unit: 'tonnes', toStandard: KG_PER_TONNE },
  ],
  distance: [
    { unit: 'km', toStandard: 1 },
    { unit: 'miles', toStandard: KM_PER_MILE },
  ],
};

export function standardUnitOf(kind: UnitKind): DisplayUnit {
  return UNIT_OPTIONS[kind][0].unit;
}

function multiplier(kind: UnitKind, unit: DisplayUnit): number {
  return UNIT_OPTIONS[kind].find((o) => o.unit === unit)?.toStandard ?? 1;
}

export function toStandardUnit(value: number, kind: UnitKind, unit: DisplayUnit): number {
  return value * multiplier(kind, unit);
}

export function fromStandardUnit(value: number, kind: UnitKind, unit: DisplayUnit): number {
  return value / multiplier(kind, unit);
}

// Back-compat helpers used across the app.
export const fuelToLiters = (v: number, u: FuelVolumeUnit) => toStandardUnit(v, 'fuel', u);
export const litersToFuel = (v: number, u: FuelVolumeUnit) => fromStandardUnit(v, 'fuel', u);
export const gasToKwh = (v: number, u: GasEnergyUnit) => toStandardUnit(v, 'gas', u);
export const kwhToGas = (v: number, u: GasEnergyUnit) => fromStandardUnit(v, 'gas', u);
export const electricityToKwh = (v: number, u: ElectricityUnit) =>
  toStandardUnit(v, 'electricity', u);
export const kwhToElectricity = (v: number, u: ElectricityUnit) =>
  fromStandardUnit(v, 'electricity', u);
