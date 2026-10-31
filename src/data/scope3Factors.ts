/**
 * Scope 3 (value-chain) emission factors. See docs/FACTOR_SOURCES.md for provenance and checks.
 *
 * Activity-based lines: kg CO₂e per unit from the UK Government (DESNZ) GHG conversion factors
 * 2026 flat file. Rows that DESNZ splits by gas are restated to IPCC AR6 GWP100 (CH₄ fossil 29.8,
 * N₂O 273); rows published as CO₂e only (water, waste, hotels) keep the DESNZ AR5 basis. Air travel and air freight include radiative forcing ("with RF"), as DESNZ
 * recommends, to capture non-CO₂ warming from aviation.
 *
 * Spend-based lines: kg CO₂e per 2022 USD (purchaser price, with margins) from US EPA Supply Chain
 * GHG Emission Factors v1.3 by NAICS-6 (AR5 basis as published). Spend is converted to USD at 2025 average exchange rates
 * and deflated to 2022 dollars with US CPI-U (see currencies.ts).
 *
 * Category 3 (fuel- and energy-related activities) has no inputs — it is derived from the
 * Scope 1 and Scope 2 data (see fuelFactors.ts).
 */

/** GHG Protocol Scope 3 categories supported by the calculator. */
export type Scope3CategoryKey =
  | 'cat1Purchased'
  | 'cat3FuelEnergy'
  | 'cat4Transport'
  | 'cat5Waste'
  | 'cat6Travel'
  | 'cat7Commuting';

export type Scope3FieldKey =
  | 'spendOfficeSupplies'
  | 'spendItHardware'
  | 'spendServices'
  | 'spendFoodCatering'
  | 'spendConstruction'
  | 'waterM3'
  | 'freightRoadTkm'
  | 'freightRailTkm'
  | 'freightSeaTkm'
  | 'freightAirTkm'
  | 'wasteLandfillTonnes'
  | 'wasteRecycledTonnes'
  | 'flightShortHaulKm'
  | 'flightLongHaulKm'
  | 'railKm'
  | 'carKm'
  | 'hotelNights'
  | 'commuteCarKm'
  | 'commutePublicTransportKm'
  | 'commuteRailKm';

export type Scope3Unit =
  | 'm3'
  | 'tonnes'
  | 'passengerKm'
  | 'km'
  | 'roomNights'
  | 'tonneKm'
  | 'currency';

export interface Scope3FieldDef {
  key: Scope3FieldKey;
  category: Scope3CategoryKey;
  unit: Scope3Unit;
  /** kg CO₂e per unit (per USD for unit 'currency'). */
  factor: number;
  emblem: string;
}

export const SCOPE3_ACTIVITY_DATASET_VERSION = '2026.4';

/** GHG Protocol category number (1–15) for display. */
export const SCOPE3_CATEGORY_NUMBER: Record<Scope3CategoryKey, number> = {
  cat1Purchased: 1,
  cat3FuelEnergy: 3,
  cat4Transport: 4,
  cat5Waste: 5,
  cat6Travel: 6,
  cat7Commuting: 7,
};

export const SCOPE3_CATEGORIES: Scope3CategoryKey[] = [
  'cat1Purchased',
  'cat3FuelEnergy',
  'cat4Transport',
  'cat5Waste',
  'cat6Travel',
  'cat7Commuting',
];

export const SCOPE3_FIELDS: Scope3FieldDef[] = [
  // Category 1 — Purchased goods & services. Spend: EPA v1.3, kg CO₂e per 2022 USD with margins.
  // NAICS 322230 Stationery product manufacturing
  { key: 'spendOfficeSupplies', category: 'cat1Purchased', unit: 'currency', factor: 0.296, emblem: '📎' },
  // NAICS 334111 Electronic computer manufacturing
  { key: 'spendItHardware', category: 'cat1Purchased', unit: 'currency', factor: 0.058, emblem: '💻' },
  // Mean of NAICS 541110 Lawyers (0.041), 541512 Computer systems design (0.089),
  // 541611 Management consulting (0.078)
  { key: 'spendServices', category: 'cat1Purchased', unit: 'currency', factor: 0.069, emblem: '💼' },
  // NAICS 722310 Food service contractors
  { key: 'spendFoodCatering', category: 'cat1Purchased', unit: 'currency', factor: 0.132, emblem: '🍽️' },
  // NAICS 236220 Commercial and institutional building construction
  { key: 'spendConstruction', category: 'cat1Purchased', unit: 'currency', factor: 0.224, emblem: '🧱' },
  // DESNZ Water supply 0.1913 + Water treatment 0.17088 (assumes water used is returned to sewer)
  { key: 'waterM3', category: 'cat1Purchased', unit: 'm3', factor: 0.36218, emblem: '💧' },
  // Category 4 — Upstream transportation & distribution (DESNZ Freighting goods)
  // HGV (all diesel), average non-refrigerated HGV, average laden
  { key: 'freightRoadTkm', category: 'cat4Transport', unit: 'tonneKm', factor: 0.10361, emblem: '🚚' },
  // Rail › Freight train
  { key: 'freightRailTkm', category: 'cat4Transport', unit: 'tonneKm', factor: 0.02584, emblem: '🚂' },
  // Cargo ship › Container ship › Average
  { key: 'freightSeaTkm', category: 'cat4Transport', unit: 'tonneKm', factor: 0.01613, emblem: '🚢' },
  // Freight flights › Long-haul, to/from UK › With RF
  { key: 'freightAirTkm', category: 'cat4Transport', unit: 'tonneKm', factor: 0.89957, emblem: '🛩️' },
  // Category 5 — Waste generated in operations (DESNZ Waste disposal › Commercial and industrial waste)
  { key: 'wasteLandfillTonnes', category: 'cat5Waste', unit: 'tonnes', factor: 520.58023, emblem: '🗑️' },
  // Closed-loop recycling
  { key: 'wasteRecycledTonnes', category: 'cat5Waste', unit: 'tonnes', factor: 4.65358, emblem: '♻️' },
  // Category 6 — Business travel
  // Flights › Short-haul, to/from UK › Average passenger › With RF
  { key: 'flightShortHaulKm', category: 'cat6Travel', unit: 'passengerKm', factor: 0.12789, emblem: '✈️' },
  // Flights › Long-haul, to/from UK › Average passenger › With RF
  { key: 'flightLongHaulKm', category: 'cat6Travel', unit: 'passengerKm', factor: 0.15286, emblem: '🌍' },
  // Rail › National rail
  { key: 'railKm', category: 'cat6Travel', unit: 'passengerKm', factor: 0.03093, emblem: '🚆' },
  // Passenger vehicles › Cars (by size) › Average car › Unknown fuel
  { key: 'carKm', category: 'cat6Travel', unit: 'km', factor: 0.16595, emblem: '🚙' },
  // Hotel stay › by country (see HOTEL_NIGHT_FACTORS); 10.4 = UK, used only as a placeholder
  { key: 'hotelNights', category: 'cat6Travel', unit: 'roomNights', factor: 10.4, emblem: '🏨' },
  // Category 7 — Employee commuting
  // Average car › Unknown fuel
  { key: 'commuteCarKm', category: 'cat7Commuting', unit: 'km', factor: 0.16595, emblem: '🚘' },
  // Bus › Average local bus
  {
    key: 'commutePublicTransportKm',
    category: 'cat7Commuting',
    unit: 'passengerKm',
    factor: 0.10153,
    emblem: '🚌',
  },
  // Rail › National rail
  { key: 'commuteRailKm', category: 'cat7Commuting', unit: 'passengerKm', factor: 0.03093, emblem: '🚇' },
];

export const SCOPE3_FACTOR_SOURCES =
  'UK Government (DESNZ) GHG conversion factors 2026 (activity; air with radiative forcing) · US EPA Supply Chain GHG Emission Factors v1.3 (spend, 2022 USD)';

/**
 * DESNZ 2026 Hotel stay, kg CO₂e per room-night, by country. Applied for the company's country
 * (most SME stays are domestic); countries not in the DESNZ list use the median of the list.
 */
export const HOTEL_NIGHT_FACTORS: Record<string, number> = {
  AE: 63.8, AU: 35.0, BE: 12.2, BR: 8.7, CA: 7.4, CH: 6.6, CL: 27.6, CN: 53.5, CO: 14.7, CR: 4.7,
  DE: 13.2, EG: 44.2, ES: 7.0, FR: 6.7, GB: 10.4, HK: 51.5, ID: 62.7, IN: 58.9, IT: 14.3, JO: 68.9,
  JP: 39.0, KR: 55.8, MV: 152.2, MX: 19.3, MY: 61.5, NL: 14.8, OM: 90.3, PH: 54.3, PT: 19.0,
  QA: 86.2, RU: 24.2, SA: 106.4, SG: 24.5, TH: 43.4, TR: 32.1, US: 16.1, VN: 38.5, ZA: 51.4,
};

export const HOTEL_NIGHT_FALLBACK = 33.5; // median of HOTEL_NIGHT_FACTORS

/** Factor for a Scope 3 line, resolving country-specific lines (hotel nights). */
export function scope3FactorFor(def: Scope3FieldDef, countryCode: string): number {
  if (def.key === 'hotelNights') {
    return HOTEL_NIGHT_FACTORS[(countryCode || '').toUpperCase()] ?? HOTEL_NIGHT_FALLBACK;
  }
  return def.factor;
}

export function getScope3Field(key: Scope3FieldKey): Scope3FieldDef {
  const def = SCOPE3_FIELDS.find((f) => f.key === key);
  if (!def) throw new Error(`Unknown Scope 3 field: ${key}`);
  return def;
}

export function getScope3FieldsForCategory(category: Scope3CategoryKey): Scope3FieldDef[] {
  return SCOPE3_FIELDS.filter((f) => f.category === category);
}
