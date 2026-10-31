import Constants, { ExecutionEnvironment } from 'expo-constants';
import { Platform } from 'react-native';
import type * as ExpoNotifications from 'expo-notifications';

type NotificationsModule = typeof ExpoNotifications;

/**
 * Expo Go (SDK 53+) logs a red error as soon as expo-notifications is loaded on Android, because
 * remote push was removed from it. CarbonScope only uses local reminders, so in Expo Go we skip
 * loading the module and use inert stand-ins; development and store builds load it normally.
 */
const inExpoGo = Constants.executionEnvironment === ExecutionEnvironment.StoreClient;

export const notificationsAvailable = !(inExpoGo && Platform.OS === 'android');

function loadNotifications(): NotificationsModule {
  if (notificationsAvailable) {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    return require('expo-notifications') as NotificationsModule;
  }
  const stub: Record<string, unknown> = {
    setNotificationHandler: () => undefined,
    setNotificationChannelAsync: async () => null,
    AndroidImportance: { DEFAULT: 3 },
    PermissionStatus: { GRANTED: 'granted', DENIED: 'denied', UNDETERMINED: 'undetermined' },
    getPermissionsAsync: async () => ({ status: 'undetermined' }),
    requestPermissionsAsync: async () => ({ status: 'denied' }),
    scheduleNotificationAsync: async () => '',
    SchedulableTriggerInputTypes: { DATE: 'date' },
    cancelAllScheduledNotificationsAsync: async () => undefined,
    getAllScheduledNotificationsAsync: async () => [],
    cancelScheduledNotificationAsync: async () => undefined,
  };
  return stub as unknown as NotificationsModule;
}

export const Notifications = loadNotifications();
