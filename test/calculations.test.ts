import assert from 'node:assert/strict';
import { test } from 'node:test';
import { buildAssessment, computeEmissions } from '../src/calculations';
import { USD_DEFLATOR_TO_2022, currencyForCountry } from '../src/data/currencies';
import { COUNTRY_ELECTRICITY_FACTORS } from '../src/data/emissionFactors';
import { FUEL_FACTORS, fuelFactorTotal } from '../src/data/fuelFactors';
import { emptyDraft } from '../src/types';
import {
  migrateScope1Inputs,
  migrateScope2Inputs,
  migrateScope3Inputs,
} from '../src/types/scopeInputs';
import { KWH_PER_M3_GAS, LITERS_PER_IMPERIAL_GALLON, toStandardUnit } from '../src/units';
import { parseNumberInput } from '../src/utils/parseNumberInput';

const near = (a: number, b: number, eps = 1e-6) =>
  assert.ok(Math.abs(a - b) <= eps, `${a} != ${b}`);

test('gas split sums to the published total for every fuel', () => {
  for (const [key, f] of Object.entries(FUEL_FACTORS)) {
    near(f.co2 + f.ch4 + f.n2o, fuelFactorTotal(key as keyof typeof FUEL_FACTORS), 1e-5);
  }
});

test('Scope 1 uses DESNZ 2026 factors restated to AR6', () => {
  const e = computeEmissions({
    scope1: migrateScope1Inputs({ diesel: { total: 1000 }, naturalGas: { total: 10000 } }),
    scope2: migrateScope2Inputs({}),
    scope3: migrateScope3Inputs({}),
    countryCode: 'GB',
  });
  near(e.scope1, (1000 * 2.66257 + 10000 * 0.18444) / 1000, 1e-5);
});

test('Scope 2 location-based uses the generation-only grid factor', () => {
  const e = computeEmissions({
    scope1: migrateScope1Inputs({}),
    scope2: migrateScope2Inputs({ electricity: { total: 1000 } }),
    scope3: migrateScope3Inputs({}),
    countryCode: 'GB',
  });
  near(e.scope2Location, COUNTRY_ELECTRICITY_FACTORS.GB);
  near(COUNTRY_ELECTRICITY_FACTORS.GB, 0.131);
});

test('market-based hierarchy: certificates, then supplier, then residual mix, then grid', () => {
  const base = { electricity: { total: 10000 } };
  const run = (market: object) =>
    computeEmissions({
      scope1: migrateScope1Inputs({}),
      scope2: migrateScope2Inputs({ ...base, market }),
      scope3: migrateScope3Inputs({}),
      countryCode: 'DE',
    }).scope2Market;
  near(run({}), 10000 * COUNTRY_ELECTRICITY_FACTORS.DE / 1000);
  near(run({ renewableKwh: 4000, supplierFactor: 0.2 }), 6000 * 0.2 / 1000);
  near(run({ residualMixFactor: 0.5 }), 10000 * 0.5 / 1000);
  near(run({ renewableKwh: 99999 }), 0);
});

test('spend is converted at 2025 rates and deflated to 2022 USD', () => {
  const e = computeEmissions({
    scope1: migrateScope1Inputs({}),
    scope2: migrateScope2Inputs({}),
    scope3: migrateScope3Inputs({ spendItHardware: 10000, currency: 'EUR' }),
    countryCode: 'DE',
  });
  near(e.scope3, (10000 * 1.13058 * USD_DEFLATOR_TO_2022 * 0.058) / 1000);
});

test('other currency without a rate counts nothing; with a rate it counts', () => {
  const s3 = migrateScope3Inputs({ spendServices: 1000, currency: 'OTHER' });
  const args = { scope1: migrateScope1Inputs({}), scope2: migrateScope2Inputs({}), countryCode: 'TR' };
  near(computeEmissions({ ...args, scope3: s3 }).scope3, 0);
  near(
    computeEmissions({ ...args, scope3: { ...s3, customUsdRate: 0.03 } }).scope3,
    (1000 * 0.03 * USD_DEFLATOR_TO_2022 * 0.069) / 1000
  );
  assert.equal(currencyForCountry('TR'), 'OTHER');
  assert.equal(currencyForCountry('FR'), 'EUR');
});

test('total = Scope 1 + location-based Scope 2 + Scope 3', () => {
  const d = emptyDraft();
  d.countryCode = 'US';
  d.scope1.diesel.total = 500;
  d.scope2.electricity.total = 20000;
  d.scope3.flightLongHaulKm = 5000;
  const a = buildAssessment(d, 'x');
  near(a.totalEmissions, a.scope1Emissions + a.scope2Emissions + a.scope3Emissions);
});

test('refrigerant blends use AR6 component GWPs', async () => {
  const { REFRIGERANTS } = await import('../src/data/fuelFactors');
  const gwp = Object.fromEntries(REFRIGERANTS.map((r) => [r.key, r.gwp]));
  near(gwp.r410a, Math.round(0.5 * 771 + 0.5 * 3740));
  near(gwp.r404a, Math.round(0.44 * 3740 + 0.52 * 5810 + 0.04 * 1530));
  near(gwp.r407c, Math.round(0.23 * 771 + 0.25 * 3740 + 0.52 * 1530));
});

test('unit conversions', () => {
  near(toStandardUnit(1, 'gas', 'm3'), KWH_PER_M3_GAS);
  near(KWH_PER_M3_GAS, 2.06672 / 0.18296, 1e-3);
  near(toStandardUnit(1, 'fuel', 'impGallons'), LITERS_PER_IMPERIAL_GALLON);
  near(toStandardUnit(1, 'fuel', 'gallons'), 3.785411784);
});

test('number parsing accepts decimal commas and thousands separators', () => {
  assert.equal(parseNumberInput('2,5'), 2.5);
  assert.equal(parseNumberInput('1,000'), 1000);
  assert.equal(parseNumberInput('1.234,5'), 1234.5);
  assert.equal(parseNumberInput('-3'), 0);
});
