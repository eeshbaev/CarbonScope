import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { useLanguage } from '../context/LanguageContext';
import { useThemedStyles, type ThemeSlice } from '../hooks/useThemedStyles';
import type { EvidenceCategory, EvidenceItem } from '../types/enterprise';
import { getEvidenceForSlot } from '../utils/evidenceHelpers';
import { colors } from '../theme';
import { scaleFontSize, scaleSize } from '../theme/scale';
import { EvidenceAttachButton } from './EvidenceAttachButton';

export interface EvidenceDocumentSlotProps {
  category: EvidenceCategory;
  items?: EvidenceItem[];
  monthKey?: string;
  busy?: boolean;
  onPress: () => void;
  onDelete: (item: EvidenceItem) => void;
}

/** Icon-only control for the category / month header row. */
export function EvidenceDocumentIcon({
  category,
  items,
  monthKey,
  busy,
  onPress,
}: Pick<EvidenceDocumentSlotProps, 'category' | 'items' | 'monthKey' | 'busy' | 'onPress'>) {
  const { t } = useLanguage();
  const file = getEvidenceForSlot(items, category, monthKey);

  return (
    <EvidenceAttachButton
      hasFile={!!file}
      onPress={onPress}
      disabled={busy}
      accessibilityLabel={
        file ? t.enterprise.evidence.viewDocument : t.enterprise.evidence.attachFile
      }
    />
  );
}

/** Full-width row shown under the category or month when a document is attached. */
export function EvidenceDocumentRow({
  category,
  items,
  monthKey,
  busy,
  onPress,
  onDelete,
}: EvidenceDocumentSlotProps) {
  const { t } = useLanguage();
  const styles = useThemedStyles(createStyles);
  const file = getEvidenceForSlot(items, category, monthKey);
  if (!file) return null;

  return (
    <View style={styles.fileRow}>
      <Pressable
        style={({ pressed }) => [styles.fileNameBtn, pressed && styles.pressed]}
        onPress={onPress}
        disabled={busy}
        accessibilityRole="button"
        accessibilityLabel={t.enterprise.evidence.viewDocument}
      >
        {busy ? (
          <ActivityIndicator size="small" color={colors.primary} />
        ) : (
          <Text style={styles.fileName} numberOfLines={2}>
            {t.enterprise.evidence.uploaded.replace('{fileName}', file.fileName)}
          </Text>
        )}
      </Pressable>
      <Pressable
        onPress={() => onDelete(file)}
        disabled={busy}
        hitSlop={12}
        accessibilityRole="button"
        accessibilityLabel={t.common.delete}
        style={({ pressed }) => [styles.deleteBtn, pressed && styles.pressed]}
      >
        <Text style={styles.deleteIcon}>×</Text>
      </Pressable>
    </View>
  );
}

function createStyles({ typography, spacing, fontScale, displayScale }: ThemeSlice) {
  const deleteBtnSize = scaleSize(24, displayScale);
  return StyleSheet.create({
    fileRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.sm,
      marginTop: spacing.xs,
      marginBottom: spacing.xs,
      paddingHorizontal: spacing.xs,
    },
    fileNameBtn: {
      flex: 1,
      minHeight: scaleSize(22, displayScale),
      justifyContent: 'center',
    },
    fileName: {
      ...typography.caption,
      color: colors.primary,
      fontWeight: '600',
      textDecorationLine: 'underline',
    },
    deleteBtn: {
      width: deleteBtnSize,
      height: deleteBtnSize,
      borderRadius: deleteBtnSize / 2,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.white,
      alignItems: 'center',
      justifyContent: 'center',
    },
    deleteIcon: {
      color: '#C1121F',
      fontSize: scaleFontSize(17, fontScale),
      fontWeight: '700',
      lineHeight: scaleSize(19, displayScale),
      marginTop: -1,
    },
    pressed: {
      opacity: 0.7,
    },
  });
}
