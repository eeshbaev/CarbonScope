import { StyleSheet, Text, View } from 'react-native';
import Svg, { Circle, Polyline } from 'react-native-svg';
import { formatEmissions } from '../calculations';
import { useThemedStyles, type ThemeSlice } from '../hooks/useThemedStyles';
import type { TrendPoint } from '../utils/assessmentHistory';
import { colors } from '../theme';
import { scaleFontSize } from '../theme/scale';

type Props = {
  points: TrendPoint[];
  width?: number;
  height?: number;
  tco2eLabel: string;
};

export function EmissionsSparkline({ points, width = 280, height = 100, tco2eLabel }: Props) {
  const styles = useThemedStyles(createStyles);

  if (points.length < 2) return null;

  const pad = 8;
  const max = Math.max(...points.map((p) => p.total), 0.001);
  const coords = points.map((p, i) => {
    const x = pad + (i / (points.length - 1)) * (width - pad * 2);
    const y = height - pad - (p.total / max) * (height - pad * 2);
    return { x, y, p };
  });
  const poly = coords.map((c) => `${c.x},${c.y}`).join(' ');

  return (
    <View>
      <Svg width={width} height={height}>
        <Polyline
          points={poly}
          fill="none"
          stroke={colors.primary}
          strokeWidth={2.5}
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        {coords.map((c) => (
          <Circle key={c.p.id} cx={c.x} cy={c.y} r={4} fill={colors.primary} />
        ))}
      </Svg>
      <View style={styles.labels}>
        {coords.map((c) => (
          <Text key={c.p.id} style={styles.label} numberOfLines={1}>
            {c.p.label.split(' ')[0]}
          </Text>
        ))}
      </View>
      <Text style={styles.latest}>
        {formatEmissions(points[points.length - 1].total)} {tco2eLabel}
      </Text>
    </View>
  );
}

function createStyles({ typography, spacing, fontScale }: ThemeSlice) {
  return StyleSheet.create({
    labels: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: spacing.xs,
    },
    label: {
      ...typography.caption,
      fontSize: scaleFontSize(10, fontScale),
      flex: 1,
      textAlign: 'center',
    },
    latest: {
      ...typography.caption,
      color: colors.primary,
      fontWeight: '600',
      textAlign: 'center',
      marginTop: spacing.xs,
    },
  });
}
