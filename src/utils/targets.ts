import type { Assessment } from '../types';
import type { ReductionTarget } from '../types/enterprise';
import { comparableTotals, findBaseAssessment, type ComparisonBasis } from './assessmentHistory';

export type TargetGapResult = {
  hasTarget: boolean;
  targetLabel: string;
  currentTco2e: number;
  baselineTco2e: number | null;
  targetTco2e: number | null;
  gapTco2e: number | null;
  gapPercent: number | null;
  onTrack: boolean | null;
  /** 'scope12' when Scope 3 coverage differs from the base period. */
  basis: ComparisonBasis;
};

export function computeTargetGap(
  assessment: Assessment,
  allAssessments: Assessment[],
  labels: {
    targetPercent: (value: number) => string;
    targetAbsolute: (value: string) => string;
    noBaseline: string;
  }
): TargetGapResult {
  const target = assessment.reductionTarget;
  if (!target || target.value <= 0) {
    return {
      hasTarget: false,
      targetLabel: '',
      currentTco2e: assessment.totalEmissions,
      baselineTco2e: null,
      targetTco2e: null,
      gapTco2e: null,
      gapPercent: null,
      onTrack: null,
      basis: 'total',
    };
  }

  // Fixed base period (GHG Protocol / SBTi practice): the earliest finalized report of the same
  // length, compared like for like on scope coverage.
  const base = findBaseAssessment(allAssessments, assessment);
  const totals = base
    ? comparableTotals(assessment, base)
    : { current: assessment.totalEmissions, other: assessment.totalEmissions, basis: 'total' as const };
  const baseline = totals.other;
  const current = totals.current;

  let targetTco2e: number;
  let targetLabel: string;

  if (target.type === 'percent') {
    targetTco2e = baseline * (1 - target.value / 100);
    targetLabel = labels.targetPercent(target.value);
  } else {
    targetTco2e = target.value;
    targetLabel = labels.targetAbsolute(String(target.value));
  }

  const gapTco2e = current - targetTco2e;
  const gapPercent =
    targetTco2e > 0 ? ((current - targetTco2e) / targetTco2e) * 100 : null;
  const onTrack = current <= targetTco2e;

  return {
    hasTarget: true,
    targetLabel,
    currentTco2e: current,
    baselineTco2e: base ? baseline : null,
    targetTco2e,
    gapTco2e,
    gapPercent,
    onTrack,
    basis: totals.basis,
  };
}

export function isValidReductionTarget(target: ReductionTarget | undefined): boolean {
  if (!target) return false;
  if (target.value <= 0) return false;
  if (target.type === 'percent' && target.value > 100) return false;
  return true;
}
