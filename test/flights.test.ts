import assert from 'node:assert/strict';
import { test } from 'node:test';
import { airports } from '../src/data/airports';
import { greatCircleKm, haulFor, searchAirports, tripPassengerKm } from '../src/utils/flights';

const by = (iata: string) => airports().find((a) => a.iata === iata)!;

test('airport data loads', () => {
  assert.ok(airports().length > 1000);
  assert.ok(by('LHR') && by('JFK') && by('FRA'));
});

test('great-circle distances match known values', () => {
  // LHR–JFK ≈ 5,540 km; LHR–CDG ≈ 348 km
  assert.ok(Math.abs(greatCircleKm(by('LHR'), by('JFK')) - 5540) < 30);
  assert.ok(Math.abs(greatCircleKm(by('LHR'), by('CDG')) - 348) < 10);
  assert.equal(haulFor(greatCircleKm(by('LHR'), by('CDG'))), 'short');
  assert.equal(haulFor(greatCircleKm(by('LHR'), by('JFK'))), 'long');
});

test('trips multiply by passengers and legs; search finds by code and city', () => {
  const r = tripPassengerKm({ from: by('LHR'), to: by('CDG'), passengers: 2, returnTrip: true });
  assert.ok(Math.abs(r.passengerKm - r.km * 4) < 1e-9);
  assert.equal(searchAirports('jfk')[0].iata, 'JFK');
  assert.ok(searchAirports('munich').some((a) => a.iata === 'MUC'));
});
