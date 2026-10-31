import { airports, type Airport } from '../data/airports';

const EARTH_RADIUS_KM = 6371.0088;

/** Great-circle distance in km (haversine). */
export function greatCircleKm(a: Pick<Airport, 'lat' | 'lon'>, b: Pick<Airport, 'lat' | 'lon'>): number {
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLon = toRad(b.lon - a.lon);
  const h =
    Math.sin(dLat / 2) ** 2 + Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLon / 2) ** 2;
  return 2 * EARTH_RADIUS_KM * Math.asin(Math.min(1, Math.sqrt(h)));
}

/** DESNZ haul definition: short-haul up to 3,700 km, long-haul beyond. */
export const SHORT_HAUL_MAX_KM = 3700;

export function haulFor(km: number): 'short' | 'long' {
  return km <= SHORT_HAUL_MAX_KM ? 'short' : 'long';
}

/** Search by IATA code, city or airport name (case/diacritic-insensitive). */
export function searchAirports(query: string, limit = 8): Airport[] {
  const fold = (s: string) =>
    s
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .toLowerCase();
  const q = fold(query.trim());
  if (!q) return [];
  const all = airports();
  const exact = all.filter((a) => a.iata.toLowerCase() === q);
  const rest = all.filter(
    (a) => a.iata.toLowerCase() !== q && (fold(a.city).includes(q) || fold(a.name).includes(q))
  );
  return [...exact, ...rest].slice(0, limit);
}

export interface FlightTrip {
  from: Airport;
  to: Airport;
  passengers: number;
  returnTrip: boolean;
}

/** Passenger-km for a trip and the haul bucket it belongs to. */
export function tripPassengerKm(trip: FlightTrip): { km: number; passengerKm: number; haul: 'short' | 'long' } {
  const km = greatCircleKm(trip.from, trip.to);
  const legs = trip.returnTrip ? 2 : 1;
  return { km, passengerKm: km * legs * Math.max(1, Math.round(trip.passengers)), haul: haulFor(km) };
}
