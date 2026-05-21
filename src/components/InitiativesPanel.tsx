import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Switch, Text, View } from 'react-native';
import { Button } from './Button';
import { Card } from './Card';
import { useLanguage } from '../context/LanguageContext';
import {
  getInitiativesForIndustry,
  INITIATIVE_IMPACT,
  MAX_SELECTED_INITIATIVES,
  type InitiativeKey,
} from '../data/initiatives';
import type { IndustryKey } from '../data/industries';
import { useThemedStyles, type ThemeSlice } from '../hooks/useThemedStyles';
import type { Assessment } from '../types';
import { colors, radii } from '../theme';
import { scaleSize } from '../theme/scale';

type Props = {
  assessment: Assessment;
  onSave: (selected: InitiativeKey[], reminder: boolean) => Promise<void>;
  draftHint?: string;
};

export function InitiativesPanel({ assessment, onSave, draftHint }: Props) {
  const { t } = useLanguage();
  const styles = useThemedStyles(createStyles);
  const options = getInitiativesForIndustry(assessment.industry as IndustryKey);
  const [selected, setSelected] = useState<InitiativeKey[]>(
    assessment.selectedInitiatives ?? []
  );
  const [reminder, setReminder] = useState(!!assessment.initiativeReminderAt);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setSelected(assessment.selectedInitiatives ?? []);
    setReminder(!!assessment.initiativeReminderAt);
  }, [
    assessment.id,
    assessment.updatedAt,
    assessment.selectedInitiatives,
    assessment.initiativeReminderAt,
  ]);

  const toggle = (key: InitiativeKey) => {
    setSelected((prev) => {
      if (prev.includes(key)) return prev.filter((k) => k !== key);
      if (prev.length >= MAX_SELECTED_INITIATIVES) return prev;
      return [...prev, key];
    });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await onSave(selected, reminder);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card style={styles.card}>
      <Text style={styles.title}>{t.results.initiativesTitle}</Text>
      <Text style={styles.sub}>{t.results.initiativesSubtitle}</Text>
      {draftHint ? <Text style={styles.draftHint}>{draftHint}</Text> : null}
      {options.map((key) => {
        const item = t.initiatives[key];
        const impact = INITIATIVE_IMPACT[key];
        const isOn = selected.includes(key);
        const disabled = !isOn && selected.length >= MAX_SELECTED_INITIATIVES;
        return (
          <Pressable
            key={key}
            onPress={() => !disabled && toggle(key)}
            style={[
              styles.option,
              isOn && styles.optionOn,
              disabled && styles.optionDisabled,
            ]}
          >
            <View style={styles.optionHeader}>
              <Text style={[styles.optionTitle, isOn && styles.optionTitleOn]}>
                {isOn ? '✓ ' : ''}
                {item.title}
              </Text>
            </View>
            <Text style={styles.optionDesc}>{item.description}</Text>
            <Text style={styles.impact}>
              {t.results.initiativeImpact
                .replace('{min}', String(impact.min))
                .replace('{max}', String(impact.max))}
            </Text>
          </Pressable>
        );
      })}
      <View style={styles.reminderRow}>
        <Text style={styles.reminderLabel}>{t.results.initiativeReminder}</Text>
        <Switch
          value={reminder}
          onValueChange={setReminder}
          trackColor={{ false: colors.border, true: colors.primaryLight }}
          thumbColor={colors.white}
        />
      </View>
      <Button
        title={t.results.saveInitiatives}
        onPress={handleSave}
        loading={saving}
        style={styles.saveBtn}
      />
    </Card>
  );
}

function createStyles({ typography, spacing, displayScale }: ThemeSlice) {
  return StyleSheet.create({
    card: {
      marginBottom: spacing.md,
    },
    title: {
      ...typography.subtitle,
      marginBottom: spacing.xs,
    },
    sub: {
      ...typography.caption,
      marginBottom: spacing.md,
    },
    draftHint: {
      ...typography.caption,
      color: colors.textSecondary,
      marginBottom: spacing.md,
      fontStyle: 'italic',
    },
    option: {
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: radii.md,
      padding: spacing.md,
      marginBottom: spacing.sm,
    },
    optionOn: {
      borderColor: colors.primary,
      backgroundColor: colors.primaryMuted,
    },
    optionDisabled: {
      opacity: 0.5,
    },
    optionHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    optionTitle: {
      ...typography.body,
      fontWeight: '600',
      marginBottom: spacing.xs,
    },
    optionTitleOn: {
      color: colors.primary,
    },
    optionDesc: {
      ...typography.caption,
      lineHeight: scaleSize(18, displayScale),
      marginBottom: spacing.xs,
    },
    impact: {
      ...typography.caption,
      fontStyle: 'italic',
      color: colors.textSecondary,
    },
    reminderRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: spacing.sm,
      marginBottom: spacing.md,
    },
    reminderLabel: {
      ...typography.body,
      flex: 1,
      marginRight: spacing.md,
    },
    saveBtn: {
      marginTop: spacing.xs,
    },
  });
}
