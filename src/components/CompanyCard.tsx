import { Pressable, StyleSheet, Text, View } from 'react-native';
import { formatEmissions } from '../calculations';
import { getPeriodWithRangeLabel, getTco2eLabel } from '../utils/reportingPeriodCopy';
import { countryCodeToFlag } from '../data/countries';
import { useLanguage } from '../context/LanguageContext';
import { useThemedStyles, type ThemeSlice } from '../hooks/useThemedStyles';
import { formatAppDate } from '../utils/appLocale';
import { getLocalizedCountryName } from '../utils/localizeCountry';
import { getIndustryLabel } from '../i18n/packs/industryLabels';
import type { Assessment } from '../types';
import { computeTargetGap } from '../utils/targets';
import { colors, radii } from '../theme';
import { cardElevated } from '../theme/elevated';
import { scaleFontSize, scaleSize } from '../theme/scale';

interface CompanyCardProps {
  assessment: Assessment;
  allAssessments?: Assessment[];
  onPress: () => void;
  onLongPress?: () => void;
  onQuickAdd?: () => void;
}

export function CompanyCard({
  assessment,
  allAssessments = [],
  onPress,
  onLongPress,
  onQuickAdd,
}: CompanyCardProps) {
  const { t, locale } = useLanguage();
  const styles = useThemedStyles(createStyles);
  const date = formatAppDate(new Date(assessment.updatedAt), locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
  const periodRange = getPeriodWithRangeLabel(
    t,
    assessment.reportingStartDate,
    assessment.reportingPeriod,
    locale
  );
  const periodLabel = periodRange ?? t.reportingPeriods[assessment.reportingPeriod];

  const gap = computeTargetGap(assessment, allAssessments, {
    targetPercent: (v) => `${v}%`,
    targetAbsolute: (v) => v,
    noBaseline: '',
  });

  const countryName = getLocalizedCountryName(
    assessment.countryCode,
    locale,
    assessment.country
  );

  return (
    <View style={styles.card}>
      <View style={styles.cardInner}>
        <Pressable
          onPress={onPress}
          onLongPress={onLongPress}
          delayLongPress={400}
          style={({ pressed }) => [
            styles.cardPressable,
            onQuickAdd && styles.cardPressableWithAdd,
            pressed && styles.pressed,
          ]}
        >
        <View style={styles.header}>
          <Text style={styles.name} numberOfLines={1}>
            {assessment.companyName || t.home.unnamedCompany}
          </Text>
          <View style={styles.badges}>
            {assessment.isDraft ? (
              <View style={styles.draftBadge}>
                <Text style={styles.draftBadgeText}>{t.home.draftBadge}</Text>
              </View>
            ) : null}
            <View style={styles.badge}>
              <Text style={styles.badgeText}>
                {formatEmissions(assessment.totalEmissions)}{' '}
                {getTco2eLabel(t, assessment.reportingPeriod)}
              </Text>
            </View>
          </View>
        </View>
        <Text style={styles.meta}>
          {countryCodeToFlag(assessment.countryCode)} {countryName}
        </Text>
        <Text style={styles.industry}>{getIndustryLabel(locale, assessment.industry)}</Text>
        {assessment.clientTag ? (
          <Text style={styles.tag}>{assessment.clientTag}</Text>
        ) : null}
        {gap.hasTarget && gap.gapTco2e != null ? (
          <Text style={[styles.targetLine, gap.onTrack ? styles.onTrack : styles.aboveTarget]}>
            {gap.onTrack
              ? t.home.onTrack
              : t.home.targetGapShort.replace(
                  '{gap}',
                  `${gap.gapTco2e > 0 ? '+' : ''}${formatEmissions(gap.gapTco2e)} tCO₂e`
                )}
          </Text>
        ) : null}
        <View style={styles.periodBlock}>
          <Text style={styles.period} numberOfLines={3}>
            {periodLabel}
          </Text>
        </View>
        <View style={styles.footer}>
          <Text style={styles.updatedLabel}>{t.results.updated}</Text>
          <Text style={styles.updated}>{date}</Text>
        </View>
        </Pressable>
        {onQuickAdd ? (
          <Pressable
            onPress={onQuickAdd}
            hitSlop={8}
            style={({ pressed }) => [styles.addBtnRail, pressed && styles.addBtnPressed]}
            accessibilityRole="button"
            accessibilityLabel={t.home.quickEditAddData}
          >
            <View style={styles.addBtn}>
              <Text style={styles.addBtnText}>+</Text>
            </View>
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}

function createStyles({ typography, spacing, fontScale, displayScale }: ThemeSlice) {
  const addBtnSize = scaleSize(36, displayScale);
  return StyleSheet.create({
    card: {
      backgroundColor: colors.card,
      borderRadius: radii.lg,
      borderWidth: 1,
      borderColor: colors.border,
      marginBottom: spacing.md,
      overflow: 'hidden',
      ...cardElevated,
    },
    cardInner: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    cardPressable: {
      flex: 1,
      padding: spacing.md,
    },
    cardPressableWithAdd: {
      paddingRight: spacing.sm,
    },
    pressed: {
      opacity: 0.92,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      gap: spacing.sm,
      marginBottom: spacing.xs,
    },
    addBtnRail: {
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'stretch',
      paddingRight: spacing.md,
      paddingLeft: spacing.xs,
    },
    addBtn: {
      width: addBtnSize,
      height: addBtnSize,
      borderRadius: addBtnSize / 2,
      borderWidth: 1.5,
      borderColor: colors.primary,
      backgroundColor: colors.primaryMuted,
      alignItems: 'center',
      justifyContent: 'center',
    },
    addBtnPressed: {
      opacity: 0.85,
    },
    addBtnText: {
      fontSize: scaleFontSize(20, fontScale),
      fontWeight: '700',
      color: colors.primary,
      lineHeight: scaleSize(22, displayScale),
      marginTop: -1,
    },
    name: {
      ...typography.subtitle,
      flex: 1,
    },
    badges: {
      flexShrink: 0,
      alignItems: 'flex-end',
      gap: spacing.xs,
    },
    draftBadge: {
      backgroundColor: '#FFF4E5',
      paddingHorizontal: spacing.sm,
      paddingVertical: spacing.xs,
      borderRadius: radii.sm,
      borderWidth: 1,
      borderColor: '#F5D9A8',
    },
    draftBadgeText: {
      ...typography.caption,
      color: '#9A6700',
      fontWeight: '700',
      fontSize: scaleFontSize(10, fontScale),
      textTransform: 'uppercase',
    },
    badge: {
      flexShrink: 0,
      backgroundColor: colors.primaryMuted,
      paddingHorizontal: spacing.sm,
      paddingVertical: spacing.xs,
      borderRadius: radii.sm,
    },
    badgeText: {
      ...typography.caption,
      color: colors.primary,
      fontWeight: '600',
      fontSize: scaleFontSize(11, fontScale),
    },
    meta: {
      ...typography.body,
      color: colors.textSecondary,
      fontSize: scaleFontSize(14, fontScale),
    },
    industry: {
      ...typography.caption,
      color: colors.textSecondary,
      marginTop: scaleSize(2, displayScale),
    },
    tag: {
      ...typography.caption,
      color: colors.primary,
      marginTop: scaleSize(2, displayScale),
      fontWeight: '600',
    },
    targetLine: {
      ...typography.caption,
      marginTop: scaleSize(4, displayScale),
      fontWeight: '600',
    },
    onTrack: { color: colors.primary },
    aboveTarget: { color: '#C1121F' },
    periodBlock: {
      marginTop: spacing.sm,
    },
    period: {
      ...typography.caption,
      color: colors.primary,
      fontWeight: '600',
      lineHeight: scaleSize(18, displayScale),
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: spacing.sm,
      paddingTop: spacing.sm,
      borderTopWidth: 1,
      borderTopColor: colors.border,
    },
    updatedLabel: {
      ...typography.caption,
      color: colors.textSecondary,
    },
    updated: {
      ...typography.caption,
      color: colors.textSecondary,
    },
  });
}
