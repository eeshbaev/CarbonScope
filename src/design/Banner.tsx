import { Info, TriangleAlert } from 'lucide-react-native';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, radii } from '../theme';

/** Inline information / caveat with one optional action. */
export function Banner({
  tone = 'info',
  text,
  actionLabel,
  onAction,
}: {
  tone?: 'info' | 'warning';
  text: string;
  actionLabel?: string;
  onAction?: () => void;
}) {
  const warning = tone === 'warning';
  const Icon = warning ? TriangleAlert : Info;
  return (
    <View
      style={[styles.box, { backgroundColor: warning ? colors.warningTint : colors.surfaceSunken }]}
      accessibilityRole="alert"
    >
      <Icon size={18} color={warning ? colors.warningInk : colors.inkSecondary} strokeWidth={1.75} />
      <View style={styles.body}>
        <Text style={[styles.text, { color: warning ? colors.warningInk : colors.inkSecondary }]}>{text}</Text>
        {actionLabel && onAction ? (
          <Pressable onPress={onAction} accessibilityRole="button" hitSlop={8}>
            <Text style={styles.action}>{actionLabel}</Text>
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  box: { flexDirection: 'row', gap: 10, padding: 12, borderRadius: radii.md, alignItems: 'flex-start' },
  body: { flex: 1, gap: 6 },
  text: { fontSize: 14, lineHeight: 20 },
  action: { fontSize: 14, fontWeight: '600', color: colors.brand },
});
