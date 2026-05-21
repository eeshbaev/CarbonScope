import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  DEFAULT_ACCESSIBILITY_PREFS,
  type AccessibilityPrefs,
  type DisplaySizePreference,
  type FontSizePreference,
  isDisplaySizePreference,
  isFontSizePreference,
} from '../accessibility/prefs';

const ACCESSIBILITY_KEY = '@carbonscope/accessibility';

export async function getStoredAccessibilityPrefs(): Promise<AccessibilityPrefs> {
  const raw = await AsyncStorage.getItem(ACCESSIBILITY_KEY);
  if (!raw) return { ...DEFAULT_ACCESSIBILITY_PREFS };
  try {
    const parsed = JSON.parse(raw) as Partial<AccessibilityPrefs>;
    return {
      fontSize:
        parsed.fontSize && isFontSizePreference(parsed.fontSize)
          ? parsed.fontSize
          : DEFAULT_ACCESSIBILITY_PREFS.fontSize,
      displaySize:
        parsed.displaySize && isDisplaySizePreference(parsed.displaySize)
          ? parsed.displaySize
          : DEFAULT_ACCESSIBILITY_PREFS.displaySize,
    };
  } catch {
    return { ...DEFAULT_ACCESSIBILITY_PREFS };
  }
}

export async function setStoredAccessibilityPrefs(prefs: AccessibilityPrefs): Promise<void> {
  await AsyncStorage.setItem(ACCESSIBILITY_KEY, JSON.stringify(prefs));
}

export async function setStoredFontSize(fontSize: FontSizePreference): Promise<AccessibilityPrefs> {
  const current = await getStoredAccessibilityPrefs();
  const next = { ...current, fontSize };
  await setStoredAccessibilityPrefs(next);
  return next;
}

export async function setStoredDisplaySize(
  displaySize: DisplaySizePreference
): Promise<AccessibilityPrefs> {
  const current = await getStoredAccessibilityPrefs();
  const next = { ...current, displaySize };
  await setStoredAccessibilityPrefs(next);
  return next;
}
