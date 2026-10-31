import { StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { formatEmissions } from '../calculations';
import { useAccessibility } from '../context/AccessibilityContext';
import { colors } from '../theme';
import { scaleFontSize } from '../theme/scale';

type Size = 'display' | 'title' | 'headline';
const SIZES: Record<Size, { value: number; unit: number }> = {
  display: { value: 56, unit: 15 },
  title: { value: 28, unit: 13 },
  headline: { value: 20, unit: 13 },
};

/** A number with its unit, tabular, unit set smaller (docs/DESIGN.md §3.2). */
export function Figure({
  value,
  unit,
  size = 'title',
  color = colors.ink,
  delta,
  style,
}: {
  value: number;
  unit: string;
  size?: Size;
  color?: string;
  /** Percentage change; negative = reduction (positive colour). */
  delta?: number | null;
  style?: StyleProp<ViewStyle>;
}) {
  const { fontScale } = useAccessibility();
  const s = SIZES[size];
  return (
    <View style={[styles.row, style]}>
      <Text
        style={[
          styles.value,
          { fontSize: scaleFontSize(s.value, fontScale), lineHeight: scaleFontSize(s.value * 1.1, fontScale), color },
        ]}
        adjustsFontSizeToFit
        numberOfLines={1}
      >
        {formatEmissions(value)}
      </Text>
      <Text style={[styles.unit, { fontSize: scaleFontSize(s.unit, fontScale) }]}>{unit}</Text>
      {delta != null && Number.isFinite(delta) ? (
        <View style={[styles.delta, { backgroundColor: delta <= 0 ? colors.brandTint : colors.warningTint }]}>
          <Text style={[styles.deltaText, { color: delta <= 0 ? colors.positive : colors.negative }]}>
            {`${delta > 0 ? '+' : delta < 0 ? '−' : ''}${Math.abs(Math.round(delta))}%`}
          </Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'baseline', flexWrap: 'wrap', gap: 6 },
  value: { fontWeight: '600', fontVariant: ['tabular-nums'], letterSpacing: -0.5 },
  unit: { color: colors.inkTertiary, fontWeight: '500' },
  delta: { borderRadius: 8, paddingHorizontal: 6, paddingVertical: 2, alignSelf: 'center' },
  deltaText: { fontSize: 12, fontWeight: '600', fontVariant: ['tabular-nums'] },
});
