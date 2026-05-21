import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  DEFAULT_ACCESSIBILITY_PREFS,
  displayScaleFactor,
  fontScaleFactor,
  type AccessibilityPrefs,
  type DisplaySizePreference,
  type FontSizePreference,
} from '../accessibility/prefs';
import {
  getStoredAccessibilityPrefs,
  setStoredDisplaySize,
  setStoredFontSize,
} from '../storage/accessibility';
import { buildSpacing, buildTypography, type ScaledSpacing, type ScaledTypography } from '../theme/scale';

interface AccessibilityContextValue {
  prefs: AccessibilityPrefs;
  typography: ScaledTypography;
  spacing: ScaledSpacing;
  fontScale: number;
  displayScale: number;
  ready: boolean;
  setFontSize: (size: FontSizePreference) => Promise<void>;
  setDisplaySize: (size: DisplaySizePreference) => Promise<void>;
}

const AccessibilityContext = createContext<AccessibilityContextValue | null>(null);

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  const [prefs, setPrefs] = useState<AccessibilityPrefs>(DEFAULT_ACCESSIBILITY_PREFS);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    getStoredAccessibilityPrefs().then((stored) => {
      setPrefs(stored);
      setReady(true);
    });
  }, []);

  const fontScale = fontScaleFactor(prefs.fontSize);
  const displayScale = displayScaleFactor(prefs.displaySize);

  const typography = useMemo(() => buildTypography(fontScale), [fontScale]);
  const spacing = useMemo(() => buildSpacing(displayScale), [displayScale]);

  const setFontSize = useCallback(async (fontSize: FontSizePreference) => {
    const next = await setStoredFontSize(fontSize);
    setPrefs(next);
  }, []);

  const setDisplaySize = useCallback(async (displaySize: DisplaySizePreference) => {
    const next = await setStoredDisplaySize(displaySize);
    setPrefs(next);
  }, []);

  const value = useMemo(
    () => ({
      prefs,
      typography,
      spacing,
      fontScale,
      displayScale,
      ready,
      setFontSize,
      setDisplaySize,
    }),
    [prefs, typography, spacing, fontScale, displayScale, ready, setFontSize, setDisplaySize]
  );

  return (
    <AccessibilityContext.Provider value={value}>{children}</AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const ctx = useContext(AccessibilityContext);
  if (!ctx) throw new Error('useAccessibility must be used within AccessibilityProvider');
  return ctx;
}
