/**
 * Colour tokens — “paper & daylight instrument” (docs/DESIGN.md §3.1).
 * Legacy keys (background, text, primary…) map onto the new tokens so existing screens
 * adopt the palette; new code should prefer the semantic names.
 * All text pairs are WCAG 2.2 AA; scope colours meet 3:1 for graphics on surface.
 */
export const colors = {
  // Semantic tokens
  canvas: '#F6F5F0',
  surface: '#FFFFFF',
  surfaceSunken: '#EFEDE6',
  ink: '#16201B',
  inkSecondary: '#3F4B45',
  inkTertiary: '#63706A',
  hairline: '#E2DFD6',
  brand: '#1F6B4F',
  brandPressed: '#185640',
  brandTint: '#E4F0EA',
  positive: '#2F7D4F',
  negative: '#B4472B',
  warningInk: '#8A5A00',
  warningTint: '#FBF1DC',
  scope1: '#D4612A',
  scope2: '#A87D07',
  scope3: '#3A6EA5',
  biogenic: '#5E8C3A',

  // Legacy aliases
  background: '#F6F5F0',
  text: '#16201B',
  textSecondary: '#3F4B45',
  primary: '#1F6B4F',
  primaryLight: '#2E7D5E',
  primaryMuted: '#E4F0EA',
  border: '#E2DFD6',
  card: '#FFFFFF',
  chartOrange: '#D4612A',
  chartYellow: '#A87D07',
  chartBlue: '#3A6EA5',
  danger: '#B4472B',
  white: '#FFFFFF',
};
