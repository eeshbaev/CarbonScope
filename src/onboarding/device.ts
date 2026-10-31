import { getLocales } from 'expo-localization';
import { LOCALES, type Locale } from '../i18n';
import { getCountryByCode } from '../data/countries';

/** Device language if CarbonScope supports it, else English. No permission needed. */
export function deviceLocale(): Locale {
  try {
    for (const l of getLocales()) {
      const code = (l.languageCode ?? '').toLowerCase();
      if (LOCALES.some((x) => x.code === code)) return code as Locale;
    }
  } catch {
    // Fall through.
  }
  return 'en';
}

/** Device region (settings, not GPS) if it is a known country. */
export function deviceCountryCode(): string | null {
  try {
    for (const l of getLocales()) {
      const region = (l.regionCode ?? '').toUpperCase();
      if (region && getCountryByCode(region)) return region;
    }
  } catch {
    // Fall through.
  }
  return null;
}
