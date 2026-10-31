import { useFocusEffect } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useCallback, useState } from 'react';
import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { CenteredFAB } from '../components/CenteredFAB';
import { ConfirmModal } from '../components/ConfirmModal';
import { DeletedCompanyCard } from '../components/DeletedCompanyCard';
import { HomeHero } from '../components/HomeHero';
import { InsightOfWeekCard } from '../components/InsightOfWeekCard';
import { InsightDetailModal } from '../components/InsightDetailModal';
import type { EducationalTipKey } from '../notifications/educationalTips';
import { QuickEmissionsEditModal } from '../components/QuickEmissionsEditModal';
import { ScreenLayout } from '../components/ScreenLayout';
import { SwipeableCompanyCard } from '../components/SwipeableCompanyCard';
import { useAssessment } from '../context/AssessmentContext';
import { useLanguage } from '../context/LanguageContext';
import { onAssessmentDeleted } from '../notifications/notificationService';
import { useRateAppPrompt } from '../hooks/useRateAppPrompt';
import type { RootStackParamList } from '../navigation/types';
import {
  consumePendingDeletedFeedback,
  deleteAssessment,
  getAssessmentById,
  loadAssessments,
} from '../storage';
import type { Assessment } from '../types';
import { useThemedStyles, type ThemeSlice } from '../hooks/useThemedStyles';
import { colors } from '../theme';
import { scaleFontSize, scaleSize } from '../theme/scale';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export function HomeScreen({ navigation }: Props) {
  const styles = useThemedStyles(createStyles);
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [initialLoading, setInitialLoading] = useState(true);
  const [pendingDelete, setPendingDelete] = useState<Assessment | null>(null);
  const [recentlyDeleted, setRecentlyDeleted] = useState<Assessment | null>(null);
  const [insightVisible, setInsightVisible] = useState(false);
  const [insightBody, setInsightBody] = useState('');
  const [insightTitle, setInsightTitle] = useState('');
  const [quickEditAssessment, setQuickEditAssessment] = useState<Assessment | null>(null);
  const { startNew, startEdit } = useAssessment();
  const { t, locale } = useLanguage();
  const clearGhost = useCallback(() => setRecentlyDeleted(null), []);

  const {
    runDeleteFeedbackFlow,
    cancelPendingFlows,
  } = useRateAppPrompt();

  const wrapClearGhost =
    (fn: () => Promise<void>) =>
    async () => {
      cancelPendingFlows();
      clearGhost();
      await fn();
    };

  const reloadAssessments = useCallback(async () => {
    try {
      const items = await loadAssessments();
      setAssessments(items);
    } catch {
      setAssessments([]);
    }
  }, []);

  const startDeleteFeedback = useCallback(
    (item: Assessment, shouldPromptForCount: boolean) => {
      setRecentlyDeleted(item);
      void runDeleteFeedbackFlow(shouldPromptForCount, clearGhost);
    },
    [runDeleteFeedbackFlow, clearGhost]
  );

  useFocusEffect(
    useCallback(() => {
      let cancelled = false;

      const run = async () => {
        await reloadAssessments();
        if (cancelled) return;
        setInitialLoading(false);

        const pending = await consumePendingDeletedFeedback();
        if (cancelled || !pending) return;

        setAssessments((prev) => prev.filter((a) => a.id !== pending.assessment.id));
        // Never ask for a rating after a delete (rating policy).
        startDeleteFeedback(pending.assessment, false);
      };

      void run();

      return () => {
        cancelled = true;
      };
    }, [reloadAssessments, startDeleteFeedback])
  );

  const handleAdd = () => {
    startNew();
    navigation.navigate('CompanyInfo');
  };

  const handleOpen = (assessment: Assessment) => {
    startEdit(assessment);
    if (assessment.isDraft) {
      navigation.navigate('Scope1');
      return;
    }
    navigation.navigate('Results', { assessmentId: assessment.id });
  };

  const confirmDelete = async () => {
    if (!pendingDelete) return;
    const item = pendingDelete;
    setPendingDelete(null);

    await deleteAssessment(item.id);
    await onAssessmentDeleted(locale, item.id);

    setAssessments((prev) => prev.filter((a) => a.id !== item.id));
    startDeleteFeedback(item, false);

    void reloadAssessments();
  };

  const showList =
    !initialLoading && (assessments.length > 0 || recentlyDeleted);

  return (
    <GestureHandlerRootView style={styles.root}>
      <ScreenLayout scroll={false} style={styles.layout}>
        <View style={styles.topRow}>
          <View style={styles.spacer} />
          <Pressable
            onPress={() => navigation.navigate('Settings')}
            style={styles.settingsBtn}
            hitSlop={16}
            accessibilityLabel={t.common.settings}
          >
            <Text style={styles.settingsIcon}>⚙</Text>
          </Pressable>
        </View>
        <HomeHero showBackdrop />
        <InsightOfWeekCard
          onPress={(_key: EducationalTipKey, body: string, title: string) => {
            setInsightTitle(title);
            setInsightBody(body);
            setInsightVisible(true);
          }}
        />
        <Pressable
          onPress={() => navigation.navigate('LearnLibrary')}
          style={styles.learnLink}
        >
          <Text style={styles.learnLinkText}>{t.learnMore.openLibrary}</Text>
        </Pressable>
        {initialLoading ? (
          <View style={styles.loadingWrap}>
            <ActivityIndicator size="large" color={colors.primary} />
          </View>
        ) : !showList ? (
          <View style={styles.empty}>
            <Text style={styles.emptyIcon}>🌍</Text>
            <Text style={styles.emptyTitle}>{t.home.emptyTitle}</Text>
            <Text style={styles.emptyText}>{t.home.emptyText}</Text>
          </View>
        ) : (
          <FlatList
            data={assessments}
            keyExtractor={(item) => item.id}
            ListHeaderComponent={
              recentlyDeleted ? <DeletedCompanyCard assessment={recentlyDeleted} /> : null
            }
            renderItem={({ item }) => (
              <SwipeableCompanyCard
                assessment={item}
                allAssessments={assessments}
                onPress={() => handleOpen(item)}
                onDelete={() => setPendingDelete(item)}
                deleteLabel={t.common.delete}
                onQuickAdd={async () => {
                  const fresh = await getAssessmentById(item.id);
                  setQuickEditAssessment(fresh ?? item);
                }}
              />
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.list}
            style={styles.listFlex}
          />
        )}
      </ScreenLayout>
      <CenteredFAB onPress={handleAdd} accessibilityLabel={t.common.startNew} />
      <ConfirmModal
        visible={!!pendingDelete}
        title={t.delete.confirmTitle}
        message={t.delete.confirmMessage}
        confirmLabel={t.common.delete}
        cancelLabel={t.common.cancel}
        onConfirm={confirmDelete}
        onCancel={() => setPendingDelete(null)}
        destructive
      />
      <InsightDetailModal
        visible={insightVisible}
        title={insightTitle}
        body={insightBody}
        onClose={() => setInsightVisible(false)}
      />
      <QuickEmissionsEditModal
        visible={!!quickEditAssessment}
        assessment={quickEditAssessment}
        onClose={() => setQuickEditAssessment(null)}
        onSaved={() => void reloadAssessments()}
      />
    </GestureHandlerRootView>
  );
}

function createStyles({ typography, spacing, fontScale, displayScale }: ThemeSlice) {
  return StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: colors.background,
    },
    layout: {
      flex: 1,
      paddingBottom: scaleSize(120, displayScale),
    },
    topRow: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      marginBottom: spacing.xs,
    },
    spacer: {
      flex: 1,
    },
    settingsBtn: {
      padding: spacing.sm,
    },
    settingsIcon: {
      fontSize: scaleFontSize(24, fontScale),
      color: colors.textSecondary,
    },
    list: {
      paddingBottom: spacing.xl,
    },
    listFlex: {
      flex: 1,
    },
    loadingWrap: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    empty: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: spacing.xl,
    },
    emptyIcon: {
      fontSize: scaleFontSize(48, fontScale),
      marginBottom: spacing.md,
    },
    emptyTitle: {
      ...typography.subtitle,
      marginBottom: spacing.sm,
      textAlign: 'center',
    },
    learnLink: {
      marginBottom: spacing.md,
      alignSelf: 'flex-start',
    },
    learnLinkText: {
      ...typography.body,
      color: colors.primary,
      fontWeight: '600',
    },
    emptyText: {
      ...typography.body,
      color: colors.textSecondary,
      textAlign: 'center',
      lineHeight: scaleSize(24, displayScale),
    },
  });
}
