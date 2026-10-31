import type { Scope3FieldKey } from './scope3Factors';

/** Emission line keys shown in inputs, results, and quick edit (Scope 1, 2 and 3). */
export type EmissionCategoryKey =
  | 'diesel'
  | 'petrol'
  | 'naturalGas'
  | 'electricity'
  | 'lpg'
  | 'heatingOil'
  | 'coal'
  | 'biodiesel'
  | 'bioethanol'
  | 'woodPellets'
  | 'biomethane'
  | 'refrigerants'
  | 'evKm'
  | 'districtHeat'
  | 'steam'
  | 'districtCooling'
  | Scope3FieldKey;

/**
 * Plain-text label for pickers, PDFs and notifications. Icons are drawn by `CategoryIcon`
 * (line icons), so text labels no longer carry emoji.
 */
export function formatCategoryLabel(label: string, _category: EmissionCategoryKey): string {
  return label;
}
