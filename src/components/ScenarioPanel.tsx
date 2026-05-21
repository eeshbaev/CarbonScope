import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { formatEmissions } from '../calculations';
import { useLanguage } from '../context/LanguageContext';
import { useThemedStyles, type ThemeSlice } from '../hooks/useThemedStyles';
import type { Assessment } from '../types';
import {
  computeScenarioTotals,
  DEFAULT_SCENARIO,
  getBaselineTotals,
  type ScenarioAdjustments,
} from '../utils/scenarios';
import { formatCategoryLabel } from '../data/categoryEmblems';
import { colors, radii } from '../theme';
import { scaleSize } from '../theme/scale';

type Props = {
  assessment: Assessment;
};

function SliderRow({
  label,
  value,
  onChange,
  styles,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  styles: ReturnType<typeof createStyles>;
}) {
  const steps = [-20, -10, 0, 10, 20];
  return (
    <View style={styles.sliderRow}>
      <Text style={styles.sliderLabel}>{label}</Text>
      <View style={styles.steps}>
        {steps.map((s) => (
          <Pressable key={s} onPress={() => onChange(s)}>
            <Text style={[styles.step, value === s && styles.stepOn]}>
              {s > 0 ? `+${s}%` : `${s}%`}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

export function ScenarioPanel({ assessment }: Props) {
  const { t } = useLanguage();
  const styles = useThemedStyles(createStyles);
  const es = t.enterprise.scenarios;
  const [adj, setAdj] = useState<ScenarioAdjustments>({ ...DEFAULT_SCENARIO });

  const baseline = useMemo(() => getBaselineTotals(assessment), [assessment]);
  const scenario = useMemo(() => computeScenarioTotals(assessment, adj), [assessment, adj]);
  const delta = scenario.total - baseline.total;
  const deltaPct = baseline.total > 0 ? (delta / baseline.total) * 100 : 0;

  const set = (patch: Partial<ScenarioAdjustments>) =>
    setAdj((prev) => ({ ...prev, ...patch }));

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{es.title}</Text>
      <Text style={styles.hint}>{es.hint}</Text>
      <SliderRow
        label={formatCategoryLabel(es.electricity, 'electricity')}
        value={adj.electricityPct}
        onChange={(v) => set({ electricityPct: v })}
        styles={styles}
      />
      <SliderRow
        label={formatCategoryLabel(es.diesel, 'diesel')}
        value={adj.dieselPct}
        onChange={(v) => set({ dieselPct: v })}
        styles={styles}
      />
      <SliderRow
        label={formatCategoryLabel(es.petrol, 'petrol')}
        value={adj.petrolPct}
        onChange={(v) => set({ petrolPct: v })}
        styles={styles}
      />
      <SliderRow
        label={formatCategoryLabel(es.gas, 'naturalGas')}
        value={adj.gasPct}
        onChange={(v) => set({ gasPct: v })}
        styles={styles}
      />
      <SliderRow
        label={es.fleetEv}
        value={adj.fleetEvPct}
        onChange={(v) => set({ fleetEvPct: Math.max(0, v) })}
        styles={styles}
      />
      <View style={styles.resultBox}>
        <Text style={styles.resultLabel}>{es.scenarioTotal}</Text>
        <Text style={styles.resultValue}>
          {formatEmissions(scenario.total)} tCO₂e ({delta >= 0 ? '+' : ''}
          {formatEmissions(delta)} / {deltaPct >= 0 ? '+' : ''}
          {deltaPct.toFixed(1)}%)
        </Text>
      </View>
      <Text style={styles.disclaimer}>{es.disclaimer}</Text>
    </View>
  );
}

function createStyles({ typography, spacing, displayScale }: ThemeSlice) {
  return StyleSheet.create({
    card: {
      backgroundColor: colors.card,
      borderRadius: radii.md,
      borderWidth: 1,
      borderColor: colors.border,
      padding: spacing.md,
      marginBottom: spacing.md,
    },
    title: { ...typography.subtitle, marginBottom: spacing.xs },
    hint: { ...typography.caption, color: colors.textSecondary, marginBottom: spacing.md },
    sliderRow: { marginBottom: spacing.sm },
    sliderLabel: { ...typography.caption, fontWeight: '600', marginBottom: scaleSize(4, displayScale) },
    steps: { flexDirection: 'row', flexWrap: 'wrap', gap: scaleSize(6, displayScale) },
    step: {
      paddingHorizontal: scaleSize(8, displayScale),
      paddingVertical: scaleSize(4, displayScale),
      borderRadius: radii.sm,
      borderWidth: 1,
      borderColor: colors.border,
      ...typography.caption,
      overflow: 'hidden',
    },
    stepOn: {
      borderColor: colors.primary,
      backgroundColor: colors.primaryMuted,
      color: colors.primary,
      fontWeight: '700',
    },
    resultBox: {
      marginTop: spacing.sm,
      padding: spacing.sm,
      backgroundColor: colors.primaryMuted,
      borderRadius: radii.sm,
    },
    resultLabel: { ...typography.caption, color: colors.textSecondary },
    resultValue: { ...typography.body, fontWeight: '700', color: colors.primary },
    disclaimer: {
      ...typography.caption,
      color: colors.textSecondary,
      marginTop: spacing.sm,
      fontStyle: 'italic',
    },
  });
}
