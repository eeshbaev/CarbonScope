/**
 * Scope 3 (value-chain) activity-based emission factors, kg CO₂e per unit.
 *
 * Indicative averages based on the UK DESNZ/DEFRA GHG conversion factors (2024 set),
 * excluding radiative forcing and well-to-tank uplifts. Values are rounded and intended
 * for SME screening inventories; verify against national guidance before regulated
 * disclosure.
 */

/** GHG Protocol Scope 3 categories supported by the calculator. */
export type Scope3CategoryKey = 'cat1Water' | 'cat5Waste' | 'cat6Travel' | 'cat7Commuting';

export type Scope3FieldKey =
  | 'waterM3'
  | 'wasteLandfillTonnes'
  | 'wasteRecycledTonnes'
  | 'flightShortHaulKm'
  | 'flightLongHaulKm'
  | 'railKm'
  | 'carKm'
  | 'hotelNights'
  | 'commuteCarKm'
  | 'commutePublicTransportKm';

export type Scope3Unit = 'm3' | 'tonnes' | 'passengerKm' | 'km' | 'roomNights';

export interface Scope3FieldDef {
  key: Scope3FieldKey;
  category: Scope3CategoryKey;
  unit: Scope3Unit;
  /** kg CO₂e per unit. */
  factor: number;
  emblem: string;
}

/** GHG Protocol category number (1–15) for display. */
export const SCOPE3_CATEGORY_NUMBER: Record<Scope3CategoryKey, number> = {
  cat1Water: 1,
  cat5Waste: 5,
  cat6Travel: 6,
  cat7Commuting: 7,
};

export const SCOPE3_CATEGORIES: Scope3CategoryKey[] = [
  'cat6Travel',
  'cat7Commuting',
  'cat5Waste',
  'cat1Water',
];

export const SCOPE3_FIELDS: Scope3FieldDef[] = [
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
  // Category 5 — Waste generated in operations
  { key: 'wasteLandfillTonnes', category: 'cat5Waste', unit: 'tonnes', factor: 500, emblem: '🗑️' },
  { key: 'wasteRecycledTonnes', category: 'cat5Waste', unit: 'tonnes', factor: 21, emblem: '♻️' },
  // Category 1 — Purchased goods & services (water supply + treatment)
  { key: 'waterM3', category: 'cat1Water', unit: 'm3', factor: 0.45, emblem: '💧' },
];

export const SCOPE3_FACTOR_SOURCES =
  'DESNZ/DEFRA GHG conversion factors 2024 (indicative averages, excl. radiative forcing)';

export function getScope3Field(key: Scope3FieldKey): Scope3FieldDef {
  const def = SCOPE3_FIELDS.find((f) => f.key === key);
  if (!def) throw new Error(`Unknown Scope 3 field: ${key}`);
  return def;
}

export function getScope3FieldsForCategory(category: Scope3CategoryKey): Scope3FieldDef[] {
  return SCOPE3_FIELDS.filter((f) => f.category === category);
}
