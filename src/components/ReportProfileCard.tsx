import { X } from 'lucide-react-native';
import { useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { resolveSpendCurrency } from '../calculations';
import { useLanguage } from '../context/LanguageContext';
import { Figure } from '../design/Figure';
import { useLayout } from '../design/layout';
import type { Assessment, AssessmentDraft } from '../types';
import { colors, radii } from '../theme';
import { dataQualitySummary, intensityMetrics } from '../utils/reportMetrics';
import { Button } from './Button';
import { Card } from './Card';
import { ReportSettingsFields } from './ReportSettingsFields';

/**
 * Intensity metrics, data-quality mix and boundary for a report. Company size is asked for here,
 * at the moment it becomes useful (progressive profiling), not during onboarding.
 */
export function ReportProfileCard({
  assessment,
  onSave,
}: {
  assessment: Assessment;
  onSave: (patch: Pick<AssessmentDraft, 'profile' | 'boundary'>) => Promise<void>;
}) {
  const { t } = useLanguage();
  const layout = useLayout();
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState<Pick<AssessmentDraft, 'profile' | 'boundary'>>({});
  const m = intensityMetrics(assessment);
  const q = dataQualitySummary(assessment);
  const pct = (v: number) => (q.total > 0 ? Math.round((v / q.total) * 100) : 0);
  const currency = resolveSpendCurrency(assessment.scope3, assessment.countryCode);
  const hasIntensity = m.perEmployee != null || m.perMillionRevenue != null || m.kgPerM2 != null;
  const b = assessment.boundary;
  const boundaryText =
    b?.approach === 'equity'
      ? t.boundary.reportLineEquity.replace('{pct}', String(b.equitySharePct ?? 100))
      : t.boundary.reportLine.replace(
          '{approach}',
          b?.approach === 'financial' ? t.boundary.financial : t.boundary.operational
        );

  const open = () => {
    setDraft({ profile: assessment.profile, boundary: assessment.boundary });
    setEditing(true);
  };

  return (
    <>
      <Card style={styles.card}>
        <View style={styles.headRow}>
          <Text style={styles.title}>{hasIntensity ? t.intensity.title : t.intensity.addTitle}</Text>
          {hasIntensity ? (
            <Pressable onPress={open} hitSlop={10} accessibilityRole="button">
              <Text style={styles.link}>{t.intensity.edit}</Text>
            </Pressable>
          ) : null}
        </View>
        {hasIntensity ? (
          <View style={styles.metrics}>
            {m.perEmployee != null ? (
              <View style={styles.metric}>
                <Figure value={m.perEmployee} unit="t CO₂e" size="headline" />
                <Text style={styles.caption}>{t.intensity.perEmployee}</Text>
              </View>
            ) : null}
            {m.perMillionRevenue != null ? (
              <View style={styles.metric}>
                <Figure value={m.perMillionRevenue} unit="t CO₂e" size="headline" />
                <Text style={styles.caption}>
                  {t.intensity.perMillion.replace('{currency}', currency === 'OTHER' ? '' : currency)}
                </Text>
              </View>
            ) : null}
            {m.kgPerM2 != null ? (
              <View style={styles.metric}>
                <Figure value={m.kgPerM2} unit="" size="headline" />
                <Text style={styles.caption}>{t.intensity.perM2}</Text>
              </View>
            ) : null}
          </View>
        ) : (
          <>
            <Text style={styles.body}>{t.intensity.addBody}</Text>
            <Button title={t.intensity.add} variant="outline" onPress={open} />
          </>
        )}

        {q.total > 0 ? (
          <View style={styles.quality}>
            <Text style={styles.subTitle}>{t.quality.title}</Text>
            <View style={styles.bar} accessibilityRole="image" accessibilityLabel={t.quality.summary
              .replace('{measured}', String(pct(q.measured)))
              .replace('{invoice}', String(pct(q.invoice)))
              .replace('{estimated}', String(pct(q.estimated)))}>
              <View style={[styles.seg, { flex: q.measured, backgroundColor: colors.brand }]} />
              <View style={[styles.seg, { flex: q.invoice, backgroundColor: colors.inkTertiary }]} />
              <View style={[styles.seg, { flex: q.estimated, backgroundColor: colors.hairline }]} />
            </View>
            <Text style={styles.caption}>
              {t.quality.summary
                .replace('{measured}', String(pct(q.measured)))
                .replace('{invoice}', String(pct(q.invoice)))
                .replace('{estimated}', String(pct(q.estimated)))}
            </Text>
          </View>
        ) : null}

        <Pressable onPress={open} accessibilityRole="button">
          <Text style={styles.caption}>{boundaryText}</Text>
        </Pressable>
      </Card>

      <Modal visible={editing} animationType="slide" transparent onRequestClose={() => setEditing(false)}>
        <View style={[styles.backdrop, layout.twoPane && styles.backdropCentered]}>
          <View style={[styles.sheet, layout.twoPane && styles.dialog]}>
            <View style={styles.headRow}>
              <Text style={styles.title}>{t.intensity.profileTitle}</Text>
              <Pressable onPress={() => setEditing(false)} hitSlop={12} accessibilityRole="button" accessibilityLabel={t.common.cancel}>
                <X size={22} color={colors.inkSecondary} />
              </Pressable>
            </View>
            <ScrollView keyboardShouldPersistTaps="handled">
              <ReportSettingsFields
                draft={{ ...draft, scope3: assessment.scope3, countryCode: assessment.countryCode }}
                onChange={(patch) => setDraft((d) => ({ ...d, ...patch }))}
              />
            </ScrollView>
            <Button
              title={t.intensity.save}
              onPress={async () => {
                await onSave(draft);
                setEditing(false);
              }}
            />
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  card: { marginBottom: 16, gap: 12 },
  headRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12 },
  title: { fontSize: 18, fontWeight: '600', color: colors.ink, flexShrink: 1 },
  subTitle: { fontSize: 14, fontWeight: '600', color: colors.ink },
  link: { fontSize: 15, fontWeight: '600', color: colors.brand },
  body: { fontSize: 15, lineHeight: 22, color: colors.inkSecondary },
  caption: { fontSize: 13, lineHeight: 18, color: colors.inkTertiary },
  metrics: { flexDirection: 'row', flexWrap: 'wrap', gap: 20 },
  metric: { minWidth: 120, gap: 2 },
  quality: { gap: 6 },
  bar: { flexDirection: 'row', height: 8, borderRadius: 4, overflow: 'hidden', backgroundColor: colors.surfaceSunken },
  seg: { height: 8 },
  backdrop: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(22,32,27,0.35)' },
  backdropCentered: { justifyContent: 'center', alignItems: 'center' },
  sheet: {
    backgroundColor: colors.canvas,
    borderTopLeftRadius: radii.xl,
    borderTopRightRadius: radii.xl,
    padding: 20,
    maxHeight: '92%',
    gap: 12,
  },
  dialog: { borderRadius: radii.xl, width: 560, maxWidth: '92%' },
});
