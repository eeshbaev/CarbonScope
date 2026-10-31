import assert from 'node:assert/strict';
import { test } from 'node:test';
import { buildAssessment } from '../src/calculations';
import { emptyDraft } from '../src/types';
import { dataQualitySummary, intensityMetrics } from '../src/utils/reportMetrics';

function report() {
  const d = emptyDraft();
  Object.assign(d, { companyName: 'Acme', countryCode: 'GB', reportingPeriod: '1_year', reportingStartDate: '2025-01-01' });
  d.scope1.diesel.total = 1000;
  d.scope2.electricity.total = 10000;
  d.scope3.spendServices = 100000;
  d.profile = { employees: 10, revenue: 2_000_000, floorAreaM2: 500 };
  d.dataQuality = { electricity: 'measured' };
  return buildAssessment(d, 'x', { finalize: true });
}

test('intensity metrics', () => {
  const a = report();
  const m = intensityMetrics(a);
  assert.ok(Math.abs(m.perEmployee! - a.totalEmissions / 10) < 1e-9);
  assert.ok(Math.abs(m.perMillionRevenue! - a.totalEmissions / 2) < 1e-9);
  assert.ok(Math.abs(m.kgPerM2! - (a.totalEmissions * 1000) / 500) < 1e-9);
});

test('data quality summary splits the total; spend defaults to estimated', () => {
  const a = report();
  const q = dataQualitySummary(a);
  assert.ok(Math.abs(q.total - a.totalEmissions) < 1e-9);
  assert.ok(Math.abs(q.measured - (10000 * 0.131) / 1000) < 1e-9);
  assert.ok(q.estimated > 0);
});
