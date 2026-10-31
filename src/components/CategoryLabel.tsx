import { StyleSheet, Text, View, type StyleProp, type TextStyle } from 'react-native';
import type { EmissionCategoryKey } from '../data/categoryEmblems';
import { CategoryIcon } from '../design/CategoryIcon';
import { scaleFontSize } from '../theme/scale';
import { useAccessibility } from '../context/AccessibilityContext';

type Props = {
  category: EmissionCategoryKey;
  label: string;
  style?: StyleProp<TextStyle>;
  emblemSize?: number;
  numberOfLines?: number;
};

/** Source name with its line icon. */
export function CategoryLabel({ category, label, style, emblemSize, numberOfLines }: Props) {
  const { fontScale } = useAccessibility();
  const iconSize = emblemSize ?? scaleFontSize(18, fontScale);
  const color = StyleSheet.flatten(style)?.color;

  return (
    <View style={styles.row}>
      <CategoryIcon category={category} size={iconSize} color={typeof color === 'string' ? color : undefined} />
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
  label: {
    flexShrink: 1,
  },
});
