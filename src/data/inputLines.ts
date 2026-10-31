import type { AssessmentDraft } from '../types';
import type { EvidenceCategory } from '../types/enterprise';
import type { CategoryInput, Scope1FieldKey, Scope2FieldKey } from '../types/scopeInputs';
import type { UnitKind } from '../units';
import type { InputHintField } from '../i18n/packs/inputHints/types';
import { SCOPE1_FUELS } from './fuelFactors';

/** Every monthly-capable activity line on the Scope 1 and Scope 2 screens. */
export type CategoryLineKey = Scope1FieldKey | Scope2FieldKey;

export interface CategoryLineDef {
  key: CategoryLineKey;
  scope: 1 | 2;
  kind: UnitKind;
  evidence: EvidenceCategory;
  /** Industry-specific hint available in the input-hint packs (original v1 lines only). */
  hintField?: InputHintField;
}

export const CATEGORY_LINES: CategoryLineDef[] = [
  { key: 'diesel', scope: 1, kind: 'fuel', evidence: 'diesel', hintField: 'diesel' },
  { key: 'petrol', scope: 1, kind: 'fuel', evidence: 'petrol', hintField: 'petrol' },
  { key: 'naturalGas', scope: 1, kind: 'gas', evidence: 'gas', hintField: 'naturalGas' },
  { key: 'lpg', scope: 1, kind: 'fuel', evidence: 'lpg' },
  { key: 'heatingOil', scope: 1, kind: 'fuel', evidence: 'heatingOil' },
  { key: 'coal', scope: 1, kind: 'mass', evidence: 'coal' },
  { key: 'biodiesel', scope: 1, kind: 'fuel', evidence: 'biodiesel' },
  { key: 'bioethanol', scope: 1, kind: 'fuel', evidence: 'bioethanol' },
  { key: 'biomethane', scope: 1, kind: 'mass', evidence: 'biomethane' },
  { key: 'woodPellets', scope: 1, kind: 'mass', evidence: 'woodPellets' },
  {
    key: 'electricity',
    scope: 2,
    kind: 'electricity',
    evidence: 'electricity',
    hintField: 'electricity',
  },
  { key: 'evKm', scope: 2, kind: 'distance', evidence: 'ev' },
  { key: 'districtHeat', scope: 2, kind: 'electricity', evidence: 'heat' },
  { key: 'steam', scope: 2, kind: 'electricity', evidence: 'steam' },
  { key: 'districtCooling', scope: 2, kind: 'electricity', evidence: 'cooling' },
];

export function getCategoryLine(key: CategoryLineKey): CategoryLineDef {
  const def = CATEGORY_LINES.find((l) => l.key === key);
  if (!def) throw new Error(`Unknown line ${key}`);
  return def;
}

export function isScope1Line(key: CategoryLineKey): key is Scope1FieldKey {
  return (SCOPE1_FUELS as string[]).includes(key);
}

export function getLineInput(
  d: Pick<AssessmentDraft, 'scope1' | 'scope2'>,
  key: CategoryLineKey
): CategoryInput {
  return isScope1Line(key) ? d.scope1[key] : d.scope2[key];
}

export function setLineInput<T extends Pick<AssessmentDraft, 'scope1' | 'scope2'>>(
  d: T,
  key: CategoryLineKey,
  next: CategoryInput
): T {
  if (isScope1Line(key)) return { ...d, scope1: { ...d.scope1, [key]: next } };
  return { ...d, scope2: { ...d.scope2, [key]: next } };
}
