import { useCallback, useEffect, useRef, useState } from 'react';
import { Alert } from 'react-native';
import { useAssessment } from '../context/AssessmentContext';
import { useLanguage } from '../context/LanguageContext';
import { getAssessmentById } from '../storage';
import {
  deleteEvidenceFile,
  pickAndAttachEvidence,
  removeAssessmentEvidenceItem,
  upsertAssessmentEvidenceItem,
} from '../storage/evidence';
import type { Assessment } from '../types';
import type { EvidenceCategory, EvidenceItem } from '../types/enterprise';
import {
  buildEvidenceSlotKey,
  getEvidenceForSlot,
  itemSlotKey,
  mergeEvidenceItems,
} from '../utils/evidenceHelpers';
import { openEvidenceDocument } from '../utils/openEvidenceDocument';

export function useScopeEvidence() {
  const { draft, saveCurrent } = useAssessment();
  const { t } = useLanguage();
  const ev = t.enterprise.evidence;
  const [assessment, setAssessment] = useState<Assessment | null>(null);
  const [evidenceItems, setEvidenceItems] = useState<EvidenceItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [busySlot, setBusySlot] = useState<string | null>(null);
  const [pendingDelete, setPendingDelete] = useState<EvidenceItem | null>(null);
  const assessmentRef = useRef<Assessment | null>(null);
  const evidenceItemsRef = useRef<EvidenceItem[]>([]);
  const localEvidenceUpdateAt = useRef(0);
  const evidenceOpChain = useRef(Promise.resolve());

  assessmentRef.current = assessment;
  evidenceItemsRef.current = evidenceItems;

  const applyEvidenceState = useCallback((next: Assessment) => {
    localEvidenceUpdateAt.current = Date.now();
    assessmentRef.current = next;
    const items = next.evidence ?? [];
    evidenceItemsRef.current = items;
    setEvidenceItems(items);
    setAssessment(next);
  }, []);

  const runEvidenceOp = useCallback(<T,>(fn: () => Promise<T>): Promise<T> => {
    const run = evidenceOpChain.current.then(fn, fn);
    evidenceOpChain.current = run.then(
      () => undefined,
      () => undefined
    );
    return run;
  }, []);

  useEffect(() => {
    let cancelled = false;
    const loadStartedAt = Date.now();

    (async () => {
      if (!draft.id) {
        setAssessment(null);
        assessmentRef.current = null;
        evidenceItemsRef.current = [];
        setEvidenceItems([]);
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const found = await getAssessmentById(draft.id);
        if (!cancelled && localEvidenceUpdateAt.current < loadStartedAt) {
          if (found) applyEvidenceState(found);
          else {
            assessmentRef.current = null;
            evidenceItemsRef.current = [];
            setAssessment(null);
            setEvidenceItems([]);
          }
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [draft.id, applyEvidenceState]);

  const ensureSaved = useCallback(async (): Promise<Assessment | null> => {
    if (!draft.companyName?.trim()) {
      Alert.alert(ev.attachFile, ev.saveCompanyFirst);
      return null;
    }
    if (draft.id) {
      const found = await getAssessmentById(draft.id);
      if (found) {
        const merged = mergeEvidenceItems(found.evidence, evidenceItemsRef.current);
        if (merged.length !== (found.evidence?.length ?? 0)) {
          const next = { ...found, evidence: merged };
          applyEvidenceState(next);
          return next;
        }
        return found;
      }
    }
    try {
      const saved = await saveCurrent({ finalize: false });
      const merged = mergeEvidenceItems(saved.evidence, evidenceItemsRef.current);
      const next =
        merged.length === (saved.evidence?.length ?? 0)
          ? saved
          : { ...saved, evidence: merged };
      applyEvidenceState(next);
      return next;
    } catch {
      Alert.alert(ev.attachFile, ev.attachFailed);
      return null;
    }
  }, [
    applyEvidenceState,
    draft.companyName,
    draft.id,
    ev.attachFailed,
    ev.attachFile,
    ev.saveCompanyFirst,
    saveCurrent,
  ]);

  const attachEvidence = useCallback(
    async (category: EvidenceCategory, monthKey?: string): Promise<EvidenceItem | null> =>
      runEvidenceOp(async () => {
        const slotKey = buildEvidenceSlotKey(category, monthKey);
        setBusySlot(slotKey);
        try {
          if (getEvidenceForSlot(evidenceItemsRef.current, category, monthKey)) {
            return null;
          }

          const base = await ensureSaved();
          if (!base?.id) return null;

          const item = await pickAndAttachEvidence(base, category, monthKey);
          if (!item) return null;

          const optimistic = mergeEvidenceItems(evidenceItemsRef.current, [item]);
          applyEvidenceState({ ...base, evidence: optimistic });

          const next = await upsertAssessmentEvidenceItem(base.id, item, optimistic);
          applyEvidenceState(next);
          return item;
        } catch {
          Alert.alert(ev.attachFile, ev.attachFailed);
          return null;
        } finally {
          setBusySlot(null);
        }
      }),
    [applyEvidenceState, ensureSaved, ev.attachFailed, ev.attachFile, runEvidenceOp]
  );

  const deleteEvidence = useCallback(
    async (item: EvidenceItem) =>
      runEvidenceOp(async () => {
        setBusySlot(itemSlotKey(item));
        try {
          const base = await ensureSaved();
          if (!base?.id) return;

          const fromDb = await getAssessmentById(base.id);
          const stored =
            fromDb?.evidence?.find((e) => e.id === item.id) ??
            evidenceItemsRef.current.find((e) => e.id === item.id);
          if (stored) {
            await deleteEvidenceFile(stored);
          }

          const optimistic = evidenceItemsRef.current.filter((e) => e.id !== item.id);
          applyEvidenceState({ ...(fromDb ?? base), evidence: optimistic });

          const next = await removeAssessmentEvidenceItem(base.id, item.id);
          applyEvidenceState(next);
        } catch {
          Alert.alert(ev.deleteDocument, ev.deleteFailed);
        } finally {
          setBusySlot(null);
        }
      }),
    [
      applyEvidenceState,
      ensureSaved,
      ev.deleteDocument,
      ev.deleteFailed,
      runEvidenceOp,
    ]
  );

  const requestDeleteEvidence = useCallback((item: EvidenceItem) => {
    setPendingDelete(item);
  }, []);

  const cancelDeleteEvidence = useCallback(() => {
    setPendingDelete(null);
  }, []);

  const confirmDeleteEvidence = useCallback(() => {
    if (!pendingDelete) return;
    const item = pendingDelete;
    setPendingDelete(null);
    void deleteEvidence(item);
  }, [deleteEvidence, pendingDelete]);

  const openEvidence = useCallback(
    async (category: EvidenceCategory, monthKey?: string) => {
      const item = getEvidenceForSlot(evidenceItemsRef.current, category, monthKey);
      if (!item) return;
      const slotKey = buildEvidenceSlotKey(category, monthKey);
      setBusySlot(slotKey);
      try {
        await openEvidenceDocument(item);
      } catch {
        Alert.alert(ev.viewDocument, ev.viewFailed);
      } finally {
        setBusySlot(null);
      }
    },
    [ev.viewDocument, ev.viewFailed]
  );

  const handleEvidenceSlot = useCallback(
    (category: EvidenceCategory, monthKey?: string) => {
      const item = getEvidenceForSlot(evidenceItemsRef.current, category, monthKey);
      if (item) {
        void openEvidence(category, monthKey);
      } else {
        void attachEvidence(category, monthKey);
      }
    },
    [attachEvidence, openEvidence]
  );

  const isSlotBusy = useCallback(
    (category: EvidenceCategory, monthKey?: string) =>
      busySlot === buildEvidenceSlotKey(category, monthKey),
    [busySlot]
  );

  return {
    assessment,
    evidenceItems,
    loading,
    busySlot,
    isSlotBusy,
    ensureSaved,
    attachEvidence,
    handleEvidenceSlot,
    pendingDeleteEvidence: pendingDelete,
    requestDeleteEvidence,
    cancelDeleteEvidence,
    confirmDeleteEvidence,
    deleteEvidence,
  };
}
