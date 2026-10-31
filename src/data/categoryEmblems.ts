import { SCOPE3_FIELDS, type Scope3FieldKey } from './scope3Factors';

/** Emission line keys shown in inputs, results, and quick edit (Scope 1, 2 and 3). */
export type EmissionCategoryKey =
  | 'diesel'
  | 'petrol'
  | 'naturalGas'
  | 'electricity'
  | 'lpg'
  | 'heatingOil'
  | 'coal'
  | 'refrigerants'
  | 'evKm'
  | 'districtHeat'
  | 'steam'
  | 'districtCooling'
  | Scope3FieldKey;

const EMBLEMS: Record<EmissionCategoryKey, string> = {
  diesel: '⛽',
  petrol: '🚗',
  naturalGas: '🔥',
  electricity: '⚡',
  lpg: '🧯',
  heatingOil: '🛢️',
  coal: '⛏️',
  refrigerants: '❄️',
  evKm: '🔌',
  districtHeat: '♨️',
  steam: '💨',
  districtCooling: '🧊',
  ...(Object.fromEntries(SCOPE3_FIELDS.map((f) => [f.key, f.emblem])) as Record<
    Scope3FieldKey,
    string
  >),
};

export function getCategoryEmblem(category: EmissionCategoryKey): string {
  return EMBLEMS[category];
}

/** Prefix label with category emblem (pickers, PDF, plain Text). */
export function formatCategoryLabel(label: string, category: EmissionCategoryKey): string {
  return `${getCategoryEmblem(category)}  ${label}`;
}

export function isEmissionCategoryKey(key: string): key is EmissionCategoryKey {
  return key in EMBLEMS;
}
