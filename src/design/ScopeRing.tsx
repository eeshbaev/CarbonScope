import { useEffect } from 'react';
import { StyleSheet, View, type ViewStyle } from 'react-native';
import Animated, {
  useAnimatedProps,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import Svg, { Circle } from 'react-native-svg';
import { useAccessibility } from '../context/AccessibilityContext';
import { colors, motion } from '../theme';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

type Props = {
  /** tCO₂e per scope; zero values are omitted from the ring. */
  values: [number, number, number];
  size?: number;
  stroke?: number;
  /** Animate arcs from empty on mount (the Reveal). */
  reveal?: boolean;
  /** Centre content (total). */
  children?: React.ReactNode;
  style?: ViewStyle;
  accessibilityLabel?: string;
};

const SCOPE_COLORS = [colors.scope1, colors.scope2, colors.scope3];
const GAP_DEG = 4;

function Arc({
  index,
  start,
  sweep,
  r,
  c,
  stroke,
  size,
  reveal,
  reduceMotion,
}: {
  index: number;
  start: number;
  sweep: number;
  r: number;
  c: number;
  stroke: number;
  size: number;
  reveal: boolean;
  reduceMotion: boolean;
}) {
  const progress = useSharedValue(reveal && !reduceMotion ? 0 : sweep);
  useEffect(() => {
    if (reduceMotion) {
      progress.value = withTiming(sweep, { duration: motion.duration.quick });
    } else {
      progress.value = withDelay(reveal ? index * 120 : 0, withSpring(sweep, motion.spring.gentle));
    }
  }, [sweep, reveal, reduceMotion, index, progress]);

  const animatedProps = useAnimatedProps(() => {
    const len = Math.max((progress.value / 360) * c, 0);
    return { strokeDasharray: [len, c] as unknown as string };
  });

  return (
    <AnimatedCircle
      cx={size / 2}
      cy={size / 2}
      r={r}
      stroke={SCOPE_COLORS[index]}
      strokeWidth={stroke}
      strokeLinecap="round"
      fill="none"
      rotation={start - 90}
      origin={`${size / 2}, ${size / 2}`}
      animatedProps={animatedProps}
    />
  );
}

/** The signature Scope Ring: three arcs sized by Scope 1/2/3 share. */
export function ScopeRing({
  values,
  size = 160,
  stroke,
  reveal = false,
  children,
  style,
  accessibilityLabel,
}: Props) {
  const { reduceMotion } = useAccessibility();
  const sw = stroke ?? Math.max(8, Math.round(size / 10));
  const r = (size - sw) / 2;
  const c = 2 * Math.PI * r;
  const total = values.reduce((a, b) => a + Math.max(b, 0), 0);
  const parts = values.map((v) => (total > 0 ? Math.max(v, 0) / total : 0));
  const active = parts.filter((p) => p > 0).length;
  const gap = active > 1 ? GAP_DEG : 0;

  let cursor = 0;
  const arcs = parts.map((p, i) => {
    const sweep = p > 0 ? Math.max(p * 360 - gap, 1) : 0;
    const start = cursor + (p > 0 ? gap / 2 : 0);
    cursor += p * 360;
    return { i, start, sweep };
  });

  return (
    <View
      style={[{ width: size, height: size }, style]}
      accessible
      accessibilityRole="image"
      accessibilityLabel={accessibilityLabel}
    >
      <Svg width={size} height={size}>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={colors.surfaceSunken}
          strokeWidth={sw}
          fill="none"
        />
        {arcs.map((a) =>
          a.sweep > 0 ? (
            <Arc
              key={a.i}
              index={a.i}
              start={a.start}
              sweep={a.sweep}
              r={r}
              c={c}
              stroke={sw}
              size={size}
              reveal={reveal}
              reduceMotion={reduceMotion}
            />
          ) : null
        )}
      </Svg>
      {children ? <View style={[StyleSheet.absoluteFill, styles.center]}>{children}</View> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  center: { alignItems: 'center', justifyContent: 'center' },
});
