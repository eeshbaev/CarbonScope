import { useState } from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';
import { CategoryLabel } from './CategoryLabel';
import { Card } from './Card';
import type { EmissionCategoryKey } from '../data/categoryEmblems';
import { EvidenceDocumentIcon, EvidenceDocumentRow } from './EvidenceDocumentSlot';
import { InfoCircleButton } from './InfoCircleButton';
import { InfoHintModal } from './InfoHintModal';
import { UnitInput } from './UnitInput';
import { useLanguage } from '../context/LanguageContext';
import type { IndustryKey } from '../data/industries';
import { getInputHint, type InputHintField } from '../i18n/packs/inputHints';
import { useThemedStyles, type ThemeSlice } from '../hooks/useThemedStyles';
import { colors, radii } from '../theme';
import { scaleFontSize, scaleSize } from '../theme/scale';
import type { EvidenceCategory, EvidenceItem } from '../types/enterprise';
import type { CategoryInput } from '../types/scopeInputs';
import {
  resolveCategoryTotal,
  toggleCategoryMonthly,
  updateCategoryMonth,
  updateCategoryTotal,
} from '../utils/scopeFieldInputs';
import type { ReportingMonth } from '../utils/reportingMonths';
import type { TranslationKeys } from '../i18n/locales/en';
import type { UnitKind } from '../units';
import { standardUnitAbbr } from '../utils/unitLabels';
import { formatAppNumber } from '../utils/appLocale';
import type { Locale } from '../i18n';

export interface CategoryEvidenceProps {
  category: EvidenceCategory;
  items?: EvidenceItem[];
  isSlotBusy?: (monthKey?: string) => boolean;
  onSlotPress: (monthKey?: string) => void | Promise<unknown>;
  onDelete: (item: EvidenceItem) => void;
}

interface CategoryInputSectionProps {
  categoryKey: EmissionCategoryKey;
  label: string;
  hint?: string;
  kind: UnitKind;
  industry: IndustryKey;
  infoField?: InputHintField;
  category: CategoryInput;
  months: ReportingMonth[];
  monthlyEnabled: boolean;
  onCategoryChange: (next: CategoryInput) => void;
  evidence?: CategoryEvidenceProps;
  /** Explicit info text (lines without industry-specific hint packs). */
  infoText?: string;
}

function formatReadOnlyTotal(
  value: number,
  kind: UnitKind,
  t: TranslationKeys,
  locale: Locale
): string {
  return `${formatAppNumber(Math.round(value * 100) / 100, locale)} ${standardUnitAbbr(t, kind)}`;
}

export function CategoryInputSection({
  categoryKey,
  label,
  hint,
  kind,
  industry,
  infoField,
  category,
  months,
  monthlyEnabled,
  onCategoryChange,
  evidence,
  infoText,
}: CategoryInputSectionProps) {
  const { t, locale } = useLanguage();
  const styles = useThemedStyles(createStyles);
  const [infoVisible, setInfoVisible] = useState(false);
  const [monthInfoKey, setMonthInfoKey] = useState<string | null>(null);
  const monthKeys = months.map((m) => m.key);
  const showMonthlyOption = monthlyEnabled && months.length > 0;
  const infoMessage = infoText ?? getInputHint(locale, industry, infoField ?? 'diesel');
  const headerActions = (monthKey?: string) => (
    <View style={styles.headerActions}>
      {evidence ? (
        <EvidenceDocumentIcon
          category={evidence.category}
          items={evidence.items}
          monthKey={monthKey}
          busy={evidence.isSlotBusy?.(monthKey)}
          onPress={() => void evidence.onSlotPress(monthKey)}
        />
      ) : null}
      <InfoCircleButton
        onPress={() => (monthKey ? setMonthInfoKey(monthKey) : setInfoVisible(true))}
        accessibilityLabel={t.inputHints.modalTitle}
      />
    </View>
  );

  const documentRow = (monthKey?: string) =>
    evidence ? (
      <EvidenceDocumentRow
        category={evidence.category}
        items={evidence.items}
        monthKey={monthKey}
        busy={evidence.isSlotBusy?.(monthKey)}
        onPress={() => void evidence.onSlotPress(monthKey)}
        onDelete={evidence.onDelete}
      />
    ) : null;

  const handleMonthlyToggle = (enabled: boolean) => {
    onCategoryChange(toggleCategoryMonthly(category, enabled, monthKeys));
  };

  const monthlyToggle = showMonthlyOption ? (
    <View style={styles.toggleRow}>
      <Text style={styles.toggleLabel}>{t.scopeInputs.monthlyBreakdown}</Text>
      <Switch
        value={category.useMonthly}
        onValueChange={handleMonthlyToggle}
        trackColor={{ false: colors.border, true: colors.primaryLight }}
        thumbColor={colors.white}
      />
    </View>
  ) : null;

  if (category.useMonthly && showMonthlyOption) {
    const periodTotal = resolveCategoryTotal(category);

    return (
      <Card style={styles.categoryCard}>
        <View style={styles.categoryHeader}>
          <View style={styles.categoryHeaderMain}>
            <CategoryLabel
              category={categoryKey}
              label={label}
              style={styles.categoryTitle}
            />
            {hint ? <Text style={styles.factorHint}>{hint}</Text> : null}
          </View>
        </View>

        {monthlyToggle}

        <View style={styles.monthsFrame}>
          <Text style={styles.monthsFrameTitle}>{t.scopeInputs.monthlyEntries}</Text>
          {months.map((month, index) => (
            <View
              key={month.key}
              style={[styles.monthRow, index < months.length - 1 && styles.monthRowBorder]}
            >
              <View style={styles.monthRowHeader}>
                <Text style={styles.monthLabel}>{month.label}</Text>
                {headerActions(month.key)}
              </View>
              {documentRow(month.key)}
              <UnitInput
                label={month.label}
                kind={kind}
                industry={industry}
                timePeriod="month"
                compact
                hideLabel
                showHint={false}
                showInfo={false}
                standardValue={category.monthly[month.key] ?? 0}
                onStandardChange={(value) =>
                  onCategoryChange(updateCategoryMonth(category, month.key, value))
                }
              />
            </View>
          ))}
        </View>

        <View style={styles.totalFooter}>
          <Text style={styles.totalLabel}>{t.scopeInputs.periodTotal}</Text>
          <Text style={styles.totalValue}>{formatReadOnlyTotal(periodTotal, kind, t, locale)}</Text>
          <Text style={styles.totalHint}>{t.scopeInputs.autoFromMonthly}</Text>
        </View>

        <InfoHintModal
          visible={monthInfoKey !== null}
          fieldLabel={months.find((m) => m.key === monthInfoKey)?.label ?? label}
          message={infoMessage}
          industry={industry}
          onClose={() => setMonthInfoKey(null)}
        />
      </Card>
    );
  }

  return (
    <Card style={styles.categoryCard}>
      <View style={styles.categoryHeader}>
        <View style={styles.categoryHeaderMain}>
          <CategoryLabel
            category={categoryKey}
            label={label}
            style={styles.categoryTitle}
          />
          {hint ? <Text style={styles.factorHint}>{hint}</Text> : null}
        </View>
        {headerActions()}
      </View>
      {documentRow()}

      {monthlyToggle}

      <View style={styles.periodInputFrame}>
        <UnitInput
          label={label}
          kind={kind}
          infoField={infoField}
          industry={industry}
          standardValue={category.total}
          onStandardChange={(total) => onCategoryChange(updateCategoryTotal(category, total))}
          hideLabel
          showHint={false}
          showInfo={false}
        />
      </View>

      <InfoHintModal
        visible={infoVisible}
        fieldLabel={label}
        message={infoMessage}
        industry={industry}
        onClose={() => setInfoVisible(false)}
      />
    </Card>
  );
}

function createStyles({ typography, spacing, fontScale, displayScale }: ThemeSlice) {
  return StyleSheet.create({
    categoryCard: {
      marginBottom: spacing.md,
      padding: spacing.md,
      borderRadius: radii.lg,
      borderColor: colors.border,
      backgroundColor: colors.card,
    },
    categoryHeader: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: spacing.sm,
      marginBottom: spacing.sm,
    },
    categoryHeaderMain: {
      flex: 1,
    },
    headerActions: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.xs,
    },
    monthRowHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: spacing.sm,
      paddingHorizontal: spacing.xs,
      marginBottom: spacing.xs,
    },
    monthLabel: {
      ...typography.caption,
      fontWeight: '600',
      color: colors.text,
      flex: 1,
    },
    categoryTitle: {
      ...typography.subtitle,
      fontSize: scaleFontSize(17, fontScale),
      color: colors.primary,
    },
    factorHint: {
      ...typography.caption,
      marginTop: scaleSize(2, displayScale),
      color: colors.textSecondary,
    },
    toggleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.sm,
      marginBottom: spacing.sm,
      backgroundColor: colors.white,
      borderRadius: radii.md,
      borderWidth: 1,
      borderColor: colors.border,
    },
    toggleLabel: {
      ...typography.caption,
      flex: 1,
      marginRight: spacing.md,
      fontWeight: '600',
      color: colors.text,
    },
    monthsFrame: {
      backgroundColor: colors.white,
      borderRadius: radii.md,
      borderWidth: 1,
      borderColor: colors.border,
      paddingHorizontal: spacing.sm,
      paddingTop: spacing.sm,
      marginBottom: spacing.sm,
    },
    monthsFrameTitle: {
      ...typography.caption,
      fontWeight: '700',
      color: colors.textSecondary,
      textTransform: 'uppercase',
      letterSpacing: 0.4,
      marginBottom: spacing.xs,
      paddingHorizontal: spacing.xs,
    },
    monthRow: {
      paddingVertical: spacing.xs,
    },
    monthRowBorder: {
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: colors.border,
    },
    periodInputFrame: {
      backgroundColor: colors.white,
      borderRadius: radii.md,
      borderWidth: 1,
      borderColor: colors.border,
      paddingHorizontal: spacing.sm,
      paddingTop: spacing.sm,
      paddingBottom: spacing.xs,
    },
    totalFooter: {
      backgroundColor: colors.primaryMuted,
      borderRadius: radii.md,
      padding: spacing.md,
      borderWidth: 1,
      borderColor: colors.primaryLight,
    },
    totalLabel: {
      ...typography.caption,
      color: colors.primary,
      fontWeight: '700',
    },
    totalValue: {
      ...typography.subtitle,
      color: colors.primary,
      marginVertical: spacing.xs,
    },
    totalHint: {
      ...typography.caption,
      color: colors.textSecondary,
      fontStyle: 'italic',
    },
  });
}
