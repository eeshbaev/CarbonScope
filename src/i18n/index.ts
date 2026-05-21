import { buildLocale, mergeLocalePatches } from './buildLocale';
import { en, type TranslationKeys } from './locales/en';
import { INDUSTRY_LABELS } from './packs/industryLabels';
import { LOCALE_EXTRAS } from './packs/localeExtras';
import { LEGAL_PACKS } from './packs/legalPacks';
import { RECOMMENDATION_PACKS } from './packs/recommendationPacks';
import { FULL_NOTIFICATION_LOCALES } from './packs/notifications';
import { SCOPE_INPUT_PATCHES } from './packs/scopeInputPatches';
import { FEATURE_PATCHES } from './packs/featurePatches';
import { LEARN_LIBRARY_PACKS } from './packs/learnLibraryPacks';
import { ENTERPRISE_PACKS } from './packs/enterprisePacks';
import { UI_PATCHES } from './packs/uiPatches';
import { ACCESSIBILITY_PACKS } from './packs/accessibilityPacks';

export type Locale = 'en' | 'ru' | 'fr' | 'de' | 'it' | 'ja' | 'zh' | 'es' | 'pt';

export const LOCALES: { code: Locale; label: string; nativeLabel: string }[] = [
  { code: 'en', label: 'English', nativeLabel: 'English' },
  { code: 'ru', label: 'Russian', nativeLabel: 'Русский' },
  { code: 'fr', label: 'French', nativeLabel: 'Français' },
  { code: 'de', label: 'German', nativeLabel: 'Deutsch' },
  { code: 'it', label: 'Italian', nativeLabel: 'Italiano' },
  { code: 'ja', label: 'Japanese', nativeLabel: '日本語' },
  { code: 'zh', label: 'Chinese', nativeLabel: '中文' },
  { code: 'es', label: 'Spanish', nativeLabel: 'Español' },
  { code: 'pt', label: 'Portuguese', nativeLabel: 'Português' },
];

function applyLegalPack(base: TranslationKeys, locale: Locale): TranslationKeys {
  const legal = LEGAL_PACKS[locale];
  return {
    ...base,
    rateApp: legal.rateApp,
    privacy: legal.privacy,
    settings: { ...base.settings, ...legal.settings },
  };
}

function mergeLocale(locale: Locale): TranslationKeys {
  if (locale === 'en') {
    return applyLegalPack(
      {
        ...en,
        industries: INDUSTRY_LABELS.en,
        recommendations: RECOMMENDATION_PACKS.en,
      },
      locale
    );
  }
  const partial = mergeLocalePatches(
    LOCALE_EXTRAS[locale],
    UI_PATCHES[locale],
    SCOPE_INPUT_PATCHES[locale],
    FULL_NOTIFICATION_LOCALES[locale],
    FEATURE_PATCHES[locale],
    LEARN_LIBRARY_PACKS[locale],
    ENTERPRISE_PACKS[locale],
    ACCESSIBILITY_PACKS[locale]
  );
  const merged = buildLocale(partial);
  return applyLegalPack(
    {
      ...merged,
      industries: INDUSTRY_LABELS[locale],
      recommendations: RECOMMENDATION_PACKS[locale],
    },
    locale
  );
}

export function getTranslations(locale: Locale): TranslationKeys {
  return mergeLocale(locale);
}

export type { TranslationKeys };
