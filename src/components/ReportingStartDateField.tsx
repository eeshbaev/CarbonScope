import DateTimePicker, {
  type DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { createElement, useMemo, useState } from 'react';
import {
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
  type ViewStyle,
} from 'react-native';
import { useAccessibility } from '../context/AccessibilityContext';
import { useLanguage } from '../context/LanguageContext';
import { useThemedStyles, type ThemeSlice } from '../hooks/useThemedStyles';
import { formatDisplayDate, parseISODate, toISODateString } from '../utils/reportingDates';
import { colors, radii } from '../theme';
import { scaleFontSize, scaleSize } from '../theme/scale';

interface ReportingStartDateFieldProps {
  label: string;
  value: string;
  onChange: (isoDate: string) => void;
  placeholder: string;
  error?: string;
}

function WebDateInput({
  value,
  onChange,
  hasError,
  webInputStyle,
}: {
  value: string;
  onChange: (iso: string) => void;
  hasError?: boolean;
  webInputStyle: ViewStyle & Record<string, string | number>;
}) {
  return createElement('input', {
    type: 'date',
    value: value || '',
    onChange: (e: { target: { value: string } }) => {
      if (e.target.value) onChange(e.target.value);
    },
    style: {
      ...webInputStyle,
      borderColor: hasError ? colors.danger : colors.border,
    },
  });
}

export function ReportingStartDateField({
  label,
  value,
  onChange,
  placeholder,
  error,
}: ReportingStartDateFieldProps) {
  const { locale, t } = useLanguage();
  const { spacing, fontScale, displayScale } = useAccessibility();
  const styles = useThemedStyles(createStyles);
  const doneLabel = t.common.done;
  const [open, setOpen] = useState(false);
  const pickerDate = value ? parseISODate(value) : new Date();

  const webInputStyle = useMemo(
    (): ViewStyle & Record<string, string | number> => ({
      width: '100%',
      minHeight: scaleSize(52, displayScale),
      fontSize: scaleFontSize(16, fontScale),
      paddingHorizontal: spacing.md,
      paddingVertical: scaleSize(14, displayScale),
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: radii.md,
      backgroundColor: colors.white,
      color: colors.text,
      fontFamily: 'system-ui, -apple-system, sans-serif',
      boxSizing: 'border-box',
    }),
    [spacing.md, fontScale, displayScale]
  );

  const handleNativeChange = (event: DateTimePickerEvent, date?: Date) => {
    if (Platform.OS === 'android') {
      setOpen(false);
      if (event.type === 'dismissed') return;
    }
    if (date) onChange(toISODateString(date));
  };

  const display = value ? formatDisplayDate(value, locale) : placeholder;

  if (Platform.OS === 'web') {
    return (
      <View style={styles.wrap}>
        <Text style={styles.label}>{label}</Text>
        <WebDateInput
          value={value}
          onChange={onChange}
          hasError={!!error}
          webInputStyle={webInputStyle}
        />
        {!value ? <Text style={styles.webHint}>{placeholder}</Text> : null}
        {error ? <Text style={styles.error}>{error}</Text> : null}
      </View>
    );
  }

  return (
    <View style={styles.wrap}>
      <Text style={styles.label}>{label}</Text>
      <Pressable
        style={[styles.btn, error && styles.btnError]}
        onPress={() => setOpen(true)}
        accessibilityRole="button"
      >
        <Text style={[styles.btnText, !value && styles.placeholder]}>{display}</Text>
        <Text style={styles.chevron}>›</Text>
      </Pressable>
      {error ? <Text style={styles.error}>{error}</Text> : null}

      {Platform.OS === 'ios' ? (
        <Modal visible={open} transparent animationType="slide" onRequestClose={() => setOpen(false)}>
          <Pressable style={styles.overlay} onPress={() => setOpen(false)}>
            <Pressable style={styles.sheet} onPress={(e) => e.stopPropagation()}>
              <View style={styles.sheetHeader}>
                <Text style={styles.sheetTitle}>{label}</Text>
                <Pressable onPress={() => setOpen(false)} hitSlop={12}>
                  <Text style={styles.doneText}>{doneLabel}</Text>
                </Pressable>
              </View>
              <DateTimePicker
                value={pickerDate}
                mode="date"
                display="inline"
                onChange={handleNativeChange}
                style={styles.iosCalendar}
              />
            </Pressable>
          </Pressable>
        </Modal>
      ) : open ? (
        <DateTimePicker
          value={pickerDate}
          mode="date"
          display="calendar"
          onChange={handleNativeChange}
        />
      ) : null}
    </View>
  );
}

function createStyles({ typography, spacing, fontScale, displayScale }: ThemeSlice) {
  return StyleSheet.create({
    wrap: {
      marginBottom: spacing.md,
    },
    label: {
      ...typography.label,
      marginBottom: spacing.sm,
    },
    btn: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: colors.white,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: radii.md,
      paddingHorizontal: spacing.md,
      paddingVertical: scaleSize(14, displayScale),
      minHeight: scaleSize(52, displayScale),
    },
    btnError: {
      borderColor: colors.danger,
    },
    btnText: {
      ...typography.body,
      flex: 1,
      fontSize: scaleFontSize(16, fontScale),
    },
    placeholder: {
      color: colors.textSecondary,
    },
    chevron: {
      fontSize: scaleFontSize(22, fontScale),
      color: colors.textSecondary,
    },
    webHint: {
      ...typography.caption,
      color: colors.textSecondary,
      marginTop: spacing.xs,
    },
    error: {
      ...typography.caption,
      color: colors.danger,
      marginTop: spacing.xs,
    },
    overlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.4)',
      justifyContent: 'flex-end',
    },
    sheet: {
      backgroundColor: colors.white,
      borderTopLeftRadius: radii.lg,
      borderTopRightRadius: radii.lg,
      paddingBottom: spacing.xl,
    },
    sheetHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    sheetTitle: {
      ...typography.subtitle,
      flex: 1,
      marginRight: spacing.md,
    },
    iosCalendar: {
      alignSelf: 'center',
      width: '100%',
    },
    doneText: {
      ...typography.body,
      color: colors.primary,
      fontWeight: '600',
      fontSize: scaleFontSize(17, fontScale),
    },
  });
}
