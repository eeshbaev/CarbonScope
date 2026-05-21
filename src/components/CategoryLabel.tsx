import { StyleSheet, Text, View, type StyleProp, type TextStyle } from 'react-native';
import { getCategoryEmblem, type EmissionCategoryKey } from '../data/categoryEmblems';
import { scaleFontSize } from '../theme/scale';
import { useAccessibility } from '../context/AccessibilityContext';

type Props = {
  category: EmissionCategoryKey;
  label: string;
  style?: StyleProp<TextStyle>;
  emblemSize?: number;
  numberOfLines?: number;
};

/** Category name with a leading emblem (fuel, gas, electricity). */
export function CategoryLabel({
  category,
  label,
  style,
  emblemSize,
  numberOfLines,
}: Props) {
  const { fontScale } = useAccessibility();
  const iconSize = emblemSize ?? scaleFontSize(18, fontScale);

  return (
    <View style={styles.row}>
      <Text style={[styles.emblem, { fontSize: iconSize, lineHeight: iconSize * 1.2 }]}>
        {getCategoryEmblem(category)}
      </Text>
      <Text style={[styles.label, style]} numberOfLines={numberOfLines}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 1,
    gap: 8,
  },
  emblem: {
    textAlign: 'center',
  },
  label: {
    flexShrink: 1,
  },
});
