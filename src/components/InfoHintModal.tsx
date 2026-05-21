import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { useLanguage } from '../context/LanguageContext';
import { getIndustryLabel } from '../i18n/packs/industryLabels';
import type { IndustryKey } from '../data/industries';
import { DEFAULT_INDUSTRY } from '../data/industries';
import { useThemedStyles, type ThemeSlice } from '../hooks/useThemedStyles';
import { colors, radii } from '../theme';
import { scaleSize } from '../theme/scale';
import { Button } from './Button';

interface InfoHintModalProps {
  visible: boolean;
  fieldLabel: string;
  message: string;
  industry: IndustryKey | '';
  onClose: () => void;
}

export function InfoHintModal({
  visible,
  fieldLabel,
  message,
  industry,
  onClose,
}: InfoHintModalProps) {
  const { t, locale } = useLanguage();
  const styles = useThemedStyles(createStyles);
  const industryKey = (industry || DEFAULT_INDUSTRY) as IndustryKey;
  const industryName = getIndustryLabel(locale, industryKey);

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable style={styles.card} onPress={(e) => e.stopPropagation()}>
          <Text style={styles.eyebrow}>{t.inputHints.modalTitle}</Text>
          <Text style={styles.title}>{fieldLabel}</Text>
          <Text style={styles.industry}>{industryName}</Text>
          <Text style={styles.body}>{message}</Text>
          <Button title={t.common.gotIt} onPress={onClose} style={styles.button} />
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
      maxWidth: scaleSize(400, displayScale),
      alignSelf: 'center',
      width: '100%',
    },
    eyebrow: {
      ...typography.caption,
      color: colors.primary,
      fontWeight: '600',
      marginBottom: spacing.xs,
    },
    title: {
      ...typography.subtitle,
      marginBottom: spacing.xs,
    },
    industry: {
      ...typography.caption,
      color: colors.textSecondary,
      marginBottom: spacing.md,
    },
    body: {
      ...typography.body,
      color: colors.textSecondary,
      lineHeight: scaleSize(24, displayScale),
      marginBottom: spacing.lg,
    },
    button: {
      minHeight: scaleSize(48, displayScale),
    },
  });
}
