import { Modal, StyleSheet, Text, View } from 'react-native';
import { useThemedStyles, type ThemeSlice } from '../hooks/useThemedStyles';
import { colors, radii } from '../theme';
import { scaleFontSize, scaleSize } from '../theme/scale';

interface SavedToastProps {
  visible: boolean;
  message: string;
}

export function SavedToast({ visible, message }: SavedToastProps) {
  const styles = useThemedStyles(createStyles);

  return (
    <Modal visible={visible} transparent animationType="fade" statusBarTranslucent>
      <View style={styles.overlay} pointerEvents="none">
        <View style={styles.toast}>
          <Text style={styles.text}>{message}</Text>
        </View>
      </View>
    </Modal>
  );
}

function createStyles({ typography, spacing, fontScale, displayScale }: ThemeSlice) {
  return StyleSheet.create({
    overlay: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.35)',
    },
    toast: {
      backgroundColor: colors.primary,
      paddingHorizontal: spacing.xl,
      paddingVertical: spacing.lg,
      borderRadius: radii.lg,
      minWidth: scaleSize(160, displayScale),
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 6,
    },
    text: {
      ...typography.subtitle,
      color: colors.white,
      fontSize: scaleFontSize(18, fontScale),
      fontWeight: '600',
    },
  });
}
