import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { useThemedStyles, type ThemeSlice } from '../hooks/useThemedStyles';
import { colors, radii } from '../theme';
import { scaleFontSize, scaleSize } from '../theme/scale';
import { Button } from './Button';

interface RateAppModalProps {
  visible: boolean;
  title: string;
  message: string;
  rateLabel: string;
  laterLabel: string;
  dismissLabel: string;
  onRate: () => void;
  onLater: () => void;
  onDismiss: () => void;
}

export function RateAppModal({
  visible,
  title,
  message,
  rateLabel,
  laterLabel,
  dismissLabel,
  onRate,
  onLater,
  onDismiss,
}: RateAppModalProps) {
  const styles = useThemedStyles(createStyles);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onLater}
      statusBarTranslucent
    >
      <Pressable style={styles.overlay} onPress={onLater} accessibilityRole="button">
        <Pressable style={styles.card} onPress={(e) => e.stopPropagation()}>
          <Text style={styles.emoji}>⭐</Text>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>
          <View style={styles.actions}>
            <Button title={rateLabel} onPress={onRate} />
            <Button title={laterLabel} variant="outline" onPress={onLater} />
            <Pressable onPress={onDismiss} style={styles.dismissBtn} hitSlop={12}>
              <Text style={styles.dismissText}>{dismissLabel}</Text>
            </Pressable>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

function createStyles({ typography, spacing, fontScale, displayScale }: ThemeSlice) {
  return StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.45)',
      justifyContent: 'center',
      padding: spacing.lg,
      zIndex: 9999,
    },
    card: {
      backgroundColor: colors.white,
      borderRadius: radii.lg,
      padding: spacing.lg,
      maxWidth: scaleSize(400, displayScale),
      alignSelf: 'center',
      width: '100%',
    },
    emoji: {
      fontSize: scaleFontSize(36, fontScale),
      textAlign: 'center',
      marginBottom: spacing.sm,
    },
    title: {
      ...typography.subtitle,
      textAlign: 'center',
      marginBottom: spacing.sm,
    },
    message: {
      ...typography.body,
      color: colors.textSecondary,
      lineHeight: scaleSize(24, displayScale),
      textAlign: 'center',
      marginBottom: spacing.lg,
    },
    actions: {
      gap: spacing.sm,
    },
    dismissBtn: {
      alignItems: 'center',
      paddingVertical: spacing.sm,
    },
    dismissText: {
      ...typography.caption,
      color: colors.textSecondary,
    },
  });
}
