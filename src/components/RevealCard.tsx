import { Lock } from 'lucide-react-native';
import { useEffect, useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useLanguage } from '../context/LanguageContext';
import { ScopeRing } from '../design/ScopeRing';
import { getGoal, type OnboardingGoal } from '../onboarding/state';
import { revealSummary } from '../onboarding/reveal';
import { colors, radii } from '../theme';
import type { Assessment } from '../types';
import { formatAppNumber } from '../utils/appLocale';
import { lineLabel } from '../utils/lineLabels';
import type { CategoryLineKey } from '../data/inputLines';
import { Button } from './Button';

interface Props {
  assessment: Assessment;
  onPdf: () => void;
  onTarget: () => void;
  onAddMore: () => void;
}

/** The onboarding “aha”: ring reveal, the biggest source, one quantified lever, one next step. */
export function RevealCard({ assessment, onPdf, onTarget, onAddMore }: Props) {
  const { t, locale } = useLanguage();
  const [goal, setGoalState] = useState<OnboardingGoal>('none');
  useEffect(() => {
    void getGoal().then(setGoalState);
  }, []);
  const s = useMemo(() => revealSummary(assessment), [assessment]);
  const fmt = (v: number) => formatAppNumber(Math.round(v * 10) / 10, locale);
  const o = t.onboarding2;
  const leverText =
    s.lever === 'renewable'
      ? o.leverRenewable
      : s.lever === 'ev'
        ? o.leverEv
        : s.lever === 'gas'
          ? o.leverGas
          : s.lever === 'diesel'
            ? o.leverDiesel
            : null;

  const primary =
    goal === 'request'
      ? { title: o.actionPdf, onPress: onPdf }
      : goal === 'reduce'
        ? { title: o.actionTarget, onPress: onTarget }
        : { title: o.actionMore, onPress: onAddMore };

  return (
    <View style={styles.card} accessibilityLiveRegion="polite">
      <Text style={styles.title} accessibilityRole="header">
        {o.revealTitle}
      </Text>
      <ScopeRing
        reveal
        size={184}
        values={[assessment.scope1Emissions, assessment.scope2Emissions, assessment.scope3Emissions ?? 0]}
      >
        <Text style={styles.total}>{fmt(assessment.totalEmissions)}</Text>
        <Text style={styles.unit}>t CO₂e</Text>
      </ScopeRing>
      {s.driver ? (
        <Text style={styles.driver}>
          {o.revealDriver
            .replace('{source}', lineLabel(t, s.driver as CategoryLineKey))
            .replace('{pct}', String(s.driverPct))}
        </Text>
      ) : null}
      {leverText ? (
        <View style={styles.lever}>
          <Text style={styles.leverLabel}>{o.revealLever}</Text>
          <Text style={styles.leverText}>{leverText.replace('{value}', fmt(s.leverValue))}</Text>
        </View>
      ) : null}
      <View style={styles.actions}>
        <Button title={primary.title} onPress={primary.onPress} />
        {primary.onPress !== onAddMore ? (
          <Button title={o.actionMore} variant="quiet" onPress={onAddMore} />
        ) : null}
      </View>
      <View style={styles.privacy}>
        <Lock size={14} color={colors.inkTertiary} />
        <Text style={styles.privacyText}>{o.privacyFooter}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    gap: 14,
    padding: 20,
    marginBottom: 16,
    borderRadius: radii.lg,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.hairline,
  },
  title: { fontSize: 22, fontWeight: '700', color: colors.ink },
  total: { fontSize: 30, fontWeight: '700', color: colors.ink, fontVariant: ['tabular-nums'] },
  unit: { fontSize: 13, color: colors.inkSecondary },
  driver: { fontSize: 16, color: colors.ink, textAlign: 'center' },
  lever: { alignSelf: 'stretch', padding: 14, borderRadius: radii.md, backgroundColor: colors.brandTint, gap: 4 },
  leverLabel: { fontSize: 13, fontWeight: '600', color: colors.brand },
  leverText: { fontSize: 15, lineHeight: 21, color: colors.ink },
  actions: { alignSelf: 'stretch', gap: 4 },
  privacy: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  privacyText: { fontSize: 13, color: colors.inkTertiary },
});
