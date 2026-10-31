import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { AssessmentNotesField } from '../components/AssessmentNotesField';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { ConfirmModal } from '../components/ConfirmModal';
import { CategoryInputSection } from '../components/CategoryInputSection';
import { InputProgressCard } from '../components/InputProgressCard';
import { SavedToast } from '../components/SavedToast';
import { ScreenLayout } from '../components/ScreenLayout';
import { calculateScope1Emissions, formatEmissions } from '../calculations';
import { useAssessment } from '../context/AssessmentContext';
import { useLanguage } from '../context/LanguageContext';
import { useSaveProgress } from '../hooks/useSaveProgress';
import { useScopeEvidence } from '../hooks/useScopeEvidence';
import { useScreenTitle } from '../hooks/useScreenTitle';
import type { IndustryKey } from '../data/industries';
import { DEFAULT_INDUSTRY } from '../data/industries';
import type { RootStackParamList } from '../navigation/types';
import type { ReportingPeriod } from '../types';
import { supportsMonthlyEntry } from '../types/scopeInputs';
import { getReportingMonthsForDraft, resolveCategoryTotal } from '../utils/scopeFieldInputs';
import { CATEGORY_LINES, getLineInput, setLineInput, type CategoryLineKey } from '../data/inputLines';
import { REFRIGERANTS } from '../data/fuelFactors';
import type { EvidenceCategory } from '../types/enterprise';
import { lineFactorHint, lineInfoText, lineLabel } from '../utils/lineLabels';
import { formatAppNumber } from '../utils/appLocale';
import { CategoryLabel } from '../components/CategoryLabel';
import { NumberField } from '../components/NumberField';
import { getTco2eLabel } from '../utils/reportingPeriodCopy';
import { useThemedStyles, type ThemeSlice } from '../hooks/useThemedStyles';
import { colors } from '../theme';
import { scaleFontSize } from '../theme/scale';

type Props = NativeStackScreenProps<RootStackParamList, 'Scope1'>;

const SCOPE1_LINES = CATEGORY_LINES.filter((l) => l.scope === 1);
const PRIMARY_FUELS: CategoryLineKey[] = ['diesel', 'petrol', 'naturalGas'];

export function Scope1Screen({ navigation }: Props) {
  const { draft, updateDraft, saveCurrent } = useAssessment();
  const { t, locale } = useLanguage();
  const styles = useThemedStyles(createStyles);
  useScreenTitle(t.scope1.title);
  const { saving, savedVisible, saveProgress } = useSaveProgress();
  const {
    evidenceItems,
    handleEvidenceSlot,
    pendingDeleteEvidence,
    requestDeleteEvidence,
    cancelDeleteEvidence,
    confirmDeleteEvidence,
    isSlotBusy,
  } = useScopeEvidence();

  const evidenceFor = (category: EvidenceCategory) => ({
    category,
    items: evidenceItems,
    isSlotBusy: (monthKey?: string) => isSlotBusy(category, monthKey),
    onSlotPress: (monthKey?: string) => handleEvidenceSlot(category, monthKey),
    onDelete: requestDeleteEvidence,
  });

  const preview = calculateScope1Emissions(draft.scope1);
  const industry = (draft.industry || DEFAULT_INDUSTRY) as IndustryKey;
  const period = (draft.reportingPeriod || '1_year') as ReportingPeriod;
  const tco2eLabel = getTco2eLabel(t, period);
  const months = getReportingMonthsForDraft(draft.reportingStartDate, period, locale);
  const monthlyEnabled = supportsMonthlyEntry(period) && !!draft.reportingStartDate;

  const handleContinue = async () => {
    try {
      await saveCurrent({ finalize: false });
      navigation.navigate('Scope2');
    } catch {
      Alert.alert(t.common.error, t.scopeInputs.saveFailed);
    }
  };

  const footer = (
    <>
      <Button
        title={t.scopeInputs.saveProgress}
        variant="secondary"
        onPress={saveProgress}
        loading={saving}
      />
      <Button title={t.scope1.continueScope2} onPress={handleContinue} />
    </>
  );

  return (
    <ScreenLayout title={t.scope1.title} subtitle={t.scope1.subtitle} footer={footer}>
      <Text style={styles.source}>{t.scope1.source}</Text>
      <InputProgressCard
        months={months}
        lines={SCOPE1_LINES.filter(
          (l) => PRIMARY_FUELS.includes(l.key) || resolveCategoryTotal(getLineInput(draft, l.key)) > 0
        ).map((l) => ({
          key: l.key,
          label: lineLabel(t, l.key),
          input: getLineInput(draft, l.key),
        }))}
      />
      {SCOPE1_LINES.map((l) => (
        <View key={l.key}>
          {l.key === 'lpg' ? (
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>{t.scope1.otherFuelsTitle}</Text>
              <Text style={styles.sectionHint}>{t.scope1.otherFuelsHint}</Text>
            </View>
          ) : null}
          <CategoryInputSection
            categoryKey={l.key}
            label={lineLabel(t, l.key)}
            hint={lineFactorHint(t, locale, l.key, 0)}
            kind={l.kind}
            infoField={l.hintField}
            infoText={l.hintField ? undefined : lineInfoText(t, locale, industry, l.key)}
            industry={industry}
            category={getLineInput(draft, l.key)}
            months={months}
            monthlyEnabled={monthlyEnabled}
            onCategoryChange={(next) => updateDraft(setLineInput(draft, l.key, next))}
            evidence={evidenceFor(l.evidence)}
          />
        </View>
      ))}
      <Card style={styles.refrigerantCard}>
        <CategoryLabel
          category="refrigerants"
          label={t.scope1.refrigerantsTitle}
          style={styles.sectionTitle}
        />
        <Text style={styles.sectionHint}>{t.scope1.refrigerantsHint}</Text>
        {REFRIGERANTS.map((r, i) => (
          <NumberField
            key={r.key}
            label={r.label}
            value={draft.scope1.refrigerants[r.key]}
            unit={t.units.kgAbbr}
            hint={t.scope1.refrigerantGwp.replace(/\{gwp\}/g, formatAppNumber(r.gwp, locale))}
            onChange={(v) =>
              updateDraft({
                scope1: {
                  ...draft.scope1,
                  refrigerants: { ...draft.scope1.refrigerants, [r.key]: v ?? 0 },
                },
              })
            }
            last={i === REFRIGERANTS.length - 1}
          />
        ))}
        <Text style={styles.montreal}>{t.scope1.refrigerantMontreal}</Text>
      </Card>
      <AssessmentNotesField
        value={draft.notes}
        onChange={(notes) => updateDraft({ notes })}
      />
      <Card style={styles.preview}>
        <Text style={styles.previewLabel}>{t.scope1.preview}</Text>
        <Text style={styles.previewValue}>
          {formatEmissions(preview)} {tco2eLabel}
        </Text>
        <Text style={styles.standardNote}>
          {t.results.storedAs}: {t.units.liters}, {t.units.kwh}, {t.units.kgAbbr}
        </Text>
      </Card>
      <SavedToast visible={savedVisible} message={t.scopeInputs.saved} />
      <ConfirmModal
        visible={!!pendingDeleteEvidence}
        title={t.enterprise.evidence.deleteAreYouSure}
        message={t.enterprise.evidence.deleteConfirm.replace(
          '{fileName}',
          pendingDeleteEvidence?.fileName ?? ''
        )}
        confirmLabel={t.common.yes}
        cancelLabel={t.common.no}
        onConfirm={confirmDeleteEvidence}
        onCancel={cancelDeleteEvidence}
        destructive
      />
    </ScreenLayout>
  );
}

function createStyles({ typography, spacing, fontScale }: ThemeSlice) {
  return StyleSheet.create({
    source: {
      ...typography.caption,
      color: colors.textSecondary,
      marginBottom: spacing.lg,
      fontStyle: 'italic',
    },
    sectionHeader: {
      marginTop: spacing.md,
      marginBottom: spacing.sm,
    },
    sectionTitle: {
      ...typography.subtitle,
      fontSize: scaleFontSize(17, fontScale),
      color: colors.primary,
    },
    sectionHint: {
      ...typography.caption,
      color: colors.textSecondary,
      marginTop: spacing.xs,
    },
    refrigerantCard: {
      marginTop: spacing.md,
      marginBottom: spacing.md,
    },
    montreal: {
      ...typography.caption,
      fontStyle: 'italic',
      color: colors.textSecondary,
      marginTop: spacing.sm,
    },
    preview: {
      marginTop: spacing.sm,
      alignItems: 'center',
    },
    previewLabel: {
      ...typography.caption,
      marginBottom: spacing.xs,
    },
    previewValue: {
      ...typography.subtitle,
      color: colors.primary,
      fontSize: scaleFontSize(22, fontScale),
    },
    standardNote: {
      ...typography.caption,
      marginTop: spacing.sm,
      textAlign: 'center',
    },
  });
}
