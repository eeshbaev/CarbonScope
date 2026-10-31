import { useFocusEffect } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Platform,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { EmissionReportContent } from '../components/EmissionReportContent';
import { InitiativesPanel } from '../components/InitiativesPanel';
import { ResultsInsightsSection } from '../components/ResultsInsightsSection';
import { ScenarioPanel } from '../components/ScenarioPanel';
import { TargetEditorPanel } from '../components/TargetEditorPanel';
import { TargetProgressCard } from '../components/TargetProgressCard';
import { NotificationPermissionModal } from '../components/NotificationPermissionModal';
import { onValueMoment } from '../rating/ratingService';
import { findPriorFinalizedAssessment } from '../utils/assessmentHistory';
import { SavedToast } from '../components/SavedToast';
import { Button } from '../components/Button';
import { ConfirmModal } from '../components/ConfirmModal';
import { ScreenLayout } from '../components/ScreenLayout';
import { buildAssessment, formatEmissions } from '../calculations';
import type { IndustryKey } from '../data/industries';
import { useAssessment } from '../context/AssessmentContext';
import { useLanguage } from '../context/LanguageContext';
import { getIndustryRecommendations } from '../utils/recommendations';
import { useScreenTitle } from '../hooks/useScreenTitle';
import {
  getPeriodWithRangeLabel,
  getResultsTitle,
  getTco2eLabel,
  getTotalGhgFull,
} from '../utils/reportingPeriodCopy';
import type { ReportingPeriod } from '../types';
import type { RootStackParamList } from '../navigation/types';
import {
  deleteAssessment,
  getAssessmentById,
  loadAssessments,
  saveAssessment,
  setPendingDeletedFeedback,
} from '../storage';
import {
  enableNotifications,
  onAssessmentDeleted,
  syncScheduledNotifications,
} from '../notifications/notificationService';
import { markPermissionPromptShown } from '../notifications/notificationStorage';
import { generateAndShareReportPdf, showPdfError } from '../utils/reportPdf';
import type { Assessment } from '../types';
import type { InitiativeKey } from '../data/initiatives';
import type { ReductionTarget } from '../types/enterprise';
import { addDays } from '../utils/reportingDates';
import { useAccessibility } from '../context/AccessibilityContext';
import { useThemedStyles, type ThemeSlice } from '../hooks/useThemedStyles';
import { colors } from '../theme';
import { scaleSize } from '../theme/scale';

type Props = NativeStackScreenProps<RootStackParamList, 'Results'>;

type LoadState = 'loading' | 'ready' | 'missing';

export function ResultsScreen({ navigation, route }: Props) {
  const { draft, startNew, startEdit, startDuplicate } = useAssessment();
  const { t, locale } = useLanguage();
  const styles = useThemedStyles(createStyles);
  const { spacing } = useAccessibility();
  const { width: windowWidth } = useWindowDimensions();
  const [saved, setSaved] = useState<Assessment | null>(null);
  const [allAssessments, setAllAssessments] = useState<Assessment[]>([]);
  const [loadState, setLoadState] = useState<LoadState>('loading');
  const [notifPromptVisible, setNotifPromptVisible] = useState(false);
  const [deleteConfirmVisible, setDeleteConfirmVisible] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [initiativesSavedVisible, setInitiativesSavedVisible] = useState(false);
  const rateChecked = useRef(false);

  const chartWidth = windowWidth - spacing.lg * 2;

  const assessmentId = route.params?.assessmentId;

  const reloadFromStorage = useCallback(async () => {
    const list = await loadAssessments();
    setAllAssessments(list);
    if (!assessmentId) return null;
    return getAssessmentById(assessmentId);
  }, [assessmentId]);

  useEffect(() => {
    if (!assessmentId) return;
    let cancelled = false;

    const load = async () => {
      setLoadState('loading');
      const found = await reloadFromStorage();
      if (cancelled) return;
      if (found) {
        setSaved(found);
        setLoadState('ready');
      } else {
        setSaved(null);
        setLoadState('missing');
      }
    };

    void load();
    return () => {
      cancelled = true;
    };
  }, [assessmentId, reloadFromStorage]);

  useEffect(() => {
    if (assessmentId) return;
    if (draft.id) {
      setSaved(buildAssessment(draft, draft.id));
    } else {
      setSaved(buildAssessment(draft, 'preview'));
    }
    setLoadState('ready');
  }, [assessmentId, draft]);

  useFocusEffect(
    useCallback(() => {
      if (!assessmentId) return;
      let cancelled = false;
      void (async () => {
        const found = await reloadFromStorage();
        if (!cancelled && found) setSaved(found);
      })();
      return () => {
        cancelled = true;
      };
    }, [assessmentId, reloadFromStorage])
  );

  useEffect(() => {
    if (loadState === 'missing') {
      navigation.replace('Home');
    }
  }, [loadState, navigation]);

  // Rating policy: a finalized report that shows a comparison with an earlier period is a
  // value moment (repeated, successful use). Recorded once per opened report.
  useEffect(() => {
    if (loadState !== 'ready' || !saved || rateChecked.current) return;
    if (saved.isDraft || !saved.finalizedAt) return;
    if (!findPriorFinalizedAssessment(allAssessments, saved)) return;
    rateChecked.current = true;
    void onValueMoment('comparison_seen');
  }, [loadState, saved, allAssessments]);

  useEffect(() => {
    if (loadState !== 'ready' || !route.params?.promptNotifications) return;
    const timer = setTimeout(() => setNotifPromptVisible(true), 800);
    return () => clearTimeout(timer);
  }, [loadState, route.params?.promptNotifications]);

  const handleEnableNotifications = async () => {
    setNotifPromptVisible(false);
    await markPermissionPromptShown();
    await enableNotifications(locale);
  };

  const handleDismissNotifications = async () => {
    setNotifPromptVisible(false);
    await markPermissionPromptShown();
  };

  const assessment = saved;
  const reportingPeriod = (
    assessment?.reportingPeriod ??
    (draft.reportingPeriod as ReportingPeriod) ??
    '1_year'
  ) as ReportingPeriod;
  const resultsTitle = getResultsTitle(t, reportingPeriod);
  const tco2eLabel = getTco2eLabel(t, reportingPeriod);
  const totalGhgFull = getTotalGhgFull(t, reportingPeriod);
  const periodRangeLabel =
    assessment &&
    getPeriodWithRangeLabel(t, assessment.reportingStartDate, reportingPeriod, locale);

  useScreenTitle(resultsTitle);

  const recommendations = assessment
    ? getIndustryRecommendations(t, assessment.industry as IndustryKey)
    : [];

  const chartData = useMemo(() => {
    if (!assessment) return null;
    const s1 = assessment.scope1Emissions;
    const s2 = assessment.scope2Emissions;
    const s3 = assessment.scope3Emissions ?? 0;
    return {
      data: [
        {
          name: 'Scope 1',
          population: Math.max(Number(formatEmissions(s1)), 0.001),
          color: colors.chartOrange,
          legendFontColor: colors.text,
        },
        {
          name: 'Scope 2',
          population: Math.max(Number(formatEmissions(s2)), 0.001),
          color: colors.chartYellow,
          legendFontColor: colors.text,
        },
        ...(s3 > 0
          ? [
              {
                name: 'Scope 3',
                population: Number(formatEmissions(s3)),
                color: colors.chartBlue,
                legendFontColor: colors.text,
              },
            ]
          : []),
      ],
    };
  }, [assessment]);

  if (loadState === 'loading' || loadState === 'missing') {
    return (
      <ScreenLayout title={resultsTitle}>
        <View style={styles.loadingWrap}>
          <ActivityIndicator size="large" color={colors.primary} />
          {loadState === 'loading' ? (
            <Text style={styles.loadingText}>{t.common.loading}</Text>
          ) : null}
        </View>
      </ScreenLayout>
    );
  }

  if (!assessment) {
    return null;
  }

  const handleEdit = () => {
    startEdit(assessment);
    navigation.navigate('CompanyInfo');
  };

  const handleDuplicate = () => {
    startDuplicate(assessment);
    navigation.navigate('CompanyInfo');
  };

  const persistAssessment = async (next: Assessment) => {
    await saveAssessment(next);
    setSaved(next);
    await reloadFromStorage();
    await syncScheduledNotifications(locale);
  };

  const handleSaveTarget = async (target: ReductionTarget | undefined) => {
    await persistAssessment({
      ...assessment,
      reductionTarget: target,
      updatedAt: new Date().toISOString(),
    });
  };

  const handleSaveInitiatives = async (
    selected: InitiativeKey[],
    reminder: boolean
  ) => {
    const reminderAt =
      reminder && selected.length > 0
        ? addDays(new Date(), 14).toISOString()
        : undefined;
    const updated: Assessment = {
      ...assessment,
      selectedInitiatives: selected.length > 0 ? selected : undefined,
      initiativeReminderAt: reminderAt,
      updatedAt: new Date().toISOString(),
    };
    await persistAssessment(updated);
    setInitiativesSavedVisible(true);
    setTimeout(() => setInitiativesSavedVisible(false), 2000);
  };

  const handleNew = () => {
    startNew();
    navigation.navigate('CompanyInfo');
  };

  const canDelete =
    assessment.id !== 'preview' &&
    (!!route.params?.assessmentId || !!draft.id);

  const handleGeneratePdf = async () => {
    setPdfLoading(true);
    try {
      await generateAndShareReportPdf(assessment, t, locale);
      if (Platform.OS === 'web' && typeof window !== 'undefined') {
        window.alert(`${t.results.generatePdf}\n\n${t.results.pdfWebHint}`);
      } else if (!assessment.isDraft) {
        // Value moment: the report was shared and the share sheet has closed.
        void onValueMoment('report_shared');
      }
    } catch (err) {
      console.error('PDF export failed', err);
      showPdfError(t.results.generatePdf, t.results.pdfError, t.results.pdfWebHint);
    } finally {
      setPdfLoading(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!canDelete) return;
    setDeleting(true);
    try {
      const snapshot = { ...assessment };
      await deleteAssessment(assessment.id);
      await onAssessmentDeleted(locale, assessment.id);
      await setPendingDeletedFeedback({
        assessment: snapshot,
        promptRate: false, // never ask for a rating after a delete
      });
      startNew();
      setDeleteConfirmVisible(false);
      navigation.navigate('Home');
    } finally {
      setDeleting(false);
    }
  };

  const chartInnerWidth = Math.max(chartWidth - spacing.md * 2, 120);

  return (
    <ScreenLayout>
      <EmissionReportContent
        assessment={assessment}
        t={t}
        locale={locale}
        resultsTitle={resultsTitle}
        periodRangeLabel={periodRangeLabel ?? null}
        tco2eLabel={tco2eLabel}
        totalGhgFull={totalGhgFull}
        recommendations={recommendations}
        showBreakdown
        chartInnerWidth={chartInnerWidth}
        chartData={chartData}
      />

      <ResultsInsightsSection
        assessment={assessment}
        allAssessments={allAssessments}
        t={t}
        locale={locale}
        tco2eLabel={tco2eLabel}
        chartInnerWidth={chartInnerWidth}
      />

      <TargetProgressCard
        assessment={assessment}
        allAssessments={allAssessments}
        t={t}
      />

      {assessment.id !== 'preview' ? (
        <TargetEditorPanel assessment={assessment} onSave={handleSaveTarget} />
      ) : null}

      {!assessment.isDraft ? <ScenarioPanel assessment={assessment} /> : null}

      {assessment.id !== 'preview' ? (
        <InitiativesPanel
          assessment={assessment}
          onSave={handleSaveInitiatives}
          draftHint={assessment.isDraft ? t.results.initiativesFinalizeHint : undefined}
        />
      ) : null}

      <View style={styles.actions}>
        <Button
          title={t.results.generatePdf}
          onPress={handleGeneratePdf}
          loading={pdfLoading}
        />
        <Button
          title={t.results.duplicatePeriod}
          onPress={handleDuplicate}
          variant="outline"
        />
        <Button title={t.common.startNew} onPress={handleNew} variant="outline" />
        <Button title={t.common.editCalculation} variant="secondary" onPress={handleEdit} />
        {canDelete ? (
          <Button
            title={t.results.deleteCalculation}
            variant="destructive"
            onPress={() => setDeleteConfirmVisible(true)}
          />
        ) : null}
        <Button
          title={t.common.backHome}
          variant="secondary"
          onPress={() => navigation.navigate('Home')}
        />
      </View>

      <ConfirmModal
        visible={deleteConfirmVisible}
        title={t.delete.confirmTitle}
        message={t.delete.confirmMessage}
        confirmLabel={t.common.delete}
        cancelLabel={t.common.cancel}
        destructive
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          if (!deleting) setDeleteConfirmVisible(false);
        }}
      />

      <NotificationPermissionModal
        visible={notifPromptVisible}
        title={t.notifications.permissionTitle}
        message={t.notifications.permissionBody}
        enableLabel={t.notifications.enable}
        notNowLabel={t.notifications.notNow}
        onEnable={handleEnableNotifications}
        onDismiss={handleDismissNotifications}
      />

      <SavedToast visible={initiativesSavedVisible} message={t.results.initiativesSaved} />
    </ScreenLayout>
  );
}

function createStyles({ typography, spacing, displayScale }: ThemeSlice) {
  return StyleSheet.create({
    loadingWrap: {
      flex: 1,
      minHeight: scaleSize(200, displayScale),
      justifyContent: 'center',
      alignItems: 'center',
      gap: spacing.md,
    },
    loadingText: {
      ...typography.body,
      color: colors.textSecondary,
    },
    actions: {
      gap: spacing.sm,
      marginTop: spacing.md,
    },
  });
}
