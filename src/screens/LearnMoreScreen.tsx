import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, Text } from 'react-native';
import { Button } from '../components/Button';
import { ScreenLayout } from '../components/ScreenLayout';
import { useLanguage } from '../context/LanguageContext';
import { useThemedStyles, type ThemeSlice } from '../hooks/useThemedStyles';
import { useScreenTitle } from '../hooks/useScreenTitle';
import type { RootStackParamList } from '../navigation/types';
import { colors } from '../theme';
import { scaleSize } from '../theme/scale';

type Props = NativeStackScreenProps<RootStackParamList, 'LearnMore'>;

export function LearnMoreScreen({ navigation }: Props) {
  const { t } = useLanguage();
  const styles = useThemedStyles(createStyles);
  useScreenTitle(t.learnMore.title);

  return (
    <ScreenLayout title={t.learnMore.title}>
      <Text style={styles.body}>{t.learnMore.body}</Text>
      <Button
        title={t.learnMore.openLibrary}
        onPress={() => navigation.navigate('LearnLibrary')}
        style={styles.btn}
      />
      <Button title={t.common.continue} onPress={() => navigation.goBack()} variant="secondary" />
    </ScreenLayout>
  );
}

function createStyles({ typography, spacing, displayScale }: ThemeSlice) {
  return StyleSheet.create({
    body: {
      ...typography.body,
      color: colors.textSecondary,
      lineHeight: scaleSize(26, displayScale),
      marginBottom: spacing.xl,
    },
    btn: {
      marginTop: spacing.md,
    },
  });
}
