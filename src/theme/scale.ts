import { colors } from './colors';

export const BASE_TYPOGRAPHY = {
  title: { fontSize: 28, fontWeight: '700' as const, color: colors.text },
  subtitle: { fontSize: 18, fontWeight: '600' as const, color: colors.text },
  body: { fontSize: 16, fontWeight: '400' as const, color: colors.text },
  caption: { fontSize: 13, fontWeight: '400' as const, color: colors.textSecondary },
  label: { fontSize: 14, fontWeight: '600' as const, color: colors.text },
};

export const BASE_SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export type ScaledTypography = typeof BASE_TYPOGRAPHY;
export type ScaledSpacing = typeof BASE_SPACING;

function roundSize(size: number, scale: number): number {
  return Math.round(size * scale);
}

export function buildTypography(fontScale: number): ScaledTypography {
  return {
    title: { ...BASE_TYPOGRAPHY.title, fontSize: roundSize(28, fontScale) },
    subtitle: { ...BASE_TYPOGRAPHY.subtitle, fontSize: roundSize(18, fontScale) },
    body: { ...BASE_TYPOGRAPHY.body, fontSize: roundSize(16, fontScale) },
    caption: { ...BASE_TYPOGRAPHY.caption, fontSize: roundSize(13, fontScale) },
    label: { ...BASE_TYPOGRAPHY.label, fontSize: roundSize(14, fontScale) },
  };
}

export function buildSpacing(displayScale: number): ScaledSpacing {
  return {
    xs: roundSize(4, displayScale),
    sm: roundSize(8, displayScale),
    md: roundSize(16, displayScale),
    lg: roundSize(24, displayScale),
    xl: roundSize(32, displayScale),
  };
}

/** Scale ad-hoc font sizes (inputs, icons, charts). */
export function scaleFontSize(size: number, fontScale: number): number {
  return roundSize(size, fontScale);
}

/** Scale fixed layout sizes (buttons, pickers). */
export function scaleSize(size: number, displayScale: number): number {
  return roundSize(size, displayScale);
}
