import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';
import { FlightSheet } from '../components/FlightSheet';
import { QualityChips } from '../design/QualityChips';
import { qualityOf } from '../utils/reportMetrics';
import { AssessmentNotesField } from '../components/AssessmentNotesField';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { FormPicker } from '../components/FormPicker';
import { NumberField } from '../components/NumberField';
import { SavedToast } from '../components/SavedToast';
import { ScreenLayout } from '../components/ScreenLayout';
import { computeEmissions, formatEmissions } from '../calculations';
import { useAssessment } from '../context/AssessmentContext';
import { useLanguage } from '../context/LanguageContext';
import { CURRENCY_CODES, usdPerUnit, type CurrencyCode } from '../data/currencies';
import {
  SCOPE3_CATEGORIES,
  SCOPE3_CATEGORY_NUMBER,
  SCOPE3_FIELDS,
  getScope3FieldsForCategory,
  scope3FactorFor,
  type Scope3CategoryKey,
  type Scope3FieldDef,
} from '../data/scope3Factors';
import { useCalculateResults } from '../hooks/useCalculateResults';
import { useSaveProgress } from '../hooks/useSaveProgress';
import { useScreenTitle } from '../hooks/useScreenTitle';
import { useThemedStyles, type ThemeSlice } from '../hooks/useThemedStyles';
import type { RootStackParamList } from '../navigation/types';
import type { ReportingPeriod } from '../types';
import type { Scope3Inputs } from '../types/scopeInputs';
import { formatAppNumber } from '../utils/appLocale';
import { getTco2eLabel } from '../utils/reportingPeriodCopy';
import { colors } from '../theme';
import { scaleFontSize } from '../theme/scale';

type Props = NativeStackScreenProps<RootStackParamList, 'Scope3'>;

export function Scope3Screen({ navigation }: Props) {
  const { draft, updateDraft } = useAssessment();
  const { t, locale } = useLanguage();
  const styles = useThemedStyles(createStyles);
  useScreenTitle(t.scope3.title);
  const { saving, savedVisible, saveProgress } = useSaveProgress();
  const { calculating, calculate } = useCalculateResults(navigation);

  const period = (draft.reportingPeriod || '1_year') as ReportingPeriod;
  const tco2eLabel = getTco2eLabel(t, period);
  const emissions = computeEmissions({
    scope1: draft.scope1,
    scope2: draft.scope2,
    scope3: draft.scope3,
    countryCode: draft.countryCode || 'US',
  });
  const currency = emissions.spendCurrency;
  const setScope3 = (patch: Partial<Scope3Inputs>) =>
    updateDraft({ scope3: { ...draft.scope3, ...patch } });
  const [flightsOpen, setFlightsOpen] = useState(false);
  const addFlight = (haul: 'short' | 'long', pkm: number) => {
    const key = haul === 'short' ? 'flightShortHaulKm' : 'flightLongHaulKm';
    setScope3({ [key]: (draft.scope3[key] ?? 0) + pkm } as Partial<Scope3Inputs>);
  };

  const hasSpend = SCOPE3_FIELDS.some((f) => f.unit === 'currency' && (draft.scope3[f.key] ?? 0) > 0);
  const missingRate =
    currency === 'OTHER' && hasSpend && usdPerUnit('OTHER', draft.scope3.customUsdRate) == null;
  const currencyLabel = currency === 'OTHER' ? t.scope3.otherCurrency : currency;

  const unitFor = (def: Scope3FieldDef) =>
    def.unit === 'currency' ? currencyLabel : t.scope3.units[def.unit];

  const factorHint = (def: Scope3FieldDef) =>
    def.unit === 'currency'
      ? t.scope3.spendFactorLine.replace('{factor}', formatAppNumber(def.factor, locale))
      : t.scope3.factorLine
          .replace('{factor}', formatAppNumber(scope3FactorFor(def, draft.countryCode), locale))
          .replace('{unit}', t.scope3.units[def.unit]);

  const renderFields = (defs: Scope3FieldDef[]) =>
    defs.map((def) => (
      <NumberField
        key={def.key}
        emblem={def.key}
        label={t.scope3.fields[def.key]}
        value={draft.scope3[def.key] ?? 0}
        unit={unitFor(def)}
        hint={factorHint(def)}
        onChange={(v) => setScope3({ [def.key]: v ?? 0 } as Partial<Scope3Inputs>)}
        footer={
          (draft.scope3[def.key] ?? 0) > 0 ? (
            <QualityChips
              value={qualityOf(draft, def.key)}
              onChange={(q) => updateDraft({ dataQuality: { ...(draft.dataQuality ?? {}), [def.key]: q } })}
            />
          ) : undefined
        }
      />
    ));

  const renderCategoryBody = (category: Scope3CategoryKey) => {
    const defs = getScope3FieldsForCategory(category);
    if (category === 'cat3FuelEnergy') {
      return (
        <>
          <Text style={styles.sectionHint}>{t.scope3.cat3Hint}</Text>
          <View style={styles.toggleRow}>
            <Text style={styles.toggleLabel}>{t.scope3.cat3Toggle}</Text>
            <Switch
              value={draft.scope3.includeFuelEnergyUpstream}
              onValueChange={(v) => setScope3({ includeFuelEnergyUpstream: v })}
              trackColor={{ false: colors.border, true: colors.primaryLight }}
              thumbColor={colors.white}
            />
          </View>
        </>
      );
    }
    if (category === 'cat1Purchased') {
      const spend = defs.filter((d) => d.unit === 'currency');
      const other = defs.filter((d) => d.unit !== 'currency');
      return (
        <>
          <Text style={styles.subTitle}>{t.scope3.spendTitle}</Text>
          <Text style={styles.sectionHint}>{t.scope3.spendHint}</Text>
          <FormPicker
            label={t.scope3.currencyLabel}
            value={currency}
            onValueChange={(v) => setScope3({ currency: v as CurrencyCode })}
            items={CURRENCY_CODES.map((c) => ({
              label: c === 'OTHER' ? t.scope3.otherCurrency : c,
              value: c,
            }))}
          />
          {currency === 'OTHER' ? (
            <NumberField
              label={t.scope3.customRate}
              value={draft.scope3.customUsdRate ?? null}
              nullable
              unit={t.scope3.customRateUnit}
              hint={t.scope3.customRateHint}
              onChange={(v) => setScope3({ customUsdRate: v })}
            />
          ) : null}
          {missingRate ? <Text style={styles.warning}>{t.scope3.missingRateWarning}</Text> : null}
          {renderFields(spend)}
          {renderFields(other)}
        </>
      );
    }
    return (
      <>
        {category === 'cat4Transport' ? (
          <Text style={styles.sectionHint}>{t.scope3.freightHint}</Text>
        ) : null}
        {category === 'cat6Travel' ? (
          <Button title={t.flights.open} variant="outline" onPress={() => setFlightsOpen(true)} />
        ) : null}
        {renderFields(defs)}
      </>
    );
  };

  const footer = (
    <>
      <Button
        title={t.scopeInputs.saveProgress}
        variant="secondary"
        onPress={saveProgress}
        loading={saving}
      />
      <Button title={t.scope3.calculate} onPress={calculate} loading={calculating} />
    </>
  );

  return (
    <ScreenLayout title={t.scope3.title} subtitle={t.scope3.subtitle} footer={footer}>
      <Card style={styles.noteCard}>
        <Text style={styles.noteText}>{t.scope3.optionalNote}</Text>
      </Card>
      <Text style={styles.source}>{t.scope3.source}</Text>

      {SCOPE3_CATEGORIES.map((category) => (
        <Card key={category} style={styles.categoryCard}>
          <Text style={styles.categoryTitle}>
            {t.scope3.categoryTitle
              .replace('{number}', String(SCOPE3_CATEGORY_NUMBER[category]))
              .replace('{name}', t.scope3.categories[category])}
          </Text>
          {renderCategoryBody(category)}
          <View style={styles.subtotalRow}>
            <Text style={styles.subtotalLabel}>{t.scope3.subtotal}</Text>
            <Text style={styles.subtotalValue}>
              {emissions.scope3ByCategory[category] > 0
                ? `${formatEmissions(emissions.scope3ByCategory[category])} ${tco2eLabel}`
                : '—'}
            </Text>
          </View>
        </Card>
      ))}

      <Text style={styles.notCovered}>{t.scope3.notCovered}</Text>

      <AssessmentNotesField value={draft.notes} onChange={(notes) => updateDraft({ notes })} />
      <Card style={styles.preview}>
        <Text style={styles.previewLabel}>{t.scope3.preview}</Text>
        <Text style={styles.previewValue}>
          {formatEmissions(emissions.scope3)} {tco2eLabel}
        </Text>
      </Card>
      <SavedToast visible={savedVisible} message={t.scopeInputs.saved} />
      <FlightSheet visible={flightsOpen} onClose={() => setFlightsOpen(false)} onAdd={addFlight} />
    </ScreenLayout>
  );
}

function createStyles({ typography, spacing, fontScale }: ThemeSlice) {
  return StyleSheet.create({
    noteCard: {
      marginBottom: spacing.md,
      backgroundColor: colors.primaryMuted,
      borderColor: colors.primaryLight,
    },
    noteText: {
      ...typography.caption,
      color: colors.primary,
    },
    source: {
      ...typography.caption,
      color: colors.textSecondary,
      marginBottom: spacing.lg,
      fontStyle: 'italic',
    },
    categoryCard: {
      marginBottom: spacing.md,
    },
    categoryTitle: {
      ...typography.subtitle,
      fontSize: scaleFontSize(16, fontScale),
      color: colors.primary,
      marginBottom: spacing.sm,
    },
    subTitle: {
      ...typography.body,
      fontSize: scaleFontSize(14, fontScale),
      fontWeight: '700',
      color: colors.text,
    },
    sectionHint: {
      ...typography.caption,
      color: colors.textSecondary,
      marginTop: spacing.xs,
      marginBottom: spacing.sm,
    },
    warning: {
      ...typography.caption,
      color: colors.danger,
      fontWeight: '600',
      marginBottom: spacing.sm,
    },
    toggleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: spacing.sm,
    },
    toggleLabel: {
      ...typography.body,
      fontSize: scaleFontSize(14, fontScale),
      fontWeight: '600',
      color: colors.text,
      flex: 1,
      marginRight: spacing.md,
    },
    subtotalRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: spacing.sm,
    },
    subtotalLabel: {
      ...typography.caption,
      fontWeight: '700',
      color: colors.primary,
    },
    subtotalValue: {
      ...typography.caption,
      fontWeight: '700',
      color: colors.primary,
    },
    notCovered: {
      ...typography.caption,
      color: colors.textSecondary,
      fontStyle: 'italic',
      marginBottom: spacing.md,
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
