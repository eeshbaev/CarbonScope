import type { TranslationKeys } from '../i18n/locales/en';
import { standardUnitOf, type DisplayUnit, type UnitKind } from '../units';

/** Chip label for a display unit, e.g. "liters/year" or "km/month". */
export function unitPeriodLabel(
  t: TranslationKeys,
  unit: DisplayUnit,
  period: 'year' | 'month'
): string {
  const u = t.units;
  const year: Record<DisplayUnit, string> = {
    liters: u.litersPerYear,
    gallons: u.gallonsPerYear,
    kwh: u.kwhPerYear,
    m3: u.m3PerYear,
    mwh: u.mwhPerYear,
    kg: u.kgPerYear,
    tonnes: u.tonnesPerYear,
    km: u.kmPerYear,
    miles: u.milesPerYear,
  };
  const month: Record<DisplayUnit, string> = {
    liters: u.litersPerMonth,
    gallons: u.gallonsPerMonth,
    kwh: u.kwhPerMonth,
    m3: u.m3PerMonth,
    mwh: u.mwhPerMonth,
    kg: u.kgPerMonth,
    tonnes: u.tonnesPerMonth,
    km: u.kmPerMonth,
    miles: u.milesPerMonth,
  };
  return period === 'year' ? year[unit] : month[unit];
}

/** Short label for the stored (standard) unit of an input kind: L, kWh, kg, km. */
export function standardUnitAbbr(t: TranslationKeys, kind: UnitKind): string {
  switch (standardUnitOf(kind)) {
    case 'liters':
      return t.units.literAbbr;
    case 'kg':
      return t.units.kgAbbr;
    case 'km':
      return t.units.kmAbbr;
    default:
      return t.units.kwh;
  }
}
