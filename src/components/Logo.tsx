import { StyleSheet, Text, View } from 'react-native';
import { useLanguage } from '../context/LanguageContext';
import { useThemedStyles, type ThemeSlice } from '../hooks/useThemedStyles';
import { CarbonScopeMark, CarbonScopeWordmark } from './brand';
import { colors } from '../theme';

interface LogoProps {
  size?: 'sm' | 'lg';
  showTagline?: boolean;
}

export function Logo({ size = 'lg', showTagline }: LogoProps) {
  const { t } = useLanguage();
  const styles = useThemedStyles(createStyles);
  const isLarge = size === 'lg';
  const showSlogan = showTagline ?? isLarge;
  const markSize = isLarge ? 72 : 48;
  const wordmarkSize = isLarge ? 'lg' : 'md';

  return (
    <View style={[styles.container, isLarge && styles.containerLg]}>
      <View style={styles.brandRow}>
        <CarbonScopeMark size={markSize} />
        <CarbonScopeWordmark size={wordmarkSize} />
      </View>
      {showSlogan ? <Text style={styles.slogan}>{t.slogan}</Text> : null}
    </View>
  );
}

function createStyles({ typography, spacing }: ThemeSlice) {
  return StyleSheet.create({
    container: {
      alignItems: 'center',
    },
    containerLg: {
      marginBottom: spacing.lg,
    },
    brandRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.md,
    },
    slogan: {
      ...typography.caption,
      marginTop: spacing.md,
      textAlign: 'center',
      color: colors.textSecondary,
      paddingHorizontal: spacing.md,
    },
  });
}
