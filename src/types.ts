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
  emptyScope3,
  migrateScope1Inputs,
  migrateScope2Inputs,
  migrateScope3Inputs,
  type Scope1InputsV2,
  type Scope2InputsV2,
  type Scope3Inputs,
} from './types/scopeInputs';
import { buildEvidenceSlotKey } from './utils/evidenceHelpers';

export type ReportingPeriod = '6_months' | '1_year';

export type Scope1Inputs = Scope1InputsV2;
export type Scope2Inputs = Scope2InputsV2;
export type { Scope3Inputs };

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
  /** Optional value-chain activity data (all zero when Scope 3 is not reported). */
  scope3: Scope3Inputs;
  scope1Emissions: number;
  scope2Emissions: number;
  scope3Emissions: number;
  /** Market-based Scope 2 (reported alongside the location-based figure). */
  scope2MarketEmissions: number;
  /** Scope 1 split by greenhouse gas at calculation time (tCO₂e). */
  scope1ByGas?: { co2: number; ch4: number; n2o: number; hfc: number; bioNonCo2?: number };
  /** Biogenic CO₂ from biofuels (tCO₂), reported outside the scopes. */
  biogenicCo2?: number;
  /** Scope 1 + location-based Scope 2 + Scope 3. */
  totalEmissions: number;
  /** Location-based grid factor applied (kg CO₂e/kWh). */
  electricityFactor: number;
  /** Fuel / refrigerant factor dataset version used (absent = pre-2026.2 data). */
  fuelFactorVersion?: string;
  /** Grid electricity factor dataset version used (absent = pre-2026.4 data). */
  gridFactorVersion?: string;
  /** Set when a finalized report was recalculated with different factor datasets. */
  restatement?: Restatement;
  profile?: CompanyProfile;
  boundary?: Boundary;
  dataQuality?: Record<string, DataQuality>;
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

/** Optional company size data for intensity metrics (asked when the user opens them). */
export interface CompanyProfile {
  employees?: number;
  /** Revenue for the reporting period, in the report’s spend currency. */
  revenue?: number;
  floorAreaM2?: number;
}

/** GHG Protocol organisational boundary. */
export type BoundaryApproach = 'operational' | 'financial' | 'equity';
export interface Boundary {
  approach: BoundaryApproach;
  /** Equity share approach: % of this entity’s emissions reported (0–100). */
  equitySharePct?: number;
}

/** How the activity data for a line was obtained. */
export type DataQuality = 'measured' | 'invoice' | 'estimated';

export interface Restatement {
  /** Total before recalculation (tCO₂e). */
  previousTotal: number;
  /** Factor datasets of the previous result, e.g. "grid 2026.1 · fuels 2026.1". */
  previousStamp: string;
  /** Change caused by updated emission factors alone (old activity data, new factors). */
  factorEffect: number;
  /** Change caused by edited activity data (new data, new factors). */
  activityEffect: number;
  at: string;
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
  scope3: Scope3Inputs;
  notes: string;
  clientTag?: string;
  profile?: CompanyProfile;
  boundary?: Boundary;
  /** Per-line data quality (line key → quality). Missing = default for the line. */
  dataQuality?: Record<string, DataQuality>;
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
  return migrateScope1Inputs(raw);
}

export function normalizeScope2Inputs(raw: unknown): Scope2Inputs {
  return migrateScope2Inputs(raw);
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
  scope3: emptyScope3(),
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
    scope3: migrateScope3Inputs(raw.scope3),
    scope3Emissions:
      typeof raw.scope3Emissions === 'number' && Number.isFinite(raw.scope3Emissions)
        ? raw.scope3Emissions
        : 0,
    // Older reports had electricity only and no instruments: market = location.
    scope2MarketEmissions:
      typeof raw.scope2MarketEmissions === 'number' && Number.isFinite(raw.scope2MarketEmissions)
        ? raw.scope2MarketEmissions
        : raw.scope2Emissions ?? 0,
    scope1ByGas:
      raw.scope1ByGas && typeof raw.scope1ByGas === 'object' ? raw.scope1ByGas : undefined,
    biogenicCo2: typeof raw.biogenicCo2 === 'number' ? raw.biogenicCo2 : undefined,
    fuelFactorVersion:
      typeof raw.fuelFactorVersion === 'string' ? raw.fuelFactorVersion : undefined,
    gridFactorVersion:
      typeof raw.gridFactorVersion === 'string' ? raw.gridFactorVersion : undefined,
    restatement:
      raw.restatement && typeof raw.restatement === 'object' ? raw.restatement : undefined,
    profile: sanitizeProfile(raw.profile),
    boundary: sanitizeBoundary(raw.boundary),
    dataQuality: sanitizeQuality(raw.dataQuality),
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

function positiveOrUndefined(v: unknown): number | undefined {
  return typeof v === 'number' && Number.isFinite(v) && v > 0 ? v : undefined;
}

export function sanitizeProfile(raw: unknown): CompanyProfile | undefined {
  if (!raw || typeof raw !== 'object') return undefined;
  const p = raw as CompanyProfile;
  const out: CompanyProfile = {
    employees: positiveOrUndefined(p.employees),
    revenue: positiveOrUndefined(p.revenue),
    floorAreaM2: positiveOrUndefined(p.floorAreaM2),
  };
  return out.employees || out.revenue || out.floorAreaM2 ? out : undefined;
}

export function sanitizeBoundary(raw: unknown): Boundary | undefined {
  if (!raw || typeof raw !== 'object') return undefined;
  const b = raw as Boundary;
  if (b.approach !== 'operational' && b.approach !== 'financial' && b.approach !== 'equity') return undefined;
  if (b.approach !== 'equity') return { approach: b.approach };
  const pct = typeof b.equitySharePct === 'number' ? Math.min(Math.max(b.equitySharePct, 0), 100) : 100;
  return { approach: 'equity', equitySharePct: pct };
}

function sanitizeQuality(raw: unknown): Record<string, DataQuality> | undefined {
  if (!raw || typeof raw !== 'object') return undefined;
  const out: Record<string, DataQuality> = {};
  for (const [k, v] of Object.entries(raw as Record<string, unknown>)) {
    if (v === 'measured' || v === 'invoice' || v === 'estimated') out[k] = v;
  }
  return Object.keys(out).length ? out : undefined;
}

/** Share of the entity’s emissions included in the report (equity share approach), 0–1. */
export function boundaryShare(boundary: Boundary | undefined): number {
  if (!boundary || boundary.approach !== 'equity') return 1;
  return Math.min(Math.max((boundary.equitySharePct ?? 100) / 100, 0), 1);
}
