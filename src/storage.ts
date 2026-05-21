import AsyncStorage from '@react-native-async-storage/async-storage';
import { ALL_COUNTRIES } from './data/countries';
import type { Locale } from './i18n';
import type { Assessment } from './types';
import { normalizeAssessment } from './types';
import type { EvidenceItem } from './types/enterprise';

const ASSESSMENTS_KEY = '@carbonscope/assessments';
const ONBOARDING_SEEN_KEY = '@carbonscope/onboarding_seen';
const LANGUAGE_KEY = '@carbonscope/language';
const RATE_PROMPT_KEY = '@carbonscope/rate_prompt_status';
const RATING_FEEDBACK_PROVIDED_KEY = '@carbonscope/rating_feedback_provided';
const COMPANIES_CREATED_KEY = '@carbonscope/companies_created_count';
const DELETES_COUNT_KEY = '@carbonscope/deletes_count';
const PENDING_DELETED_FEEDBACK_KEY = '@carbonscope/pending_deleted_feedback';

export type PendingDeletedFeedback = {
  assessment: Assessment;
  promptRate: boolean;
};

export type RatePromptStatus = 'never' | 'later' | 'dismissed' | 'done';

const LEGACY_COUNTRY_MAP: Record<string, string> = {
  'United States': 'US',
  'United Kingdom': 'GB',
  Germany: 'DE',
  France: 'FR',
  Spain: 'ES',
  Italy: 'IT',
  Netherlands: 'NL',
  Poland: 'PL',
  Russia: 'RU',
  Sweden: 'SE',
  Norway: 'NO',
  Finland: 'FI',
  Denmark: 'DK',
  China: 'CN',
  India: 'IN',
  Japan: 'JP',
  'South Korea': 'KR',
  Australia: 'AU',
  Canada: 'CA',
  Brazil: 'BR',
  Mexico: 'MX',
  Argentina: 'AR',
  Chile: 'CL',
  Colombia: 'CO',
  'Saudi Arabia': 'SA',
  UAE: 'AE',
  Turkey: 'TR',
  Kazakhstan: 'KZ',
  Uzbekistan: 'UZ',
  'South Africa': 'ZA',
  Nigeria: 'NG',
  Kenya: 'KE',
  Egypt: 'EG',
  Other: 'US',
};

function migrateRawAssessment(raw: Record<string, unknown>): Assessment {
  const countryName = (raw.country as string) ?? '';
  const countryCode =
    (raw.countryCode as string) ||
    LEGACY_COUNTRY_MAP[countryName] ||
    ALL_COUNTRIES.find((c) => c.name === countryName)?.code ||
    'US';

  const rp = raw.reportingPeriod as string | undefined;
  const reportingPeriod: Assessment['reportingPeriod'] =
    rp === '6_months' ? '6_months' : rp === '1_year' ? '1_year' : '1_year';

  return normalizeAssessment({
    ...(raw as unknown as Assessment),
    countryCode,
    country: countryName || ALL_COUNTRIES.find((c) => c.code === countryCode)?.name || countryCode,
    reportingPeriod,
    industry: (raw.industry as Assessment['industry']) || 'other',
    reportingStartDate: (raw.reportingStartDate as string) ?? '',
  });
}

export async function getStoredLanguage(): Promise<Locale | null> {
  const value = await AsyncStorage.getItem(LANGUAGE_KEY);
  if (!value) return null;
  return value as Locale;
}

export async function setStoredLanguage(locale: Locale): Promise<void> {
  await AsyncStorage.setItem(LANGUAGE_KEY, locale);
}

export async function hasSelectedLanguage(): Promise<boolean> {
  const value = await AsyncStorage.getItem(LANGUAGE_KEY);
  return !!value;
}

const LEGACY_WELCOME_KEY = '@carbonscope/welcome_seen';

export async function hasSeenOnboarding(): Promise<boolean> {
  const value = await AsyncStorage.getItem(ONBOARDING_SEEN_KEY);
  if (value === 'true') return true;
  const legacy = await AsyncStorage.getItem(LEGACY_WELCOME_KEY);
  if (legacy === 'true') {
    await setOnboardingSeen();
    return true;
  }
  return false;
}

export async function setOnboardingSeen(): Promise<void> {
  await AsyncStorage.setItem(ONBOARDING_SEEN_KEY, 'true');
}

export async function loadAssessments(): Promise<Assessment[]> {
  const raw = await AsyncStorage.getItem(ASSESSMENTS_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as Record<string, unknown>[];
    return parsed
      .map(migrateRawAssessment)
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
  } catch {
    return [];
  }
}

export async function saveAssessment(assessment: Assessment): Promise<void> {
  const existing = await loadAssessments();
  const index = existing.findIndex((a) => a.id === assessment.id);
  const next =
    index >= 0
      ? existing.map((a) => (a.id === assessment.id ? assessment : a))
      : [assessment, ...existing];
  await AsyncStorage.setItem(ASSESSMENTS_KEY, JSON.stringify(next));
}

export async function deleteAssessment(id: string): Promise<void> {
  const existing = await loadAssessments();
  const target = existing.find((a) => a.id === id);
  if (target?.evidence?.length) {
    const { deleteAllEvidenceForAssessment } = await import('./storage/evidence');
    await deleteAllEvidenceForAssessment(id);
  }
  await AsyncStorage.setItem(
    ASSESSMENTS_KEY,
    JSON.stringify(existing.filter((a) => a.id !== id))
  );
}

export async function getAssessmentById(id: string): Promise<Assessment | null> {
  const all = await loadAssessments();
  return all.find((a) => a.id === id) ?? null;
}

let evidenceWriteChain: Promise<void> = Promise.resolve();

function withEvidenceWriteLock<T>(fn: () => Promise<T>): Promise<T> {
  const run = evidenceWriteChain.then(() => fn(), () => fn());
  evidenceWriteChain = run.then(
    () => undefined,
    () => undefined
  );
  return run;
}

/** Serialized read-modify-write for evidence to avoid lost attachments on rapid uploads. */
export async function updateAssessmentEvidence(
  assessmentId: string,
  update: (items: EvidenceItem[]) => EvidenceItem[]
): Promise<Assessment> {
  return withEvidenceWriteLock(async () => {
    const existing = await loadAssessments();
    const index = existing.findIndex((a) => a.id === assessmentId);
    if (index < 0) {
      throw new Error('Assessment not found');
    }
    const current = existing[index];
    const evidence = update(current.evidence ?? []);
    const next: Assessment = {
      ...current,
      evidence,
      updatedAt: new Date().toISOString(),
    };
    const list = existing.map((a) => (a.id === assessmentId ? next : a));
    await AsyncStorage.setItem(ASSESSMENTS_KEY, JSON.stringify(list));
    return next;
  });
}

export async function getRatePromptStatus(): Promise<RatePromptStatus> {
  const value = await AsyncStorage.getItem(RATE_PROMPT_KEY);
  if (value === 'later' || value === 'dismissed' || value === 'done') return value;
  return 'never';
}

export async function setRatePromptStatus(status: RatePromptStatus): Promise<void> {
  await AsyncStorage.setItem(RATE_PROMPT_KEY, status);
}

/** User rated (or opened review from settings) — never show automatic prompts again. */
export async function markRatingFeedbackProvided(): Promise<void> {
  await AsyncStorage.setItem(RATING_FEEDBACK_PROVIDED_KEY, 'true');
  await setRatePromptStatus('done');
}

export async function hasProvidedRatingFeedback(): Promise<boolean> {
  const flag = await AsyncStorage.getItem(RATING_FEEDBACK_PROVIDED_KEY);
  if (flag === 'true') return true;
  return (await getRatePromptStatus()) === 'done';
}

/** Automatic rating prompts (after Nth company / delete). Not used for Settings → Rate. */
export async function shouldShowRatePrompt(): Promise<boolean> {
  if (await hasProvidedRatingFeedback()) return false;
  const status = await getRatePromptStatus();
  return status === 'never' || status === 'later';
}

async function readCount(key: string): Promise<number> {
  const value = await AsyncStorage.getItem(key);
  const n = value ? parseInt(value, 10) : 0;
  return Number.isFinite(n) ? n : 0;
}

export async function getCompaniesCreatedCount(): Promise<number> {
  return readCount(COMPANIES_CREATED_KEY);
}

/** Increments when a new company assessment is saved (not an edit). Returns new total. */
export async function incrementCompaniesCreatedCount(): Promise<number> {
  const next = (await getCompaniesCreatedCount()) + 1;
  await AsyncStorage.setItem(COMPANIES_CREATED_KEY, String(next));
  return next;
}

export async function getDeletesCount(): Promise<number> {
  return readCount(DELETES_COUNT_KEY);
}

/** Increments on each successful assessment delete. Returns new total. */
export async function incrementDeletesCount(): Promise<number> {
  const next = (await getDeletesCount()) + 1;
  await AsyncStorage.setItem(DELETES_COUNT_KEY, String(next));
  return next;
}

export async function setPendingDeletedFeedback(
  payload: PendingDeletedFeedback | null
): Promise<void> {
  if (!payload) {
    await AsyncStorage.removeItem(PENDING_DELETED_FEEDBACK_KEY);
    return;
  }
  await AsyncStorage.setItem(PENDING_DELETED_FEEDBACK_KEY, JSON.stringify(payload));
}

/** Read once — used when Home opens after delete from Results. */
export async function consumePendingDeletedFeedback(): Promise<PendingDeletedFeedback | null> {
  const raw = await AsyncStorage.getItem(PENDING_DELETED_FEEDBACK_KEY);
  if (!raw) return null;
  await AsyncStorage.removeItem(PENDING_DELETED_FEEDBACK_KEY);
  try {
    return JSON.parse(raw) as PendingDeletedFeedback;
  } catch {
    return null;
  }
}

/** Removes all saved assessments and resets rate-prompt state. Keeps language and onboarding. */
export async function clearAllAppData(): Promise<void> {
  const { clearNotificationMeta } = await import('./notifications/notificationStorage');
  const { cancelAllScheduledNotifications } = await import('./notifications/scheduler');
  const { clearCustomElectricityFactors } = await import('./storage/customFactors');
  const { clearWorkspaceData } = await import('./storage/workspace');
  const { clearMethodologyLog } = await import('./storage/methodologyLog');
  await cancelAllScheduledNotifications();
  await clearNotificationMeta();
  await clearCustomElectricityFactors();
  await clearWorkspaceData();
  await clearMethodologyLog();
  await AsyncStorage.multiRemove([
    ASSESSMENTS_KEY,
    RATE_PROMPT_KEY,
    RATING_FEEDBACK_PROVIDED_KEY,
    COMPANIES_CREATED_KEY,
    DELETES_COUNT_KEY,
    PENDING_DELETED_FEEDBACK_KEY,
    LEGACY_WELCOME_KEY,
  ]);
}
