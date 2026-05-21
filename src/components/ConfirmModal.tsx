import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { useThemedStyles, type ThemeSlice } from '../hooks/useThemedStyles';
import { colors, radii } from '../theme';
import { scaleSize } from '../theme/scale';
import { Button } from './Button';

interface ConfirmModalProps {
  visible: boolean;
  title: string;
  message: string;
  confirmLabel: string;
  cancelLabel: string;
  onConfirm: () => void;
  onCancel: () => void;
  destructive?: boolean;
}

export function ConfirmModal({
  visible,
  title,
  message,
  confirmLabel,
  cancelLabel,
  onConfirm,
  onCancel,
  destructive,
}: ConfirmModalProps) {
  const styles = useThemedStyles(createStyles);

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onCancel}>
      <Pressable style={styles.overlay} onPress={onCancel}>
        <Pressable style={styles.card} onPress={(e) => e.stopPropagation()}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>
          <View style={styles.actions}>
            <Button title={cancelLabel} variant="outline" onPress={onCancel} style={styles.btn} />
            <Button
              title={confirmLabel}
              onPress={onConfirm}
              variant={destructive ? 'destructive' : 'primary'}
              style={styles.btn}
            />
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

function createStyles({ typography, spacing, displayScale }: ThemeSlice) {
  return StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.45)',
      justifyContent: 'center',
      padding: spacing.lg,
    },
    card: {
      backgroundColor: colors.white,
      borderRadius: radii.lg,
      padding: spacing.lg,
    },
    title: {
      ...typography.subtitle,
      marginBottom: spacing.sm,
    },
    message: {
      ...typography.body,
      color: colors.textSecondary,
      lineHeight: scaleSize(22, displayScale),
      marginBottom: spacing.lg,
    },
    actions: {
      gap: spacing.sm,
    },
    btn: {
      minHeight: scaleSize(48, displayScale),
    },
  });
}
