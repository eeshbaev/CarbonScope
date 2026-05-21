import { StyleSheet, View, type ViewProps } from 'react-native';
import { colors, radii, spacing } from '../theme';
import { cardElevated } from '../theme/elevated';

export function Card({ style, children, ...props }: ViewProps) {
  return (
    <View style={[styles.card, style]} {...props}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: radii.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    ...cardElevated,
  },
});
