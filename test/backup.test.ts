import assert from 'node:assert/strict';
import { test } from 'node:test';
import { buildAssessment } from '../src/calculations';
import { emptyDraft } from '../src/types';
import { assessmentsToCsv, BackupError, buildBackup, mergeBackup, parseBackup } from '../src/utils/backup';

function report(id: string, updatedAt: string, diesel: number) {
  const d = emptyDraft();
  Object.assign(d, { companyName: 'Acme, Ltd', countryCode: 'GB', reportingPeriod: '1_year', reportingStartDate: '2025-01-01' });
  d.scope1.diesel.total = diesel;
  return { ...buildAssessment(d, id, { finalize: true }), updatedAt };
}

test('backup round-trips and drops device-only evidence paths', () => {
  const a = { ...report('a', '2026-01-01T00:00:00Z', 100), evidence: [] };
  const file = buildBackup({ assessments: [a], methodologyLog: [], customFactors: { GB: 0.2 } });
  const parsed = parseBackup(JSON.stringify(file));
  assert.equal(parsed.assessments.length, 1);
  assert.equal(parsed.assessments[0].evidence, undefined);
  assert.equal(parsed.customFactors.GB, 0.2);
});

test('invalid files are rejected with a reason', () => {
  assert.throws(() => parseBackup('nope'), BackupError);
  assert.throws(() => parseBackup('{"app":"Other"}'), BackupError);
});

test('merge keeps the newest version of each report and never deletes local ones', () => {
  const local = [report('a', '2026-02-01T00:00:00Z', 100), report('b', '2026-01-01T00:00:00Z', 50)];
  const backup = parseBackup(
    JSON.stringify(
      buildBackup({
        assessments: [report('a', '2026-01-01T00:00:00Z', 1), report('b', '2026-03-01T00:00:00Z', 70), report('c', '2026-01-01T00:00:00Z', 5)],
        methodologyLog: [],
        customFactors: {},
      })
    )
  );
  const m = mergeBackup({ assessments: local, methodologyLog: [], customFactors: {} }, backup);
  assert.equal(m.assessments.length, 3);
  assert.equal(m.added, 1);
  assert.equal(m.updated, 1);
  assert.equal(m.assessments.find((x) => x.id === 'a')!.scope1.diesel.total, 100);
  assert.equal(m.assessments.find((x) => x.id === 'b')!.scope1.diesel.total, 70);
});

test('CSV escapes commas and has one row per report', () => {
  const csv = assessmentsToCsv([report('a', '2026-01-01T00:00:00Z', 100)]);
  const lines = csv.split('\n');
  assert.equal(lines.length, 2);
  assert.ok(lines[1].startsWith('"Acme, Ltd"'));
});
