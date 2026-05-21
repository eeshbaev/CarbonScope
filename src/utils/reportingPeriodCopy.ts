import type { TranslationKeys } from '../i18n/locales/en';
import type { Locale } from '../i18n';
import type { ReportingPeriod } from '../types';
import {
  formatDisplayDate,
  formatReportingRange,
  hasReportingDates,
} from './reportingDates';

export function getResultsTitle(t: TranslationKeys, period: ReportingPeriod): string {
  return t.results.titles[period];
}

export function getTotalGhgFull(t: TranslationKeys, period: ReportingPeriod): string {
  return t.results.totalGhgFullByPeriod[period];
}

export function getTco2eLabel(t: TranslationKeys, period: ReportingPeriod): string {
  return t.common.tco2eByPeriod[period];
}

export function getPeriodFromToLabel(
  t: TranslationKeys,
  startISO: string,
  period: ReportingPeriod,
  appLocale: Locale
): string | null {
  if (!hasReportingDates(startISO)) return null;
  const { end } = formatReportingRange(startISO, period, appLocale);
  const from = formatDisplayDate(startISO, appLocale);
  const to = formatDisplayDate(end, appLocale);
  return t.company.periodFromTo.replace('{from}', from).replace('{to}', to);
}

export function getPeriodWithRangeLabel(
  t: TranslationKeys,
  startISO: string,
  period: ReportingPeriod,
  appLocale: Locale
): string | null {
  const fromTo = getPeriodFromToLabel(t, startISO, period, appLocale);
  if (!fromTo) return null;
  return t.company.periodWithRange
    .replace('{period}', t.reportingPeriods[period])
    .replace('{fromTo}', fromTo);
}
