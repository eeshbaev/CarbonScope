import { Platform, type ViewStyle } from 'react-native';

/** Soft card elevation — matches Play Store mockup depth on web and native. */
export const cardElevated: ViewStyle = Platform.select({
  web: {
    boxShadow: '0 2px 8px rgba(22, 32, 27, 0.05)',
  } as ViewStyle,
  default: {
    shadowColor: '#16201B',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
}) ?? {};

/** Floating controls (primary bar, toasts). */
export const floatingElevated: ViewStyle = Platform.select({
  web: { boxShadow: '0 8px 24px rgba(22, 32, 27, 0.12)' } as ViewStyle,
  default: {
    shadowColor: '#16201B',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
    elevation: 8,
  },
}) ?? {};
