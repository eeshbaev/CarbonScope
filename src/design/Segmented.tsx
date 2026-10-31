import { StyleSheet, Text, View } from 'react-native';
import { colors, radii } from '../theme';
import { PressableScale } from './Pressable';

/** Pill segmented control with selection haptic. Wraps on narrow widths. */
export function Segmented<T extends string>({
  options,
  value,
  onChange,
  size = 'md',
  accessibilityLabel,
}: {
  options: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
  size?: 'sm' | 'md';
  accessibilityLabel?: string;
}) {
  return (
    <View style={styles.track} accessibilityRole="radiogroup" accessibilityLabel={accessibilityLabel}>
      {options.map((o) => {
        const on = o.value === value;
        return (
          <PressableScale
            key={o.value}
            haptic="selection"
            onPress={() => onChange(o.value)}
            accessibilityRole="radio"
            accessibilityState={{ checked: on }}
            style={[styles.seg, size === 'sm' && styles.segSm, on && styles.segOn]}
          >
            <Text style={[styles.label, size === 'sm' && styles.labelSm, on && styles.labelOn]} numberOfLines={1}>
              {o.label}
            </Text>
          </PressableScale>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: colors.surfaceSunken,
    borderRadius: radii.md,
    padding: 3,
    gap: 3,
  },
  seg: {
    flexGrow: 1,
    minHeight: 40,
    paddingHorizontal: 12,
    borderRadius: radii.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  segSm: { minHeight: 32, paddingHorizontal: 10 },
  segOn: { backgroundColor: colors.surface, borderWidth: StyleSheet.hairlineWidth, borderColor: colors.hairline },
  label: { fontSize: 14, fontWeight: '500', color: colors.inkSecondary },
  labelSm: { fontSize: 12 },
  labelOn: { color: colors.ink, fontWeight: '600' },
});
