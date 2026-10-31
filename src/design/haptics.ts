import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native';

/** Haptic vocabulary (docs/DESIGN.md §4.3). Silently no-ops on web or unsupported devices. */
const enabled = Platform.OS === 'ios' || Platform.OS === 'android';

export const haptics = {
  selection: () => {
    if (enabled) void Haptics.selectionAsync().catch(() => undefined);
  },
  light: () => {
    if (enabled) void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => undefined);
  },
  success: () => {
    if (enabled)
      void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => undefined);
  },
  warning: () => {
    if (enabled)
      void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning).catch(() => undefined);
  },
};
