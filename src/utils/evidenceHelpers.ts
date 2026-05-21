import type { EvidenceCategory, EvidenceItem } from '../types/enterprise';

export function buildEvidenceSlotKey(category: EvidenceCategory, monthKey?: string): string {
  return monthKey ? `${category}::${monthKey}` : category;
}

export function itemSlotKey(item: EvidenceItem): string {
  return item.slotKey ?? buildEvidenceSlotKey(item.category, item.monthKey);
}

export function matchesSlot(
  item: EvidenceItem,
  category: EvidenceCategory,
  monthKey?: string
): boolean {
  return itemSlotKey(item) === buildEvidenceSlotKey(category, monthKey);
}

/** Period-level attachments have no monthKey; monthly rows filter by month key. */
export function filterEvidence(
  items: EvidenceItem[] | undefined,
  category: EvidenceCategory,
  monthKey?: string
): EvidenceItem[] {
  return (items ?? []).filter((item) => matchesSlot(item, category, monthKey));
}

/** At most one document per category (and per month when monthly). */
export function getEvidenceForSlot(
  items: EvidenceItem[] | undefined,
  category: EvidenceCategory,
  monthKey?: string
): EvidenceItem | undefined {
  return filterEvidence(items, category, monthKey)[0];
}

export function isSameEvidenceSlot(
  item: EvidenceItem,
  category: EvidenceCategory,
  monthKey?: string
): boolean {
  return matchesSlot(item, category, monthKey);
}

export function mergeEvidenceItems(
  ...lists: (EvidenceItem[] | undefined)[]
): EvidenceItem[] {
  const bySlot = new Map<string, EvidenceItem>();
  for (const list of lists) {
    for (const item of list ?? []) {
      bySlot.set(itemSlotKey(item), item);
    }
  }
  return [...bySlot.values()];
}

export function hasEvidenceInSlot(
  items: EvidenceItem[] | undefined,
  category: EvidenceCategory,
  monthKey?: string
): boolean {
  return getEvidenceForSlot(items, category, monthKey) !== undefined;
}
