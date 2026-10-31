/**
 * Country grid electricity emission factors for Scope 2 location-based reporting
 * (kg CO₂e per kWh consumed from the grid, generation emissions only).
 *
 * Under the GHG Protocol, Scope 2 covers emissions from generating the electricity. Upstream
 * fuel supply and transmission & distribution losses belong to Scope 3 Category 3, which
 * CarbonScope estimates separately. Lifecycle intensities (e.g. Ember's) are therefore NOT used.
 *
 * Method (see docs/FACTOR_SOURCES.md):
 * 1. Official national location-based factors where a current value could be verified
 *    (UK DESNZ 2026, US EPA eGRID2023, India CEA v21, Australia NGA 2025).
 * 2. Otherwise derived from the country's latest annual generation mix (Ember via the Our World in
 *    Data energy dataset, 2025 or 2024) × direct combustion factors per kWh generated:
 *    measured fleet averages from Electricity Maps (EU-ETS 2025 for EU countries, eGRID for the US),
 *    or the median of those measured fleets elsewhere (coal 1,036.9, gas 389.7, oil 826.1 g/kWh;
 *    other fossil 575 g/kWh). Renewables, nuclear and biomass count as 0 direct (biogenic CO₂ is
 *    reported outside the scopes). Production-based: electricity imports are not adjusted.
 */

export const DEFAULT_ELECTRICITY_FACTOR = 0.449; // world, derived from the 2025 global generation mix

/** Dataset revision shown in reports and settings. */
export const EMISSION_FACTOR_DATASET_VERSION = '2026.4';

export const EMISSION_FACTOR_REFERENCE_YEAR = '2025';

export const COUNTRY_ELECTRICITY_FACTORS: Record<string, number> = {
  AE: 0.266, // derived: 2024 mix (coal 0%, gas 68%, oil 0%), fleet-median defaults
  AR: 0.256, // derived: 2025 mix (coal 2%, gas 53%, oil 4%), fleet-median defaults
  AT: 0.081, // derived: 2025 mix (coal 0%, gas 12%, oil 4%), EU-ETS 2025 / eGRID fleet factors
  AU: 0.62, // official: DCCEEW National Greenhouse Accounts Factors 2025, national scope 2
  BD: 0.573, // derived: 2025 mix (coal 22%, gas 64%, oil 12%), fleet-median defaults
  BE: 0.135, // derived: 2025 mix (coal 0%, gas 22%, oil 6%), EU-ETS 2025 / eGRID fleet factors
  BR: 0.066, // derived: 2025 mix (coal 2%, gas 7%, oil 2%), fleet-median defaults
  CA: 0.121, // derived: 2025 mix (coal 4%, gas 18%, oil 1%), fleet-median defaults
  CH: 0.017, // derived: 2025 mix (coal 0%, gas 0%, oil 2%), fleet-median defaults
  CL: 0.248, // derived: 2025 mix (coal 18%, gas 15%, oil 1%), fleet-median defaults
  CN: 0.583, // derived: 2025 mix (coal 54%, gas 3%, oil 1%), fleet-median defaults
  CO: 0.143, // derived: 2025 mix (coal 6%, gas 14%, oil 3%), fleet-median defaults
  CZ: 0.374, // derived: 2025 mix (coal 35%, gas 5%, oil 0%), EU-ETS 2025 / eGRID fleet factors
  DE: 0.311, // derived: 2025 mix (coal 21%, gas 17%, oil 4%), EU-ETS 2025 / eGRID fleet factors
  DK: 0.068, // derived: 2025 mix (coal 3%, gas 2%, oil 4%), EU-ETS 2025 / eGRID fleet factors
  EG: 0.371, // derived: 2025 mix (coal 0%, gas 80%, oil 7%), fleet-median defaults
  ES: 0.122, // derived: 2025 mix (coal 0%, gas 22%, oil 3%), EU-ETS 2025 / eGRID fleet factors
  FI: 0.026, // derived: 2025 mix (coal 0%, gas 1%, oil 2%), EU-ETS 2025 / eGRID fleet factors
  FR: 0.028, // derived: 2025 mix (coal 0%, gas 3%, oil 2%), EU-ETS 2025 / eGRID fleet factors
  GB: 0.131, // official: DESNZ 2026 UK electricity generation (0.13096)
  GR: 0.291, // derived: 2025 mix (coal 5%, gas 38%, oil 7%), EU-ETS 2025 / eGRID fleet factors
  HK: 0.609, // derived: 2024 mix (coal 34%, gas 64%, oil 1%), fleet-median defaults
  HU: 0.134, // derived: 2025 mix (coal 3%, gas 20%, oil 1%), EU-ETS 2025 / eGRID fleet factors
  ID: 0.725, // derived: 2024 mix (coal 61%, gas 19%, oil 2%), fleet-median defaults
  IE: 0.231, // derived: 2025 mix (coal 1%, gas 48%, oil 3%), EU-ETS 2025 / eGRID fleet factors
  IL: 0.346, // derived: 2025 mix (coal 3%, gas 80%, oil 0%), fleet-median defaults
  IN: 0.712, // official: CEA CO2 Baseline Database v21 (FY2024-25) weighted average 0.7117
  IT: 0.224, // derived: 2025 mix (coal 1%, gas 47%, oil 3%), EU-ETS 2025 / eGRID fleet factors
  JP: 0.48, // derived: 2025 mix (coal 32%, gas 33%, oil 2%), fleet-median defaults
  KE: 0.082, // derived: 2025 mix (coal 0%, gas 0%, oil 10%), fleet-median defaults
  KR: 0.44, // derived: 2025 mix (coal 31%, gas 28%, oil 1%), fleet-median defaults
  KZ: 0.689, // derived: 2025 mix (coal 54%, gas 29%, oil 1%), fleet-median defaults
  MX: 0.349, // derived: 2025 mix (coal 3%, gas 62%, oil 9%), fleet-median defaults
  MY: 0.602, // derived: 2025 mix (coal 45%, gas 34%, oil 1%), fleet-median defaults
  NG: 0.268, // derived: 2025 mix (coal 0%, gas 69%, oil 0%), fleet-median defaults
  NL: 0.213, // derived: 2025 mix (coal 7%, gas 35%, oil 4%), EU-ETS 2025 / eGRID fleet factors
  NO: 0.006, // derived: 2025 mix (coal 0%, gas 1%, oil 0%), fleet-median defaults
  NZ: 0.058, // derived: 2025 mix (coal 1%, gas 9%, oil 1%), fleet-median defaults
  PE: 0.143, // derived: 2025 mix (coal 0%, gas 36%, oil 0%), fleet-median defaults
  PH: 0.682, // derived: 2025 mix (coal 59%, gas 17%, oil 1%), fleet-median defaults
  PK: 0.312, // derived: 2025 mix (coal 15%, gas 21%, oil 9%), fleet-median defaults
  PL: 0.607, // derived: 2025 mix (coal 50%, gas 14%, oil 4%), EU-ETS 2025 / eGRID fleet factors
  PT: 0.087, // derived: 2025 mix (coal 0%, gas 16%, oil 3%), EU-ETS 2025 / eGRID fleet factors
  RO: 0.233, // derived: 2025 mix (coal 13%, gas 19%, oil 0%), EU-ETS 2025 / eGRID fleet factors
  RU: 0.375, // derived: 2025 mix (coal 18%, gas 45%, oil 1%), fleet-median defaults
  SA: 0.532, // derived: 2024 mix (coal 0%, gas 63%, oil 34%), fleet-median defaults
  SE: 0.006, // derived: 2025 mix (coal 0%, gas 0%, oil 1%), EU-ETS 2025 / eGRID fleet factors
  SG: 0.385, // derived: 2025 mix (coal 1%, gas 91%, oil 2%), fleet-median defaults
  TH: 0.441, // derived: 2025 mix (coal 18%, gas 66%, oil 0%), fleet-median defaults
  TR: 0.444, // derived: 2025 mix (coal 34%, gas 22%, oil 0%), fleet-median defaults
  TW: 0.579, // derived: 2025 mix (coal 36%, gas 49%, oil 2%), fleet-median defaults
  US: 0.35, // official: EPA eGRID2023 national total output rate (~771 lb CO2e/MWh)
  UZ: 0.364, // derived: 2025 mix (coal 7%, gas 72%, oil 2%), fleet-median defaults
  VN: 0.525, // derived: 2025 mix (coal 48%, gas 6%, oil 0%), fleet-median defaults
  ZA: 0.85, // derived: 2025 mix (coal 81%, gas 0%, oil 1%), fleet-median defaults
};

export const EMISSION_FACTOR_SOURCES =
  'Generation-based (direct) factors: DESNZ 2026 · EPA eGRID2023 · CEA v21 · NGA 2025 · derived from Ember 2025 generation mix × EU-ETS/eGRID fleet factors (Electricity Maps)';

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
