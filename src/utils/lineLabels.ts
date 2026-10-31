import type { CategoryLineKey } from '../data/inputLines';
import { getCategoryLine, isScope1Line } from '../data/inputLines';
import { FUEL_FACTORS, HEAT_FACTORS, fuelFactorTotal } from '../data/fuelFactors';
import type { IndustryKey } from '../data/industries';
import type { Locale } from '../i18n';
import type { TranslationKeys } from '../i18n/locales/en';
import { getInputHint } from '../i18n/packs/inputHints';
import { formatAppNumber } from './appLocale';
import { standardUnitAbbr } from './unitLabels';

export function lineLabel(t: TranslationKeys, key: CategoryLineKey | 'refrigerants'): string {
  if (key === 'refrigerants') return t.scope1.refrigerantsShort;
  return isScope1Line(key) ? t.scope1[key] : t.scope2[key];
}

/** Info-modal text: industry-specific for original lines, generic guidance for new ones. */
export function lineInfoText(
  t: TranslationKeys,
  locale: Locale,
  industry: IndustryKey | '',
  key: CategoryLineKey
): string {
  const def = getCategoryLine(key);
  if (def.hintField) return getInputHint(locale, industry, def.hintField);
  return t.lineHints[key as keyof TranslationKeys['lineHints']];
}

/** Factor caption under a line title, e.g. "2.68 kg CO₂e/L". */
export function lineFactorHint(
  t: TranslationKeys,
  locale: Locale,
  key: CategoryLineKey,
  gridFactor: number
): string | undefined {
  const kg = t.common.kgCo2e;
  if (isScope1Line(key)) {
    const kind = getCategoryLine(key).kind;
    return `${formatAppNumber(fuelFactorTotal(key), locale)} ${kg}/${standardUnitAbbr(t, kind)}`;
  }
  switch (key) {
    case 'evKm':
      return `${formatAppNumber(HEAT_FACTORS.evKwhPerKm, locale)} ${t.units.kwh}/${t.units.kmAbbr} × ${formatAppNumber(gridFactor, locale)} ${kg}${t.units.perKwh}`;
    case 'districtHeat':
      return `${formatAppNumber(HEAT_FACTORS.districtHeat, locale)} ${kg}${t.units.perKwh}`;
    case 'steam':
      return `${formatAppNumber(HEAT_FACTORS.steam, locale)} ${kg}${t.units.perKwh}`;
    case 'districtCooling':
      return `${formatAppNumber(Math.round((gridFactor / HEAT_FACTORS.coolingCop) * 1000) / 1000, locale)} ${kg}${t.units.perKwh}`;
    default:
      return undefined;
  }
}

export { FUEL_FACTORS };
