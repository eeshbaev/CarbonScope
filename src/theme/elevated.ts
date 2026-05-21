import { Platform, type ViewStyle } from 'react-native';

/** Soft card elevation — matches Play Store mockup depth on web and native. */
export const cardElevated: ViewStyle = Platform.select({
  web: {
    boxShadow: '0 2px 14px rgba(26, 46, 26, 0.09)',
  } as ViewStyle,
  default: {
    shadowColor: '#1A2E1A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
}) ?? {};
