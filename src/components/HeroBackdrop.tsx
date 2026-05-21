import { Image, StyleSheet, View } from 'react-native';

const heroUrbanBackdrop = require('../../assets/hero-urban-backdrop.png');

/** Realistic urban scene behind the home brand hero at reduced opacity. */
export function HeroBackdrop() {
  return (
    <View style={styles.wrap} pointerEvents="none">
      <Image
        source={heroUrbanBackdrop}
        style={styles.image}
        resizeMode="cover"
        accessibilityIgnoresInvertColors
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
    opacity: 0.4,
  },
});
