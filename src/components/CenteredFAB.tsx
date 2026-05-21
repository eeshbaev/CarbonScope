import { useRef } from 'react';
import { Animated, Pressable, StyleSheet, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing } from '../theme';

interface CenteredFABProps {
  onPress: () => void;
  accessibilityLabel?: string;
}

export function CenteredFAB({ onPress, accessibilityLabel }: CenteredFABProps) {
  const insets = useSafeAreaInsets();
  const scale = useRef(new Animated.Value(1)).current;

  const pressIn = () => {
    Animated.spring(scale, { toValue: 0.92, useNativeDriver: true, friction: 6 }).start();
  };
  const pressOut = () => {
    Animated.spring(scale, { toValue: 1, useNativeDriver: true, friction: 6 }).start();
  };

  return (
    <Animated.View
      style={[styles.wrap, { bottom: spacing.lg + Math.max(insets.bottom, 8), transform: [{ scale }] }]}
    >
      <Pressable
        style={styles.fab}
        onPress={onPress}
        onPressIn={pressIn}
        onPressOut={pressOut}
        accessibilityLabel={accessibilityLabel}
        accessibilityRole="button"
      >
        <Text style={styles.plus}>+</Text>
      </Pressable>
    </Animated.View>
  );
}

const SIZE = 72;

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  fab: {
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 8,
  },
  plus: {
    color: colors.white,
    fontSize: 40,
    fontWeight: '300',
    lineHeight: 42,
    marginTop: -2,
  },
});
