import type { Assessment } from '../types';
import { DEFAULT_WORKSPACE_ID } from '../storage/workspace';

/** Preserve enterprise fields when rebuilding from draft. */
export function mergeAssessmentMeta(
  built: Assessment,
  existing: Assessment | null,
  clientTag?: string
): Assessment {
  const tag = clientTag?.trim() || existing?.clientTag;
  if (!existing) {
    return {
      ...built,
      workspaceId: DEFAULT_WORKSPACE_ID,
      clientTag: tag || undefined,
    };
  }
  return {
    ...built,
    reductionTarget: existing.reductionTarget,
    evidence: existing.evidence,
    evidenceChecklist: existing.evidenceChecklist,
    lineItemNotes: existing.lineItemNotes,
    clientTag: tag || undefined,
    workspaceId: existing.workspaceId ?? DEFAULT_WORKSPACE_ID,
    selectedInitiatives: existing.selectedInitiatives,
    initiativeReminderAt: existing.initiativeReminderAt,
    finalizedAt: built.finalizedAt ?? existing.finalizedAt,
  };
}
