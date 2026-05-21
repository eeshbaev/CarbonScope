/**
 * Country-specific grid electricity emission factors (kg CO₂e/kWh).
 * Based on public averages from IEA, EPA eGRID, DEFRA, and national grid disclosures.
 * Use for Scope 2 location-based estimates per GHG Protocol guidance.
 */

export const DEFAULT_ELECTRICITY_FACTOR = 0.45;

/** Dataset revision shown in reports and settings. */
export const EMISSION_FACTOR_DATASET_VERSION = '2026.1';

export const EMISSION_FACTOR_REFERENCE_YEAR = '2024';

/** Verified / best-available public averages for major economies. */
export const COUNTRY_ELECTRICITY_FACTORS: Record<string, number> = {
  US: 0.38,
  CA: 0.14,
  MX: 0.42,
  BR: 0.1,
  AR: 0.35,
  GB: 0.21,
  FR: 0.05,
  DE: 0.35,
  IT: 0.28,
  ES: 0.15,
  NL: 0.32,
  PL: 0.66,
  NO: 0.01,
  SE: 0.02,
  TR: 0.42,
  UZ: 0.55,
  KZ: 0.65,
  RU: 0.45,
  CN: 0.58,
  IN: 0.71,
  JP: 0.47,
  KR: 0.42,
  ID: 0.72,
  SA: 0.52,
  AE: 0.45,
  ZA: 0.95,
  AU: 0.68,
  NZ: 0.1,
  SG: 0.4,
  MY: 0.59,
  // Additional commonly used markets
  CH: 0.02,
  AT: 0.11,
  BE: 0.14,
  IE: 0.25,
  PT: 0.19,
  GR: 0.39,
  CZ: 0.46,
  RO: 0.25,
  HU: 0.2,
  DK: 0.08,
  FI: 0.08,
  IL: 0.48,
  EG: 0.42,
  NG: 0.52,
  KE: 0.15,
  CL: 0.29,
  CO: 0.15,
  PE: 0.23,
  TH: 0.55,
  VN: 0.55,
  PH: 0.61,
  PK: 0.4,
  BD: 0.55,
  TW: 0.5,
  HK: 0.7,
};

export const EMISSION_FACTOR_SOURCES =
  'IEA · EPA eGRID · DEFRA · GHG Protocol grid factors (public averages)';

let customFactorOverrides: Record<string, number> = {};

export function setCustomFactorOverrides(overrides: Record<string, number>): void {
  customFactorOverrides = { ...overrides };
}

export function getCustomFactorOverrides(): Record<string, number> {
  return { ...customFactorOverrides };
}

export function getElectricityFactorForCountry(countryCode: string): number {
  const code = countryCode.toUpperCase();
  if (customFactorOverrides[code] !== undefined) {
    return customFactorOverrides[code];
  }
  return COUNTRY_ELECTRICITY_FACTORS[code] ?? DEFAULT_ELECTRICITY_FACTOR;
}

export function isCustomElectricityFactor(countryCode: string): boolean {
  return customFactorOverrides[countryCode.toUpperCase()] !== undefined;
}
