import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { Card } from '../components/Card';
import { EmissionsSparkline } from '../components/EmissionsSparkline';
import { ScreenLayout } from '../components/ScreenLayout';
import { formatEmissions } from '../calculations';
import { useAccessibility } from '../context/AccessibilityContext';
import { useLanguage } from '../context/LanguageContext';
import { useThemedStyles, type ThemeSlice } from '../hooks/useThemedStyles';
import { useScreenTitle } from '../hooks/useScreenTitle';
import type { RootStackParamList } from '../navigation/types';
import { getAssessmentById, loadAssessments } from '../storage';
import type { Assessment } from '../types';
import { buildCompanyTrend } from '../utils/assessmentHistory';
import { getTco2eLabel } from '../utils/reportingPeriodCopy';
import { colors } from '../theme';
import { scaleSize } from '../theme/scale';

type Props = NativeStackScreenProps<RootStackParamList, 'CompanyTrends'>;

export function CompanyTrendsScreen({ route }: Props) {
  const { t, locale } = useLanguage();
  const { width: windowWidth } = useWindowDimensions();
  const { spacing } = useAccessibility();
  const styles = useThemedStyles(createStyles);
  const chartWidth = Math.max(windowWidth - spacing.lg * 2 - spacing.md * 2, 120);
  const [assessment, setAssessment] = useState<Assessment | null>(null);
  const [all, setAll] = useState<Assessment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    void (async () => {
      const [a, list] = await Promise.all([
        getAssessmentById(route.params.assessmentId),
        loadAssessments(),
      ]);
      setAssessment(a);
      setAll(list);
      setLoading(false);
    })();
  }, [route.params.assessmentId]);

  useScreenTitle(t.results.trendsTitle);

  if (loading) {
    return (
      <ScreenLayout title={t.results.trendsTitle}>
        <ActivityIndicator size="large" color={colors.primary} />
      </ScreenLayout>
    );
  }

  if (!assessment) {
    return (
      <ScreenLayout title={t.results.trendsTitle}>
        <Text style={styles.muted}>{t.common.loading}</Text>
      </ScreenLayout>
    );
  }

  const trend = buildCompanyTrend(all, assessment.companyName, locale, assessment.reportingPeriod);
  const tco2e = getTco2eLabel(t, assessment.reportingPeriod);

  return (
    <ScreenLayout title={t.results.trendsTitle} subtitle={assessment.companyName}>
      {trend.length < 2 ? (
        <Text style={styles.muted}>{t.results.trendsSubtitle}</Text>
      ) : (
        <Card>
          <EmissionsSparkline points={trend} width={chartWidth} tco2eLabel={tco2e} />
          {trend.map((p) => (
            <View key={p.id} style={styles.row}>
              <Text style={styles.period}>{p.label}</Text>
              <Text style={styles.val}>
                {formatEmissions(p.total)} {tco2e}
              </Text>
              <Text style={styles.split}>
                S1 {formatEmissions(p.scope1)} · S2 {formatEmissions(p.scope2)}
                {p.scope3 > 0 ? ` · S3 ${formatEmissions(p.scope3)}` : ''}
              </Text>
            </View>
          ))}
        </Card>
      )}
    </ScreenLayout>
  );
}

function createStyles({ typography, spacing, displayScale }: ThemeSlice) {
  return StyleSheet.create({
    muted: {
      ...typography.body,
      color: colors.textSecondary,
    },
    row: {
      marginTop: spacing.md,
      paddingTop: spacing.md,
      borderTopWidth: 1,
      borderTopColor: colors.border,
    },
    period: {
      ...typography.body,
      fontWeight: '600',
    },
    val: {
      ...typography.subtitle,
      color: colors.primary,
      marginTop: spacing.xs,
    },
    split: {
      ...typography.caption,
      marginTop: scaleSize(2, displayScale),
    },
  });
}
