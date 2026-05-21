import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Button } from './Button';
import { useLanguage } from '../context/LanguageContext';
import { useThemedStyles, type ThemeSlice } from '../hooks/useThemedStyles';
import { colors, radii } from '../theme';
import { scaleSize } from '../theme/scale';

type Props = {
  visible: boolean;
  title: string;
  body: string;
  onClose: () => void;
};

export function InsightDetailModal({ visible, title, body, onClose }: Props) {
  const { t } = useLanguage();
  const styles = useThemedStyles(createStyles);

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.backdrop} onPress={onClose}>
        <Pressable style={styles.sheet} onPress={(e) => e.stopPropagation()}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.body}>{body}</Text>
          </ScrollView>
          <Button title={t.common.gotIt} onPress={onClose} style={styles.btn} />
        </Pressable>
      </Pressable>
    </Modal>
  );
}

function createStyles({ typography, spacing, displayScale }: ThemeSlice) {
  return StyleSheet.create({
    backdrop: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.45)',
      justifyContent: 'center',
      padding: spacing.lg,
    },
    sheet: {
      backgroundColor: colors.card,
      borderRadius: radii.lg,
      padding: spacing.lg,
      maxHeight: '80%',
    },
    title: {
      ...typography.subtitle,
      color: colors.primary,
      marginBottom: spacing.md,
    },
    body: {
      ...typography.body,
      lineHeight: scaleSize(24, displayScale),
      color: colors.text,
    },
    btn: {
      marginTop: spacing.lg,
    },
  });
}
