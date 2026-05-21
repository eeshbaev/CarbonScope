import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { CountryPicker } from '../components/CountryPicker';
import { FormPicker } from '../components/FormPicker';
import { Input } from '../components/Input';
import { ReportingStartDateField } from '../components/ReportingStartDateField';
import { ScreenLayout } from '../components/ScreenLayout';
import { getCountryGridInfo, countryCodeToFlag } from '../data/countries';
import { INDUSTRY_KEYS, type IndustryKey } from '../data/industries';
import { useAssessment } from '../context/AssessmentContext';
import { useLanguage } from '../context/LanguageContext';
import { getIndustryLabel } from '../i18n/packs/industryLabels';
import { useScreenTitle } from '../hooks/useScreenTitle';
import { getLocalizedCountryName } from '../utils/localizeCountry';
import type { RootStackParamList } from '../navigation/types';
import type { ReportingPeriod } from '../types';
import { getPeriodWithRangeLabel } from '../utils/reportingPeriodCopy';
import { useThemedStyles, type ThemeSlice } from '../hooks/useThemedStyles';
import { colors } from '../theme';
import { scaleFontSize, scaleSize } from '../theme/scale';

type Props = NativeStackScreenProps<RootStackParamList, 'CompanyInfo'>;

const REPORTING_PERIODS: ReportingPeriod[] = ['6_months', '1_year'];

export function CompanyInfoScreen({ navigation }: Props) {
  const { draft, updateDraft } = useAssessment();
  const { t, locale } = useLanguage();
  const styles = useThemedStyles(createStyles);
  useScreenTitle(t.company.title);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const gridInfo = draft.countryCode ? getCountryGridInfo(draft.countryCode) : null;

  const industryItems = INDUSTRY_KEYS.map((key) => ({
    label: getIndustryLabel(locale, key),
    value: key,
  }));

  const periodItems = REPORTING_PERIODS.map((p) => ({
    label: t.reportingPeriods[p],
    value: p,
  }));

  const periodRangeLabel = useMemo(() => {
    if (!draft.reportingPeriod || !draft.reportingStartDate) return null;
    return getPeriodWithRangeLabel(
      t,
      draft.reportingStartDate,
      draft.reportingPeriod as ReportingPeriod,
      locale
    );
  }, [draft.reportingPeriod, draft.reportingStartDate, t, locale]);

  const handleContinue = () => {
    const nextErrors: Record<string, string> = {};
    if (!draft.companyName.trim()) nextErrors.companyName = t.company.nameRequired;
    if (!draft.countryCode) nextErrors.country = t.company.countryRequired;
    if (!draft.industry) nextErrors.industry = t.company.industryRequired;
    if (!draft.reportingPeriod) nextErrors.reportingPeriod = t.company.periodRequired;
    if (!draft.reportingStartDate?.trim()) nextErrors.reportingStartDate = t.company.startDateRequired;
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    navigation.navigate('Scope1');
  };

  return (
    <ScreenLayout
      title={t.company.title}
      titleIcon="🏢"
      subtitle={t.company.subtitle}
    >
      <Input
        label={`${t.company.name} *`}
        value={draft.companyName}
        onChangeText={(companyName) => updateDraft({ companyName })}
        placeholder={t.company.namePlaceholder}
        keyboardType="default"
        hint={t.company.nameHint}
        error={errors.companyName}
      />

      <Text style={styles.label}>{`${t.company.country} *`}</Text>
      <Pressable
        style={[styles.countryBtn, errors.country && styles.inputError]}
        onPress={() => setPickerOpen(true)}
      >
        <Text style={styles.countryText}>
          {draft.countryCode
            ? `${countryCodeToFlag(draft.countryCode)}  ${getLocalizedCountryName(draft.countryCode, locale, draft.country)}`
            : t.company.selectCountry}
        </Text>
        <Text style={styles.chevron}>›</Text>
      </Pressable>
      {errors.country ? <Text style={styles.error}>{errors.country}</Text> : null}

      {gridInfo ? (
        <Card style={styles.gridCard}>
          <Text style={styles.gridLabel}>{t.company.electricityFactor}</Text>
          <Text style={styles.gridValue}>
            {gridInfo.factor} {t.common.kgCo2e}{t.units.perKwh}
          </Text>
          <Text style={styles.gridNote}>
            {t.scope2.basedOnCountry}:{' '}
            {getLocalizedCountryName(draft.countryCode, locale, draft.country)}
          </Text>
        </Card>
      ) : null}

      <FormPicker
        label={`${t.company.industry} *`}
        value={draft.industry}
        onValueChange={(industry) => updateDraft({ industry: industry as IndustryKey })}
        items={industryItems}
        placeholder={t.common.select}
        error={errors.industry}
      />

      <FormPicker
        label={`${t.company.reportingPeriod} *`}
        value={draft.reportingPeriod}
        onValueChange={(reportingPeriod) =>
          updateDraft({ reportingPeriod: reportingPeriod as ReportingPeriod })
        }
        items={periodItems}
        placeholder={t.common.select}
        error={errors.reportingPeriod}
      />

      <ReportingStartDateField
        label={`${t.company.reportingStartDate} *`}
        value={draft.reportingStartDate}
        onChange={(reportingStartDate) => updateDraft({ reportingStartDate })}
        placeholder={t.company.selectStartDate}
        error={errors.reportingStartDate}
      />

      {periodRangeLabel ? (
        <Card style={styles.periodCard}>
          <Text style={styles.periodLabel}>{t.company.periodPreview}</Text>
          <Text style={styles.periodValue}>{periodRangeLabel}</Text>
        </Card>
      ) : null}

      <Input
        label={t.company.clientTag}
        value={draft.clientTag ?? ''}
        onChangeText={(clientTag) => updateDraft({ clientTag })}
        placeholder={t.company.clientTagPlaceholder}
        hint={t.company.clientTagHint}
      />

      <View style={styles.footer}>
        <Button title={t.company.continueScope1} onPress={handleContinue} />
      </View>

      <CountryPicker
        visible={pickerOpen}
        selectedCode={draft.countryCode}
        onSelect={(countryCode, country) => updateDraft({ countryCode, country })}
        onClose={() => setPickerOpen(false)}
      />
    </ScreenLayout>
  );
}

function createStyles({ typography, spacing, fontScale, displayScale }: ThemeSlice) {
  return StyleSheet.create({
    label: {
      ...typography.label,
      marginBottom: spacing.sm,
    },
    countryBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: colors.white,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: scaleSize(12, displayScale),
      paddingHorizontal: spacing.md,
      paddingVertical: scaleSize(14, displayScale),
      marginBottom: spacing.md,
      minHeight: scaleSize(52, displayScale),
    },
    inputError: {
      borderColor: colors.danger,
    },
    countryText: {
      ...typography.body,
      flex: 1,
      fontSize: scaleFontSize(16, fontScale),
    },
    chevron: {
      fontSize: scaleFontSize(22, fontScale),
      color: colors.textSecondary,
    },
    error: {
      ...typography.caption,
      color: colors.danger,
      marginTop: -spacing.sm,
      marginBottom: spacing.md,
    },
    gridCard: {
      marginBottom: spacing.md,
      backgroundColor: colors.primaryMuted,
      borderColor: colors.primaryLight,
    },
    gridLabel: {
      ...typography.caption,
      color: colors.primary,
      fontWeight: '600',
    },
    gridValue: {
      ...typography.subtitle,
      color: colors.primary,
      marginVertical: spacing.xs,
    },
    gridNote: {
      ...typography.caption,
    },
    footer: {
      marginTop: spacing.md,
    },
    periodCard: {
      marginBottom: spacing.md,
      backgroundColor: colors.primaryMuted,
      borderColor: colors.primaryLight,
    },
    periodLabel: {
      ...typography.caption,
      color: colors.primary,
      fontWeight: '600',
      marginBottom: spacing.xs,
    },
    periodValue: {
      ...typography.body,
      color: colors.primary,
      fontWeight: '600',
      lineHeight: scaleSize(22, displayScale),
    },
  });
}
