import { StyleSheet, Text, View } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { BrandHero } from './BrandHero';
import { Card } from './Card';
import { CategoryLabel } from './CategoryLabel';
import type { EmissionCategoryKey } from '../data/categoryEmblems';
import { MethodologyLogSection } from './MethodologyLogSection';
import { calculateScope3ByCategory, formatEmissions } from '../calculations';
import { SCOPE3_CATEGORIES, SCOPE3_CATEGORY_NUMBER, SCOPE3_FIELDS } from '../data/scope3Factors';
import { formatAppNumber } from '../utils/appLocale';
import { countryCodeToFlag } from '../data/countries';
import type { IndustryKey } from '../data/industries';
import type { TranslationKeys } from '../i18n/locales/en';
import type { Locale } from '../i18n';
import { getIndustryLabel } from '../i18n/packs/industryLabels';
import { getLocalizedCountryName } from '../utils/localizeCountry';
import type { Assessment } from '../types';
import { resolveScope1Totals, resolveScope2Totals } from '../utils/scopeFieldInputs';
import { formatResolvedInputLine } from '../utils/scopeInputDisplay';
import { useThemedStyles, type ThemeSlice } from '../hooks/useThemedStyles';
import { colors } from '../theme';
import { scaleFontSize, scaleSize } from '../theme/scale';

type Props = {
  assessment: Assessment;
  t: TranslationKeys;
  locale: Locale;
  resultsTitle: string;
  periodRangeLabel: string | null;
  tco2eLabel: string;
  totalGhgFull: string;
  recommendations: string[];
  showBreakdown: boolean;
  /** Urban hero backdrop (screen only; off for PDF capture). */
  showHeroBackdrop?: boolean;
  chartInnerWidth?: number;
  chartData?: {
    data: Array<{
      name: string;
      population: number;
      color: string;
      legendFontColor: string;
    }>;
  } | null;
};

function SummaryRow({
  label,
  value,
  category,
  last,
  styles,
}: {
  label: string;
  value: string;
  category?: EmissionCategoryKey;
  last?: boolean;
  styles: ReturnType<typeof createStyles>;
}) {
  return (
    <View style={[styles.summaryRow, last && styles.summaryRowLast]}>
      {category ? (
        <View style={styles.summaryLabelWrap}>
          <CategoryLabel category={category} label={label} style={styles.summaryLabel} />
        </View>
      ) : (
        <Text style={styles.summaryLabel}>{label}</Text>
      )}
      <Text style={styles.summaryValue}>{value}</Text>
    </View>
  );
}

/** Shared results body: branding, emissions, optional chart, recommendations, input summary. */
export function EmissionReportContent({
  assessment,
  t,
  locale,
  resultsTitle,
  periodRangeLabel,
  tco2eLabel,
  totalGhgFull,
  recommendations,
  showBreakdown,
  showHeroBackdrop = true,
  chartInnerWidth = 280,
  chartData,
}: Props) {
  const styles = useThemedStyles(createStyles);
  const hasScope3 = (assessment.scope3Emissions ?? 0) > 0;
  const scope3ByCategory = calculateScope3ByCategory(assessment.scope3);
  const scope3Lines = SCOPE3_FIELDS.filter((f) => (assessment.scope3[f.key] ?? 0) > 0);

  return (
    <>
      <BrandHero showBackdrop={showHeroBackdrop} />
      <Text style={styles.reportTitle}>{resultsTitle}</Text>
      <Text style={styles.companyName}>{assessment.companyName}</Text>
      {periodRangeLabel ? <Text style={styles.periodRange}>{periodRangeLabel}</Text> : null}

      <Card style={styles.totalCard}>
        <Text style={styles.totalLabel}>{t.results.totalGhg}</Text>
        <Text style={styles.totalValue}>{formatEmissions(assessment.totalEmissions)}</Text>
        <Text style={styles.totalUnit}>{tco2eLabel}</Text>
        <Text style={styles.totalSub}>{totalGhgFull}</Text>
      </Card>

      <View style={styles.scopeRow}>
        <Card style={styles.scopeCard}>
          <Text style={styles.scopeLabel}>{t.results.scope1Direct}</Text>
          <Text style={[styles.scopeValue, hasScope3 && styles.scopeValueCompact]} adjustsFontSizeToFit numberOfLines={1}>{formatEmissions(assessment.scope1Emissions)}</Text>
          <Text style={styles.scopeUnit}>{tco2eLabel}</Text>
        </Card>
        <Card style={styles.scopeCard}>
          <Text style={styles.scopeLabel}>{t.results.scope2Indirect}</Text>
          <Text style={[styles.scopeValue, hasScope3 && styles.scopeValueCompact]} adjustsFontSizeToFit numberOfLines={1}>{formatEmissions(assessment.scope2Emissions)}</Text>
          <Text style={styles.scopeUnit}>{tco2eLabel}</Text>
        </Card>
        {hasScope3 ? (
          <Card style={styles.scopeCard}>
            <Text style={styles.scopeLabel}>{t.results.scope3ValueChain}</Text>
            <Text style={[styles.scopeValue, hasScope3 && styles.scopeValueCompact]} adjustsFontSizeToFit numberOfLines={1}>{formatEmissions(assessment.scope3Emissions)}</Text>
            <Text style={styles.scopeUnit}>{tco2eLabel}</Text>
          </Card>
        ) : null}
      </View>

      {hasScope3 ? (
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>{t.results.scope3Breakdown}</Text>
          {SCOPE3_CATEGORIES.filter((c) => scope3ByCategory[c] > 0).map((c, i, arr) => (
            <SummaryRow
              key={c}
              label={t.scope3.categoryTitle
                .replace('{number}', String(SCOPE3_CATEGORY_NUMBER[c]))
                .replace('{name}', t.scope3.categories[c])}
              value={`${formatEmissions(scope3ByCategory[c])} ${tco2eLabel}`}
              last={i === arr.length - 1}
              styles={styles}
            />
          ))}
        </Card>
      ) : null}

      {showBreakdown && chartData ? (
        <Card style={styles.chartCard}>
          <Text style={styles.sectionTitle}>{t.results.breakdown}</Text>
          <PieChart
            data={chartData.data}
            width={chartInnerWidth}
            height={200}
            chartConfig={{ color: () => colors.text }}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="0"
            absolute
          />
        </Card>
      ) : null}

      <Card style={styles.section}>
        <Text style={styles.sectionTitle}>{t.results.recommendations}</Text>
        <Text style={styles.industryTag}>{getIndustryLabel(locale, assessment.industry as IndustryKey)}</Text>
        {recommendations.map((rec, i) => (
          <View key={i} style={styles.recRow}>
            <Text style={styles.recBullet}>•</Text>
            <Text style={styles.recText}>{rec}</Text>
          </View>
        ))}
      </Card>

      <Card style={styles.section}>
        <Text style={styles.sectionTitle}>{t.results.inputSummary}</Text>
        <SummaryRow
          label={t.results.country}
          value={`${countryCodeToFlag(assessment.countryCode)} ${getLocalizedCountryName(assessment.countryCode, locale, assessment.country)}`}
          styles={styles}
        />
        <SummaryRow
          label={t.results.reportingPeriod}
          value={periodRangeLabel ?? t.reportingPeriods[assessment.reportingPeriod]}
          styles={styles}
        />
        <SummaryRow
          category="diesel"
          label={t.scope1.diesel}
          value={formatResolvedInputLine(
            resolveScope1Totals(assessment.scope1).dieselLiters,
            'fuel',
            assessment.reportingPeriod,
            assessment.scope1.diesel.useMonthly,
            t,
            locale
          )}
          styles={styles}
        />
        <SummaryRow
          category="petrol"
          label={t.scope1.petrol}
          value={formatResolvedInputLine(
            resolveScope1Totals(assessment.scope1).petrolLiters,
            'fuel',
            assessment.reportingPeriod,
            assessment.scope1.petrol.useMonthly,
            t,
            locale
          )}
          styles={styles}
        />
        <SummaryRow
          category="naturalGas"
          label={t.scope1.naturalGas}
          value={formatResolvedInputLine(
            resolveScope1Totals(assessment.scope1).naturalGasKwh,
            'gas',
            assessment.reportingPeriod,
            assessment.scope1.naturalGas.useMonthly,
            t,
            locale
          )}
          styles={styles}
        />
        <SummaryRow
          category="electricity"
          label={t.scope2.electricity}
          value={formatResolvedInputLine(
            resolveScope2Totals(assessment.scope2).electricityKwh,
            'electricity',
            assessment.reportingPeriod,
            assessment.scope2.electricity.useMonthly,
            t,
            locale
          )}
          styles={styles}
        />
        {scope3Lines.map((f) => (
          <SummaryRow
            key={f.key}
            category={f.key}
            label={t.scope3.fields[f.key]}
            value={`${formatAppNumber(assessment.scope3[f.key], locale)} ${t.scope3.units[f.unit]}`}
            styles={styles}
          />
        ))}
        <SummaryRow
          label={t.scope2.factorAuto}
          value={`${assessment.electricityFactor} ${t.common.kgCo2e}${t.units.perKwh}`}
          last={!assessment.notes?.trim()}
          styles={styles}
        />
        {assessment.notes?.trim() ? (
          <SummaryRow label={t.scopeInputs.notesTitle} value={assessment.notes.trim()} last styles={styles} />
        ) : null}
      </Card>

      <MethodologyLogSection assessmentId={assessment.id} />
    </>
  );
}

function createStyles({ typography, spacing, fontScale, displayScale }: ThemeSlice) {
  return StyleSheet.create({
  reportTitle: {
    ...typography.subtitle,
    color: colors.primary,
    fontWeight: '700',
    marginBottom: spacing.xs,
  },
  companyName: {
    ...typography.title,
    fontSize: scaleFontSize(22, fontScale),
    marginBottom: spacing.xs,
  },
  periodRange: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.lg,
    lineHeight: scaleSize(22, displayScale),
  },
  totalCard: {
    alignItems: 'center',
    backgroundColor: colors.primaryMuted,
    borderColor: colors.primaryLight,
    marginBottom: spacing.md,
  },
  totalLabel: {
    ...typography.caption,
    color: colors.primary,
    fontWeight: '700',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  totalValue: {
    fontSize: scaleFontSize(48, fontScale),
    fontWeight: '700',
    color: colors.primary,
    marginVertical: spacing.xs,
  },
  totalUnit: {
    ...typography.subtitle,
    color: colors.primary,
    fontWeight: '600',
  },
  totalSub: {
    ...typography.caption,
    marginTop: spacing.sm,
    textAlign: 'center',
  },
  scopeRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  scopeCard: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: spacing.lg,
    minWidth: 0,
  },
  scopeLabel: {
    ...typography.caption,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: spacing.sm,
    fontSize: scaleFontSize(11, fontScale),
    letterSpacing: 0.3,
  },
  scopeValue: {
    fontSize: scaleFontSize(26, fontScale),
    fontWeight: '700',
    color: colors.primary,
  },
  scopeValueCompact: {
    fontSize: scaleFontSize(21, fontScale),
  },
  scopeUnit: {
    ...typography.caption,
    marginTop: spacing.xs,
    fontWeight: '600',
  },
  chartCard: {
    marginBottom: spacing.md,
    alignItems: 'center',
    overflow: 'hidden',
  },
  section: {
    marginBottom: spacing.md,
  },
  sectionTitle: {
    ...typography.subtitle,
    marginBottom: spacing.sm,
  },
  industryTag: {
    ...typography.caption,
    color: colors.primary,
    fontWeight: '600',
    marginBottom: spacing.sm,
  },
  recRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  recBullet: {
    color: colors.chartOrange,
    fontSize: scaleFontSize(16, fontScale),
  },
  recText: {
    ...typography.body,
    flex: 1,
    fontSize: scaleFontSize(14, fontScale),
    lineHeight: scaleSize(22, displayScale),
    color: colors.textSecondary,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    gap: spacing.md,
  },
  summaryRowLast: {
    borderBottomWidth: 0,
  },
  summaryLabelWrap: {
    flex: 1,
    minWidth: 0,
  },
  summaryLabel: {
    ...typography.caption,
  },
  summaryValue: {
    ...typography.body,
    fontSize: scaleFontSize(14, fontScale),
    fontWeight: '500',
    flex: 1,
    textAlign: 'right',
  },
  });
}
