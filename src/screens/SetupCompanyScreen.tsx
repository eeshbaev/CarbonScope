import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ChevronDown } from 'lucide-react-native';
import { useEffect, useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { Button } from '../components/Button';
import { CountryPicker } from '../components/CountryPicker';
import { FormPicker } from '../components/FormPicker';
import { useAccessibility } from '../context/AccessibilityContext';
import { useAssessment } from '../context/AssessmentContext';
import { useLanguage } from '../context/LanguageContext';
import { countryCodeToFlag, getCountryByCode } from '../data/countries';
import { getElectricityFactorForCountry } from '../data/emissionFactors';
import { INDUSTRY_KEYS, type IndustryKey } from '../data/industries';
import { PressableScale } from '../design/Pressable';
import { getIndustryLabel } from '../i18n/packs/industryLabels';
import type { RootStackParamList } from '../navigation/types';
import { deviceCountryCode } from '../onboarding/device';
import { OnboardingLayout } from '../onboarding/OnboardingLayout';
import { defaultReportingStart, firstSourcesFor, QUICK_INDUSTRIES } from '../onboarding/state';
import { colors, radii } from '../theme';
import { lineLabel } from '../utils/lineLabels';
import { getLocalizedCountryName } from '../utils/localizeCountry';

type Props = NativeStackScreenProps<RootStackParamList, 'SetupCompany'>;

/** C — country (prefilled from device region) + industry; both change the result. */
export function SetupCompanyScreen({ navigation }: Props) {
  const { t, locale } = useLanguage();
  const { reduceMotion } = useAccessibility();
  const { startNew, updateDraft } = useAssessment();
  const [country, setCountry] = useState<string>(() => deviceCountryCode() ?? '');
  const [industry, setIndustry] = useState<IndustryKey | ''>('');
  const [pickerOpen, setPickerOpen] = useState(false);

  useEffect(() => startNew(), [startNew]);

  const countryName = country
    ? getLocalizedCountryName(country, locale, getCountryByCode(country)?.name ?? country)
    : '';
  const sources = useMemo(
    () => (industry ? firstSourcesFor(industry).slice(0, 2).map((k) => lineLabel(t, k).toLowerCase()) : []),
    [industry, t]
  );
  const moreItems = INDUSTRY_KEYS.filter((k) => !QUICK_INDUSTRIES.includes(k)).map((k) => ({
    value: k,
    label: getIndustryLabel(locale, k),
  }));

  const handleContinue = () => {
    if (!country || !industry) return;
    updateDraft({
      companyName: t.onboarding2.defaultCompany,
      countryCode: country,
      country: getCountryByCode(country)?.name ?? country,
      industry,
      reportingPeriod: '1_year',
      reportingStartDate: defaultReportingStart(),
    });
    navigation.navigate('FirstData');
  };

  return (
    <OnboardingLayout
      actions={<Button title={t.onboarding2.continue} onPress={handleContinue} disabled={!country || !industry} />}
    >
      <Text style={styles.title} accessibilityRole="header">
        {t.onboarding2.companyTitle}
      </Text>
      <Text style={styles.sub}>{t.onboarding2.companySub}</Text>

      <Text style={styles.label}>{t.onboarding2.country}</Text>
      <PressableScale
        haptic="selection"
        style={styles.select}
        onPress={() => setPickerOpen(true)}
        accessibilityRole="button"
        accessibilityLabel={`${t.onboarding2.country}: ${countryName || t.company.selectCountry}`}
      >
        <Text style={styles.selectText}>
          {country ? `${countryCodeToFlag(country)}  ${countryName}` : t.company.selectCountry}
        </Text>
        <ChevronDown size={20} color={colors.inkTertiary} />
      </PressableScale>
      {country ? (
        <Animated.Text key={country} entering={reduceMotion ? undefined : FadeIn.duration(250)} style={styles.grid}>
          {t.onboarding2.gridLine
            .replace('{country}', countryName)
            .replace('{factor}', String(getElectricityFactorForCountry(country)))}
        </Animated.Text>
      ) : null}

      <Text style={[styles.label, styles.spaced]}>{t.onboarding2.industry}</Text>
      <View style={styles.chips} accessibilityRole="radiogroup">
        {QUICK_INDUSTRIES.map((k) => {
          const on = industry === k;
          return (
            <PressableScale
              key={k}
              haptic="selection"
              onPress={() => setIndustry(k)}
              style={[styles.chip, on && styles.chipOn]}
              accessibilityRole="radio"
              accessibilityState={{ checked: on }}
            >
              <Text style={[styles.chipText, on && styles.chipTextOn]}>{getIndustryLabel(locale, k)}</Text>
            </PressableScale>
          );
        })}
      </View>
      <FormPicker
        label={t.onboarding2.moreIndustries}
        value={industry && !QUICK_INDUSTRIES.includes(industry) ? industry : ''}
        onValueChange={(v) => setIndustry(v as IndustryKey)}
        items={moreItems}
        placeholder={t.common.select}
      />
      {sources.length ? (
        <Animated.Text key={industry} entering={reduceMotion ? undefined : FadeIn.duration(250)} style={styles.consequence}>
          {t.onboarding2.consequence.replace('{sources}', sources.join(' + '))}
        </Animated.Text>
      ) : null}

      <CountryPicker
        visible={pickerOpen}
        selectedCode={country}
        onSelect={(code) => {
          setCountry(code);
          setPickerOpen(false);
        }}
        onClose={() => setPickerOpen(false)}
      />
    </OnboardingLayout>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 28, fontWeight: '700', color: colors.ink, letterSpacing: -0.3 },
  sub: { fontSize: 16, lineHeight: 22, color: colors.inkSecondary },
  label: { fontSize: 15, fontWeight: '600', color: colors.ink, marginTop: 8 },
  spaced: { marginTop: 16 },
  select: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 52,
    paddingHorizontal: 16,
    borderRadius: radii.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.hairline,
  },
  selectText: { fontSize: 16, color: colors.ink },
  grid: { fontSize: 14, color: colors.inkSecondary, fontVariant: ['tabular-nums'] },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: {
    paddingHorizontal: 14,
    minHeight: 44,
    justifyContent: 'center',
    borderRadius: radii.full,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.hairline,
  },
  chipOn: { backgroundColor: colors.brandTint, borderColor: colors.brand },
  chipText: { fontSize: 14, color: colors.ink },
  chipTextOn: { color: colors.brand, fontWeight: '600' },
  consequence: { fontSize: 14, lineHeight: 20, color: colors.inkSecondary },
});
