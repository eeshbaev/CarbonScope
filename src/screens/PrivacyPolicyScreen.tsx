import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Linking, Pressable, StyleSheet, Text, View } from 'react-native';
import { ScreenLayout } from '../components/ScreenLayout';
import { STORE_CONFIG } from '../constants/store';
import { useLanguage } from '../context/LanguageContext';
import { useThemedStyles, type ThemeSlice } from '../hooks/useThemedStyles';
import { useScreenTitle } from '../hooks/useScreenTitle';
import type { RootStackParamList } from '../navigation/types';
import { colors } from '../theme';
import { scaleFontSize, scaleSize } from '../theme/scale';

type Props = NativeStackScreenProps<RootStackParamList, 'PrivacyPolicy'>;

export function PrivacyPolicyScreen(_props: Props) {
  const { t } = useLanguage();
  const styles = useThemedStyles(createStyles);
  useScreenTitle(t.privacy.title);

  const openHostedPolicy = () => {
    if (STORE_CONFIG.privacyPolicyUrl) {
      Linking.openURL(STORE_CONFIG.privacyPolicyUrl);
    }
  };

  return (
    <ScreenLayout title={t.privacy.title} subtitle={t.privacy.lastUpdated}>
      {t.privacy.sections.map((section, index) => (
        <View key={index} style={styles.section}>
          <Text style={styles.sectionTitle}>{section.title}</Text>
          <Text style={styles.body}>{section.body}</Text>
        </View>
      ))}
      {STORE_CONFIG.privacyPolicyUrl ? (
        <Pressable onPress={openHostedPolicy} style={styles.link}>
          <Text style={styles.linkText}>{t.privacy.openWebVersion}</Text>
        </Pressable>
      ) : null}
    </ScreenLayout>
  );
}

function createStyles({ typography, spacing, fontScale, displayScale }: ThemeSlice) {
  return StyleSheet.create({
    section: {
      marginBottom: spacing.lg,
    },
    sectionTitle: {
      ...typography.subtitle,
      fontSize: scaleFontSize(16, fontScale),
      marginBottom: spacing.sm,
    },
    body: {
      ...typography.body,
      color: colors.textSecondary,
      lineHeight: scaleSize(24, displayScale),
    },
    link: {
      marginTop: spacing.md,
      paddingVertical: spacing.sm,
    },
    linkText: {
      ...typography.body,
      color: colors.primary,
      fontWeight: '600',
    },
  });
}
