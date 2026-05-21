import Svg, { Path } from 'react-native-svg';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { colors } from '../../theme';

type Size = 'sm' | 'md' | 'lg';

type Props = {
  size?: Size;
};

const FONT: Record<Size, number> = {
  sm: 18,
  md: 22,
  lg: 30,
};

/** Circular “o” with orange top / yellow bottom — Scope 1 & 2 colors. */
function SplitO({ diameter }: { diameter: number }) {
  const r = diameter / 2;
  const cx = r;
  const cy = r;
  const top = `M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy} L ${cx - r} ${cy} Z`;
  const bottom = `M ${cx - r} ${cy} A ${r} ${r} 0 0 0 ${cx + r} ${cy} L ${cx - r} ${cy} Z`;

  return (
    <Svg width={diameter} height={diameter} viewBox={`0 0 ${diameter} ${diameter}`}>
      <Path d={top} fill={colors.scope1} />
      <Path d={bottom} fill={colors.scope2} />
    </Svg>
  );
}

/** Carbon + Scope with dual-color O — wordmark (row layout for reliable web alignment). */
export function CarbonScopeWordmark({ size = 'lg' }: Props) {
  const fontSize = FONT[size];
  const oDiameter = Math.round(fontSize * 0.72);
  const lineHeight = fontSize * 1.05;

  return (
    <View
      style={styles.row}
      accessibilityRole="text"
      accessibilityLabel="CarbonScope"
    >
      <Text style={[styles.part, { fontSize, lineHeight }]}>CarbonSc</Text>
      <View
        style={[
          styles.oWrap,
          {
            width: oDiameter,
            height: oDiameter,
            marginTop: Platform.select({
              ios: fontSize * 0.1,
              android: fontSize * 0.08,
              web: fontSize * 0.06,
              default: fontSize * 0.08,
            }),
          },
        ]}
      >
        <SplitO diameter={oDiameter} />
      </View>
      <Text style={[styles.part, { fontSize, lineHeight }]}>pe</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 1,
  },
  part: {
    fontWeight: '700',
    color: colors.primary,
    ...(Platform.OS === 'android' ? { includeFontPadding: false } : {}),
  },
  oWrap: {
    flexShrink: 0,
    marginHorizontal: 0,
  },
});
