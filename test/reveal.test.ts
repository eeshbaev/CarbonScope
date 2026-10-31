import assert from 'node:assert/strict';
import { test } from 'node:test';
import { buildAssessment } from '../src/calculations';
import { revealSummary } from '../src/onboarding/reveal';
import { emptyDraft } from '../src/types';

function report(edit: (d: ReturnType<typeof emptyDraft>) => void) {
  const d = emptyDraft();
  d.countryCode = 'GB';
  d.country = 'United Kingdom';
  d.reportingPeriod = '1_year';
  d.reportingStartDate = '2025-01-01';
  edit(d);
  return buildAssessment(d, 'r', { finalize: true });
}

test('reveal: electricity-heavy footprint names electricity and a renewable tariff', () => {
  const a = report((d) => {
    d.scope2.electricity.total = 100_000;
    d.scope1.naturalGas.total = 10_000;
  });
  const s = revealSummary(a);
  assert.equal(s.driver, 'electricity');
  assert.ok(s.driverPct > 50 && s.driverPct <= 100);
  assert.equal(s.lever, 'renewable');
  // 100 MWh × 0.131 kg/kWh (GB 2026) ≈ 13.1 t
  assert.ok(Math.abs(s.leverValue - 13.1) < 0.2, String(s.leverValue));
});

test('reveal: gas-heavy footprint suggests the 10% gas lever', () => {
  const a = report((d) => {
    d.scope1.naturalGas.total = 500_000;
    d.scope2.electricity.total = 1_000;
  });
  const s = revealSummary(a);
  assert.equal(s.driver, 'naturalGas');
  assert.equal(s.lever, 'gas');
  assert.ok(s.leverValue > 0);
});

test('reveal: empty report has no driver and no lever', () => {
  const s = revealSummary(report(() => undefined));
  assert.equal(s.driver, null);
  assert.equal(s.lever, null);
});
