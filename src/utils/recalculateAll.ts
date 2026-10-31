import { assessmentToDraft, buildAssessment, currentFactorStamp, factorStamp } from '../calculations';
import type { Assessment } from '../types';
import { buildRestatement } from './restatement';

/** Reports calculated with older factor datasets than the current ones. */
export function outdatedAssessments(all: Assessment[]): Assessment[] {
  const current = currentFactorStamp();
  return all.filter((a) => factorStamp(a) !== current);
}

/**
 * Recalculate one report with the current factor datasets, keeping its status, dates and
 * metadata. Finalized reports get a restatement note with their previous result.
 */
export function recalculateWithLatestFactors(a: Assessment): Assessment {
  const finalized = !!a.finalizedAt && !a.isDraft;
  const built = buildAssessment(assessmentToDraft(a), a.id, { finalize: finalized });
  // Keep every non-calculated field (targets, evidence, tags…) from the saved report.
  return {
    ...a,
    ...built,
    clientTag: a.clientTag,
    isDraft: a.isDraft,
    finalizedAt: a.finalizedAt,
    updatedAt: a.updatedAt,
    restatement: buildRestatement(a, built),
  };
}

/** Pure bulk step: returns the new list and how many reports changed. */
export function recalculateAll(all: Assessment[]): { next: Assessment[]; changed: number } {
  const current = currentFactorStamp();
  let changed = 0;
  const next = all.map((a) => {
    if (factorStamp(a) === current) return a;
    changed += 1;
    return recalculateWithLatestFactors(a);
  });
  return { next, changed };
}
