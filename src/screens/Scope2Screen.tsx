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
import { computeEmissions, formatEmissions } from '../calculations';
import { NumberField } from '../components/NumberField';
import { CATEGORY_LINES, getLineInput, setLineInput } from '../data/inputLines';
import type { EvidenceCategory } from '../types/enterprise';
import type { MarketBasedInputs } from '../types/scopeInputs';
import { lineFactorHint, lineInfoText, lineLabel } from '../utils/lineLabels';
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
import { getReportingMonthsForDraft, resolveCategoryTotal } from '../utils/scopeFieldInputs';
import { getTco2eLabel } from '../utils/reportingPeriodCopy';
import { useThemedStyles, type ThemeSlice } from '../hooks/useThemedStyles';
import { colors } from '../theme';
import { scaleFontSize } from '../theme/scale';

type Props = NativeStackScreenProps<RootStackParamList, 'Scope2'>;

const SCOPE2_LINES = CATEGORY_LINES.filter((l) => l.scope === 2);

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
  const emissions = computeEmissions({
    scope1: draft.scope1,
    scope2: draft.scope2,
    scope3: draft.scope3,
    countryCode: draft.countryCode || 'US',
  });
  const market = draft.scope2.market;
  const setMarket = (patch: Partial<MarketBasedInputs>) =>
    updateDraft({ scope2: { ...draft.scope2, market: { ...market, ...patch } } });
  const evidenceFor = (category: EvidenceCategory) => ({
    category,
    items: evidenceItems,
    isSlotBusy: (monthKey?: string) => isSlotBusy(category, monthKey),
    onSlotPress: (monthKey?: string) => handleEvidenceSlot(category, monthKey),
    onDelete: requestDeleteEvidence,
  });
  const kgPerKwh = `${t.common.kgCo2e}${t.units.perKwh}`;
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
        lines={SCOPE2_LINES.filter(
          (l) => l.key === 'electricity' || resolveCategoryTotal(getLineInput(draft, l.key)) > 0
        ).map((l) => ({
          key: l.key,
          label: lineLabel(t, l.key),
          input: getLineInput(draft, l.key),
        }))}
      />
      {SCOPE2_LINES.map((l) => (
        <View key={l.key}>
          {l.key === 'evKm' ? (
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>{t.scope2.otherEnergyTitle}</Text>
              <Text style={styles.sectionHint}>{t.scope2.otherEnergyHint}</Text>
            </View>
          ) : null}
          <CategoryInputSection
            categoryKey={l.key}
            label={lineLabel(t, l.key)}
            hint={lineFactorHint(t, locale, l.key, factor)}
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
      <Card style={styles.marketCard}>
        <Text style={styles.sectionTitle}>{t.scope2.market.title}</Text>
        <Text style={styles.sectionHint}>{t.scope2.market.intro}</Text>
        <NumberField
          label={t.scope2.market.renewableKwh}
          value={market.renewableKwh}
          unit={t.units.kwh}
          hint={t.scope2.market.renewableKwhHint}
          onChange={(v) => setMarket({ renewableKwh: v ?? 0 })}
        />
        <NumberField
          label={t.scope2.market.supplierFactor}
          value={market.supplierFactor}
          nullable
          placeholder={t.scope2.market.notProvided}
          unit={kgPerKwh}
          hint={t.scope2.market.supplierFactorHint}
          onChange={(v) => setMarket({ supplierFactor: v })}
        />
        <NumberField
          label={t.scope2.market.residualMixFactor}
          value={market.residualMixFactor}
          nullable
          placeholder={t.scope2.market.notProvided}
          unit={kgPerKwh}
          hint={t.scope2.market.residualMixFactorHint}
          onChange={(v) => setMarket({ residualMixFactor: v })}
        />
        <NumberField
          label={t.scope2.market.heatSupplierFactor}
          value={market.heatSupplierFactor}
          nullable
          placeholder={t.scope2.market.notProvided}
          unit={kgPerKwh}
          hint={t.scope2.market.heatSupplierFactorHint}
          onChange={(v) => setMarket({ heatSupplierFactor: v })}
          last
        />
      </Card>
      <AssessmentNotesField
        value={draft.notes}
        onChange={(notes) => updateDraft({ notes })}
      />
      <Card style={styles.preview}>
        <Text style={styles.previewLabel}>{t.scope2.preview}</Text>
        <Text style={styles.previewValue}>
          {formatEmissions(emissions.scope2Location)} {tco2eLabel}
        </Text>
        <Text style={styles.previewSub}>{t.scope2.previewLocation}</Text>
        <Text style={styles.previewMarket}>
          {t.scope2.previewMarket}: {formatEmissions(emissions.scope2Market)} {tco2eLabel}
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
    marketCard: {
      marginTop: spacing.md,
      marginBottom: spacing.md,
    },
    previewSub: {
      ...typography.caption,
      marginTop: spacing.xs,
    },
    previewMarket: {
      ...typography.body,
      fontSize: scaleFontSize(15, fontScale),
      fontWeight: '600',
      color: colors.text,
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
  });
}
