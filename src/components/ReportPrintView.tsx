import { forwardRef } from 'react';
import { StyleSheet, View, type View as ViewType } from 'react-native';
import { EmissionReportContent } from './EmissionReportContent';
import type { TranslationKeys } from '../i18n/locales/en';
import type { Locale } from '../i18n';
import type { Assessment } from '../types';
import { colors, spacing } from '../theme';

/** A4 content width at 72 PPI — used for off-screen capture before PDF export. */
export const REPORT_PRINT_WIDTH = 595;

type Props = {
  assessment: Assessment;
  t: TranslationKeys;
  locale: Locale;
  resultsTitle: string;
  periodRangeLabel: string | null;
  tco2eLabel: string;
  totalGhgFull: string;
  recommendations: string[];
};

export const ReportPrintView = forwardRef<ViewType, Props>(function ReportPrintView(
  {
    assessment,
    t,
    locale,
    resultsTitle,
    periodRangeLabel,
    tco2eLabel,
    totalGhgFull,
    recommendations,
  },
  ref
) {
  return (
    <View ref={ref} collapsable={false} style={styles.root}>
      <EmissionReportContent
        assessment={assessment}
        t={t}
        locale={locale}
        resultsTitle={resultsTitle}
        periodRangeLabel={periodRangeLabel}
        tco2eLabel={tco2eLabel}
        totalGhgFull={totalGhgFull}
        recommendations={recommendations}
        showBreakdown={false}
        showHeroBackdrop={false}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  root: {
    width: REPORT_PRINT_WIDTH,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
  },
});
