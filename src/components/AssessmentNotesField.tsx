import { StyleSheet, Text, TextInput, View } from 'react-native';
import { useLanguage } from '../context/LanguageContext';
import { useThemedStyles, type ThemeSlice } from '../hooks/useThemedStyles';
import { colors, radii } from '../theme';
import { scaleFontSize, scaleSize } from '../theme/scale';
import { countWords, limitToWordCount, MAX_NOTES_WORDS } from '../utils/wordLimit';

interface AssessmentNotesFieldProps {
  value: string;
  onChange: (text: string) => void;
}

export function AssessmentNotesField({ value, onChange }: AssessmentNotesFieldProps) {
  const { t } = useLanguage();
  const styles = useThemedStyles(createStyles);
  const wordCount = countWords(value);
  const atLimit = wordCount >= MAX_NOTES_WORDS;

  const handleChange = (text: string) => {
    onChange(limitToWordCount(text, MAX_NOTES_WORDS));
  };

  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{t.scopeInputs.notesTitle}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={handleChange}
        placeholder={t.scopeInputs.notesPlaceholder}
        placeholderTextColor={colors.textSecondary}
        multiline
        textAlignVertical="top"
        maxLength={8000}
      />
      <Text style={[styles.counter, atLimit && styles.counterLimit]}>
        {t.scopeInputs.notesWordCount
          .replace('{used}', String(wordCount))
          .replace('{max}', String(MAX_NOTES_WORDS))}
      </Text>
    </View>
  );
}

function createStyles({ typography, spacing, fontScale, displayScale }: ThemeSlice) {
  return StyleSheet.create({
    wrapper: {
      marginTop: spacing.md,
      marginBottom: spacing.md,
    },
    label: {
      ...typography.label,
      marginBottom: spacing.sm,
    },
    input: {
      minHeight: scaleSize(100, displayScale),
      maxHeight: scaleSize(160, displayScale),
      backgroundColor: colors.white,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: radii.md,
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.md,
      fontSize: scaleFontSize(16, fontScale),
      color: colors.text,
      lineHeight: scaleSize(22, displayScale),
    },
    counter: {
      ...typography.caption,
      marginTop: spacing.xs,
      textAlign: 'right',
      color: colors.textSecondary,
    },
    counterLimit: {
      color: colors.primary,
      fontWeight: '600',
    },
  });
}
