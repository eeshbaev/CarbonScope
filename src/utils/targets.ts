import type { Assessment } from '../types';
import type { ReductionTarget } from '../types/enterprise';
import { findPriorFinalizedAssessment } from './assessmentHistory';

export type TargetGapResult = {
  hasTarget: boolean;
  targetLabel: string;
  currentTco2e: number;
  baselineTco2e: number | null;
  targetTco2e: number | null;
  gapTco2e: number | null;
  gapPercent: number | null;
  onTrack: boolean | null;
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
    };
  }

  const prior = findPriorFinalizedAssessment(allAssessments, assessment);
  const baseline = prior?.totalEmissions ?? assessment.totalEmissions;
  const current = assessment.totalEmissions;

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
    baselineTco2e: prior ? baseline : null,
    targetTco2e,
    gapTco2e,
    gapPercent,
    onTrack,
  };
}

export function isValidReductionTarget(target: ReductionTarget | undefined): boolean {
  if (!target) return false;
  if (target.value <= 0) return false;
  if (target.type === 'percent' && target.value > 100) return false;
  return true;
}
