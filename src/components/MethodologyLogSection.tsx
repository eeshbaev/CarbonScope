import { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Card } from './Card';
import { useLanguage } from '../context/LanguageContext';
import { useThemedStyles, type ThemeSlice } from '../hooks/useThemedStyles';
import { formatAppDateTime } from '../utils/appLocale';
import { getMethodologyLogForAssessment } from '../storage/methodologyLog';
import type { MethodologyLogEntry, MethodologyLogAction } from '../types/enterprise';
import { colors, radii } from '../theme';
import { scaleSize } from '../theme/scale';

interface MethodologyLogSectionProps {
  assessmentId: string;
  maxEntries?: number;
}

export function MethodologyLogSection({
  assessmentId,
  maxEntries = 20,
}: MethodologyLogSectionProps) {
  const { t, locale } = useLanguage();
  const styles = useThemedStyles(createStyles);
  const ml = t.enterprise.methodologyLog;
  const [entries, setEntries] = useState<MethodologyLogEntry[]>([]);

  const actionLabel = (action: MethodologyLogAction) => ml.actions[action];

  const reload = useCallback(async () => {
    const list = await getMethodologyLogForAssessment(assessmentId);
    setEntries(list.slice(0, maxEntries));
  }, [assessmentId, maxEntries]);

  useEffect(() => {
    void reload();
  }, [reload]);

  return (
    <Card style={styles.wrap}>
      <Text style={styles.section}>{ml.title}</Text>
      <Text style={styles.hint}>{ml.hint}</Text>
      {entries.length === 0 ? (
        <Text style={styles.empty}>{ml.empty}</Text>
      ) : (
        entries.map((e) => (
          <View key={e.id} style={styles.row}>
            <Text style={styles.meta}>
              {formatAppDateTime(new Date(e.timestamp), locale)} · {actionLabel(e.action)} · v
              {e.factorVersion} · {e.factorYear}
              {e.fuelFactorVersion ? ` · fuels v${e.fuelFactorVersion}` : ''}
            </Text>
            <Text style={styles.meta}>
              {ml.factorLine
                .replace('{factor}', String(e.electricityFactor))
                .replace('{custom}', e.customFactor ? ml.customYes : ml.customNo)}
            </Text>
          </View>
        ))
      )}
    </Card>
  );
}

function createStyles({ typography, spacing, displayScale }: ThemeSlice) {
  return StyleSheet.create({
    wrap: {
      marginBottom: spacing.md,
    },
    section: { ...typography.subtitle, marginBottom: spacing.xs },
    hint: { ...typography.caption, color: colors.textSecondary, marginBottom: spacing.sm },
    empty: { ...typography.caption, color: colors.textSecondary },
    row: {
      padding: spacing.sm,
      borderRadius: radii.sm,
      borderWidth: 1,
      borderColor: colors.border,
      marginBottom: spacing.sm,
      backgroundColor: colors.white,
    },
    meta: { ...typography.caption, color: colors.textSecondary, marginTop: scaleSize(2, displayScale) },
  });
}
