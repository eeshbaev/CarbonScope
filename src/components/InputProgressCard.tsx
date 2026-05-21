import { StyleSheet, Text, View } from 'react-native';
import { CategoryLabel } from './CategoryLabel';
import { Card } from './Card';
import type { EmissionCategoryKey } from '../data/categoryEmblems';
import { useLanguage } from '../context/LanguageContext';
import { useThemedStyles, type ThemeSlice } from '../hooks/useThemedStyles';
import type { CategoryInput } from '../types/scopeInputs';
import { computeCategoryProgress } from '../utils/inputProgress';
import type { ReportingMonth } from '../utils/reportingMonths';
import { colors } from '../theme';
import { scaleFontSize, scaleSize } from '../theme/scale';

type Line = { key: EmissionCategoryKey; label: string; input: CategoryInput };

type Props = {
  lines: Line[];
  months: ReportingMonth[];
};

function isMonthlyLine(input: CategoryInput, months: ReportingMonth[]): boolean {
  return months.length > 0 && input.useMonthly;
}

export function InputProgressCard({ lines, months }: Props) {
  const { t } = useLanguage();
  const styles = useThemedStyles(createStyles);

  const statusText = (input: CategoryInput, filled: number, total: number): string => {
    if (isMonthlyLine(input, months)) {
      return t.scopeInputs.progressMonths
        .replace('{filled}', String(filled))
        .replace('{total}', String(total));
    }
    return filled > 0 ? t.scopeInputs.progressFilled : t.scopeInputs.progressNotFilled;
  };

  return (
    <Card style={styles.card}>
      <Text style={styles.title}>{t.scopeInputs.progressTitle}</Text>
      {lines.map((line) => {
        const { filled, total } = computeCategoryProgress(line.input, months);
        const monthly = isMonthlyLine(line.input, months);
        const pct = monthly && total > 0 ? Math.round((filled / total) * 100) : filled > 0 ? 100 : 0;
        return (
          <View key={line.key} style={styles.row}>
            <CategoryLabel category={line.key} label={line.label} style={styles.label} />
            <View style={styles.track}>
              <View style={[styles.fill, { width: `${pct}%` }]} />
            </View>
            <Text style={styles.meta}>{statusText(line.input, filled, total)}</Text>
          </View>
        );
      })}
    </Card>
  );
}

function createStyles({ typography, spacing, fontScale, displayScale }: ThemeSlice) {
  return StyleSheet.create({
    card: {
      marginBottom: spacing.md,
    },
    title: {
      ...typography.subtitle,
      fontSize: scaleFontSize(15, fontScale),
      marginBottom: spacing.sm,
    },
    row: {
      marginBottom: spacing.sm,
    },
    label: {
      ...typography.body,
      fontSize: scaleFontSize(14, fontScale),
      fontWeight: '600',
      flex: 1,
    },
    track: {
      height: scaleSize(6, displayScale),
      backgroundColor: colors.border,
      borderRadius: scaleSize(3, displayScale),
      overflow: 'hidden',
    },
    fill: {
      height: '100%',
      backgroundColor: colors.primary,
      borderRadius: scaleSize(3, displayScale),
    },
    meta: {
      ...typography.caption,
      marginTop: scaleSize(2, displayScale),
      color: colors.textSecondary,
    },
  });
}
