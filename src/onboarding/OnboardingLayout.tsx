import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLayout } from '../design/layout';
import { PrimaryBar } from '../design/PrimaryBar';
import { colors } from '../theme';

/**
 * Shared frame for onboarding steps: readable centred column (max 560), safe areas, and a
 * bottom action bar within thumb reach. On wide windows an optional side panel (live result)
 * sits to the right.
 */
export function OnboardingLayout({
  children,
  actions,
  side,
  top,
}: {
  children: React.ReactNode;
  actions?: React.ReactNode;
  side?: React.ReactNode;
  top?: React.ReactNode;
}) {
  const layout = useLayout();
  const twoPane = layout.twoPane && !!side;
  return (
    <SafeAreaView style={styles.flex} edges={['top', 'left', 'right']}>
      {top}
      <View style={[styles.flex, twoPane && styles.row]}>
        <ScrollView
          style={styles.flex}
          contentContainerStyle={[styles.content, { paddingHorizontal: layout.margin }]}
          keyboardShouldPersistTaps="handled"
          automaticallyAdjustKeyboardInsets
        >
          <View style={styles.column}>{children}</View>
        </ScrollView>
        {twoPane ? <View style={[styles.side, { padding: layout.margin }]}>{side}</View> : null}
      </View>
      {actions ? <PrimaryBar>{actions}</PrimaryBar> : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: colors.canvas },
  row: { flexDirection: 'row' },
  content: { paddingVertical: 24, flexGrow: 1 },
  column: { width: '100%', maxWidth: 560, alignSelf: 'center', gap: 16, flexGrow: 1 },
  side: {
    width: 380,
    borderLeftWidth: StyleSheet.hairlineWidth,
    borderLeftColor: colors.hairline,
    backgroundColor: colors.surface,
    justifyContent: 'center',
  },
});
