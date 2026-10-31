import AsyncStorage from '@react-native-async-storage/async-storage';
import { requestInAppReview } from '../utils/appReview';
import {
  EMPTY_RATING_STATE,
  isEligibleForReview,
  markRequested,
  recordMoment,
  type RatingState,
  type ValueMoment,
} from './ratingPolicy';

const KEY = '@carbonscope/rating_state_v2';
const LEGACY_RATED_KEY = '@carbonscope/rating_feedback_provided';
/** Pause after the success moment so the request never interrupts the action itself. */
const NATURAL_PAUSE_MS = 1200;

async function load(): Promise<RatingState> {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    const state = raw ? { ...EMPTY_RATING_STATE, ...(JSON.parse(raw) as RatingState) } : EMPTY_RATING_STATE;
    if (!state.rated && (await AsyncStorage.getItem(LEGACY_RATED_KEY)) === 'true') {
      return { ...state, rated: true };
    }
    return state;
  } catch {
    return EMPTY_RATING_STATE;
  }
}

async function save(state: RatingState): Promise<void> {
  await AsyncStorage.setItem(KEY, JSON.stringify(state));
}

/**
 * The single entry point for automatic rating requests. Call it right after a value moment
 * completes successfully; it records the moment and, if the policy allows, asks the OS for a
 * review after a short natural pause. Uses only the native review dialog.
 */
export async function onValueMoment(moment: ValueMoment): Promise<void> {
  const now = new Date();
  let state = recordMoment(await load(), moment, now);
  const eligible = isEligibleForReview(state, now);
  if (eligible) state = markRequested(state, now);
  await save(state);
  if (eligible) {
    setTimeout(() => {
      void requestInAppReview();
    }, NATURAL_PAUSE_MS);
  }
}

/** User chose “Rate CarbonScope” in Settings: never ask automatically again. */
export async function markRatedByUser(): Promise<void> {
  const state = await load();
  await save({ ...state, rated: true });
}
