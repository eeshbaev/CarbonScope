import { computeEmissions, factorStamp } from '../calculations';
import { boundaryShare, type Assessment, type Restatement } from '../types';

/**
 * When a finalized report is rebuilt with different factor datasets, record the previous result
 * and split the change into the part caused by new factors (old activity data × new factors)
 * and the part caused by edited activity data (GHG Protocol recalculation disclosure).
 */
export function buildRestatement(existing: Assessment, built: Assessment): Restatement | undefined {
  if (!existing.finalizedAt || existing.isDraft) return existing.restatement;
  if (factorStamp(existing) === factorStamp(built)) return existing.restatement;
  const oldDataNewFactors = computeEmissions({
    scope1: existing.scope1,
    scope2: existing.scope2,
    scope3: existing.scope3,
    countryCode: existing.countryCode,
    share: boundaryShare(existing.boundary),
  }).total;
  return {
    previousTotal: existing.totalEmissions,
    previousStamp: factorStamp(existing),
    factorEffect: oldDataNewFactors - existing.totalEmissions,
    activityEffect: built.totalEmissions - oldDataNewFactors,
    at: new Date().toISOString(),
  };
}

