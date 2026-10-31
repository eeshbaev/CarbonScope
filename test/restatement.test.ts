import assert from 'node:assert/strict';
import { test } from 'node:test';
import { buildAssessment, currentFactorStamp, factorStamp } from '../src/calculations';
import { emptyDraft, normalizeAssessment, type Assessment } from '../src/types';
import { buildRestatement } from '../src/utils/restatement';
import { outdatedAssessments, recalculateAll } from '../src/utils/recalculateAll';

/** A finalized UK report as saved by v1.0 (old factors, no version stamps). */
function legacy(): Assessment {
  return normalizeAssessment({
    id: 'old', companyName: 'Acme', countryCode: 'GB', country: 'United Kingdom', industry: 'consulting',
    reportingPeriod: '1_year', reportingStartDate: '2024-01-01',
    scope1: { diesel: { useMonthly: false, total: 1000, monthly: {} } },
    scope2: { electricity: { useMonthly: false, total: 50000, monthly: {} } },
    scope1Emissions: 2.68, scope2Emissions: 10.5, totalEmissions: 13.18, electricityFactor: 0.21,
    updatedAt: '2025-01-01T00:00:00Z', isDraft: false, finalizedAt: '2025-01-01T00:00:00Z', notes: '',
  } as unknown as Assessment);
}

test('legacy reports are detected as using older factors', () => {
  assert.notEqual(factorStamp(legacy()), currentFactorStamp());
  assert.equal(outdatedAssessments([legacy()]).length, 1);
});

test('bulk recalculation restates with factor effect only, keeping status and dates', () => {
  const { next, changed } = recalculateAll([legacy()]);
  const a = next[0];
  assert.equal(changed, 1);
  assert.equal(factorStamp(a), currentFactorStamp());
  assert.equal(a.finalizedAt, '2025-01-01T00:00:00Z');
  assert.equal(a.isDraft, false);
  assert.ok(a.restatement);
  assert.equal(a.restatement!.previousTotal, 13.18);
  assert.ok(Math.abs(a.restatement!.activityEffect) < 1e-9);
  assert.ok(Math.abs(a.totalEmissions - 13.18 - a.restatement!.factorEffect) < 1e-9);
  // A second run changes nothing.
  assert.equal(recalculateAll(next).changed, 0);
});

test('editing activity data separates factor and activity effects', () => {
  const old = legacy();
  const d = emptyDraft();
  Object.assign(d, { companyName: 'Acme', countryCode: 'GB', reportingPeriod: '1_year', reportingStartDate: '2024-01-01' });
  d.scope1.diesel.total = 1000;
  d.scope2.electricity.total = 60000; // +10,000 kWh
  const built = buildAssessment(d, 'old', { finalize: true });
  const merged = built;
  const r = buildRestatement(old, built)!;
  assert.ok(Math.abs(r.activityEffect - (10000 * 0.131) / 1000) < 1e-9);
  assert.ok(Math.abs(r.previousTotal + r.factorEffect + r.activityEffect - merged.totalEmissions) < 1e-9);
});
