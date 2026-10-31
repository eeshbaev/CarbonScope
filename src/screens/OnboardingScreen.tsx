import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Button } from '../components/Button';
import { Logo } from '../components/Logo';
import { ScreenLayout } from '../components/ScreenLayout';
import { useLanguage } from '../context/LanguageContext';
import { useThemedStyles, type ThemeSlice } from '../hooks/useThemedStyles';
import type { RootStackParamList } from '../navigation/types';
import { setOnboardingSeen } from '../storage';
import { colors, radii } from '../theme';
import { scaleFontSize, scaleSize } from '../theme/scale';

type Props = NativeStackScreenProps<RootStackParamList, 'Onboarding'>;

function Section({
  icon,
  title,
  body,
  styles,
}: {
  icon: string;
  title: string;
  body: string;
  styles: ReturnType<typeof createStyles>;
}) {
  return (
    <View style={styles.section}>
      <Text style={styles.icon}>{icon}</Text>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Text style={styles.sectionBody}>{body}</Text>
    </View>
  );
}

export function OnboardingScreen({ navigation }: Props) {
  const { t } = useLanguage();
  const styles = useThemedStyles(createStyles);

  const handleStart = async () => {
    await setOnboardingSeen();
    navigation.replace('Home');
  };

  return (
    <ScreenLayout scroll={false}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Logo size="lg" showTagline={false} />
        <Text style={styles.title}>{t.onboarding.title}</Text>
        <Text style={styles.subtitle}>{t.onboarding.subtitle}</Text>

        <Section icon="🏭" title={t.onboarding.scope1Title} body={t.onboarding.scope1Body} styles={styles} />
        <Section icon="⚡" title={t.onboarding.scope2Title} body={t.onboarding.scope2Body} styles={styles} />
        <Section icon="🔗" title={t.onboarding.scope3Title} body={t.onboarding.scope3Body} styles={styles} />
        <Section icon="🌱" title={t.onboarding.whyTitle} body={t.onboarding.whyBody} styles={styles} />

        <Button title={t.common.letsStart} onPress={handleStart} style={styles.button} />
      </ScrollView>
    </ScreenLayout>
  );
}

function createStyles({ typography, spacing, fontScale, displayScale }: ThemeSlice) {
  return StyleSheet.create({
    scrollView: {
      flex: 1,
    },
    scroll: {
      paddingBottom: spacing.xl * 2,
      paddingTop: spacing.md,
    },
    title: {
      ...typography.title,
      textAlign: 'center',
      marginBottom: spacing.sm,
    },
    subtitle: {
      ...typography.body,
      color: colors.textSecondary,
      textAlign: 'center',
      lineHeight: scaleSize(24, displayScale),
      marginBottom: spacing.xl,
      paddingHorizontal: spacing.sm,
    },
    section: {
      backgroundColor: colors.card,
      borderRadius: radii.lg,
      padding: spacing.lg,
      marginBottom: spacing.md,
      borderWidth: 1,
      borderColor: colors.border,
    },
    icon: {
      fontSize: scaleFontSize(32, fontScale),
      marginBottom: spacing.sm,
    },
    sectionTitle: {
      ...typography.subtitle,
      fontSize: scaleFontSize(17, fontScale),
      marginBottom: spacing.sm,
      color: colors.primary,
    },
    sectionBody: {
      ...typography.body,
      color: colors.textSecondary,
      lineHeight: scaleSize(22, displayScale),
      fontSize: scaleFontSize(15, fontScale),
    },
    button: {
      marginTop: spacing.lg,
    },
  });
}
