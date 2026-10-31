import type { Locale } from '../i18n';
import { APP_BCP47_LOCALE } from './appLocale';
import type { ReportingPeriod } from '../types';

const APP_LOCALE = APP_BCP47_LOCALE;

export function toISODateString(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function parseISODate(iso: string): Date {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, (m || 1) - 1, d || 1);
}

export function monthsForPeriod(period: ReportingPeriod): number {
  if (period === '6_months') return 6;
  return 12;
}

/**
 * Add calendar months without overflowing into the next month
 * (31 Aug + 6 months → 28/29 Feb, not 3 March).
 */
export function addMonthsClamped(date: Date, months: number): Date {
  const target = new Date(date.getFullYear(), date.getMonth() + months, 1);
  const lastDay = new Date(target.getFullYear(), target.getMonth() + 1, 0).getDate();
  target.setDate(Math.min(date.getDate(), lastDay));
  target.setHours(date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds());
  return target;
}

/**
 * Exclusive end of the reporting window (= start of the next period): same calendar day,
 * N months after start. e.g. 1 May 2025 + 6 months → 1 November 2025.
 */
export function computeReportingEndDate(
  startISO: string,
  period: ReportingPeriod
): string {
  return toISODateString(addMonthsClamped(parseISODate(startISO), monthsForPeriod(period)));
}

/** Last day included in the reporting window, e.g. 1 Jan 2025 (1 year) → 31 Dec 2025. */
export function computeReportingLastDay(startISO: string, period: ReportingPeriod): string {
  const end = parseISODate(computeReportingEndDate(startISO, period));
  end.setDate(end.getDate() - 1);
  return toISODateString(end);
}

export function formatDisplayDate(iso: string, appLocale: Locale): string {
  const date = parseISODate(iso);
  return date.toLocaleDateString(APP_LOCALE[appLocale], {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function formatReportingRange(
  startISO: string,
  period: ReportingPeriod,
  appLocale: Locale
): { start: string; end: string; label: string } {
  const endISO = computeReportingLastDay(startISO, period);
  const from = formatDisplayDate(startISO, appLocale);
  const to = formatDisplayDate(endISO, appLocale);
  return { start: startISO, end: endISO, label: `${from} – ${to}` };
}

export function hasReportingDates(startISO: string | undefined | null): boolean {
  return !!startISO && /^\d{4}-\d{2}-\d{2}$/.test(startISO);
}

export function addDays(from: Date, days: number): Date {
  const d = new Date(from);
  d.setDate(d.getDate() + days);
  return d;
}
