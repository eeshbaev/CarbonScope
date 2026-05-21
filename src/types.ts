import type { InitiativeKey } from './data/initiatives';
import type { IndustryKey } from './data/industries';
import type {
  EvidenceChecklist,
  EvidenceItem,
  LineItemNotes,
  ReductionTarget,
} from './types/enterprise';
import {
  emptyScope1V2,
  emptyScope2V2,
  migrateScope1Inputs,
  migrateScope2Inputs,
  type Scope1InputsV2,
  type Scope2InputsV2,
} from './types/scopeInputs';
import { buildEvidenceSlotKey } from './utils/evidenceHelpers';

export type ReportingPeriod = '6_months' | '1_year';

export type Scope1Inputs = Scope1InputsV2;
export type Scope2Inputs = Scope2InputsV2;

export interface Assessment {
  id: string;
  companyName: string;
  countryCode: string;
  country: string;
  industry: IndustryKey;
  reportingPeriod: ReportingPeriod;
  /** ISO date YYYY-MM-DD */
  reportingStartDate: string;
  scope1: Scope1Inputs;
  scope2: Scope2Inputs;
  scope1Emissions: number;
  scope2Emissions: number;
  totalEmissions: number;
  electricityFactor: number;
  updatedAt: string;
  /** True when saved via Save progress only (not Calculate Results). */
  isDraft?: boolean;
  /** Set when user taps Calculate Results. */
  finalizedAt?: string;
  /** Optional user notes (max 100 words). */
  notes?: string;
  /** Up to 3 reduction initiatives selected on results. */
  selectedInitiatives?: InitiativeKey[];
  /** Local reminder for initiative follow-up (ISO datetime). */
  initiativeReminderAt?: string;
  /** Reduction target for gap-to-target reporting. */
  reductionTarget?: ReductionTarget;
  /** Attached bill photos / PDFs (paths under app documents). */
  evidence?: EvidenceItem[];
  evidenceChecklist?: EvidenceChecklist;
  lineItemNotes?: LineItemNotes;
  /** Consultant client label. */
  clientTag?: string;
  /** Workspace grouping id (default workspace if omitted). */
  workspaceId?: string;
  /** @deprecated legacy field */
  region?: string;
}

export interface AssessmentDraft {
  id?: string;
  companyName: string;
  countryCode: string;
  country: string;
  industry: IndustryKey | '';
  reportingPeriod: ReportingPeriod | '';
  reportingStartDate: string;
  scope1: Scope1Inputs;
  scope2: Scope2Inputs;
  notes: string;
  clientTag?: string;
}

export const emptyScope1 = emptyScope1V2;
export const emptyScope2 = emptyScope2V2;

/** Resolved period totals (L or kWh) used for emission calculations. */
export interface ResolvedScope1Totals {
  dieselLiters: number;
  petrolLiters: number;
  naturalGasKwh: number;
}

export interface ResolvedScope2Totals {
  electricityKwh: number;
}

export function normalizeScope1Inputs(raw: unknown): Scope1Inputs {
  return migrateScope1Inputs((raw ?? {}) as Parameters<typeof migrateScope1Inputs>[0]);
}

export function normalizeScope2Inputs(raw: unknown): Scope2Inputs {
  return migrateScope2Inputs((raw ?? {}) as Parameters<typeof migrateScope2Inputs>[0]);
}

export const emptyDraft = (): AssessmentDraft => ({
  companyName: '',
  countryCode: '',
  country: '',
  industry: '',
  reportingPeriod: '',
  reportingStartDate: '',
  scope1: emptyScope1(),
  scope2: emptyScope2(),
  notes: '',
  clientTag: '',
});

function coerceReportingPeriod(value: unknown): ReportingPeriod {
  if (value === '6_months') return '6_months';
  if (value === '1_year') return '1_year';
  return '1_year';
}

export function normalizeAssessment(raw: Assessment): Assessment {
  return {
    ...raw,
    countryCode: raw.countryCode ?? 'US',
    country: raw.country ?? raw.countryCode ?? '',
    industry: (raw.industry as IndustryKey) || 'other',
    reportingPeriod: coerceReportingPeriod(raw.reportingPeriod),
    reportingStartDate: raw.reportingStartDate ?? '',
    scope1: normalizeScope1Inputs(raw.scope1),
    scope2: normalizeScope2Inputs(raw.scope2),
    notes: typeof raw.notes === 'string' ? raw.notes : '',
    selectedInitiatives: Array.isArray(raw.selectedInitiatives)
      ? (raw.selectedInitiatives as InitiativeKey[])
      : undefined,
    initiativeReminderAt:
      typeof raw.initiativeReminderAt === 'string' ? raw.initiativeReminderAt : undefined,
    reductionTarget:
      raw.reductionTarget &&
      typeof raw.reductionTarget === 'object' &&
      (raw.reductionTarget as ReductionTarget).type &&
      typeof (raw.reductionTarget as ReductionTarget).value === 'number'
        ? (raw.reductionTarget as ReductionTarget)
        : undefined,
    evidence: Array.isArray(raw.evidence)
      ? (raw.evidence as EvidenceItem[]).map((item) => ({
          ...item,
          slotKey: item.slotKey ?? buildEvidenceSlotKey(item.category, item.monthKey),
        }))
      : undefined,
    evidenceChecklist:
      raw.evidenceChecklist && typeof raw.evidenceChecklist === 'object'
        ? (raw.evidenceChecklist as EvidenceChecklist)
        : undefined,
    lineItemNotes:
      raw.lineItemNotes && typeof raw.lineItemNotes === 'object'
        ? (raw.lineItemNotes as LineItemNotes)
        : undefined,
    clientTag: typeof raw.clientTag === 'string' ? raw.clientTag : undefined,
    workspaceId: typeof raw.workspaceId === 'string' ? raw.workspaceId : undefined,
    isDraft: raw.isDraft === true,
    finalizedAt: typeof raw.finalizedAt === 'string' ? raw.finalizedAt : undefined,
  };
}
