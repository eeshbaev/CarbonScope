/** We do not deliver on Mon, Wed, Fri, Sat — only Sun, Tue, Thu. */
const BLOCKED_WEEKDAYS = new Set([1, 3, 5, 6]);

const ALLOWED_WEEKDAYS = [0, 2, 4]; // Sun, Tue, Thu

/** Move `date` forward to the next allowed weekday (same time of day). */
export function toAllowedNotificationDay(date: Date): Date {
  const result = new Date(date);
  let guard = 0;
  while (BLOCKED_WEEKDAYS.has(result.getDay()) && guard < 8) {
    result.setDate(result.getDate() + 1);
    guard += 1;
  }
  return result;
}

/** Next allowed calendar day at `hourLocal` (default 10:00). */
export function nextAllowedNotificationSlot(from: Date = new Date(), hourLocal = 10): Date {
  const candidate = new Date(from);
  candidate.setHours(hourLocal, 0, 0, 0);
  if (candidate.getTime() <= from.getTime()) {
    candidate.setDate(candidate.getDate() + 1);
  }
  return toAllowedNotificationDay(candidate);
}

/** Next weekly educational slot: next allowed day, then +7 days pattern via week index. */
export function nextWeeklyEducationalSlot(from: Date = new Date()): Date {
  return nextAllowedNotificationSlot(from, 10);
}

export function isAllowedNotificationWeekday(date: Date): boolean {
  return ALLOWED_WEEKDAYS.includes(date.getDay());
}
