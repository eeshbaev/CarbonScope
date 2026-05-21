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
import { getReportingMonthsForDraft, setScope1Field } from '../utils/scopeFieldInputs';
import { getTco2eLabel } from '../utils/reportingPeriodCopy';
import { useThemedStyles, type ThemeSlice } from '../hooks/useThemedStyles';
import { colors } from '../theme';
import { scaleFontSize } from '../theme/scale';

type Props = NativeStackScreenProps<RootStackParamList, 'Scope1'>;

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

  const evidenceFor = (category: 'diesel' | 'petrol' | 'gas') => ({
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
        lines={[
          { key: 'diesel', label: t.scope1.diesel, input: draft.scope1.diesel },
          { key: 'petrol', label: t.scope1.petrol, input: draft.scope1.petrol },
          { key: 'naturalGas', label: t.scope1.naturalGas, input: draft.scope1.naturalGas },
        ]}
      />
      <CategoryInputSection
        key="scope1-diesel"
        categoryKey="diesel"
        label={t.scope1.diesel}
        hint={t.scope1.factorDiesel}
        kind="fuel"
        infoField="diesel"
        industry={industry}
        category={draft.scope1.diesel}
        months={months}
        monthlyEnabled={monthlyEnabled}
        onCategoryChange={(diesel) =>
          updateDraft({ scope1: setScope1Field(draft.scope1, 'diesel', diesel) })
        }
        evidence={evidenceFor('diesel')}
      />
      <CategoryInputSection
        key="scope1-petrol"
        categoryKey="petrol"
        label={t.scope1.petrol}
        hint={t.scope1.factorPetrol}
        kind="fuel"
        infoField="petrol"
        industry={industry}
        category={draft.scope1.petrol}
        months={months}
        monthlyEnabled={monthlyEnabled}
        onCategoryChange={(petrol) =>
          updateDraft({ scope1: setScope1Field(draft.scope1, 'petrol', petrol) })
        }
        evidence={evidenceFor('petrol')}
      />
      <CategoryInputSection
        key="scope1-gas"
        categoryKey="naturalGas"
        label={t.scope1.naturalGas}
        hint={t.scope1.factorGas}
        kind="gas"
        infoField="naturalGas"
        industry={industry}
        category={draft.scope1.naturalGas}
        months={months}
        monthlyEnabled={monthlyEnabled}
        onCategoryChange={(naturalGas) =>
          updateDraft({ scope1: setScope1Field(draft.scope1, 'naturalGas', naturalGas) })
        }
        evidence={evidenceFor('gas')}
      />
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
          {t.results.storedAs}: {t.units.liters}, {t.units.kwh}
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
