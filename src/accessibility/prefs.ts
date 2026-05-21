export type FontSizePreference = 'small' | 'default' | 'large' | 'extraLarge';
export type DisplaySizePreference = 'compact' | 'default' | 'comfortable' | 'large';

export interface AccessibilityPrefs {
  fontSize: FontSizePreference;
  displaySize: DisplaySizePreference;
}

export const DEFAULT_ACCESSIBILITY_PREFS: AccessibilityPrefs = {
  fontSize: 'default',
  displaySize: 'default',
};

const FONT_SCALE: Record<FontSizePreference, number> = {
  small: 0.9,
  default: 1,
  large: 1.12,
  extraLarge: 1.28,
};

const DISPLAY_SCALE: Record<DisplaySizePreference, number> = {
  compact: 0.92,
  default: 1,
  comfortable: 1.08,
  large: 1.16,
};

export function fontScaleFactor(pref: FontSizePreference): number {
  return FONT_SCALE[pref];
}

export function displayScaleFactor(pref: DisplaySizePreference): number {
  return DISPLAY_SCALE[pref];
}

export function isFontSizePreference(value: string): value is FontSizePreference {
  return value in FONT_SCALE;
}

export function isDisplaySizePreference(value: string): value is DisplaySizePreference {
  return value in DISPLAY_SCALE;
}
