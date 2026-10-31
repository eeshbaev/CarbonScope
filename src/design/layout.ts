import { useWindowDimensions } from 'react-native';

/** Window size classes (docs/DESIGN.md §5) — based on window width, never device type. */
export type LayoutClass = 'compactS' | 'compact' | 'medium' | 'expanded' | 'large';

export function layoutClassFor(width: number): LayoutClass {
  if (width < 360) return 'compactS';
  if (width < 600) return 'compact';
  if (width < 840) return 'medium';
  if (width < 1200) return 'expanded';
  return 'large';
}

export interface LayoutInfo {
  cls: LayoutClass;
  width: number;
  height: number;
  /** Two panes side by side (list–detail, editor + live result). */
  twoPane: boolean;
  /** Short windows (SE, landscape phones): denser hero, fewer staggered reveals. */
  short: boolean;
  /** Screen margin per size class. */
  margin: number;
  /** Max width of a single readable column. */
  contentMax: number;
}

export function layoutInfo(width: number, height: number): LayoutInfo {
  const cls = layoutClassFor(width);
  const margin = { compactS: 16, compact: 20, medium: 24, expanded: 32, large: 40 }[cls];
  return {
    cls,
    width,
    height,
    twoPane: width >= 720,
    short: height < 700,
    margin,
    contentMax: cls === 'large' ? 1080 : 720,
  };
}

export function useLayout(): LayoutInfo {
  const { width, height } = useWindowDimensions();
  return layoutInfo(width, height);
}
