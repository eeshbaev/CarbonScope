import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FileCheck, TrendingDown, Users } from 'lucide-react-native';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Button } from '../components/Button';
import { useAccessibility } from '../context/AccessibilityContext';
import { useLanguage } from '../context/LanguageContext';
import { PressableScale } from '../design/Pressable';
import type { RootStackParamList } from '../navigation/types';
import { OnboardingLayout } from '../onboarding/OnboardingLayout';
import { setGoal, type OnboardingGoal } from '../onboarding/state';
import { colors, radii } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'SetupGoal'>;

/** G — one optional question whose answer changes the result screen and Home. */
export function SetupGoalScreen({ navigation }: Props) {
  const { t } = useLanguage();
  const { reduceMotion } = useAccessibility();

  const choose = async (goal: OnboardingGoal) => {
    await setGoal(goal);
    navigation.navigate('SetupCompany');
  };

  const cards: { goal: OnboardingGoal; icon: typeof FileCheck; title: string; sub: string }[] = [
    { goal: 'request', icon: FileCheck, title: t.onboarding2.goalRequest, sub: t.onboarding2.goalRequestSub },
    { goal: 'reduce', icon: TrendingDown, title: t.onboarding2.goalReduce, sub: t.onboarding2.goalReduceSub },
    { goal: 'consultant', icon: Users, title: t.onboarding2.goalConsultant, sub: t.onboarding2.goalConsultantSub },
  ];

  return (
    <OnboardingLayout
      actions={<Button title={t.onboarding2.skip} variant="quiet" onPress={() => void choose('none')} />}
    >
      <Text style={styles.title} accessibilityRole="header">
        {t.onboarding2.goalTitle}
      </Text>
      <Text style={styles.sub}>{t.onboarding2.goalSub}</Text>
      <View style={styles.cards}>
        {cards.map(({ goal, icon: Icon, title, sub }, i) => (
          <Animated.View key={goal} entering={reduceMotion ? undefined : FadeInDown.delay(i * 70).springify().damping(22)}>
            <PressableScale
              haptic="selection"
              style={styles.card}
              onPress={() => void choose(goal)}
              accessibilityRole="button"
              accessibilityLabel={`${title}. ${sub}`}
            >
              <View style={styles.iconWrap}>
                <Icon size={22} color={colors.brand} strokeWidth={1.75} />
              </View>
              <View style={styles.cardText}>
                <Text style={styles.cardTitle}>{title}</Text>
                <Text style={styles.cardSub}>{sub}</Text>
              </View>
            </PressableScale>
          </Animated.View>
        ))}
      </View>
    </OnboardingLayout>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 28, fontWeight: '700', color: colors.ink, letterSpacing: -0.3 },
  sub: { fontSize: 16, lineHeight: 22, color: colors.inkSecondary },
  cards: { gap: 12, marginTop: 8 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    padding: 16,
    borderRadius: radii.lg,
    backgroundColor: colors.surface,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.hairline,
    minHeight: 76,
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: radii.md,
    backgroundColor: colors.brandTint,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardText: { flex: 1, gap: 2 },
  cardTitle: { fontSize: 16, fontWeight: '600', color: colors.ink, lineHeight: 21 },
  cardSub: { fontSize: 14, color: colors.inkSecondary },
});
