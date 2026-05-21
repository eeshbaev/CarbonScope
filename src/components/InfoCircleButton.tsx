import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, radii } from '../theme';

interface InfoCircleButtonProps {
  onPress: () => void;
  accessibilityLabel?: string;
}

export function InfoCircleButton({ onPress, accessibilityLabel }: InfoCircleButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      hitSlop={10}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? 'More information'}
      style={({ pressed }) => [styles.btn, pressed && styles.pressed]}
    >
      <Text style={styles.icon}>i</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1.5,
    borderColor: colors.primary,
    backgroundColor: colors.primaryMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.75,
    transform: [{ scale: 0.95 }],
  },
  icon: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: '700',
    fontStyle: 'italic',
    lineHeight: 15,
    marginTop: -1,
  },
});
