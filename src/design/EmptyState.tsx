import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme';
import { ScopeRing } from './ScopeRing';

/** Ring outline + one sentence + one action. */
export function EmptyState({ title, body, action }: { title: string; body?: string; action?: React.ReactNode }) {
  return (
    <View style={styles.wrap}>
      <ScopeRing values={[0, 0, 0]} size={96} />
      <Text style={styles.title}>{title}</Text>
      {body ? <Text style={styles.body}>{body}</Text> : null}
      {action}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: 'center', gap: 12, paddingVertical: 40, paddingHorizontal: 24 },
  title: { fontSize: 20, fontWeight: '600', color: colors.ink, textAlign: 'center' },
  body: { fontSize: 15, lineHeight: 22, color: colors.inkSecondary, textAlign: 'center' },
});
