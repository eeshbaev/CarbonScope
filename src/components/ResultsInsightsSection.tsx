import { StyleSheet, Text, View } from 'react-native';
import { Card } from './Card';
import { EmissionsSparkline } from './EmissionsSparkline';
import { formatEmissions } from '../calculations';
import type { TranslationKeys } from '../i18n/locales/en';
import type { Locale } from '../i18n';
import type { Assessment } from '../types';
import type { EmissionDriverKey } from '../utils/assessmentHistory';
import {
  buildComparisonInsights,
  buildCompanyTrend,
  getLargestEmissionDriver,
  findPriorFinalizedAssessment,
  type ComparisonInsight,
} from '../utils/assessmentHistory';
import { getBenchmarkMessage } from '../utils/benchmarks';
import {
  EMISSION_FACTOR_DATASET_VERSION,
  EMISSION_FACTOR_REFERENCE_YEAR,
  EMISSION_FACTOR_SOURCES,
  isCustomElectricityFactor,
} from '../data/emissionFactors';
import { formatCategoryLabel } from '../data/categoryEmblems';
import { useThemedStyles, type ThemeSlice } from '../hooks/useThemedStyles';
import { colors } from '../theme';
import { scaleFontSize, scaleSize } from '../theme/scale';

type Props = {
  assessment: Assessment;
  allAssessments: Assessment[];
  t: TranslationKeys;
  locale: Locale;
  tco2eLabel: string;
  chartInnerWidth: number;
};

function formatPercent(t: TranslationKeys, percent: number): string {
  const value = Math.abs(Math.round(percent));
  const tpl = percent >= 0 ? t.results.percentUp : t.results.percentDown;
  return tpl.replace('{value}', String(value));
}

function driverLabel(t: TranslationKeys, key: EmissionDriverKey): string {
  if (key === 'cat3FuelEnergy') return t.scope3.categories.cat3FuelEnergy;
  const map: Record<string, string> = {
    diesel: t.results.driverDiesel,
    petrol: t.results.driverPetrol,
    naturalGas: t.results.driverNaturalGas,
    electricity: t.results.driverElectricity,
    lpg: t.scope1.lpg,
    heatingOil: t.scope1.heatingOil,
    coal: t.scope1.coal,
    refrigerants: t.scope1.refrigerantsShort,
    evKm: t.scope2.evKm,
    districtHeat: t.scope2.districtHeat,
    steam: t.scope2.steam,
    districtCooling: t.scope2.districtCooling,
    ...t.scope3.fields,
  };
  return formatCategoryLabel(map[key], key);
}

function ComparisonBar({
  label,
  percent,
  t,
  styles,
}: {
  label: string;
  percent: number;
  t: TranslationKeys;
  styles: ReturnType<typeof createStyles>;
}) {
  const width = Math.min(Math.abs(percent), 100);
  const isUp = percent >= 0;
  return (
    <View style={styles.compRow}>
      <Text style={styles.compLabel}>{label}</Text>
      <View style={styles.compBarTrack}>
        <View
          style={[
            styles.compBarFill,
            {
              width: `${width}%`,
              backgroundColor: isUp ? colors.chartOrange : colors.primary,
            },
          ]}
        />
      </View>
      <Text style={[styles.compPct, isUp && styles.compPctUp]}>
        {formatPercent(t, percent)}
      </Text>
    </View>
  );
}

function insightLabel(t: TranslationKeys, insight: ComparisonInsight): string {
  const pct = formatPercent(t, insight.percent);
  if (insight.labelKey === 'electricityMonth' && insight.monthLabel) {
    return t.results.electricityMonth
      .replace('{percent}', pct)
      .replace('{month}', insight.monthLabel);
  }
  const tpl =
    insight.labelKey === 'vsPriorYear' ? t.results.vsPriorYear : t.results.vsPriorPeriod;
  const scope =
    insight.kind === 'electricity_month' ? '' : `${t.results.comparisonLabels[insight.kind]}: `;
  return `${scope}${tpl.replace('{percent}', pct)}`;
}

export function ResultsInsightsSection({
  assessment,
  allAssessments,
  t,
  locale,
  tco2eLabel,
  chartInnerWidth,
}: Props) {
  const styles = useThemedStyles(createStyles);
  const prior = findPriorFinalizedAssessment(allAssessments, assessment);
  const comparisons = buildComparisonInsights(assessment, prior, locale);
  const trend = buildCompanyTrend(allAssessments, assessment.companyName, locale, assessment.reportingPeriod);
  const driver = getLargestEmissionDriver(assessment);
  const benchmark = getBenchmarkMessage(
    t,
    assessment.industry,
    assessment.countryCode,
    assessment.country,
    locale
  );
  const factorBody = t.results.factorSourceBody
    .replace('{factor}', String(assessment.electricityFactor))
    .replace('{sources}', EMISSION_FACTOR_SOURCES)
    .replace('{year}', EMISSION_FACTOR_REFERENCE_YEAR)
    .replace('{version}', EMISSION_FACTOR_DATASET_VERSION);

  return (
    <>
      {comparisons.length > 0 ? (
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>{t.results.comparisonsTitle}</Text>
          {comparisons.map((c, i) => (
            <ComparisonBar key={i} label={insightLabel(t, c)} percent={c.percent} t={t} styles={styles} />
          ))}
        </Card>
      ) : null}

      <Card style={styles.section}>
        <Text style={styles.sectionTitle}>{t.results.benchmarkTitle}</Text>
        <Text style={styles.body}>{benchmark}</Text>
      </Card>

      {trend.length >= 2 ? (
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>{t.results.trendsTitle}</Text>
          <Text style={styles.caption}>{t.results.trendsSubtitle}</Text>
          <EmissionsSparkline
            points={trend}
            width={chartInnerWidth}
            tco2eLabel={tco2eLabel}
          />
          <View style={styles.scopeSplit}>
            <Text style={styles.splitLine}>
              {t.scope1.title}: {formatEmissions(assessment.scope1Emissions)} · {t.scope2.title}:{' '}
              {formatEmissions(assessment.scope2Emissions)}
              {(assessment.scope3Emissions ?? 0) > 0
                ? ` · ${t.scope3.title}: ${formatEmissions(assessment.scope3Emissions)}`
                : ''}
            </Text>
          </View>
        </Card>
      ) : null}

      <Card style={styles.section}>
        <Text style={styles.sectionTitle}>{t.results.largestDriver}</Text>
        <Text style={styles.driver}>
          {driverLabel(t, driver.key)} — {formatEmissions(driver.emissionsT)} {tco2eLabel}
        </Text>
      </Card>

      <Card style={styles.section}>
        <Text style={styles.sectionTitle}>{t.results.factorSourceTitle}</Text>
        <Text style={styles.body}>{factorBody}</Text>
        {isCustomElectricityFactor(assessment.countryCode) ? (
          <Text style={styles.customNote}>{t.results.factorCustomNote}</Text>
        ) : null}
      </Card>
    </>
  );
}

function createStyles({ typography, spacing, fontScale, displayScale }: ThemeSlice) {
  return StyleSheet.create({
    section: {
      marginBottom: spacing.md,
    },
    sectionTitle: {
      ...typography.subtitle,
      marginBottom: spacing.sm,
    },
    caption: {
      ...typography.caption,
      marginBottom: spacing.sm,
    },
    body: {
      ...typography.body,
      fontSize: scaleFontSize(14, fontScale),
      lineHeight: scaleSize(22, displayScale),
      color: colors.textSecondary,
    },
    customNote: {
      ...typography.caption,
      color: colors.primary,
      fontWeight: '600',
      marginTop: spacing.sm,
    },
    compRow: {
      marginBottom: spacing.sm,
    },
    compLabel: {
      ...typography.caption,
      marginBottom: scaleSize(4, displayScale),
    },
    compBarTrack: {
      height: scaleSize(8, displayScale),
      backgroundColor: colors.border,
      borderRadius: scaleSize(4, displayScale),
      overflow: 'hidden',
      marginBottom: scaleSize(4, displayScale),
    },
    compBarFill: {
      height: '100%',
      borderRadius: scaleSize(4, displayScale),
    },
    compPct: {
      ...typography.caption,
      fontWeight: '700',
      color: colors.primary,
    },
    compPctUp: {
      color: colors.chartOrange,
    },
    scopeSplit: {
      marginTop: spacing.sm,
      paddingTop: spacing.sm,
      borderTopWidth: 1,
      borderTopColor: colors.border,
    },
    splitLine: {
      ...typography.caption,
      textAlign: 'center',
    },
    driver: {
      ...typography.body,
      fontWeight: '600',
      color: colors.primary,
    },
  });
}
