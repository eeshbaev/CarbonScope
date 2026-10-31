export type ReductionTargetType = 'percent' | 'absolute';

export interface ReductionTarget {
  type: ReductionTargetType;
  /** Percent reduction from baseline, or absolute cap in tCO₂e for the period. */
  value: number;
  /** Calendar year the target applies to (optional). */
  year?: number;
}

export type EvidenceCategory =
  | 'electricity'
  | 'diesel'
  | 'petrol'
  | 'gas'
  | 'lpg'
  | 'heatingOil'
  | 'coal'
  | 'biodiesel'
  | 'bioethanol'
  | 'biomethane'
  | 'woodPellets'
  | 'refrigerants'
  | 'ev'
  | 'heat'
  | 'steam'
  | 'cooling'
  | 'general';

export interface EvidenceItem {
  id: string;
  fileName: string;
  mimeType: string;
  storagePath: string;
  category: EvidenceCategory;
  /** Unique slot: category, or category::YYYY-MM for monthly rows. */
  slotKey: string;
  /** Reporting month key (YYYY-MM) when attached from a monthly row. */
  monthKey?: string;
  uploadedAt: string;
}

export type EvidenceChecklistKey =
  | 'electricityBills'
  | 'fuelInvoices'
  | 'periodDates';

export type EvidenceChecklist = Partial<Record<EvidenceChecklistKey, boolean>>;

export type LineItemNoteKey = 'diesel' | 'petrol' | 'naturalGas' | 'electricity';

export type LineItemNotes = Partial<Record<LineItemNoteKey, string>>;

export type MethodologyLogAction = 'finalized' | 'recalculated' | 'saved';

export interface MethodologyLogEntry {
  id: string;
  assessmentId: string;
  companyName: string;
  timestamp: string;
  action: MethodologyLogAction;
  factorVersion: string;
  factorYear: string;
  /** Fuel / refrigerant / Scope 3 factor dataset (absent on pre-2026.2 entries). */
  fuelFactorVersion?: string;
  electricityFactor: number;
  customFactor: boolean;
  appVersion: string;
}
