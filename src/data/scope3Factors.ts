/**
 * Scope 3 (value-chain) emission factors.
 *
 * Activity-based lines: kg CO₂e per unit, indicative averages based on the UK DESNZ/DEFRA
 * GHG conversion factors (2024 set), excluding radiative forcing.
 * Spend-based lines: kg CO₂e per USD (2022 USD, purchaser price), rounded indicative values
 * based on US EPA USEEIO v1.2 supply-chain factors. Spend in other currencies is converted with
 * the rates in currencies.ts; inflation since 2022 is not adjusted.
 * Category 3 (fuel- and energy-related activities) has no inputs — it is derived from the
 * Scope 1 and Scope 2 data (see fuelFactors.ts).
 *
 * Values are intended for SME screening inventories; verify before regulated disclosure.
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
  | 'spendOtherGoods'
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
  | 'commutePublicTransportKm';

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

export const SCOPE3_ACTIVITY_DATASET_VERSION = '2026.2';

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
  // Category 1 — Purchased goods & services (spend-based + water)
  { key: 'spendOfficeSupplies', category: 'cat1Purchased', unit: 'currency', factor: 0.35, emblem: '📎' },
  { key: 'spendItHardware', category: 'cat1Purchased', unit: 'currency', factor: 0.2, emblem: '💻' },
  { key: 'spendServices', category: 'cat1Purchased', unit: 'currency', factor: 0.1, emblem: '💼' },
  { key: 'spendFoodCatering', category: 'cat1Purchased', unit: 'currency', factor: 0.55, emblem: '🍽️' },
  { key: 'spendConstruction', category: 'cat1Purchased', unit: 'currency', factor: 0.45, emblem: '🧱' },
  { key: 'spendOtherGoods', category: 'cat1Purchased', unit: 'currency', factor: 0.35, emblem: '📦' },
  { key: 'waterM3', category: 'cat1Purchased', unit: 'm3', factor: 0.45, emblem: '💧' },
  // Category 4 — Upstream transportation & distribution (paid-for inbound freight)
  { key: 'freightRoadTkm', category: 'cat4Transport', unit: 'tonneKm', factor: 0.107, emblem: '🚚' },
  { key: 'freightRailTkm', category: 'cat4Transport', unit: 'tonneKm', factor: 0.028, emblem: '🚂' },
  { key: 'freightSeaTkm', category: 'cat4Transport', unit: 'tonneKm', factor: 0.016, emblem: '🚢' },
  { key: 'freightAirTkm', category: 'cat4Transport', unit: 'tonneKm', factor: 0.6, emblem: '🛩️' },
  // Category 5 — Waste generated in operations
  { key: 'wasteLandfillTonnes', category: 'cat5Waste', unit: 'tonnes', factor: 500, emblem: '🗑️' },
  { key: 'wasteRecycledTonnes', category: 'cat5Waste', unit: 'tonnes', factor: 21, emblem: '♻️' },
  // Category 6 — Business travel
  { key: 'flightShortHaulKm', category: 'cat6Travel', unit: 'passengerKm', factor: 0.154, emblem: '✈️' },
  { key: 'flightLongHaulKm', category: 'cat6Travel', unit: 'passengerKm', factor: 0.193, emblem: '🌍' },
  { key: 'railKm', category: 'cat6Travel', unit: 'passengerKm', factor: 0.035, emblem: '🚆' },
  { key: 'carKm', category: 'cat6Travel', unit: 'km', factor: 0.17, emblem: '🚙' },
  { key: 'hotelNights', category: 'cat6Travel', unit: 'roomNights', factor: 10.4, emblem: '🏨' },
  // Category 7 — Employee commuting
  { key: 'commuteCarKm', category: 'cat7Commuting', unit: 'km', factor: 0.17, emblem: '🚘' },
  {
    key: 'commutePublicTransportKm',
    category: 'cat7Commuting',
    unit: 'passengerKm',
    factor: 0.08,
    emblem: '🚌',
  },
];

export const SCOPE3_FACTOR_SOURCES =
  'DESNZ/DEFRA GHG conversion factors 2024 (activity, excl. radiative forcing) · US EPA USEEIO v1.2 (spend, 2022 USD)';

export function getScope3Field(key: Scope3FieldKey): Scope3FieldDef {
  const def = SCOPE3_FIELDS.find((f) => f.key === key);
  if (!def) throw new Error(`Unknown Scope 3 field: ${key}`);
  return def;
}

export function getScope3FieldsForCategory(category: Scope3CategoryKey): Scope3FieldDef[] {
  return SCOPE3_FIELDS.filter((f) => f.category === category);
}
