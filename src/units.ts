/** Internal standard units: liters (fuel), kWh (energy), tCO₂e (output). */

export type FuelVolumeUnit = 'liters' | 'gallons';
export type GasEnergyUnit = 'kwh' | 'm3';
export type ElectricityUnit = 'kwh' | 'mwh';

export const LITERS_PER_GALLON = 3.78541;
export const KWH_PER_M3_GAS = 10.55;
export const KWH_PER_MWH = 1000;

export function fuelToLiters(value: number, unit: FuelVolumeUnit): number {
  if (unit === 'gallons') return value * LITERS_PER_GALLON;
  return value;
}

export function litersToFuel(liters: number, unit: FuelVolumeUnit): number {
  if (unit === 'gallons') return liters / LITERS_PER_GALLON;
  return liters;
}

export function gasToKwh(value: number, unit: GasEnergyUnit): number {
  if (unit === 'm3') return value * KWH_PER_M3_GAS;
  return value;
}

export function kwhToGas(kwh: number, unit: GasEnergyUnit): number {
  if (unit === 'm3') return kwh / KWH_PER_M3_GAS;
  return kwh;
}

export function electricityToKwh(value: number, unit: ElectricityUnit): number {
  if (unit === 'mwh') return value * KWH_PER_MWH;
  return value;
}

export function kwhToElectricity(kwh: number, unit: ElectricityUnit): number {
  if (unit === 'mwh') return kwh / KWH_PER_MWH;
  return kwh;
}
