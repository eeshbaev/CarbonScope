import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import type { Locale } from '../i18n';
import { loadAssessments } from '../storage';
import type { Assessment } from '../types';
import {
  getNotificationPrefs,
  markFirstSuccessNotificationSent,
  recordAppOpen,
  setNotificationPrefs,
} from './notificationStorage';
import {
  cancelAllScheduledNotifications,
  cancelNotificationsForAssessment,
  scheduleAllNotifications,
  scheduleFirstSuccessNotification,
} from './scheduler';
import type { NotificationPrefs } from './types';

let handlerInitialized = false;

export function initNotificationHandler(): void {
  if (Platform.OS === 'web' || handlerInitialized) return;
  handlerInitialized = true;
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
      shouldShowBanner: true,
      shouldShowList: true,
    }),
  });
}

export async function ensureAndroidChannel(): Promise<void> {
  if (Platform.OS !== 'android') return;
  await Notifications.setNotificationChannelAsync('default', {
    name: 'CarbonScope reminders',
    importance: Notifications.AndroidImportance.DEFAULT,
  });
}

export async function getPermissionStatus(): Promise<'granted' | 'denied' | 'undetermined'> {
  if (Platform.OS === 'web') return 'denied';
  const { status } = await Notifications.getPermissionsAsync();
  if (status === Notifications.PermissionStatus.GRANTED) return 'granted';
  if (status === Notifications.PermissionStatus.DENIED) return 'denied';
  return 'undetermined';
}

export async function requestNotificationPermission(): Promise<boolean> {
  if (Platform.OS === 'web') return false;
  initNotificationHandler();
  await ensureAndroidChannel();
  const { status } = await Notifications.requestPermissionsAsync();
  return status === Notifications.PermissionStatus.GRANTED;
}

export async function syncScheduledNotifications(locale: Locale): Promise<void> {
  if (Platform.OS === 'web') return;
  const prefs = await getNotificationPrefs();
  if (!prefs.masterEnabled) {
    await cancelAllScheduledNotifications();
    return;
  }
  const granted = await getPermissionStatus();
  if (granted !== 'granted') return;
  const assessments = await loadAssessments();
  await scheduleAllNotifications(locale, assessments, prefs);
}

export async function onAssessmentSaved(
  locale: Locale,
  assessment: Assessment,
  options?: { firstFinalize?: boolean }
): Promise<void> {
  if (Platform.OS === 'web') return;
  const prefs = await getNotificationPrefs();
  if (!prefs.masterEnabled) return;

  await cancelNotificationsForAssessment(assessment.id);
  await syncScheduledNotifications(locale);

  if (options?.firstFinalize && prefs.masterEnabled) {
    await scheduleFirstSuccessNotification(locale);
    await markFirstSuccessNotificationSent();
  }
}

export async function onAssessmentDeleted(locale: Locale, assessmentId: string): Promise<void> {
  if (Platform.OS === 'web') return;
  await cancelNotificationsForAssessment(assessmentId);
  await syncScheduledNotifications(locale);
}

export async function onAppForeground(locale: Locale): Promise<void> {
  if (Platform.OS === 'web') return;
  await recordAppOpen();
  await syncScheduledNotifications(locale);
}

export async function enableNotifications(locale: Locale): Promise<boolean> {
  const granted = await requestNotificationPermission();
  const prefs = await getNotificationPrefs();
  const next: NotificationPrefs = { ...prefs, masterEnabled: granted };
  await setNotificationPrefs(next);
  if (granted) await syncScheduledNotifications(locale);
  return granted;
}

export async function updateNotificationPrefs(
  locale: Locale,
  partial: Partial<NotificationPrefs>
): Promise<NotificationPrefs> {
  const current = await getNotificationPrefs();
  const next = { ...current, ...partial };
  await setNotificationPrefs(next);
  if (next.masterEnabled) await syncScheduledNotifications(locale);
  else await cancelAllScheduledNotifications();
  return next;
}

export { getNotificationPrefs, setNotificationPrefs };
