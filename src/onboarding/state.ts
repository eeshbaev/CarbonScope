import AsyncStorage from '@react-native-async-storage/async-storage';
import type { CategoryLineKey } from '../data/inputLines';
import type { IndustryKey } from '../data/industries';
import { INDUSTRY_HINT_CATEGORY } from '../i18n/packs/inputHints/types';

/** What the user needs from the app; changes the result’s primary action and Home emphasis. */
export type OnboardingGoal = 'request' | 'reduce' | 'consultant' | 'none';

const GOAL_KEY = '@carbonscope/onboarding_goal';

export async function getGoal(): Promise<OnboardingGoal> {
  const v = await AsyncStorage.getItem(GOAL_KEY);
  return v === 'request' || v === 'reduce' || v === 'consultant' ? v : 'none';
}

export async function setGoal(goal: OnboardingGoal): Promise<void> {
  await AsyncStorage.setItem(GOAL_KEY, goal);
}

/** Eight common industries shown as chips; the full list stays behind “More…”. */
export const QUICK_INDUSTRIES: IndustryKey[] = [
  'professional_services',
  'retail',
  'hospitality',
  'manufacturing',
  'construction',
  'logistics',
  'healthcare',
  'other',
];

/** The 2–3 sources that usually matter most for an industry (first-data step). */
export function firstSourcesFor(industry: IndustryKey | ''): CategoryLineKey[] {
  const cat = INDUSTRY_HINT_CATEGORY[(industry || 'other') as IndustryKey] ?? 'other';
  switch (cat) {
    case 'transport':
    case 'aviation':
    case 'maritime':
      return ['diesel', 'electricity', 'petrol'];
    case 'manufacturing':
    case 'construction':
    case 'energy':
    case 'mining':
    case 'oil_gas':
    case 'agriculture':
    case 'defense':
      return ['electricity', 'naturalGas', 'diesel'];
    default:
      return ['electricity', 'naturalGas', 'petrol'];
  }
}

/** Reporting window default: the last full calendar year. */
export function defaultReportingStart(now = new Date()): string {
  return `${now.getFullYear() - 1}-01-01`;
}
