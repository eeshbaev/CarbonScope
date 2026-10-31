import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from '../components/Button';
import { FormPicker } from '../components/FormPicker';
import { Logo } from '../components/Logo';
import { ScreenLayout } from '../components/ScreenLayout';
import { useLanguage } from '../context/LanguageContext';
import { useThemedStyles, type ThemeSlice } from '../hooks/useThemedStyles';
import { getTranslations, LOCALES, type Locale } from '../i18n';
import type { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Language'>;

export function LanguageScreen({ navigation }: Props) {
  const { locale, setLocale } = useLanguage();
  const styles = useThemedStyles(createStyles);
  const [selected, setSelected] = useState<Locale>(locale);
  const t = useMemo(() => getTranslations(selected), [selected]);

  useEffect(() => {
    setSelected(locale);
  }, [locale]);

  const languageItems = useMemo(
    () =>
      LOCALES.map((item) => ({
        value: item.code,
        label: `${item.nativeLabel} (${item.label})`,
      })),
    []
  );

  const handleContinue = async () => {
    await setLocale(selected);
    if (navigation.canGoBack()) navigation.goBack();
    else navigation.replace('Welcome');
  };

  return (
    <ScreenLayout scroll={false} footer={<Button title={t.common.continue} onPress={handleContinue} />}>
      <View style={styles.content}>
        <Logo size="lg" showTagline={false} />
        <FormPicker
          label={t.common.selectLanguage}
          value={selected}
          onValueChange={(value) => setSelected(value as Locale)}
          items={languageItems}
        />
      </View>
    </ScreenLayout>
  );
}

function createStyles({ spacing }: ThemeSlice) {
  return StyleSheet.create({
    content: {
      flex: 1,
      justifyContent: 'center',
      paddingVertical: spacing.lg,
    },
  });
}
