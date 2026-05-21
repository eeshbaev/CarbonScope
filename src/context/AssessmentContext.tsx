import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { getCountryByCode } from '../data/countries';
import { assessmentToDraft, buildAssessment } from '../calculations';
import { duplicateForNextPeriod } from '../utils/duplicateAssessment';
import { getAssessmentById, saveAssessment } from '../storage';
import { appendMethodologyLog } from '../storage/methodologyLog';
import { mergeAssessmentMeta } from '../utils/mergeAssessmentMeta';
import type { Assessment, AssessmentDraft } from '../types';
import { emptyDraft } from '../types';

interface AssessmentContextValue {
  draft: AssessmentDraft;
  isEditing: boolean;
  setDraft: (draft: AssessmentDraft) => void;
  updateDraft: (partial: Partial<AssessmentDraft>) => void;
  startNew: () => void;
  startEdit: (assessment: Assessment) => void;
  startDuplicate: (assessment: Assessment) => void;
  saveCurrent: (options?: { finalize?: boolean }) => Promise<Assessment>;
}

const AssessmentContext = createContext<AssessmentContextValue | null>(null);

export function AssessmentProvider({ children }: { children: React.ReactNode }) {
  const [draft, setDraftState] = useState<AssessmentDraft>(emptyDraft());
  const [isEditing, setIsEditing] = useState(false);

  const setDraft = useCallback((next: AssessmentDraft) => {
    setDraftState(next);
    setIsEditing(!!next.id);
  }, []);

  const updateDraft = useCallback((partial: Partial<AssessmentDraft>) => {
    setDraftState((prev) => {
      const next = { ...prev, ...partial };
      if (partial.countryCode && !partial.country) {
        next.country = getCountryByCode(partial.countryCode)?.name ?? partial.countryCode;
      }
      return next;
    });
  }, []);

  const startNew = useCallback(() => {
    setDraftState(emptyDraft());
    setIsEditing(false);
  }, []);

  const startEdit = useCallback((assessment: Assessment) => {
    setDraftState(assessmentToDraft(assessment));
    setIsEditing(true);
  }, []);

  const startDuplicate = useCallback((assessment: Assessment) => {
    setDraftState(duplicateForNextPeriod(assessment));
    setIsEditing(false);
  }, []);

  const saveCurrent = useCallback(
    async (options?: { finalize?: boolean }) => {
      const id = draft.id ?? uuidv4();
      const existing = draft.id ? await getAssessmentById(draft.id) : null;
      const built = buildAssessment(draft, id, options);
      const assessment = mergeAssessmentMeta(built, existing, draft.clientTag);
      await saveAssessment(assessment);
      if (options?.finalize) {
        const action = existing?.finalizedAt ? 'recalculated' : 'finalized';
        await appendMethodologyLog(assessment, action);
      }
      setDraftState(assessmentToDraft(assessment));
      setIsEditing(true);
      return assessment;
    },
    [draft]
  );

  const value = useMemo(
    () => ({
      draft,
      isEditing,
      setDraft,
      updateDraft,
      startNew,
      startEdit,
      startDuplicate,
      saveCurrent,
    }),
    [draft, isEditing, setDraft, updateDraft, startNew, startEdit, startDuplicate, saveCurrent]
  );

  return (
    <AssessmentContext.Provider value={value}>{children}</AssessmentContext.Provider>
  );
}

export function useAssessment() {
  const ctx = useContext(AssessmentContext);
  if (!ctx) throw new Error('useAssessment must be used within AssessmentProvider');
  return ctx;
}
