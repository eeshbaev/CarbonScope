import type { Locale } from '../i18n';

/** BCP 47 tags for formatting dates/numbers in the app UI language. */
export const APP_BCP47_LOCALE: Record<Locale, string> = {
  en: 'en-GB',
  ru: 'ru-RU',
  fr: 'fr-FR',
  de: 'de-DE',
  it: 'it-IT',
  ja: 'ja-JP',
  zh: 'zh-CN',
  es: 'es-ES',
  pt: 'pt-PT',
};

export function formatAppDate(
  date: Date,
  locale: Locale,
  options?: Intl.DateTimeFormatOptions
): string {
  return date.toLocaleDateString(APP_BCP47_LOCALE[locale], options);
}

export function formatAppDateTime(date: Date, locale: Locale): string {
  return date.toLocaleString(APP_BCP47_LOCALE[locale], {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function formatAppNumber(value: number, locale: Locale): string {
  return value.toLocaleString(APP_BCP47_LOCALE[locale]);
}
