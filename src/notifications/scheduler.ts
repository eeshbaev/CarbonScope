import * as Notifications from 'expo-notifications';
import { CATEGORY_LINES, getLineInput } from '../data/inputLines';
import { lineLabel } from '../utils/lineLabels';
import { Platform } from 'react-native';
import type { TranslationKeys } from '../i18n/locales/en';
import type { Locale } from '../i18n';
import { getTranslations } from '../i18n';
import type { Assessment } from '../types';
import { supportsMonthlyEntry } from '../types/scopeInputs';
import {
  addMonthsClamped,
  computeReportingEndDate,
  hasReportingDates,
  parseISODate,
  toISODateString,
} from '../utils/reportingDates';
import { listReportingMonths } from '../utils/reportingMonths';
import { toAllowedNotificationDay, nextWeeklyEducationalSlot } from './allowedNotificationDays';
import { tipKeyForWeek } from './educationalTips';
import type { NotificationPrefs } from './types';
import {
  getLastAppOpen,
  getReengagementSentIds,
  wasFirstSuccessNotificationSent,
} from './notificationStorage';

const DRAFT_INACTIVITY_DAYS = 3;
const PERIOD_END_DAYS_BEFORE = 7;
const MONTHLY_REMINDER_DAY = 3;
const REFRESH_MONTHS_6 = 6;
const REFRESH_MONTHS_12 = 12;
const REENGAGEMENT_DAYS = 30;
const FIRST_SUCCESS_DELAY_HOURS = 2;
const MAX_MONTHLY_PER_ASSESSMENT = 4;

function replaceVars(template: string, vars: Record<string, string>): string {
  let out = template;
  for (const [key, value] of Object.entries(vars)) {
    out = out.split(`{${key}}`).join(value);
  }
  return out;
}

function addDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

function addMonths(date: Date, months: number): Date {
  return addMonthsClamped(date, months);
}

function atLocalHour(date: Date, hour: number): Date {
  const d = new Date(date);
  d.setHours(hour, 0, 0, 0);
  return d;
}

function isFuture(date: Date): boolean {
  return date.getTime() > Date.now() + 60_000;
}

function nthDayOfMonth(year: number, monthIndex: number, day: number): Date {
  return new Date(year, monthIndex, day, 10, 0, 0, 0);
}

function getMonthlyCategoryLabels(assessment: Assessment, t: TranslationKeys): string[] {
  return CATEGORY_LINES.filter((l) => getLineInput(assessment, l.key).useMonthly).map((l) =>
    lineLabel(t, l.key)
  );
}

function hasMonthlyMode(assessment: Assessment): boolean {
  if (!supportsMonthlyEntry(assessment.reportingPeriod)) return false;
  return CATEGORY_LINES.some((l) => getLineInput(assessment, l.key).useMonthly);
}

function monthNeedsMonthlyEntry(assessment: Assessment, monthKey: string): boolean {
  return CATEGORY_LINES.map((l) => getLineInput(assessment, l.key)).some(
    (f) => f.useMonthly && !(f.monthly[monthKey] > 0)
  );
}

function prepareNotificationDate(date: Date): Date {
  return toAllowedNotificationDay(date);
}

async function scheduleOne(
  identifier: string,
  title: string,
  body: string,
  date: Date,
  data: Record<string, string>
): Promise<void> {
  const when = prepareNotificationDate(date);
  if (!isFuture(when)) return;
  await Notifications.scheduleNotificationAsync({
    identifier,
    content: { title, body, data, sound: true },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DATE,
      date: when,
    },
  });
}

export async function cancelAllScheduledNotifications(): Promise<void> {
  if (Platform.OS === 'web') return;
  await Notifications.cancelAllScheduledNotificationsAsync();
}

export async function cancelNotificationsForAssessment(assessmentId: string): Promise<void> {
  if (Platform.OS === 'web') return;
  const scheduled = await Notifications.getAllScheduledNotificationsAsync();
  const prefix = assessmentId;
  for (const n of scheduled) {
    if (n.identifier.includes(prefix)) {
      await Notifications.cancelScheduledNotificationAsync(n.identifier);
    }
  }
}

export async function scheduleAllNotifications(
  locale: Locale,
  assessments: Assessment[],
  prefs: NotificationPrefs
): Promise<void> {
  if (Platform.OS === 'web' || !prefs.masterEnabled) {
    if (Platform.OS !== 'web') await cancelAllScheduledNotifications();
    return;
  }

  const t = getTranslations(locale);
  await cancelAllScheduledNotifications();

  const now = new Date();

  for (const a of assessments) {
    const company = a.companyName.trim() || '—';

    if (prefs.drafts && a.isDraft) {
      const draftAt = addDays(new Date(a.updatedAt), DRAFT_INACTIVITY_DAYS);
      await scheduleOne(
        `draft-${a.id}`,
        t.notifications.draftTitle,
        replaceVars(t.notifications.draftBody, { company }),
        atLocalHour(draftAt, 10),
        { kind: 'draft', assessmentId: a.id }
      );
    }

    if (!a.isDraft && a.finalizedAt) {
      if (prefs.periodEnd && hasReportingDates(a.reportingStartDate)) {
        const endISO = computeReportingEndDate(a.reportingStartDate, a.reportingPeriod);
        const endDate = parseISODate(endISO);
        const remindAt = addDays(endDate, -PERIOD_END_DAYS_BEFORE);
        const periodLabel = t.reportingPeriods[a.reportingPeriod];
        await scheduleOne(
          `period-end-${a.id}`,
          t.notifications.periodEndTitle,
          replaceVars(t.notifications.periodEndBody, { company, period: periodLabel }),
          atLocalHour(remindAt, 9),
          { kind: 'period_end', assessmentId: a.id }
        );

        if (prefs.reportingCalendar) {
          const calAt = addDays(endDate, -14);
          await scheduleOne(
            `reporting-cal-${a.id}`,
            t.notifications.reportingCalendarTitle,
            replaceVars(t.notifications.reportingCalendarBody, {
              company,
              period: periodLabel,
            }),
            atLocalHour(calAt, 9),
            { kind: 'reporting_calendar', assessmentId: a.id }
          );
        }
      }

      if (prefs.refresh) {
        const base = new Date(a.updatedAt);
        const at6 = addMonths(base, REFRESH_MONTHS_6);
        const at12 = addMonths(base, REFRESH_MONTHS_12);
        await scheduleOne(
          `refresh-6-${a.id}`,
          t.notifications.refresh6Title,
          replaceVars(t.notifications.refresh6Body, { company }),
          atLocalHour(at6, 10),
          { kind: 'refresh_6', assessmentId: a.id }
        );
        await scheduleOne(
          `refresh-12-${a.id}`,
          t.notifications.refresh12Title,
          replaceVars(t.notifications.refresh12Body, { company }),
          atLocalHour(at12, 10),
          { kind: 'refresh_12', assessmentId: a.id }
        );
      }

      if (prefs.monthly && hasMonthlyMode(a)) {
        const months = listReportingMonths(a.reportingStartDate, a.reportingPeriod, locale);
        const categories = getMonthlyCategoryLabels(a, t);
        const catSuffix =
          categories.length > 0
            ? replaceVars(t.notifications.monthlyCategoriesSuffix, {
                categories: categories.join(', '),
              })
            : '';
        let scheduled = 0;
        for (const month of months) {
          if (scheduled >= MAX_MONTHLY_PER_ASSESSMENT) break;
          const [y, m] = month.key.split('-').map(Number);
          const remindDate = nthDayOfMonth(y, m - 1, MONTHLY_REMINDER_DAY);
          if (!isFuture(remindDate)) continue;
          if (!monthNeedsMonthlyEntry(a, month.key)) continue;
          await scheduleOne(
            `monthly-${a.id}-${month.key}`,
            t.notifications.monthlyTitle,
            replaceVars(t.notifications.monthlyBody, {
              company,
              month: month.label,
              categories: catSuffix,
            }),
            remindDate,
            { kind: 'monthly', assessmentId: a.id }
          );
          scheduled += 1;
        }
      }
    }
  }

  if (prefs.educational) {
    const tipAt = nextWeeklyEducationalSlot(now);
    const weekIndex = Math.floor(tipAt.getTime() / (7 * 24 * 60 * 60 * 1000));
    const tipKey = tipKeyForWeek(weekIndex);
    const tipBody = t.notifications.tips[tipKey];
    await scheduleOne(
      'educational-weekly',
      t.notifications.educationalTitle,
      tipBody,
      tipAt,
      { kind: 'educational' }
    );
  }

  if (prefs.initiatives) {
    for (const a of assessments) {
      if (!a.initiativeReminderAt || !a.selectedInitiatives?.length) continue;
      const at = prepareNotificationDate(new Date(a.initiativeReminderAt));
      if (!isFuture(at)) continue;
      await scheduleOne(
        `initiative-${a.id}`,
        t.notifications.initiativeTitle,
        replaceVars(t.notifications.initiativeBody, {
          company: a.companyName.trim() || '—',
        }),
        at,
        { kind: 'initiative', assessmentId: a.id }
      );
    }
  }

  if (prefs.reengagement) {
    const lastOpen = await getLastAppOpen();
    const sentIds = await getReengagementSentIds();
    const finalized = assessments.filter((a) => !a.isDraft && a.finalizedAt);
    if (lastOpen && finalized.length > 0) {
      const reengageAt = addDays(lastOpen, REENGAGEMENT_DAYS);
      const target = finalized[0];
      if (!sentIds.includes(target.id) && isFuture(reengageAt)) {
        await scheduleOne(
          `reengage-${target.id}`,
          t.notifications.reengagementTitle,
          replaceVars(t.notifications.reengagementBody, {
            company: target.companyName.trim() || '—',
          }),
          atLocalHour(reengageAt, 11),
          { kind: 'reengagement', assessmentId: target.id }
        );
      }
    }
  }
}

export async function scheduleFirstSuccessNotification(locale: Locale): Promise<void> {
  if (Platform.OS === 'web') return;
  if (await wasFirstSuccessNotificationSent()) return;

  const t = getTranslations(locale);
  const at = new Date();
  at.setHours(at.getHours() + FIRST_SUCCESS_DELAY_HOURS);

  await scheduleOne(
    'first-success',
    t.notifications.firstSuccessTitle,
    t.notifications.firstSuccessBody,
    at,
    { kind: 'first_success' }
  );
}
