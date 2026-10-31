import { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { CategoryLabel } from './CategoryLabel';
import type { EmissionCategoryKey } from '../data/categoryEmblems';
import { useThemedStyles, type ThemeSlice } from '../hooks/useThemedStyles';
import { colors, radii } from '../theme';
import { scaleFontSize, scaleSize } from '../theme/scale';
import { parseNumberInput } from '../utils/parseNumberInput';

type Props = {
  label: string;
  /** null = empty (only when `nullable`). */
  value: number | null;
  onChange: (next: number | null) => void;
  unit?: string;
  hint?: string;
  emblem?: EmissionCategoryKey;
  /** Empty input means "not provided" (null) instead of 0. */
  nullable?: boolean;
  placeholder?: string;
  last?: boolean;
};

function toDisplay(value: number | null, nullable: boolean): string {
  if (value == null) return '';
  if (!nullable && value <= 0) return '';
  return String(value);
}

/** Single numeric input with a unit label and optional hint line. */
export function NumberField({
  label,
  value,
  onChange,
  unit,
  hint,
  emblem,
  nullable = false,
  placeholder,
  last = false,
}: Props) {
  const styles = useThemedStyles(createStyles);
  const initial = toDisplay(value, nullable);
  const [display, setDisplay] = useState(initial);

  // Keep the text box in sync when the draft is replaced (edit / duplicate).
  useEffect(() => {
    const parsed = display.trim() === '' ? (nullable ? null : 0) : parseNumberInput(display);
    if (parsed !== value) setDisplay(toDisplay(value, nullable));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <View style={[styles.row, last && styles.rowLast]}>
      {emblem ? (
        <CategoryLabel category={emblem} label={label} style={styles.label} />
      ) : (
        <Text style={styles.label}>{label}</Text>
      )}
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          value={display}
          onChangeText={(text) => {
            setDisplay(text);
            if (nullable && text.trim() === '') onChange(null);
            else onChange(parseNumberInput(text));
          }}
          placeholder={placeholder ?? '0'}
          placeholderTextColor={colors.textSecondary}
          keyboardType="decimal-pad"
          accessibilityLabel={unit ? `${label} (${unit})` : label}
        />
        {unit ? <Text style={styles.unit}>{unit}</Text> : null}
      </View>
      {hint ? <Text style={styles.hint}>{hint}</Text> : null}
    </View>
  );
}

function createStyles({ typography, spacing, fontScale, displayScale }: ThemeSlice) {
  return StyleSheet.create({
    row: {
      paddingVertical: spacing.sm,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: colors.border,
    },
    rowLast: {
      borderBottomWidth: 0,
    },
    label: {
      ...typography.body,
      fontSize: scaleFontSize(14, fontScale),
      fontWeight: '600',
      color: colors.text,
    },
    inputRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.sm,
      marginTop: spacing.sm,
    },
    input: {
      flex: 1,
      backgroundColor: colors.white,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: radii.md,
      paddingHorizontal: spacing.md,
      paddingVertical: scaleSize(10, displayScale),
      fontSize: scaleFontSize(16, fontScale),
      color: colors.text,
    },
    unit: {
      ...typography.caption,
      minWidth: scaleSize(90, displayScale),
      color: colors.textSecondary,
      fontWeight: '600',
    },
    hint: {
      ...typography.caption,
      marginTop: spacing.xs,
      color: colors.textSecondary,
    },
  });
}
