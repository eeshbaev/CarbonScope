import { StyleSheet, Text, View } from 'react-native';
import { useLanguage } from '../context/LanguageContext';
import { useThemedStyles, type ThemeSlice } from '../hooks/useThemedStyles';
import { CarbonScopeMark, CarbonScopeWordmark } from './brand';
import { HeroBackdrop } from './HeroBackdrop';
import { colors, radii } from '../theme';
import { cardElevated } from '../theme/elevated';
import { scaleFontSize, scaleSize } from '../theme/scale';

/** Shared CarbonScope branding (home, results, PDF header). */
export function BrandHero({ showBackdrop = false }: { showBackdrop?: boolean }) {
  const { t } = useLanguage();
  const styles = useThemedStyles(createStyles);

  return (
    <View style={styles.hero}>
      {showBackdrop ? <HeroBackdrop /> : null}
      <View style={styles.heroContent}>
        <View style={styles.brandRow}>
          <CarbonScopeMark size={52} />
          <CarbonScopeWordmark size="lg" />
        </View>
        <Text style={styles.ghg}>{t.home.ghgAligned}</Text>
        <Text style={styles.calculator}>{t.home.scopeCalculator}</Text>
      </View>
    </View>
  );
}

function createStyles({ typography, spacing, fontScale }: ThemeSlice) {
  return StyleSheet.create({
    hero: {
      backgroundColor: colors.card,
      borderRadius: radii.lg,
      padding: spacing.lg,
      marginBottom: spacing.lg,
      borderWidth: 1,
      borderColor: colors.border,
      overflow: 'hidden',
      position: 'relative',
      minHeight: scaleSize(148, fontScale),
      ...cardElevated,
    },
    heroContent: {
      position: 'relative',
      zIndex: 1,
    },
    brandRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.md,
      marginBottom: spacing.md,
    },
    ghg: {
      ...typography.body,
      fontSize: scaleFontSize(15, fontScale),
      color: colors.primaryLight,
      fontWeight: '600',
      marginBottom: spacing.xs,
    },
    calculator: {
      ...typography.subtitle,
      fontSize: scaleFontSize(17, fontScale),
      color: colors.text,
      fontWeight: '500',
    },
  });
}
