import type { Locale } from '../i18n';
import { APP_BCP47_LOCALE } from './appLocale';
import type { ReportingPeriod } from '../types';
import { monthsForPeriod, parseISODate } from './reportingDates';

export type ReportingMonth = {
  key: string;
  label: string;
};

const APP_LOCALE = APP_BCP47_LOCALE;

function monthKeyFromDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  return `${y}-${m}`;
}

/** Calendar months in the reporting window (e.g. Feb 2025 … Jan 2026 for 1-year from Feb). */
export function listReportingMonths(
  startISO: string,
  period: ReportingPeriod,
  locale: Locale
): ReportingMonth[] {
  const count = monthsForPeriod(period);
  const start = parseISODate(startISO);
  const months: ReportingMonth[] = [];

  for (let i = 0; i < count; i++) {
    const d = new Date(start);
    d.setMonth(d.getMonth() + i);
    const key = monthKeyFromDate(d);
    const label = d.toLocaleDateString(APP_LOCALE[locale], {
      month: 'short',
      year: 'numeric',
    });
    months.push({ key, label });
  }

  return months;
}

