import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useLanguage } from '../context/LanguageContext';
import type { IndustryKey } from '../data/industries';
import { getInputHint, type InputHintField } from '../i18n/packs/inputHints';
import { useThemedStyles, type ThemeSlice } from '../hooks/useThemedStyles';
import { colors, radii } from '../theme';
import { scaleFontSize, scaleSize } from '../theme/scale';
import {
  UNIT_OPTIONS,
  fromStandardUnit,
  standardUnitOf,
  toStandardUnit,
  type DisplayUnit,
  type UnitKind,
} from '../units';
import { unitPeriodLabel } from '../utils/unitLabels';
import { parseNumberInput } from '../utils/parseNumberInput';
import { InfoCircleButton } from './InfoCircleButton';
import { InfoHintModal } from './InfoHintModal';

interface UnitInputProps {
  label: string;
  hint?: string;
  kind: UnitKind;
  standardValue: number;
  onStandardChange: (standard: number) => void;
  industry?: IndustryKey | '';
  infoField?: InputHintField;
  /** When monthly breakdown is enabled, unit chips show per-month labels. */
  timePeriod?: 'year' | 'month';
  editable?: boolean;
  /** Tighter layout for rows inside a category card. */
  compact?: boolean;
  hideLabel?: boolean;
  showInfo?: boolean;
  showHint?: boolean;
}

const parseNum = parseNumberInput;

const KIND_TO_HINT_FIELD: Record<UnitKind, InputHintField> = {
  fuel: 'diesel',
  gas: 'naturalGas',
  electricity: 'electricity',
  mass: 'naturalGas',
  distance: 'petrol',
};

export function UnitInput({
  label,
  hint,
  kind,
  standardValue,
  onStandardChange,
  industry = '',
  infoField,
  timePeriod = 'year',
  editable = true,
  compact = false,
  hideLabel = false,
  showInfo = true,
  showHint = true,
}: UnitInputProps) {
  const styles = useThemedStyles(createStyles);
  const { t, locale } = useLanguage();
  const [unit, setUnitState] = useState<DisplayUnit>(standardUnitOf(kind));
  const [display, setDisplay] = useState('');
  const [infoVisible, setInfoVisible] = useState(false);

  const resolvedInfoField = infoField ?? KIND_TO_HINT_FIELD[kind];
  const infoMessage = getInputHint(locale, industry, resolvedInfoField);

  useEffect(() => {
    const v = fromStandardUnit(standardValue, kind, unit);
    setDisplay(v > 0 ? String(Math.round(v * 100) / 100) : '');
  }, [standardValue, unit, kind]);

  const perYear = timePeriod === 'year';
  const unitOptions = UNIT_OPTIONS[kind].map((o) => ({
    key: o.unit,
    label: unitPeriodLabel(t, o.unit, perYear ? 'year' : 'month'),
  }));
  const activeUnit = unit;

  const setUnit = (key: DisplayUnit) => {
    const num = parseNum(display);
    setUnitState(key);
    onStandardChange(toStandardUnit(num, kind, key));
  };

  const handleChange = (text: string) => {
    if (!editable) return;
    setDisplay(text);
    onStandardChange(toStandardUnit(parseNum(text), kind, unit));
  };

  return (
    <View style={[styles.wrapper, compact && styles.wrapperCompact]}>
      {!hideLabel ? (
        <View style={styles.labelRow}>
          <Text style={[styles.label, compact && styles.labelCompact]}>{label}</Text>
          {showInfo ? (
            <InfoCircleButton
              onPress={() => setInfoVisible(true)}
              accessibilityLabel={t.inputHints.modalTitle}
            />
          ) : null}
        </View>
      ) : null}
      <View style={styles.row}>
        <TextInput
          style={[styles.input, !editable && styles.inputReadOnly]}
          value={display}
          onChangeText={handleChange}
          placeholder="0"
          placeholderTextColor={colors.textSecondary}
          keyboardType="decimal-pad"
          editable={editable}
        />
      </View>
      <View style={styles.unitRow}>
        {unitOptions.map((opt) => (
          <Pressable
            key={opt.key}
            onPress={() => editable && setUnit(opt.key)}
            style={[styles.unitChip, activeUnit === opt.key && styles.unitChipActive]}
            disabled={!editable}
          >
            <Text
              style={[styles.unitChipText, activeUnit === opt.key && styles.unitChipTextActive]}
            >
              {opt.label}
            </Text>
          </Pressable>
        ))}
      </View>
      {hint && showHint ? <Text style={styles.hint}>{hint}</Text> : null}
      <InfoHintModal
        visible={infoVisible}
        fieldLabel={label}
        message={infoMessage}
        industry={industry}
        onClose={() => setInfoVisible(false)}
      />
    </View>
  );
}

function createStyles({ typography, spacing, fontScale, displayScale }: ThemeSlice) {
  return StyleSheet.create({
    wrapper: {
      marginBottom: spacing.md,
    },
    wrapperCompact: {
      marginBottom: spacing.sm,
    },
    labelRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.sm,
      marginBottom: spacing.sm,
    },
    label: {
      ...typography.label,
      flex: 1,
    },
    labelCompact: {
      fontSize: scaleFontSize(13, fontScale),
      fontWeight: '500',
      color: colors.textSecondary,
    },
    row: {
      flexDirection: 'row',
    },
    inputReadOnly: {
      backgroundColor: colors.background,
      color: colors.textSecondary,
    },
    input: {
      flex: 1,
      backgroundColor: colors.white,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: radii.md,
      paddingHorizontal: spacing.md,
      paddingVertical: scaleSize(12, displayScale),
      fontSize: scaleFontSize(16, fontScale),
      color: colors.text,
    },
    unitRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: spacing.sm,
      marginTop: spacing.sm,
    },
    unitChip: {
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
      borderRadius: radii.full,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.white,
    },
    unitChipActive: {
      backgroundColor: colors.primaryMuted,
      borderColor: colors.primary,
    },
    unitChipText: {
      ...typography.caption,
      color: colors.textSecondary,
    },
    unitChipTextActive: {
      color: colors.primary,
      fontWeight: '600',
    },
    hint: {
      ...typography.caption,
      marginTop: spacing.xs,
    },
  });
}
