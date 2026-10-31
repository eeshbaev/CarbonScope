import {
  ActivityIndicator,
  StyleSheet,
  Text,
  type PressableProps,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { PressableScale } from '../design/Pressable';
import { useThemedStyles, type ThemeSlice } from '../hooks/useThemedStyles';
import { colors, radii } from '../theme';
import { scaleFontSize, scaleSize } from '../theme/scale';

interface ButtonProps extends Omit<PressableProps, 'style'> {
  title: string;
  /** primary = filled brand · secondary = tonal · outline = hairline · quiet = text only. */
  variant?: 'primary' | 'secondary' | 'outline' | 'destructive' | 'quiet';
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
}

export function Button({
  title,
  variant = 'primary',
  loading,
  disabled,
  style,
  ...props
}: ButtonProps) {
  const styles = useThemedStyles(createStyles);
  const isPrimary = variant === 'primary';
  const isOutline = variant === 'outline';
  const isDestructive = variant === 'destructive';

  return (
    <PressableScale
      haptic={isPrimary ? 'light' : 'none'}
      accessibilityRole="button"
      accessibilityState={{ disabled: !!(disabled || loading), busy: !!loading }}
      style={[
        styles.base,
        isPrimary && styles.primary,
        variant === 'secondary' && styles.secondary,
        isOutline && styles.outline,
        isDestructive && styles.destructive,
        variant === 'quiet' && styles.quiet,
        (disabled || loading) && styles.disabled,
        style,
      ]}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={isOutline ? colors.primary : colors.white} />
      ) : (
        <Text
          style={[
            styles.text,
            isPrimary && styles.textPrimary,
            variant === 'secondary' && styles.textSecondary,
            isOutline && styles.textOutline,
            variant === 'quiet' && styles.textOutline,
            isDestructive && styles.textPrimary,
          ]}
        >
          {title}
        </Text>
      )}
    </PressableScale>
  );
}

function createStyles({ typography, spacing, fontScale, displayScale }: ThemeSlice) {
  return StyleSheet.create({
    base: {
      paddingVertical: scaleSize(14, displayScale),
      paddingHorizontal: scaleSize(24, displayScale),
      borderRadius: radii.md,
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: scaleSize(52, displayScale),
    },
    quiet: {
      backgroundColor: 'transparent',
      minHeight: scaleSize(44, displayScale),
      paddingVertical: scaleSize(10, displayScale),
    },
    primary: {
      backgroundColor: colors.primary,
    },
    secondary: {
      backgroundColor: colors.primaryMuted,
    },
    outline: {
      borderWidth: 1,
      borderColor: colors.hairline,
      backgroundColor: colors.surface,
    },
    destructive: {
      backgroundColor: colors.danger,
    },
    disabled: {
      opacity: 0.5,
    },
    text: {
      ...typography.label,
      fontSize: scaleFontSize(16, fontScale),
      fontWeight: '600',
    },
    textPrimary: {
      color: colors.white,
    },
    textSecondary: {
      color: colors.primary,
    },
    textOutline: {
      color: colors.primary,
    },
  });
}
