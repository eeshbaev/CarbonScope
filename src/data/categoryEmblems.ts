/** Scope 1 & 2 emission line keys shown in inputs, results, and quick edit. */
export type EmissionCategoryKey = 'diesel' | 'petrol' | 'naturalGas' | 'electricity';

const EMBLEMS: Record<EmissionCategoryKey, string> = {
  diesel: '⛽',
  petrol: '🚗',
  naturalGas: '🔥',
  electricity: '⚡',
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
