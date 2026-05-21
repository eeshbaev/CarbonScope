import { StyleSheet, Text, TextInput, View, type TextInputProps } from 'react-native';
import { useThemedStyles, type ThemeSlice } from '../hooks/useThemedStyles';
import { colors, radii } from '../theme';
import { scaleFontSize, scaleSize } from '../theme/scale';

interface InputProps extends TextInputProps {
  label: string;
  hint?: string;
  error?: string;
}

export function Input({ label, hint, error, style, ...props }: InputProps) {
  const styles = useThemedStyles(createStyles);

  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, error && styles.inputError, style]}
        placeholderTextColor={colors.textSecondary}
        keyboardType="decimal-pad"
        {...props}
      />
      {hint && !error ? <Text style={styles.hint}>{hint}</Text> : null}
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

function createStyles({ typography, spacing, fontScale, displayScale }: ThemeSlice) {
  return StyleSheet.create({
    wrapper: {
      marginBottom: spacing.md,
    },
    label: {
      ...typography.label,
      marginBottom: spacing.sm,
    },
    input: {
      backgroundColor: colors.white,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: radii.md,
      paddingHorizontal: spacing.md,
      paddingVertical: scaleSize(12, displayScale),
      fontSize: scaleFontSize(16, fontScale),
      color: colors.text,
    },
    inputError: {
      borderColor: colors.danger,
    },
    hint: {
      ...typography.caption,
      marginTop: spacing.xs,
    },
    error: {
      ...typography.caption,
      color: colors.danger,
      marginTop: spacing.xs,
    },
  });
}
