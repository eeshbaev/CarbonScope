export { colors } from './theme/colors';

import { BASE_SPACING, BASE_TYPOGRAPHY } from './theme/scale';

/** Default scale (1×). Prefer `useAccessibility()` in UI components. */
export const spacing = BASE_SPACING;

/** Default scale (1×). Prefer `useAccessibility()` in UI components. */
export const typography = BASE_TYPOGRAPHY;

export { buildSpacing, buildTypography, scaleFontSize, scaleSize } from './theme/scale';
export type { ScaledSpacing, ScaledTypography } from './theme/scale';

/** Concentric radii (inner = outer − padding): chips 8 · inputs/buttons 12 · cards 20 · sheets 28. */
export const radii = {
  xs: 8,
  sm: 8,
  md: 12,
  lg: 20,
  xl: 28,
  full: 999,
};

export { motion } from './theme/motion';
