import AsyncStorage from '@react-native-async-storage/async-storage';

const BACKUP_MADE_KEY = '@carbonscope/backup_last_at';
const NUDGE_DISMISSED_KEY = '@carbonscope/backup_nudge_dismissed_at';
/** Re-offer at most every 90 days. */
const NUDGE_INTERVAL_DAYS = 90;

export async function markBackupMade(): Promise<void> {
  await AsyncStorage.setItem(BACKUP_MADE_KEY, new Date().toISOString());
}

export async function dismissBackupNudge(): Promise<void> {
  await AsyncStorage.setItem(NUDGE_DISMISSED_KEY, new Date().toISOString());
}

function daysSince(iso: string | null): number {
  if (!iso) return Infinity;
  return (Date.now() - new Date(iso).getTime()) / 86_400_000;
}

/**
 * Progressive backup offer (no account): once the user has something worth protecting —
 * at least two finalized reports — and has not backed up or dismissed the offer recently.
 */
export async function shouldOfferBackup(finalizedCount: number): Promise<boolean> {
  if (finalizedCount < 2) return false;
  const [made, dismissed] = await Promise.all([
    AsyncStorage.getItem(BACKUP_MADE_KEY),
    AsyncStorage.getItem(NUDGE_DISMISSED_KEY),
  ]);
  return daysSince(made) > NUDGE_INTERVAL_DAYS && daysSince(dismissed) > NUDGE_INTERVAL_DAYS;
}
