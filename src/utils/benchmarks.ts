import type { IndustryKey } from '../data/industries';
import type { TranslationKeys } from '../i18n/locales/en';
import { getLocalizedCountryName } from './localizeCountry';
import type { Locale } from '../i18n';

const OFFICE_HEAVY: IndustryKey[] = [
  'banking',
  'insurance',
  'technology',
  'telecommunications',
  'financial_services',
  'professional_services',
  'consulting',
  'media',
  'education',
  'ecommerce',
];

const MANUFACTURING_HEAVY: IndustryKey[] = [
  'manufacturing',
  'chemical',
  'steel',
  'cement',
  'automotive',
  'textile',
  'pharmaceuticals',
];

const LOGISTICS_HEAVY: IndustryKey[] = ['logistics', 'aviation', 'maritime'];

export function getBenchmarkMessage(
  t: TranslationKeys,
  industry: IndustryKey,
  countryCode: string,
  countryName: string,
  locale: Locale
): string {
  const country = getLocalizedCountryName(countryCode, locale, countryName);
  if (OFFICE_HEAVY.includes(industry)) {
    return t.results.benchmarkOffice.replace('{country}', country);
  }
  if (MANUFACTURING_HEAVY.includes(industry)) {
    return t.results.benchmarkManufacturing.replace('{country}', country);
  }
  if (LOGISTICS_HEAVY.includes(industry)) {
    return t.results.benchmarkLogistics.replace('{country}', country);
  }
  return t.results.benchmarkGeneral.replace('{country}', country);
}
