import { computeAssessmentEmissions } from '../calculations';
import { SCOPE3_FIELDS } from '../data/scope3Factors';
import type { Assessment, DataQuality } from '../types';

/** Default quality when the user has not set one: spend-based lines are estimates. */
export function defaultQuality(lineKey: string): DataQuality {
  const field = SCOPE3_FIELDS.find((f) => f.key === lineKey);
  if (field?.unit === 'currency') return 'estimated';
  return 'invoice';
}

export function qualityOf(a: Pick<Assessment, 'dataQuality'>, lineKey: string): DataQuality {
  return a.dataQuality?.[lineKey] ?? defaultQuality(lineKey);
}

/** Share of the total (tCO₂e) by data quality, from per-line emissions. */
export function dataQualitySummary(a: Assessment): Record<DataQuality, number> & { total: number } {
  const e = computeAssessmentEmissions(a);
  const out = { measured: 0, invoice: 0, estimated: 0 };
  const add = (key: string, t: number) => {
    if (t > 0) out[qualityOf(a, key)] += t;
  };
  for (const [k, v] of Object.entries(e.scope1ByLine)) add(k, v);
  for (const [k, v] of Object.entries(e.scope2ByLine)) add(k, v);
  for (const [k, v] of Object.entries(e.scope3ByField)) add(k, v);
  // Category 3 is derived from other lines: always an estimate.
  out.estimated += e.scope3ByCategory.cat3FuelEnergy;
  return { ...out, total: out.measured + out.invoice + out.estimated };
}

export interface IntensityMetrics {
  perEmployee?: number;
  /** tCO₂e per million units of revenue (report currency). */
  perMillionRevenue?: number;
  /** kg CO₂e per m² of floor area. */
  kgPerM2?: number;
}

export function intensityMetrics(a: Assessment): IntensityMetrics {
  const p = a.profile;
  if (!p) return {};
  const t = a.totalEmissions;
  return {
    perEmployee: p.employees ? t / p.employees : undefined,
    perMillionRevenue: p.revenue ? t / (p.revenue / 1_000_000) : undefined,
    kgPerM2: p.floorAreaM2 ? (t * 1000) / p.floorAreaM2 : undefined,
  };
}
