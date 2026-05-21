import { useCallback, useState } from 'react';
import { Alert } from 'react-native';
import { useAssessment } from '../context/AssessmentContext';
import { useLanguage } from '../context/LanguageContext';
import { onAssessmentSaved } from '../notifications/notificationService';

const SAVED_TOAST_MS = 2000;

export function useSaveProgress() {
  const { saveCurrent } = useAssessment();
  const { locale, t } = useLanguage();
  const [saving, setSaving] = useState(false);
  const [savedVisible, setSavedVisible] = useState(false);

  const saveProgress = useCallback(async (): Promise<boolean> => {
    setSaving(true);
    try {
      const assessment = await saveCurrent({ finalize: false });
      setSavedVisible(true);
      setTimeout(() => setSavedVisible(false), SAVED_TOAST_MS);
      try {
        await onAssessmentSaved(locale, assessment);
      } catch {
        // Notification sync is best-effort; the assessment is already saved.
      }
      return true;
    } catch {
      Alert.alert(t.common.error, t.scopeInputs.saveFailed);
      return false;
    } finally {
      setSaving(false);
    }
  }, [saveCurrent, locale, t.common.error, t.scopeInputs.saveFailed]);

  return { saving, savedVisible, saveProgress };
}
