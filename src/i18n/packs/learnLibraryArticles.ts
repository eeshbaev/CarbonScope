/** Knowledge library article ids (order shown in Learn Library screen). */
export const LEARN_ARTICLE_IDS = [
  'ghgProtocol',
  'scope1vs2',
  'csrd',
  'iso14064',
  'scope2Methods',
  'dataEvidence',
  'gridFactors',
  'firstAssessment',
] as const;

export type LearnArticleId = (typeof LEARN_ARTICLE_IDS)[number];
