import countries from 'i18n-iso-countries';
import type { Locale } from '../i18n';
import { getCountryByCode } from '../data/countries';

const ISO_LOCALE: Record<Locale, string> = {
  en: 'en',
  ru: 'ru',
  fr: 'fr',
  de: 'de',
  it: 'it',
  ja: 'ja',
  zh: 'zh',
  es: 'es',
  pt: 'pt',
};

const LOCALE_TAGS: Record<Locale, string> = {
  en: 'en',
  ru: 'ru',
  fr: 'fr',
  de: 'de',
  it: 'it',
  ja: 'ja',
  zh: 'zh-Hans',
  es: 'es',
  pt: 'pt',
};

let localesRegistered = false;
const displayNamesCache: Partial<Record<Locale, Intl.DisplayNames>> = {};

function ensureCountryLocalesRegistered(): void {
  if (localesRegistered) return;
  countries.registerLocale(require('i18n-iso-countries/langs/en.json'));
  countries.registerLocale(require('i18n-iso-countries/langs/ru.json'));
  countries.registerLocale(require('i18n-iso-countries/langs/fr.json'));
  countries.registerLocale(require('i18n-iso-countries/langs/de.json'));
  countries.registerLocale(require('i18n-iso-countries/langs/it.json'));
  countries.registerLocale(require('i18n-iso-countries/langs/ja.json'));
  countries.registerLocale(require('i18n-iso-countries/langs/zh.json'));
  countries.registerLocale(require('i18n-iso-countries/langs/es.json'));
  countries.registerLocale(require('i18n-iso-countries/langs/pt.json'));
  localesRegistered = true;
}

function getDisplayNames(locale: Locale): Intl.DisplayNames | null {
  if (displayNamesCache[locale]) return displayNamesCache[locale]!;
  try {
    const dn = new Intl.DisplayNames([LOCALE_TAGS[locale]], { type: 'region' });
    displayNamesCache[locale] = dn;
    return dn;
  } catch {
    return null;
  }
}

function getBundledCountryName(countryCode: string, locale: Locale): string | undefined {
  ensureCountryLocalesRegistered();
  const isoLocale = ISO_LOCALE[locale];
  const name = countries.getName(countryCode.toUpperCase(), isoLocale);
  return name || undefined;
}

/** Localized country name from ISO code (updates when app language changes). */
export function getLocalizedCountryName(
  countryCode: string,
  locale: Locale,
  fallbackName?: string
): string {
  const englishFallback =
    fallbackName ?? getCountryByCode(countryCode)?.name ?? countryCode;
  if (!countryCode || countryCode.length !== 2) return englishFallback;

  const bundled = getBundledCountryName(countryCode, locale);
  if (bundled) return bundled;

  const dn = getDisplayNames(locale);
  if (dn) {
    try {
      const fromIntl = dn.of(countryCode.toUpperCase());
      if (fromIntl) return fromIntl;
    } catch {
      // fall through
    }
  }

  return englishFallback;
}
