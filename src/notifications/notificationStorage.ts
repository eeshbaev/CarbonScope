import AsyncStorage from '@react-native-async-storage/async-storage';
import { DEFAULT_NOTIFICATION_PREFS, type NotificationPrefs } from './types';

const PREFS_KEY = '@carbonscope/notification_prefs';
const LAST_APP_OPEN_KEY = '@carbonscope/last_app_open';
const FIRST_SUCCESS_SENT_KEY = '@carbonscope/notif_first_success_sent';
const REENGAGEMENT_SENT_KEY = '@carbonscope/notif_reengagement_sent';
const PERMISSION_PROMPTED_KEY = '@carbonscope/notif_permission_prompted';

export async function getNotificationPrefs(): Promise<NotificationPrefs> {
  const raw = await AsyncStorage.getItem(PREFS_KEY);
  if (!raw) return { ...DEFAULT_NOTIFICATION_PREFS };
  try {
    return { ...DEFAULT_NOTIFICATION_PREFS, ...JSON.parse(raw) };
  } catch {
    return { ...DEFAULT_NOTIFICATION_PREFS };
  }
}

export async function setNotificationPrefs(prefs: NotificationPrefs): Promise<void> {
  await AsyncStorage.setItem(PREFS_KEY, JSON.stringify(prefs));
}

export async function recordAppOpen(): Promise<void> {
  await AsyncStorage.setItem(LAST_APP_OPEN_KEY, new Date().toISOString());
}

export async function getLastAppOpen(): Promise<Date | null> {
  const raw = await AsyncStorage.getItem(LAST_APP_OPEN_KEY);
  if (!raw) return null;
  const d = new Date(raw);
  return Number.isNaN(d.getTime()) ? null : d;
}

export async function wasFirstSuccessNotificationSent(): Promise<boolean> {
  return (await AsyncStorage.getItem(FIRST_SUCCESS_SENT_KEY)) === 'true';
}

export async function markFirstSuccessNotificationSent(): Promise<void> {
  await AsyncStorage.setItem(FIRST_SUCCESS_SENT_KEY, 'true');
}

export async function getReengagementSentIds(): Promise<string[]> {
  const raw = await AsyncStorage.getItem(REENGAGEMENT_SENT_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as string[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export async function markReengagementSent(assessmentId: string): Promise<void> {
  const ids = await getReengagementSentIds();
  if (ids.includes(assessmentId)) return;
  await AsyncStorage.setItem(REENGAGEMENT_SENT_KEY, JSON.stringify([...ids, assessmentId]));
}

export async function wasPermissionPromptShown(): Promise<boolean> {
  return (await AsyncStorage.getItem(PERMISSION_PROMPTED_KEY)) === 'true';
}

export async function markPermissionPromptShown(): Promise<void> {
  await AsyncStorage.setItem(PERMISSION_PROMPTED_KEY, 'true');
}

export async function clearNotificationMeta(): Promise<void> {
  await AsyncStorage.multiRemove([
    PREFS_KEY,
    FIRST_SUCCESS_SENT_KEY,
    REENGAGEMENT_SENT_KEY,
    PERMISSION_PROMPTED_KEY,
  ]);
}
