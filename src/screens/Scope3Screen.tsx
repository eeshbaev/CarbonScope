import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { AssessmentNotesField } from '../components/AssessmentNotesField';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { CategoryLabel } from '../components/CategoryLabel';
import { SavedToast } from '../components/SavedToast';
import { ScreenLayout } from '../components/ScreenLayout';
import {
  calculateScope3ByCategory,
  calculateScope3Emissions,
  formatEmissions,
} from '../calculations';
import { useAssessment } from '../context/AssessmentContext';
import { useLanguage } from '../context/LanguageContext';
import {
  SCOPE3_CATEGORIES,
  SCOPE3_CATEGORY_NUMBER,
  getScope3FieldsForCategory,
  type Scope3FieldDef,
} from '../data/scope3Factors';
import { useCalculateResults } from '../hooks/useCalculateResults';
import { useSaveProgress } from '../hooks/useSaveProgress';
import { useScreenTitle } from '../hooks/useScreenTitle';
import { useThemedStyles, type ThemeSlice } from '../hooks/useThemedStyles';
import type { RootStackParamList } from '../navigation/types';
import type { ReportingPeriod } from '../types';
import { formatAppNumber } from '../utils/appLocale';
import { parseNumberInput } from '../utils/parseNumberInput';
import { getTco2eLabel } from '../utils/reportingPeriodCopy';
import { colors, radii } from '../theme';
import { scaleFontSize, scaleSize } from '../theme/scale';

type Props = NativeStackScreenProps<RootStackParamList, 'Scope3'>;

const parseNum = parseNumberInput;

function Scope3FieldRow({
  def,
  value,
  onChange,
  styles,
}: {
  def: Scope3FieldDef;
  value: number;
  onChange: (next: number) => void;
  styles: ReturnType<typeof createStyles>;
}) {
  const { t, locale } = useLanguage();
  const [display, setDisplay] = useState(value > 0 ? String(value) : '');
  const label = t.scope3.fields[def.key];
  const unit = t.scope3.units[def.unit];

  // Keep the text box in sync when the draft is replaced (edit / duplicate).
  useEffect(() => {
    if (parseNum(display) !== value) setDisplay(value > 0 ? String(value) : '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <View style={styles.fieldRow}>
      <CategoryLabel category={def.key} label={label} style={styles.fieldLabel} />
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          value={display}
          onChangeText={(text) => {
            setDisplay(text);
            onChange(parseNum(text));
          }}
          placeholder="0"
          placeholderTextColor={colors.textSecondary}
          keyboardType="decimal-pad"
          accessibilityLabel={`${label} (${unit})`}
        />
        <Text style={styles.unit}>{unit}</Text>
      </View>
      <Text style={styles.factorHint}>
        {t.scope3.factorLine
          .replace('{factor}', formatAppNumber(def.factor, locale))
          .replace('{unit}', unit)}
      </Text>
    </View>
  );
}

export function Scope3Screen({ navigation }: Props) {
  const { draft, updateDraft } = useAssessment();
  const { t } = useLanguage();
  const styles = useThemedStyles(createStyles);
  useScreenTitle(t.scope3.title);
  const { saving, savedVisible, saveProgress } = useSaveProgress();
  const { calculating, calculate } = useCalculateResults(navigation);

  const period = (draft.reportingPeriod || '1_year') as ReportingPeriod;
  const tco2eLabel = getTco2eLabel(t, period);
  const preview = calculateScope3Emissions(draft.scope3);
  const byCategory = calculateScope3ByCategory(draft.scope3);

  const footer = (
    <>
      <Button
        title={t.scopeInputs.saveProgress}
        variant="secondary"
        onPress={saveProgress}
        loading={saving}
      />
      <Button title={t.scope3.calculate} onPress={calculate} loading={calculating} />
    </>
  );

  return (
    <ScreenLayout title={t.scope3.title} subtitle={t.scope3.subtitle} footer={footer}>
      <Card style={styles.noteCard}>
        <Text style={styles.noteText}>{t.scope3.optionalNote}</Text>
      </Card>
      <Text style={styles.source}>{t.scope3.source}</Text>

      {SCOPE3_CATEGORIES.map((category) => (
        <Card key={category} style={styles.categoryCard}>
          <Text style={styles.categoryTitle}>
            {t.scope3.categoryTitle
              .replace('{number}', String(SCOPE3_CATEGORY_NUMBER[category]))
              .replace('{name}', t.scope3.categories[category])}
          </Text>
          {getScope3FieldsForCategory(category).map((def) => (
            <Scope3FieldRow
              key={def.key}
              def={def}
              value={draft.scope3[def.key] ?? 0}
              onChange={(next) =>
                updateDraft({ scope3: { ...draft.scope3, [def.key]: next } })
              }
              styles={styles}
            />
          ))}
          <View style={styles.subtotalRow}>
            <Text style={styles.subtotalLabel}>{t.scope3.subtotal}</Text>
            <Text style={styles.subtotalValue}>
              {byCategory[category] > 0
                ? `${formatEmissions(byCategory[category])} ${tco2eLabel}`
                : '—'}
            </Text>
          </View>
        </Card>
      ))}

      <Text style={styles.notCovered}>{t.scope3.notCovered}</Text>

      <AssessmentNotesField value={draft.notes} onChange={(notes) => updateDraft({ notes })} />
      <Card style={styles.preview}>
        <Text style={styles.previewLabel}>{t.scope3.preview}</Text>
        <Text style={styles.previewValue}>
          {formatEmissions(preview)} {tco2eLabel}
        </Text>
      </Card>
      <SavedToast visible={savedVisible} message={t.scopeInputs.saved} />
    </ScreenLayout>
  );
}

function createStyles({ typography, spacing, fontScale, displayScale }: ThemeSlice) {
  return StyleSheet.create({
    noteCard: {
      marginBottom: spacing.md,
      backgroundColor: colors.primaryMuted,
      borderColor: colors.primaryLight,
    },
    noteText: {
      ...typography.caption,
      color: colors.primary,
      lineHeight: scaleSize(19, displayScale),
    },
    source: {
      ...typography.caption,
      color: colors.textSecondary,
      marginBottom: spacing.lg,
      fontStyle: 'italic',
    },
    categoryCard: {
      marginBottom: spacing.md,
    },
    categoryTitle: {
      ...typography.subtitle,
      fontSize: scaleFontSize(16, fontScale),
      color: colors.primary,
      marginBottom: spacing.sm,
    },
    fieldRow: {
      paddingVertical: spacing.sm,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: colors.border,
    },
    fieldLabel: {
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
    factorHint: {
      ...typography.caption,
      marginTop: spacing.xs,
      color: colors.textSecondary,
    },
    subtotalRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: spacing.sm,
    },
    subtotalLabel: {
      ...typography.caption,
      fontWeight: '700',
      color: colors.primary,
    },
    subtotalValue: {
      ...typography.caption,
      fontWeight: '700',
      color: colors.primary,
    },
    notCovered: {
      ...typography.caption,
      color: colors.textSecondary,
      fontStyle: 'italic',
      marginBottom: spacing.md,
    },
    preview: {
      marginTop: spacing.sm,
      alignItems: 'center',
    },
    previewLabel: {
      ...typography.caption,
      marginBottom: spacing.xs,
    },
    previewValue: {
      ...typography.subtitle,
      color: colors.primary,
      fontSize: scaleFontSize(22, fontScale),
    },
  });
}
