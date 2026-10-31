import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from '../components/Button';
import { UnitInput } from '../components/UnitInput';
import { useAssessment } from '../context/AssessmentContext';
import { useLanguage } from '../context/LanguageContext';
import { getCategoryLine, getLineInput, setLineInput } from '../data/inputLines';
import { haptics } from '../design/haptics';
import { ScopeRing } from '../design/ScopeRing';
import { computeEmissions } from '../calculations';
import { useLayout } from '../design/layout';
import type { RootStackParamList } from '../navigation/types';
import { OnboardingLayout } from '../onboarding/OnboardingLayout';
import { firstSourcesFor } from '../onboarding/state';
import { setOnboardingSeen } from '../storage';
import { updateCategoryTotal } from '../utils/scopeFieldInputs';
import { boundaryShare } from '../types';
import { colors } from '../theme';
import { formatAppNumber } from '../utils/appLocale';
import { lineLabel } from '../utils/lineLabels';

type Props = NativeStackScreenProps<RootStackParamList, 'FirstData'>;

/** D — the two or three bills that matter most, with a live meter; one number is enough. */
export function FirstDataScreen({ navigation }: Props) {
  const { t, locale } = useLanguage();
  const { draft, setDraft, saveCurrent } = useAssessment();
  const layout = useLayout();
  const [busy, setBusy] = useState(false);
  const sources = firstSourcesFor(draft.industry);

  const e = useMemo(
    () =>
      computeEmissions({
        scope1: draft.scope1,
        scope2: draft.scope2,
        scope3: draft.scope3,
        countryCode: draft.countryCode || 'US',
        share: boundaryShare(draft.boundary),
      }),
    [draft]
  );
  const total = e.scope1 + e.scope2Location + e.scope3;
  const hasData = total > 0;

  const finish = async (finalize: boolean) => {
    setBusy(true);
    try {
      const saved = await saveCurrent(finalize ? { finalize: true } : undefined);
      await setOnboardingSeen();
      if (finalize) {
        haptics.success();
        navigation.reset({
          index: 1,
          routes: [{ name: 'Home' }, { name: 'Results', params: { assessmentId: saved.id, reveal: true } }],
        });
      } else {
        navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
      }
    } finally {
      setBusy(false);
    }
  };

  const meter = (
    <View style={styles.meter} accessibilityLiveRegion="polite">
      <ScopeRing values={[e.scope1, e.scope2Location, e.scope3]} size={layout.twoPane ? 200 : 132}>
        <Text style={styles.meterValue}>{formatAppNumber(Math.round(total * 10) / 10, locale)}</Text>
        <Text style={styles.meterUnit}>t CO₂e</Text>
      </ScopeRing>
      <Text style={styles.meterLabel}>{t.onboarding2.meterLabel}</Text>
    </View>
  );

  return (
    <OnboardingLayout
      side={meter}
      actions={
        <>
          <Button
            title={t.onboarding2.seeFootprint}
            onPress={() => void finish(true)}
            disabled={!hasData || busy}
            loading={busy}
          />
          <Button title={t.onboarding2.finishLater} variant="quiet" onPress={() => void finish(false)} disabled={busy} />
        </>
      }
    >
      <Text style={styles.title} accessibilityRole="header">
        {t.onboarding2.dataTitle}
      </Text>
      <Text style={styles.sub}>{t.onboarding2.dataSub}</Text>
      {layout.twoPane ? null : meter}
      {sources.map((key) => {
        const def = getCategoryLine(key);
        const input = getLineInput(draft, key);
        return (
          <View key={key} style={styles.row}>
            <Text style={styles.label}>{lineLabel(t, key)}</Text>
            <UnitInput
              label={lineLabel(t, key)}
              kind={def.kind}
              industry={draft.industry}
              standardValue={input.total}
              onStandardChange={(value) => setDraft(setLineInput(draft, key, updateCategoryTotal(input, value)))}
              hideLabel
              showHint={false}
              showInfo={false}
            />
          </View>
        );
      })}
    </OnboardingLayout>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 28, fontWeight: '700', color: colors.ink, letterSpacing: -0.3 },
  sub: { fontSize: 16, lineHeight: 22, color: colors.inkSecondary },
  row: { gap: 6 },
  label: { fontSize: 15, fontWeight: '600', color: colors.ink },
  meter: { alignItems: 'center', gap: 8, paddingVertical: 8 },
  meterValue: { fontSize: 24, fontWeight: '700', color: colors.ink, fontVariant: ['tabular-nums'] },
  meterUnit: { fontSize: 12, color: colors.inkSecondary },
  meterLabel: { fontSize: 13, color: colors.inkSecondary },
});
