import type { TranslationKeys } from '../i18n/locales/en';
import type { Locale } from '../i18n';
import { formatAppNumber } from './appLocale';
import type { ReportingPeriod } from '../types';

export type ScopeInputKind = 'fuel' | 'gas' | 'electricity';

export function formatResolvedInputLine(
  value: number,
  kind: ScopeInputKind,
  period: ReportingPeriod,
  useMonthly: boolean,
  t: TranslationKeys,
  locale: Locale
): string {
  const unit = kind === 'fuel' ? t.units.literAbbr : t.units.kwh;
  const suffix = t.units.amountPeriodSuffix[period];
  const base = `${formatAppNumber(value, locale)} ${unit}${suffix}`;
  if (useMonthly) {
    return `${base} (${t.scopeInputs.fromMonthly})`;
  }
  return base;
}
