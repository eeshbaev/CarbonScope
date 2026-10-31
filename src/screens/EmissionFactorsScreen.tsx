import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { parseNumberInput } from '../utils/parseNumberInput';
import { useCallback, useEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Button } from '../components/Button';
import { ScreenLayout } from '../components/ScreenLayout';
import { ALL_COUNTRIES } from '../data/countries';
import {
  EMISSION_FACTOR_DATASET_VERSION,
  EMISSION_FACTOR_REFERENCE_YEAR,
  EMISSION_FACTOR_SOURCES,
  getElectricityFactorForCountry,
  isCustomElectricityFactor,
} from '../data/emissionFactors';
import { useLanguage } from '../context/LanguageContext';
import {
  FUEL_FACTORS,
  FUEL_FACTOR_DATASET,
  HEAT_FACTORS,
  REFRIGERANTS,
  SCOPE1_FUELS,
  fuelFactorTotal,
} from '../data/fuelFactors';
import { getCategoryLine } from '../data/inputLines';
import { formatAppNumber } from '../utils/appLocale';
import { lineLabel } from '../utils/lineLabels';
import { standardUnitAbbr } from '../utils/unitLabels';
import { useScreenTitle } from '../hooks/useScreenTitle';
import type { RootStackParamList } from '../navigation/types';
import {
  getDefaultFactorForCountry,
  loadCustomElectricityFactors,
  setCustomFactorForCountry,
} from '../storage/customFactors';
import { getLocalizedCountryName } from '../utils/localizeCountry';
import { useThemedStyles, type ThemeSlice } from '../hooks/useThemedStyles';
import { colors, radii } from '../theme';
import { scaleFontSize, scaleSize } from '../theme/scale';

type Props = NativeStackScreenProps<RootStackParamList, 'EmissionFactors'>;

export function EmissionFactorsScreen({ navigation }: Props) {
  const { t, locale } = useLanguage();
  const styles = useThemedStyles(createStyles);
  const [custom, setCustom] = useState<Record<string, number>>({});
  const [editCode, setEditCode] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');

  const reload = useCallback(async () => {
    setCustom(await loadCustomElectricityFactors());
  }, []);

  useEffect(() => {
    void reload();
  }, [reload]);

  useScreenTitle(t.settings.factorsSection);

  const openEdit = (code: string) => {
    setEditCode(code);
    setEditValue(String(getElectricityFactorForCountry(code)));
  };

  const saveEdit = async () => {
    if (!editCode) return;
    const n = parseNumberInput(editValue);
    if (!Number.isFinite(n) || n <= 0) {
      Alert.alert(t.settings.factorInvalid);
      return;
    }
    await setCustomFactorForCountry(editCode, n);
    await reload();
    setEditCode(null);
    Alert.alert(t.settings.factorSaved);
  };

  const resetEdit = async () => {
    if (!editCode) return;
    await setCustomFactorForCountry(editCode, null);
    await reload();
    setEditCode(null);
    Alert.alert(t.settings.factorReset);
  };

  const versionLine = t.settings.factorsVersion
    .replace('{version}', EMISSION_FACTOR_DATASET_VERSION)
    .replace('{year}', EMISSION_FACTOR_REFERENCE_YEAR);

  return (
    <ScreenLayout title={t.settings.factorsSection} scroll={false} style={styles.flex}>
      <Text style={styles.hint}>{t.settings.factorsHint}</Text>
      <Text style={styles.meta}>{versionLine}</Text>
      <Text style={styles.meta}>
        {t.settings.factorsSources}: {EMISSION_FACTOR_SOURCES}
      </Text>
      <FlatList
        data={ALL_COUNTRIES}
        keyExtractor={(c) => c.code}
        style={styles.list}
        ListHeaderComponent={
          <View style={styles.fuelCard}>
            <Text style={styles.fuelTitle}>{t.settings.fuelFactorsTitle}</Text>
            <Text style={styles.meta}>
              {t.settings.fuelFactorsVersion
                .replace('{version}', FUEL_FACTOR_DATASET.version)
                .replace('{year}', FUEL_FACTOR_DATASET.referenceYear)
                .replace('{gwp}', FUEL_FACTOR_DATASET.gwpBasis)}
            </Text>
            {SCOPE1_FUELS.map((k) => {
              const f = FUEL_FACTORS[k];
              const unit = standardUnitAbbr(t, getCategoryLine(k).kind);
              return (
                <View key={k} style={styles.fuelRow}>
                  <Text style={styles.name}>
                    {lineLabel(t, k)} — {formatAppNumber(fuelFactorTotal(k), locale)}{' '}
                    {t.common.kgCo2e}/{unit}
                  </Text>
                  <Text style={styles.factor}>
                    {t.settings.fuelFactorsSplit
                      .replace('{co2}', formatAppNumber(f.co2, locale))
                      .replace('{ch4}', formatAppNumber(f.ch4, locale))
                      .replace('{n2o}', formatAppNumber(f.n2o, locale))}
                  </Text>
                </View>
              );
            })}
            <View style={styles.fuelRow}>
              <Text style={styles.name}>{t.scope1.refrigerantsShort} (GWP)</Text>
              <Text style={styles.factor}>
                {REFRIGERANTS.map((r) => `${r.label} ${r.gwp}`).join(' · ')}
              </Text>
            </View>
            <View style={styles.fuelRow}>
              <Text style={styles.name}>
                {t.scope2.districtHeat} / {t.scope2.steam}
              </Text>
              <Text style={styles.factor}>
                {HEAT_FACTORS.districtHeat} {t.common.kgCo2e}
                {t.units.perKwh}
              </Text>
            </View>
            <Text style={styles.meta}>
              {t.settings.factorsSources}: {FUEL_FACTOR_DATASET.sources}
            </Text>
            <Text style={[styles.fuelTitle, styles.gridTitle]}>{t.settings.gridFactorsTitle}</Text>
          </View>
        }
        renderItem={({ item }) => {
          const factor = getElectricityFactorForCountry(item.code);
          const isCustom = isCustomElectricityFactor(item.code);
          const name = getLocalizedCountryName(item.code, locale, item.name);
          return (
            <View style={styles.row}>
              <View style={styles.rowText}>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.factor}>
                  {factor} {t.common.kgCo2e}
                  {t.units.perKwh}
                  {isCustom ? ` · ${t.settings.factorCustomBadge}` : ''}
                </Text>
              </View>
              <Pressable onPress={() => openEdit(item.code)} style={styles.editBtn}>
                <Text style={styles.editLabel}>{t.settings.editFactor}</Text>
              </Pressable>
            </View>
          );
        }}
      />

      <Modal visible={!!editCode} transparent animationType="slide">
        <View style={styles.modalBackdrop}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>
              {t.settings.factorEditTitle.replace(
                '{country}',
                editCode
                  ? getLocalizedCountryName(
                      editCode,
                      locale,
                      ALL_COUNTRIES.find((c) => c.code === editCode)?.name ?? editCode
                    )
                  : ''
              )}
            </Text>
            <Text style={styles.modalHint}>{t.settings.factorEditHint}</Text>
            <TextInput
              style={styles.input}
              value={editValue}
              onChangeText={setEditValue}
              keyboardType="decimal-pad"
              placeholder="0.35"
            />
            <Text style={styles.defaultHint}>
              {t.settings.resetFactor}: {editCode ? getDefaultFactorForCountry(editCode) : ''}
            </Text>
            <Button title={t.common.save} onPress={saveEdit} />
            <Button
              title={t.settings.resetFactor}
              variant="secondary"
              onPress={resetEdit}
              style={styles.modalBtn}
            />
            <Button
              title={t.common.cancel}
              variant="outline"
              onPress={() => setEditCode(null)}
              style={styles.modalBtn}
            />
          </View>
        </View>
      </Modal>
    </ScreenLayout>
  );
}

function createStyles({ typography, spacing, fontScale, displayScale }: ThemeSlice) {
  return StyleSheet.create({
    fuelCard: {
      paddingBottom: spacing.md,
    },
    fuelTitle: {
      ...typography.subtitle,
      color: colors.primary,
      marginTop: spacing.sm,
      marginBottom: spacing.xs,
    },
    gridTitle: {
      marginTop: spacing.lg,
    },
    fuelRow: {
      paddingVertical: spacing.sm,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: colors.border,
    },
    flex: {
      flex: 1,
    },
    hint: {
      ...typography.body,
      color: colors.textSecondary,
      marginBottom: spacing.sm,
      lineHeight: scaleSize(22, displayScale),
    },
    meta: {
      ...typography.caption,
      marginBottom: spacing.xs,
    },
    list: {
      flex: 1,
      marginTop: spacing.md,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: spacing.md,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: radii.md,
      backgroundColor: colors.card,
      marginBottom: spacing.sm,
    },
    rowText: {
      flex: 1,
    },
    name: {
      ...typography.body,
      fontWeight: '600',
    },
    factor: {
      ...typography.caption,
      marginTop: scaleSize(2, displayScale),
    },
    editBtn: {
      paddingHorizontal: spacing.sm,
      paddingVertical: spacing.xs,
    },
    editLabel: {
      ...typography.caption,
      color: colors.primary,
      fontWeight: '700',
    },
    modalBackdrop: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.4)',
      justifyContent: 'flex-end',
    },
    modal: {
      backgroundColor: colors.card,
      borderTopLeftRadius: radii.lg,
      borderTopRightRadius: radii.lg,
      padding: spacing.lg,
    },
    modalTitle: {
      ...typography.subtitle,
      marginBottom: spacing.sm,
    },
    modalHint: {
      ...typography.caption,
      marginBottom: spacing.md,
    },
    input: {
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: radii.md,
      padding: spacing.md,
      fontSize: scaleFontSize(18, fontScale),
      marginBottom: spacing.sm,
    },
    defaultHint: {
      ...typography.caption,
      marginBottom: spacing.md,
    },
    modalBtn: {
      marginTop: spacing.sm,
    },
  });
}
