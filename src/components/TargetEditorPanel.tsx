import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Button } from './Button';
import { useLanguage } from '../context/LanguageContext';
import { useThemedStyles, type ThemeSlice } from '../hooks/useThemedStyles';
import type { Assessment } from '../types';
import type { ReductionTarget, ReductionTargetType } from '../types/enterprise';
import { isValidReductionTarget } from '../utils/targets';
import { colors, radii } from '../theme';

type Props = {
  assessment: Assessment;
  onSave: (target: ReductionTarget | undefined) => Promise<void>;
};

export function TargetEditorPanel({ assessment, onSave }: Props) {
  const { t } = useLanguage();
  const styles = useThemedStyles(createStyles);
  const et = t.enterprise.targets;
  const existing = assessment.reductionTarget;
  const [type, setType] = useState<ReductionTargetType>(existing?.type ?? 'percent');
  const [value, setValue] = useState(existing ? String(existing.value) : '');
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    const num = parseFloat(value.replace(',', '.'));
    const target: ReductionTarget = { type, value: num };
    if (!isValidReductionTarget(target)) return;
    setSaving(true);
    try {
      await onSave(target);
    } finally {
      setSaving(false);
    }
  };

  const handleClear = async () => {
    setSaving(true);
    try {
      await onSave(undefined);
      setValue('');
    } finally {
      setSaving(false);
    }
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{et.editTitle}</Text>
      <Text style={styles.hint}>{et.editHint}</Text>
      <View style={styles.typeRow}>
        {(['percent', 'absolute'] as const).map((k) => (
          <Pressable
            key={k}
            style={[styles.typeBtn, type === k && styles.typeBtnOn]}
            onPress={() => setType(k)}
          >
            <Text style={[styles.typeText, type === k && styles.typeTextOn]}>
              {k === 'percent' ? et.typePercent : et.typeAbsolute}
            </Text>
          </Pressable>
        ))}
      </View>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={setValue}
        keyboardType="decimal-pad"
        placeholder={type === 'percent' ? et.placeholderPercent : et.placeholderAbsolute}
        placeholderTextColor={colors.textSecondary}
      />
      <View style={styles.actions}>
        <Button title={et.saveTarget} onPress={handleSave} loading={saving} />
        {existing ? (
          <Button title={et.clearTarget} onPress={handleClear} variant="outline" loading={saving} />
        ) : null}
      </View>
    </View>
  );
}

function createStyles({ typography, spacing }: ThemeSlice) {
  return StyleSheet.create({
    card: {
      backgroundColor: colors.card,
      borderRadius: radii.md,
      borderWidth: 1,
      borderColor: colors.border,
      padding: spacing.md,
      marginBottom: spacing.md,
    },
    title: { ...typography.subtitle, marginBottom: spacing.xs },
    hint: { ...typography.caption, color: colors.textSecondary, marginBottom: spacing.sm },
    typeRow: { flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.sm },
    typeBtn: {
      flex: 1,
      padding: spacing.sm,
      borderRadius: radii.sm,
      borderWidth: 1,
      borderColor: colors.border,
      alignItems: 'center',
    },
    typeBtnOn: { borderColor: colors.primary, backgroundColor: colors.primaryMuted },
    typeText: { ...typography.caption, fontWeight: '600' },
    typeTextOn: { color: colors.primary },
    input: {
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: radii.sm,
      padding: spacing.sm,
      ...typography.body,
      marginBottom: spacing.sm,
    },
    actions: { gap: spacing.sm },
  });
}
