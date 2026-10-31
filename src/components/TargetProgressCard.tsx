import { StyleSheet, Text, View } from 'react-native';
import { formatEmissions } from '../calculations';
import { useThemedStyles, type ThemeSlice } from '../hooks/useThemedStyles';
import type { TranslationKeys } from '../i18n/locales/en';
import type { Assessment } from '../types';
import { computeTargetGap } from '../utils/targets';
import { colors, radii } from '../theme';
import { scaleFontSize } from '../theme/scale';

type Props = {
  assessment: Assessment;
  allAssessments: Assessment[];
  t: TranslationKeys;
  compact?: boolean;
};

export function TargetProgressCard({ assessment, allAssessments, t, compact }: Props) {
  const styles = useThemedStyles(createStyles);
  const et = t.enterprise.targets;
  const gap = computeTargetGap(assessment, allAssessments, {
    targetPercent: (v) => et.targetPercent.replace('{value}', String(v)),
    targetAbsolute: (v) => et.targetAbsolute.replace('{value}', v),
    noBaseline: et.noBaseline,
  });

  if (!gap.hasTarget) {
    if (compact) return null;
    return (
      <View style={styles.card}>
        <Text style={styles.title}>{et.title}</Text>
        <Text style={styles.muted}>{et.noTargetSet}</Text>
      </View>
    );
  }

  const gapStr =
    gap.gapTco2e != null
      ? `${gap.gapTco2e > 0 ? '+' : ''}${formatEmissions(gap.gapTco2e)} tCO₂e`
      : '—';

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{et.title}</Text>
      <Text style={styles.targetLine}>{gap.targetLabel}</Text>
      <View style={styles.row}>
        <View style={styles.col}>
          <Text style={styles.label}>{et.current}</Text>
          <Text style={styles.value}>{formatEmissions(gap.currentTco2e)}</Text>
        </View>
        <View style={styles.col}>
          <Text style={styles.label}>{et.target}</Text>
          <Text style={styles.value}>
            {gap.targetTco2e != null ? formatEmissions(gap.targetTco2e) : '—'}
          </Text>
        </View>
        <View style={styles.col}>
          <Text style={styles.label}>{et.gap}</Text>
          <Text
            style={[
              styles.value,
              gap.onTrack === true && styles.good,
              gap.onTrack === false && styles.warn,
            ]}
          >
            {gapStr}
          </Text>
        </View>
      </View>
      {gap.onTrack != null ? (
        <Text style={[styles.status, gap.onTrack ? styles.good : styles.warn]}>
          {gap.onTrack ? et.onTrack : et.aboveTarget}
        </Text>
      ) : null}
      {!compact && gap.mixedFactors ? (
        <Text style={styles.muted}>{t.results.mixedFactorsNote}</Text>
      ) : null}
      {!compact && gap.basis === 'scope12' ? (
        <Text style={styles.muted}>{et.basisScope12}</Text>
      ) : null}
      {!compact && gap.baselineTco2e == null ? (
        <Text style={styles.muted}>{et.noBaseline}</Text>
      ) : null}
    </View>
  );
}

function createStyles({ typography, spacing, fontScale }: ThemeSlice) {
  return StyleSheet.create({
    card: {
      backgroundColor: colors.card,
      borderRadius: radii.md,
      borderWidth: 1,
      borderColor: colors.border,
      padding: spacing.md,
      marginBottom: spacing.md,
    },
    title: {
      ...typography.subtitle,
      marginBottom: spacing.xs,
    },
    targetLine: {
      ...typography.caption,
      color: colors.primary,
      fontWeight: '600',
      marginBottom: spacing.sm,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: spacing.sm,
    },
    col: { flex: 1 },
    label: {
      ...typography.caption,
      color: colors.textSecondary,
    },
    value: {
      ...typography.body,
      fontWeight: '700',
      fontSize: scaleFontSize(15, fontScale),
    },
    status: {
      ...typography.caption,
      marginTop: spacing.sm,
      fontWeight: '600',
    },
    good: { color: colors.primary },
    warn: { color: '#C1121F' },
    muted: {
      ...typography.caption,
      color: colors.textSecondary,
      marginTop: spacing.xs,
    },
  });
}
