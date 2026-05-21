import { useMemo, useState } from 'react';
import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ALL_COUNTRIES, countryCodeToFlag, getCountryGridInfo } from '../data/countries';
import { useLanguage } from '../context/LanguageContext';
import { useThemedStyles, type ThemeSlice } from '../hooks/useThemedStyles';
import { getLocalizedCountryName } from '../utils/localizeCountry';
import { colors, radii } from '../theme';
import { scaleFontSize, scaleSize } from '../theme/scale';

interface CountryPickerProps {
  visible: boolean;
  selectedCode: string;
  onSelect: (code: string, name: string) => void;
  onClose: () => void;
}

export function CountryPicker({ visible, selectedCode, onSelect, onClose }: CountryPickerProps) {
  const { t, locale } = useLanguage();
  const styles = useThemedStyles(createStyles);
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return ALL_COUNTRIES;
    return ALL_COUNTRIES.filter((c) => {
      const localized = getLocalizedCountryName(c.code, locale, c.name);
      return (
        localized.toLowerCase().includes(q) ||
        c.name.toLowerCase().includes(q) ||
        c.code.toLowerCase().includes(q)
      );
    });
  }, [query, locale]);

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
      <SafeAreaView style={styles.container} edges={['top', 'left', 'right', 'bottom']}>
        <View style={styles.header}>
          <Text style={styles.title}>{t.company.selectCountry}</Text>
          <Pressable onPress={onClose} hitSlop={12}>
            <Text style={styles.close}>{t.common.cancel}</Text>
          </Pressable>
        </View>
        <TextInput
          style={styles.search}
          value={query}
          onChangeText={setQuery}
          placeholder={t.company.searchCountry}
          placeholderTextColor={colors.textSecondary}
          autoCorrect={false}
        />
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.code}
          keyboardShouldPersistTaps="handled"
          renderItem={({ item }) => {
            const info = getCountryGridInfo(item.code);
            const selected = item.code === selectedCode;
            return (
              <Pressable
                style={[styles.row, selected && styles.rowSelected]}
                onPress={() => {
                  onSelect(
                    item.code,
                    getLocalizedCountryName(item.code, locale, item.name)
                  );
                  setQuery('');
                  onClose();
                }}
              >
                <Text style={styles.flag}>{countryCodeToFlag(item.code)}</Text>
                <View style={styles.rowText}>
                  <Text style={styles.name}>
                    {getLocalizedCountryName(item.code, locale, item.name)}
                  </Text>
                  <Text style={styles.factor}>
                    {info.factor} {t.common.kgCo2e}{t.units.perKwh}
                  </Text>
                </View>
              </Pressable>
            );
          }}
          ItemSeparatorComponent={() => <View style={styles.sep} />}
        />
      </SafeAreaView>
    </Modal>
  );
}

function createStyles({ typography, spacing, fontScale, displayScale }: ThemeSlice) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      paddingTop: spacing.lg,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: spacing.lg,
      marginBottom: spacing.md,
    },
    title: {
      ...typography.subtitle,
    },
    close: {
      ...typography.body,
      color: colors.primary,
      fontWeight: '600',
    },
    search: {
      marginHorizontal: spacing.lg,
      marginBottom: spacing.md,
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: radii.md,
      paddingHorizontal: spacing.md,
      paddingVertical: scaleSize(12, displayScale),
      fontSize: scaleFontSize(16, fontScale),
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.lg,
      gap: spacing.md,
    },
    rowSelected: {
      backgroundColor: colors.primaryMuted,
    },
    flag: {
      fontSize: scaleFontSize(28, fontScale),
    },
    rowText: {
      flex: 1,
    },
    name: {
      ...typography.body,
      fontWeight: '500',
    },
    factor: {
      ...typography.caption,
      marginTop: scaleSize(2, displayScale),
    },
    sep: {
      height: 1,
      backgroundColor: colors.border,
      marginLeft: spacing.lg + scaleSize(44, displayScale),
    },
  });
}
