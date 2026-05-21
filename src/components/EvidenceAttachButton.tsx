import { Pressable, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { colors } from '../theme';

interface EvidenceAttachButtonProps {
  onPress: () => void;
  hasFile?: boolean;
  disabled?: boolean;
  accessibilityLabel?: string;
}

/** Document with folded corner — reads as “attach bill / invoice” at small sizes. */
function DocumentAttachIcon({ color }: { color: string }) {
  return (
    <Svg width={14} height={14} viewBox="0 0 24 24" fill="none">
      <Path
        d="M8 3h7l5 5v13a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"
        stroke={color}
        strokeWidth={2}
        strokeLinejoin="round"
      />
      <Path
        d="M15 3v5h5"
        stroke={color}
        strokeWidth={2}
        strokeLinejoin="round"
      />
      <Path
        d="M9 12h6M9 15h6M9 18h4"
        stroke={color}
        strokeWidth={1.75}
        strokeLinecap="round"
      />
    </Svg>
  );
}

export function EvidenceAttachButton({
  onPress,
  hasFile = false,
  disabled,
  accessibilityLabel,
}: EvidenceAttachButtonProps) {
  const hasFiles = hasFile;
  const iconColor = hasFiles ? colors.primary : colors.textSecondary;

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      hitSlop={10}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      style={({ pressed }) => [
        styles.btn,
        hasFiles && styles.btnFilled,
        disabled && styles.btnDisabled,
        pressed && !disabled && styles.pressed,
      ]}
    >
      <DocumentAttachIcon color={iconColor} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1.5,
    borderColor: colors.textSecondary,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnFilled: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryMuted,
  },
  btnDisabled: {
    opacity: 0.45,
  },
  pressed: {
    opacity: 0.75,
    transform: [{ scale: 0.95 }],
  },
});
