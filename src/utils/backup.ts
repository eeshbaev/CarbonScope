import { factorStamp, formatEmissions } from '../calculations';
import { normalizeAssessment, type Assessment } from '../types';
import type { MethodologyLogEntry } from '../types/enterprise';

/**
 * Backup file format. Everything a user would lose by uninstalling: reports, methodology log and
 * custom grid factors. Evidence files (photos/PDFs) are not embedded — use the evidence pack.
 */
export interface BackupFile {
  app: 'CarbonScope';
  format: 1;
  exportedAt: string;
  assessments: Assessment[];
  methodologyLog: MethodologyLogEntry[];
  customFactors: Record<string, number>;
}

export function buildBackup(input: {
  assessments: Assessment[];
  methodologyLog: MethodologyLogEntry[];
  customFactors: Record<string, number>;
  now?: Date;
}): BackupFile {
  return {
    app: 'CarbonScope',
    format: 1,
    exportedAt: (input.now ?? new Date()).toISOString(),
    // Evidence paths point into this device's storage; they are meaningless elsewhere.
    assessments: input.assessments.map((a) => ({ ...a, evidence: undefined })),
    methodologyLog: input.methodologyLog,
    customFactors: input.customFactors,
  };
}

export class BackupError extends Error {}

/** Validate and normalise a backup file’s JSON. Throws BackupError with a user-safe reason. */
export function parseBackup(json: string): BackupFile {
  let data: unknown;
  try {
    data = JSON.parse(json);
  } catch {
    throw new BackupError('not-json');
  }
  const b = data as Partial<BackupFile>;
  if (!b || b.app !== 'CarbonScope' || b.format !== 1 || !Array.isArray(b.assessments)) {
    throw new BackupError('not-a-backup');
  }
  const assessments = b.assessments
    .filter((a): a is Assessment => !!a && typeof a === 'object' && typeof (a as Assessment).id === 'string')
    .map((a) => normalizeAssessment(a));
  const customFactors: Record<string, number> = {};
  for (const [k, v] of Object.entries(b.customFactors ?? {})) {
    if (/^[A-Z]{2}$/.test(k) && typeof v === 'number' && v > 0 && v < 5) customFactors[k] = v;
  }
  return {
    app: 'CarbonScope',
    format: 1,
    exportedAt: typeof b.exportedAt === 'string' ? b.exportedAt : '',
    assessments,
    methodologyLog: Array.isArray(b.methodologyLog) ? b.methodologyLog : [],
    customFactors,
  };
}

/**
 * Merge a backup into the current data: reports are matched by id and the most recently updated
 * version wins; nothing local is deleted. Log entries are de-duplicated by id.
 */
export function mergeBackup(
  current: { assessments: Assessment[]; methodologyLog: MethodologyLogEntry[]; customFactors: Record<string, number> },
  backup: BackupFile
): { assessments: Assessment[]; methodologyLog: MethodologyLogEntry[]; customFactors: Record<string, number>; added: number; updated: number } {
  const byId = new Map(current.assessments.map((a) => [a.id, a]));
  let added = 0;
  let updated = 0;
  for (const a of backup.assessments) {
    const existing = byId.get(a.id);
    if (!existing) {
      byId.set(a.id, a);
      added += 1;
    } else if (new Date(a.updatedAt).getTime() > new Date(existing.updatedAt).getTime()) {
      byId.set(a.id, { ...a, evidence: existing.evidence });
      updated += 1;
    }
  }
  const logIds = new Set(current.methodologyLog.map((e) => e.id));
  const methodologyLog = [
    ...current.methodologyLog,
    ...backup.methodologyLog.filter((e) => e && typeof e.id === 'string' && !logIds.has(e.id)),
  ].sort((x, y) => new Date(y.timestamp).getTime() - new Date(x.timestamp).getTime());
  return {
    assessments: [...byId.values()],
    methodologyLog,
    customFactors: { ...backup.customFactors, ...current.customFactors },
    added,
    updated,
  };
}

function csvCell(v: string | number | undefined): string {
  const s = v == null ? '' : String(v);
  return /[",\n;]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

/** One row per report — for spreadsheets and auditors. Numbers in tCO₂e, dot decimal. */
export function assessmentsToCsv(assessments: Assessment[]): string {
  const header = [
    'company', 'client', 'country', 'industry', 'period', 'start_date', 'status',
    'scope1_tco2e', 'scope2_location_tco2e', 'scope2_market_tco2e', 'scope3_tco2e', 'total_tco2e',
    'biogenic_co2_t', 'grid_factor_kg_per_kwh', 'boundary', 'equity_share_pct',
    'employees', 'revenue', 'floor_area_m2', 'factor_datasets', 'updated_at',
  ];
  const n = (v: number | undefined) => (v == null ? '' : formatEmissions(v));
  const rows = assessments.map((a) =>
    [
      a.companyName, a.clientTag, a.countryCode, a.industry, a.reportingPeriod, a.reportingStartDate,
      a.isDraft ? 'draft' : 'final',
      n(a.scope1Emissions), n(a.scope2Emissions), n(a.scope2MarketEmissions), n(a.scope3Emissions),
      n(a.totalEmissions), n(a.biogenicCo2), a.electricityFactor,
      a.boundary?.approach ?? 'operational', a.boundary?.equitySharePct,
      a.profile?.employees, a.profile?.revenue, a.profile?.floorAreaM2,
      factorStamp(a), a.updatedAt,
    ]
      .map(csvCell)
      .join(',')
  );
  return [header.join(','), ...rows].join('\n');
}
