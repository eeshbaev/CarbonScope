import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, Text } from 'react-native';
import { Button } from '../components/Button';
import { ScreenLayout } from '../components/ScreenLayout';
import { useLanguage } from '../context/LanguageContext';
import { useThemedStyles, type ThemeSlice } from '../hooks/useThemedStyles';
import { useScreenTitle } from '../hooks/useScreenTitle';
import type { LearnArticleId } from '../i18n/packs/learnLibraryArticles';
import type { RootStackParamList } from '../navigation/types';
import { colors } from '../theme';
import { scaleSize } from '../theme/scale';

type Props = NativeStackScreenProps<RootStackParamList, 'LearnArticle'>;

export function LearnArticleScreen({ navigation, route }: Props) {
  const { t } = useLanguage();
  const styles = useThemedStyles(createStyles);
  const id = route.params.articleId as LearnArticleId;
  const article = t.learnMore.articles[id] ?? t.learnMore.articles.ghgProtocol;
  useScreenTitle(article.title);

  return (
    <ScreenLayout title={article.title}>
      <Text style={styles.body}>{article.body}</Text>
      <Button title={t.common.backHome} onPress={() => navigation.goBack()} style={styles.btn} />
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
