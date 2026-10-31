import { Pressable as RNPressable, type PressableProps, type StyleProp, type ViewStyle } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { useAccessibility } from '../context/AccessibilityContext';
import { motion } from '../theme';
import { haptics } from './haptics';

const AnimatedPressable = Animated.createAnimatedComponent(RNPressable);

type Props = Omit<PressableProps, 'style'> & {
  style?: StyleProp<ViewStyle>;
  /** Haptic on press: selection for chips/cards, light for primary buttons. */
  haptic?: 'selection' | 'light' | 'none';
};

/** Pressable with physical feedback: scale 0.97 + dim, spring back (reduced motion: dim only). */
export function PressableScale({ style, haptic = 'none', onPressIn, onPressOut, onPress, ...rest }: Props) {
  const { reduceMotion } = useAccessibility();
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);
  const animated = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  return (
    <AnimatedPressable
      {...rest}
      onPressIn={(e) => {
        if (!reduceMotion) scale.value = withSpring(motion.pressScale, motion.spring.standard);
        opacity.value = withTiming(0.85, { duration: motion.duration.instant });
        onPressIn?.(e);
      }}
      onPressOut={(e) => {
        scale.value = withSpring(1, motion.spring.standard);
        opacity.value = withTiming(1, { duration: motion.duration.instant });
        onPressOut?.(e);
      }}
      onPress={(e) => {
        if (haptic === 'selection') haptics.selection();
        if (haptic === 'light') haptics.light();
        onPress?.(e);
      }}
      style={[style, animated]}
    />
  );
}
