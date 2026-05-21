import type { Locale } from '../../index';
import type { IndustryKey } from '../../../data/industries';
import { DEFAULT_INDUSTRY } from '../../../data/industries';
import { INDUSTRY_HINT_CATEGORY, type HintCategory, type HintSet, type InputHintField } from './types';
import { enHints } from './locales/en';
import { ruHints } from './locales/ru';
import { frHints } from './locales/fr';
import { deHints } from './locales/de';
import { esHints } from './locales/es';
import { ptHints } from './locales/pt';
import { itHints } from './locales/it';
import { jaHints } from './locales/ja';
import { zhHints } from './locales/zh';

const HINTS_BY_LOCALE: Record<Locale, Record<HintCategory, HintSet>> = {
  en: enHints,
  ru: ruHints,
  fr: frHints,
  de: deHints,
  es: esHints,
  pt: ptHints,
  it: itHints,
  ja: jaHints,
  zh: zhHints,
};

export function getInputHint(
  locale: Locale,
  industry: IndustryKey | '',
  field: InputHintField
): string {
  const key = (industry || DEFAULT_INDUSTRY) as IndustryKey;
  const category = INDUSTRY_HINT_CATEGORY[key] ?? 'other';
  return HINTS_BY_LOCALE[locale][category][field];
}

export type { InputHintField };
