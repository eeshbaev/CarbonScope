import type { TranslationKeys } from '../i18n/locales/en';
import type { IndustryKey } from '../data/industries';

export function getIndustryRecommendations(
  t: TranslationKeys,
  industry: IndustryKey
): string[] {
  const recs = t.recommendations[industry];
  return recs ?? t.recommendations.other;
}
