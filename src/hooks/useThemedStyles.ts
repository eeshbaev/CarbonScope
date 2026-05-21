import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { useAccessibility } from '../context/AccessibilityContext';
import { colors, radii } from '../theme';
import type { ScaledSpacing, ScaledTypography } from '../theme/scale';

export type ThemeSlice = {
  typography: ScaledTypography;
  spacing: ScaledSpacing;
  colors: typeof colors;
  radii: typeof radii;
  fontScale: number;
  displayScale: number;
};

export function useThemedStyles<T extends StyleSheet.NamedStyles<T>>(
  create: (theme: ThemeSlice) => T
): T {
  const { typography, spacing, fontScale, displayScale } = useAccessibility();
  return useMemo(
    () => StyleSheet.create(create({ typography, spacing, colors, radii, fontScale, displayScale })),
    [typography, spacing, fontScale, displayScale, create]
  );
}
