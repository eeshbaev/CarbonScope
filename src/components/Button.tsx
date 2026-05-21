import {
  ActivityIndicator,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  type PressableProps,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { useThemedStyles, type ThemeSlice } from '../hooks/useThemedStyles';
import { colors, radii } from '../theme';
import { scaleFontSize, scaleSize } from '../theme/scale';

interface ButtonProps extends Omit<PressableProps, 'style'> {
  title: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'destructive';
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
    <Pressable
      android_ripple={
        Platform.OS === 'android'
          ? { color: isOutline || isDestructive ? 'rgba(45, 106, 79, 0.12)' : 'rgba(255,255,255,0.2)' }
          : undefined
      }
      style={({ pressed }) => [
        styles.base,
        isPrimary && styles.primary,
        variant === 'secondary' && styles.secondary,
        isOutline && styles.outline,
        isDestructive && styles.destructive,
        (disabled || loading) && styles.disabled,
        pressed && !disabled && styles.pressed,
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
          ]}
        >
          {title}
        </Text>
      )}
    </Pressable>
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
    primary: {
      backgroundColor: colors.primary,
    },
    secondary: {
      backgroundColor: colors.primaryMuted,
    },
    outline: {
      backgroundColor: 'transparent',
      borderWidth: 1.5,
      borderColor: colors.primary,
    },
    destructive: {
      backgroundColor: colors.danger,
    },
    disabled: {
      opacity: 0.5,
    },
    pressed: {
      opacity: 0.85,
    },
    text: {
      ...typography.label,
      fontSize: scaleFontSize(16, fontScale),
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
