import type { TranslationKeys } from '../i18n/locales/en';
import type { Locale } from '../i18n';
import { formatAppNumber } from './appLocale';
import type { ReportingPeriod } from '../types';

import type { UnitKind } from '../units';
import { standardUnitAbbr } from './unitLabels';

export type ScopeInputKind = UnitKind;

export function formatResolvedInputLine(
  value: number,
  kind: ScopeInputKind,
  period: ReportingPeriod,
  useMonthly: boolean,
  t: TranslationKeys,
  locale: Locale
): string {
  const unit = standardUnitAbbr(t, kind);
  const suffix = t.units.amountPeriodSuffix[period];
  const base = `${formatAppNumber(value, locale)} ${unit}${suffix}`;
  if (useMonthly) {
    return `${base} (${t.scopeInputs.fromMonthly})`;
  }
  return base;
}
