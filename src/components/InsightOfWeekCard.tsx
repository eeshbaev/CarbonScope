import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Card } from './Card';
import { useLanguage } from '../context/LanguageContext';
import { useThemedStyles, type ThemeSlice } from '../hooks/useThemedStyles';
import { tipKeyForWeek } from '../notifications/educationalTips';
import type { EducationalTipKey } from '../notifications/educationalTips';
import { colors } from '../theme';
import { scaleFontSize, scaleSize } from '../theme/scale';

type Props = {
  onPress: (tipKey: EducationalTipKey, body: string, title: string) => void;
};

export function InsightOfWeekCard({ onPress }: Props) {
  const { t } = useLanguage();
  const styles = useThemedStyles(createStyles);
  const weekIndex = Math.floor(Date.now() / (7 * 24 * 60 * 60 * 1000));
  const tipKey = tipKeyForWeek(weekIndex);
  const body = t.notifications.tips[tipKey];

  return (
    <Pressable
      onPress={() => onPress(tipKey, body, t.notifications.insightOfWeekTitle)}
    >
      <Card style={styles.card}>
        <View style={styles.eyebrowRow}>
          <Text style={styles.eyebrowIcon}>💡</Text>
          <Text style={styles.eyebrow}>{t.notifications.insightOfWeekTitle}</Text>
        </View>
        <Text style={styles.body} numberOfLines={4}>
          {body}
        </Text>
        <Text style={styles.tap}>{t.notifications.insightTap} ›</Text>
      </Card>
    </Pressable>
  );
}

function createStyles({ typography, spacing, fontScale, displayScale }: ThemeSlice) {
  return StyleSheet.create({
    card: {
      marginBottom: spacing.md,
      borderColor: colors.primaryLight,
      backgroundColor: colors.primaryMuted,
    },
    eyebrowRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.xs,
      marginBottom: spacing.xs,
    },
    eyebrowIcon: {
      fontSize: scaleFontSize(16, fontScale),
      lineHeight: scaleFontSize(18, fontScale),
    },
    eyebrow: {
      ...typography.caption,
      color: colors.primary,
      fontWeight: '700',
      textTransform: 'uppercase',
      letterSpacing: 0.4,
      flexShrink: 1,
    },
    body: {
      ...typography.body,
      fontSize: scaleFontSize(14, fontScale),
      lineHeight: scaleSize(22, displayScale),
      color: colors.text,
    },
    tap: {
      ...typography.caption,
      color: colors.primary,
      fontWeight: '600',
      marginTop: spacing.sm,
    },
  });
}
