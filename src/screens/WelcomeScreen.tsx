import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BookOpenCheck, Languages, Lock, UserRoundX } from 'lucide-react-native';
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Button } from '../components/Button';
import { useAccessibility } from '../context/AccessibilityContext';
import { useLanguage } from '../context/LanguageContext';
import { useLayout } from '../design/layout';
import { PressableScale } from '../design/Pressable';
import { ScopeRing } from '../design/ScopeRing';
import { LOCALES } from '../i18n';
import type { RootStackParamList } from '../navigation/types';
import { OnboardingLayout } from '../onboarding/OnboardingLayout';
import { colors, radii } from '../theme';
import { scaleFontSize } from '../theme/scale';

type Props = NativeStackScreenProps<RootStackParamList, 'Welcome'>;

/** W — promise + trust, nothing asked (docs/ONBOARDING.md §3). */
export function WelcomeScreen({ navigation }: Props) {
  const { t, locale } = useLanguage();
  const { fontScale, reduceMotion } = useAccessibility();
  const layout = useLayout();
  const enter = (i: number) => (reduceMotion ? undefined : FadeInDown.delay(300 + i * 80).springify().damping(22));
  const native = LOCALES.find((l) => l.code === locale)?.nativeLabel ?? 'English';

  useEffect(() => navigation.setOptions({ headerShown: false }), [navigation]);

  const chips = [
    { icon: UserRoundX, label: t.onboarding2.chipNoAccount },
    { icon: Lock, label: t.onboarding2.chipLocal },
    { icon: BookOpenCheck, label: t.onboarding2.chipFactors },
  ];

  return (
    <OnboardingLayout
      top={
        <View style={[styles.topRow, { paddingHorizontal: layout.margin }]}>
          <PressableScale
            haptic="selection"
            style={styles.langChip}
            onPress={() => navigation.navigate('Language')}
            accessibilityRole="button"
            accessibilityLabel={`${t.onboarding2.language}: ${native}`}
          >
            <Languages size={16} color={colors.inkSecondary} strokeWidth={1.75} />
            <Text style={styles.langText}>{native}</Text>
          </PressableScale>
        </View>
      }
      actions={<Button title={t.onboarding2.start} onPress={() => navigation.navigate('SetupGoal')} />}
    >
      <View style={[styles.hero, layout.short && styles.heroShort]}>
        <ScopeRing values={[0.32, 0.46, 0.22]} size={layout.short ? 112 : 152} reveal>
          <Text style={styles.ringText}>CO₂e</Text>
        </ScopeRing>
        <Animated.Text
          entering={enter(0)}
          style={[styles.headline, { fontSize: scaleFontSize(layout.short ? 26 : 30, fontScale) }]}
          accessibilityRole="header"
        >
          {t.onboarding2.headline}
        </Animated.Text>
        {!layout.short || fontScale <= 1 ? (
          <Animated.Text entering={enter(1)} style={styles.sub}>
            {t.onboarding2.sub}
          </Animated.Text>
        ) : null}
        <Animated.View entering={enter(2)} style={styles.chips}>
          {chips.map(({ icon: Icon, label }) => (
            <View key={label} style={styles.chip}>
              <Icon size={15} color={colors.brand} strokeWidth={1.75} />
              <Text style={styles.chipText}>{label}</Text>
            </View>
          ))}
        </Animated.View>
      </View>
    </OnboardingLayout>
  );
}

const styles = StyleSheet.create({
  topRow: { flexDirection: 'row', justifyContent: 'flex-end', paddingTop: 8 },
  langChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    minHeight: 36,
    borderRadius: radii.full,
    backgroundColor: colors.surfaceSunken,
  },
  langText: { fontSize: 14, color: colors.inkSecondary, fontWeight: '500' },
  hero: { flex: 1, justifyContent: 'center', alignItems: 'flex-start', gap: 20, paddingVertical: 24 },
  heroShort: { gap: 14, paddingVertical: 8 },
  ringText: { fontSize: 15, fontWeight: '600', color: colors.inkSecondary },
  headline: { fontWeight: '700', color: colors.ink, letterSpacing: -0.4, lineHeight: 38 },
  sub: { fontSize: 17, lineHeight: 24, color: colors.inkSecondary },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: radii.full,
    backgroundColor: colors.surface,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.hairline,
  },
  chipText: { fontSize: 13, fontWeight: '500', color: colors.ink },
});
