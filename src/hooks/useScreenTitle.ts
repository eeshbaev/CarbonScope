import { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useLanguage } from '../context/LanguageContext';

/** Updates stack header title when language changes. */
export function useScreenTitle(title: string) {
  const navigation = useNavigation();
  const { locale } = useLanguage();

  useLayoutEffect(() => {
    navigation.setOptions({ title });
  }, [navigation, title, locale]);
}
