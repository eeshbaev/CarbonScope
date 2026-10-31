import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../theme';
import { useLayout } from './layout';

/**
 * Bottom action area within thumb reach: one primary action, optional quiet secondary.
 * Sits above the home indicator / Android gesture bar; centred column on large windows.
 */
export function PrimaryBar({ children }: { children: React.ReactNode }) {
  const insets = useSafeAreaInsets();
  const layout = useLayout();
  return (
    <View
      style={[
        styles.bar,
        { paddingBottom: Math.max(insets.bottom, 12), paddingHorizontal: layout.margin },
      ]}
    >
      <View style={[styles.inner, { maxWidth: 560 }]}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    paddingTop: 12,
    backgroundColor: colors.canvas,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.hairline,
  },
  inner: { width: '100%', alignSelf: 'center', gap: 8 },
});
