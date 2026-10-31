import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
  EMPTY_RATING_STATE,
  RATING_COOLDOWN_DAYS,
  isEligibleForReview,
  markRequested,
  recordMoment,
} from '../src/rating/ratingPolicy';

const day = (d: number) => new Date(Date.UTC(2026, 0, d, 12));

test('one value moment is not enough', () => {
  const s = recordMoment(EMPTY_RATING_STATE, 'report_shared', day(1));
  assert.equal(isEligibleForReview(s, day(1)), false);
});

test('repeated value on two different days makes the user eligible', () => {
  let s = recordMoment(EMPTY_RATING_STATE, 'report_shared', day(1));
  s = recordMoment(s, 'report_shared', day(1));
  assert.equal(isEligibleForReview(s, day(1)), false); // same day only
  s = recordMoment(s, 'comparison_seen', day(9));
  assert.equal(isEligibleForReview(s, day(9)), true);
});

test('cooldown, cap and rated state are respected', () => {
  let s = recordMoment(recordMoment(EMPTY_RATING_STATE, 'report_shared', day(1)), 'report_shared', day(3));
  s = markRequested(s, day(3));
  assert.equal(isEligibleForReview(s, day(30)), false);
  assert.equal(isEligibleForReview(s, new Date(day(3).getTime() + (RATING_COOLDOWN_DAYS + 1) * 86_400_000)), true);
  assert.equal(isEligibleForReview({ ...s, rated: true }, day(300)), false);
  assert.equal(isEligibleForReview({ ...s, requests: 3, lastRequestAt: null }, day(300)), false);
});
