import { StyleSheet, Text, View } from 'react-native';
import { formatEmissions } from '../calculations';
import { countryCodeToFlag } from '../data/countries';
import { useLanguage } from '../context/LanguageContext';
import { useThemedStyles, type ThemeSlice } from '../hooks/useThemedStyles';
import { getLocalizedCountryName } from '../utils/localizeCountry';
import { getTco2eLabel } from '../utils/reportingPeriodCopy';
import type { Assessment } from '../types';
import { colors, radii } from '../theme';
import { scaleFontSize } from '../theme/scale';

type Props = {
  assessment: Assessment;
};

/** Ghost row shown briefly after delete before the rate prompt. */
export function DeletedCompanyCard({ assessment }: Props) {
  const { t, locale } = useLanguage();
  const styles = useThemedStyles(createStyles);
  const countryName = getLocalizedCountryName(
    assessment.countryCode,
    locale,
    assessment.country
  );

  return (
    <View style={styles.card} accessibilityRole="text">
      <View style={styles.deletedBanner}>
        <Text style={styles.deletedLabel}>{t.delete.deletedInList}</Text>
      </View>
      <View style={styles.header}>
        <Text style={[styles.name, styles.struck]} numberOfLines={1}>
          {assessment.companyName}
        </Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>
            {formatEmissions(assessment.totalEmissions)}{' '}
            {getTco2eLabel(t, assessment.reportingPeriod)}
          </Text>
        </View>
      </View>
      <Text style={styles.meta}>
        {countryCodeToFlag(assessment.countryCode)} {countryName}
      </Text>
    </View>
  );
}

function createStyles({ typography, spacing, fontScale }: ThemeSlice) {
  return StyleSheet.create({
    card: {
      backgroundColor: colors.card,
      borderRadius: radii.lg,
      padding: spacing.md,
      borderWidth: 1,
      borderColor: colors.border,
      marginBottom: spacing.md,
      opacity: 0.72,
    },
    deletedBanner: {
      alignSelf: 'flex-start',
      backgroundColor: colors.primaryMuted,
      borderRadius: radii.sm,
      paddingHorizontal: spacing.sm,
      paddingVertical: spacing.xs,
      marginBottom: spacing.sm,
    },
    deletedLabel: {
      ...typography.caption,
      color: colors.primary,
      fontWeight: '700',
      textTransform: 'uppercase',
      letterSpacing: 0.4,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      gap: spacing.sm,
    },
    name: {
      ...typography.subtitle,
      flex: 1,
      color: colors.textSecondary,
    },
    struck: {
      textDecorationLine: 'line-through',
    },
    badge: {
      backgroundColor: colors.border,
      paddingHorizontal: spacing.sm,
      paddingVertical: spacing.xs,
      borderRadius: radii.sm,
    },
    badgeText: {
      ...typography.caption,
      color: colors.textSecondary,
      fontWeight: '600',
      fontSize: scaleFontSize(11, fontScale),
    },
    meta: {
      ...typography.body,
      color: colors.textSecondary,
      fontSize: scaleFontSize(14, fontScale),
      marginTop: spacing.xs,
    },
  });
}
