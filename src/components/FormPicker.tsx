import { Picker } from '@react-native-picker/picker';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { useThemedStyles, type ThemeSlice } from '../hooks/useThemedStyles';
import { colors, radii } from '../theme';
import { scaleFontSize, scaleSize } from '../theme/scale';

interface FormPickerProps {
  label: string;
  value: string;
  onValueChange: (value: string) => void;
  items: { label: string; value: string }[];
  placeholder?: string;
  error?: string;
}

export function FormPicker({
  label,
  value,
  onValueChange,
  items,
  placeholder = '',
  error,
}: FormPickerProps) {
  const styles = useThemedStyles(createStyles);

  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>
      <View style={[styles.pickerContainer, error && styles.pickerError]}>
        <Picker
          selectedValue={value || ''}
          onValueChange={(v) => {
            if (v) onValueChange(v);
          }}
          style={styles.picker}
          itemStyle={Platform.OS === 'ios' ? styles.iosItem : undefined}
        >
          {placeholder ? (
            <Picker.Item label={placeholder} value="" color={colors.textSecondary} />
          ) : null}
          {items.map((item) => (
            <Picker.Item key={item.value} label={item.label} value={item.value} />
          ))}
        </Picker>
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

function createStyles({ typography, spacing, fontScale, displayScale }: ThemeSlice) {
  const iosPickerHeight = scaleSize(150, displayScale);
  const androidPickerHeight = scaleSize(50, displayScale);

  return StyleSheet.create({
    wrapper: {
      marginBottom: spacing.md,
    },
    label: {
      ...typography.label,
      marginBottom: spacing.sm,
    },
    pickerContainer: {
      backgroundColor: colors.white,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: radii.md,
      overflow: 'hidden',
      justifyContent: 'center',
    },
    pickerError: {
      borderColor: colors.danger,
    },
    picker: {
      height: Platform.OS === 'ios' ? iosPickerHeight : androidPickerHeight,
      color: colors.text,
    },
    iosItem: {
      fontSize: scaleFontSize(16, fontScale),
      height: iosPickerHeight,
    },
    error: {
      ...typography.caption,
      color: colors.danger,
      marginTop: spacing.xs,
    },
  });
}
