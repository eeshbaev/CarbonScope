import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { ScreenLayout } from '../components/ScreenLayout';
import { useLanguage } from '../context/LanguageContext';
import { LEARN_ARTICLE_IDS } from '../i18n/packs/learnLibraryArticles';
import { useThemedStyles, type ThemeSlice } from '../hooks/useThemedStyles';
import { useScreenTitle } from '../hooks/useScreenTitle';
import type { RootStackParamList } from '../navigation/types';
import { colors, radii } from '../theme';
import { scaleFontSize } from '../theme/scale';

type Props = NativeStackScreenProps<RootStackParamList, 'LearnLibrary'>;

export function LearnLibraryScreen({ navigation }: Props) {
  const { t } = useLanguage();
  const styles = useThemedStyles(createStyles);
  useScreenTitle(t.learnMore.libraryTitle);

  return (
    <ScreenLayout title={t.learnMore.libraryTitle} subtitle={t.learnMore.librarySubtitle}>
      {LEARN_ARTICLE_IDS.map((id) => {
        const article = t.learnMore.articles[id];
        return (
          <Pressable
            key={id}
            style={styles.row}
            onPress={() => navigation.navigate('LearnArticle', { articleId: id })}
          >
            <Text style={styles.rowTitle}>{article.title}</Text>
            <Text style={styles.chevron}>›</Text>
          </Pressable>
        );
      })}
    </ScreenLayout>
  );
}

function createStyles({ typography, spacing, fontScale }: ThemeSlice) {
  return StyleSheet.create({
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: spacing.md,
      borderRadius: radii.md,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.card,
      marginBottom: spacing.sm,
    },
    rowTitle: {
      ...typography.body,
      fontWeight: '600',
      flex: 1,
      marginRight: spacing.sm,
    },
    chevron: {
      fontSize: scaleFontSize(22, fontScale),
      color: colors.textSecondary,
    },
  });
}
