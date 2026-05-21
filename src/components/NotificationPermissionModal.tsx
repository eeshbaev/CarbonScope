import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { useThemedStyles, type ThemeSlice } from '../hooks/useThemedStyles';
import { colors, radii } from '../theme';
import { scaleSize } from '../theme/scale';
import { Button } from './Button';

interface NotificationPermissionModalProps {
  visible: boolean;
  title: string;
  message: string;
  enableLabel: string;
  notNowLabel: string;
  onEnable: () => void;
  onDismiss: () => void;
}

export function NotificationPermissionModal({
  visible,
  title,
  message,
  enableLabel,
  notNowLabel,
  onEnable,
  onDismiss,
}: NotificationPermissionModalProps) {
  const styles = useThemedStyles(createStyles);

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onDismiss}>
      <Pressable style={styles.overlay} onPress={onDismiss}>
        <Pressable style={styles.card} onPress={(e) => e.stopPropagation()}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>
          <View style={styles.actions}>
            <Button title={notNowLabel} variant="outline" onPress={onDismiss} style={styles.btn} />
            <Button title={enableLabel} onPress={onEnable} style={styles.btn} />
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
      borderWidth: 1,
      borderColor: colors.border,
    },
    title: {
      ...typography.subtitle,
      color: colors.primary,
      marginBottom: spacing.sm,
    },
    message: {
      ...typography.body,
      marginBottom: spacing.lg,
      lineHeight: scaleSize(22, displayScale),
    },
    actions: {
      gap: spacing.sm,
    },
    btn: {
      width: '100%',
    },
  });
}
