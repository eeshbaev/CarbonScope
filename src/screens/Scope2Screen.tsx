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
import { calculateScope2Emissions, formatEmissions } from '../calculations';
import { getElectricityFactorForCountry } from '../data/emissionFactors';
import { countryCodeToFlag } from '../data/countries';
import { useAssessment } from '../context/AssessmentContext';
import { useLanguage } from '../context/LanguageContext';
import { useSaveProgress } from '../hooks/useSaveProgress';
import { useScopeEvidence } from '../hooks/useScopeEvidence';
import { useScreenTitle } from '../hooks/useScreenTitle';
import { getLocalizedCountryName } from '../utils/localizeCountry';
import type { IndustryKey } from '../data/industries';
import { DEFAULT_INDUSTRY } from '../data/industries';
import type { RootStackParamList } from '../navigation/types';
import type { ReportingPeriod } from '../types';
import { supportsMonthlyEntry } from '../types/scopeInputs';
import { getReportingMonthsForDraft, setScope2Field } from '../utils/scopeFieldInputs';
import { getTco2eLabel } from '../utils/reportingPeriodCopy';
import { useThemedStyles, type ThemeSlice } from '../hooks/useThemedStyles';
import { colors } from '../theme';
import { scaleFontSize } from '../theme/scale';

type Props = NativeStackScreenProps<RootStackParamList, 'Scope2'>;

export function Scope2Screen({ navigation }: Props) {
  const { draft, updateDraft, saveCurrent } = useAssessment();
  const { t, locale } = useLanguage();
  const styles = useThemedStyles(createStyles);
  useScreenTitle(t.scope2.title);
  const { saving: savingProgress, savedVisible, saveProgress } = useSaveProgress();
  const {
    evidenceItems,
    handleEvidenceSlot,
    pendingDeleteEvidence,
    requestDeleteEvidence,
    cancelDeleteEvidence,
    confirmDeleteEvidence,
    isSlotBusy,
  } = useScopeEvidence();

  const factor = getElectricityFactorForCountry(draft.countryCode || 'US');
  const preview = calculateScope2Emissions(draft.scope2, draft.countryCode || 'US');
  const industry = (draft.industry || DEFAULT_INDUSTRY) as IndustryKey;
  const period = (draft.reportingPeriod || '1_year') as ReportingPeriod;
  const tco2eLabel = getTco2eLabel(t, period);
  const months = getReportingMonthsForDraft(draft.reportingStartDate, period, locale);
  const monthlyEnabled = supportsMonthlyEntry(period) && !!draft.reportingStartDate;

  const handleContinue = async () => {
    try {
      await saveCurrent({ finalize: false });
      navigation.navigate('Scope3');
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
        loading={savingProgress}
      />
      <Button title={t.scope2.continueScope3} onPress={handleContinue} />
    </>
  );

  return (
    <ScreenLayout title={t.scope2.title} subtitle={t.scope2.subtitle} footer={footer}>
      <Text style={styles.source}>{t.scope2.source}</Text>
      <Card style={styles.regionCard}>
        <Text style={styles.regionLabel}>{t.company.country}</Text>
        <Text style={styles.regionValue}>
          {draft.countryCode
            ? `${countryCodeToFlag(draft.countryCode)} ${getLocalizedCountryName(draft.countryCode, locale, draft.country)}`
            : '—'}
        </Text>
        <Text style={styles.regionHint}>{t.scope2.basedOnCountry}</Text>
        <Text style={styles.factorLine}>
          {t.scope2.factorAuto}: {factor} {t.common.kgCo2e}{t.units.perKwh}
        </Text>
      </Card>
      <InputProgressCard
        months={months}
        lines={[
          {
            key: 'electricity',
            label: t.scope2.electricity,
            input: draft.scope2.electricity,
          },
        ]}
      />
      <CategoryInputSection
        key="scope2-electricity"
        categoryKey="electricity"
        label={t.scope2.electricity}
        kind="electricity"
        infoField="electricity"
        industry={industry}
        category={draft.scope2.electricity}
        months={months}
        monthlyEnabled={monthlyEnabled}
        onCategoryChange={(electricity) =>
          updateDraft({ scope2: setScope2Field(draft.scope2, electricity) })
        }
        evidence={{
          category: 'electricity',
          items: evidenceItems,
          isSlotBusy: (monthKey) => isSlotBusy('electricity', monthKey),
          onSlotPress: (monthKey) => handleEvidenceSlot('electricity', monthKey),
          onDelete: requestDeleteEvidence,
        }}
      />
      <AssessmentNotesField
        value={draft.notes}
        onChange={(notes) => updateDraft({ notes })}
      />
      <Card style={styles.preview}>
        <Text style={styles.previewLabel}>{t.scope2.preview}</Text>
        <Text style={styles.previewValue}>
          {formatEmissions(preview)} {tco2eLabel}
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
      marginBottom: spacing.md,
      fontStyle: 'italic',
    },
    regionCard: {
      marginBottom: spacing.md,
      backgroundColor: colors.primaryMuted,
      borderColor: colors.primaryLight,
    },
    regionLabel: {
      ...typography.caption,
      color: colors.primary,
      fontWeight: '600',
    },
    regionValue: {
      ...typography.subtitle,
      color: colors.primary,
      marginVertical: spacing.xs,
    },
    regionHint: {
      ...typography.caption,
    },
    factorLine: {
      ...typography.body,
      fontSize: scaleFontSize(14, fontScale),
      marginTop: spacing.sm,
      fontWeight: '600',
      color: colors.text,
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
  });
}
