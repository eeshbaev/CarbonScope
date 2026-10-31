import type { NavigationProp } from '@react-navigation/native';
import { useState } from 'react';
import { Alert } from 'react-native';
import { useAssessment } from '../context/AssessmentContext';
import { useLanguage } from '../context/LanguageContext';
import type { RootStackParamList } from '../navigation/types';
import { onAssessmentSaved } from '../notifications/notificationService';
import {
  wasFirstSuccessNotificationSent,
  wasPermissionPromptShown,
} from '../notifications/notificationStorage';
import { incrementCompaniesCreatedCount } from '../storage';
import { shouldPromptRateForCompanyCount } from '../utils/ratePromptTriggers';

/** Finalize the current draft and open Results (shared by the last input step). */
export function useCalculateResults(navigation: NavigationProp<RootStackParamList>) {
  const { draft, saveCurrent } = useAssessment();
  const { t, locale } = useLanguage();
  const [calculating, setCalculating] = useState(false);

  const calculate = async () => {
    setCalculating(true);
    try {
      const isNewCompany = !draft.id;
      const assessment = await saveCurrent({ finalize: true });
      let firstFinalize = false;
      try {
        firstFinalize = !(await wasFirstSuccessNotificationSent());
        await onAssessmentSaved(locale, assessment, { firstFinalize });
      } catch {
        // Notification sync is best-effort; assessment is already saved.
      }

      let promptRate = false;
      if (isNewCompany) {
        const createdCount = await incrementCompaniesCreatedCount();
        promptRate = shouldPromptRateForCompanyCount(createdCount);
      }

      let promptNotifications = false;
      try {
        promptNotifications = firstFinalize && !(await wasPermissionPromptShown());
      } catch {
        // Ignore notification prompt errors.
      }

      navigation.navigate('Results', {
        assessmentId: assessment.id,
        promptRate,
        promptNotifications,
      });
    } catch {
      Alert.alert(t.common.error, t.scopeInputs.saveFailed);
    } finally {
      setCalculating(false);
    }
  };

  return { calculating, calculate };
}
