import { Image, StyleSheet } from 'react-native';

type Props = {
  /** Icon width/height in px */
  size?: number;
};

const brandIcon = require('../../../assets/brand-icon.png');

/** App icon mark — green rounded square with CO₂ ring (used in-app and store). */
export function CarbonScopeMark({ size = 48 }: Props) {
  const radius = Math.round(size * 0.22);
  return (
    <Image
      source={brandIcon}
      style={[styles.image, { width: size, height: size, borderRadius: radius }]}
      resizeMode="cover"
      accessibilityLabel="CarbonScope"
    />
  );
}

const styles = StyleSheet.create({
  image: {
    backgroundColor: 'transparent',
  },
});
