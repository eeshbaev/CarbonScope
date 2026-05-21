export { colors } from './theme/colors';

import { BASE_SPACING, BASE_TYPOGRAPHY } from './theme/scale';

/** Default scale (1×). Prefer `useAccessibility()` in UI components. */
export const spacing = BASE_SPACING;

/** Default scale (1×). Prefer `useAccessibility()` in UI components. */
export const typography = BASE_TYPOGRAPHY;

export { buildSpacing, buildTypography, scaleFontSize, scaleSize } from './theme/scale';
export type { ScaledSpacing, ScaledTypography } from './theme/scale';

export const radii = {
  sm: 8,
  md: 12,
  lg: 16,
  full: 999,
};
