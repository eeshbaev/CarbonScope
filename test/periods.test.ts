import assert from 'node:assert/strict';
import { test } from 'node:test';
import { buildAssessment } from '../src/calculations';
import { emptyDraft, type Assessment } from '../src/types';
import {
  buildComparisonInsights,
  findBaseAssessment,
  findPriorFinalizedAssessment,
} from '../src/utils/assessmentHistory';
import { duplicateForNextPeriod } from '../src/utils/duplicateAssessment';
import {
  addMonthsClamped,
  computeReportingEndDate,
  computeReportingLastDay,
} from '../src/utils/reportingDates';
import { listReportingMonths } from '../src/utils/reportingMonths';
import { computeScenarioTotals, DEFAULT_SCENARIO } from '../src/utils/scenarios';
import { computeTargetGap } from '../src/utils/targets';

function report(id: string, start: string, period: '1_year' | '6_months', diesel: number, s3 = 0): Assessment {
  const d = emptyDraft();
  Object.assign(d, { companyName: 'Acme', countryCode: 'GB', reportingPeriod: period, reportingStartDate: start });
  d.scope1.diesel.total = diesel;
  d.scope3.hotelNights = s3;
  return buildAssessment(d, id, { finalize: true });
}

test('reporting window shows an inclusive last day', () => {
  assert.equal(computeReportingEndDate('2025-01-01', '1_year'), '2026-01-01');
  assert.equal(computeReportingLastDay('2025-01-01', '1_year'), '2025-12-31');
  assert.equal(computeReportingLastDay('2025-07-01', '6_months'), '2025-12-31');
});

test('month arithmetic does not overflow', () => {
  const d = addMonthsClamped(new Date(2025, 7, 31), 6);
  assert.deepEqual([d.getFullYear(), d.getMonth(), d.getDate()], [2026, 1, 28]);
});

test('month list for a start on the 31st has 12 distinct months', () => {
  const keys = listReportingMonths('2025-01-31', '1_year', 'en').map((m) => m.key);
  assert.equal(new Set(keys).size, 12);
  assert.equal(keys[1], '2025-02');
});

test('next period starts the day after the previous one ends', () => {
  const next = duplicateForNextPeriod(report('a', '2025-08-31', '6_months', 1));
  assert.equal(next.reportingStartDate, '2026-02-28');
});

test('prior period is never a later period and must have the same length', () => {
  const a2024 = report('a', '2024-01-01', '1_year', 100);
  const a2025 = report('b', '2025-01-01', '1_year', 90);
  const half = report('c', '2025-07-01', '6_months', 40);
  const all = [a2024, a2025, half];
  assert.equal(findPriorFinalizedAssessment(all, a2024), null);
  assert.equal(findPriorFinalizedAssessment(all, a2025)?.id, 'a');
  assert.equal(findPriorFinalizedAssessment(all, half), null);
  assert.deepEqual(buildComparisonInsights(half, a2025, 'en'), []);
});

test('comparison switches to Scope 1 + 2 when Scope 3 coverage differs', () => {
  const before = report('a', '2024-01-01', '1_year', 100, 0);
  const after = report('b', '2025-01-01', '1_year', 100, 50);
  const insights = buildComparisonInsights(after, before, 'en');
  // Same Scope 1 + 2 → 0% on the like-for-like basis; Scope 3 is not compared.
  assert.equal(insights[0].kind, 'scope12');
  assert.equal(insights[0].percent, 0);
  assert.ok(!insights.some((i) => i.kind === 'scope3' || i.kind === 'total'));
  const after2 = report('c', '2025-01-01', '1_year', 80, 50);
  const first = buildComparisonInsights(after2, before, 'en')[0];
  assert.equal(first.kind, 'scope12');
  assert.ok(Math.abs(first.percent + 20) < 1e-6);
});

test('targets measure against the fixed base period', () => {
  const base = report('a', '2023-01-01', '1_year', 100);
  const mid = report('b', '2024-01-01', '1_year', 95);
  const cur = { ...report('c', '2025-01-01', '1_year', 85), reductionTarget: { type: 'percent' as const, value: 10 } };
  assert.equal(findBaseAssessment([base, mid, cur], cur)?.id, 'a');
  const gap = computeTargetGap(cur, [base, mid, cur], {
    targetPercent: (v) => `${v}%`,
    targetAbsolute: (v) => v,
    noBaseline: '',
  });
  assert.ok(Math.abs((gap.targetTco2e ?? 0) - base.totalEmissions * 0.9) < 1e-9);
  assert.equal(gap.onTrack, true);
});

test('fleet EV scenario adds the replacement electricity', () => {
  const d = emptyDraft();
  Object.assign(d, { companyName: 'Acme', countryCode: 'DE', reportingPeriod: '1_year', reportingStartDate: '2025-01-01' });
  d.scope1.petrol.total = 1000;
  const a = buildAssessment(d, 'x', { finalize: true });
  const s = computeScenarioTotals(a, { ...DEFAULT_SCENARIO, fleetEvPct: 100 });
  assert.equal(s.scope1, 0);
  const expectedKwh = 1000 * 12.85 * 0.205;
  assert.ok(Math.abs(s.scope2 - (expectedKwh * a.electricityFactor) / 1000) < 1e-9);
});
