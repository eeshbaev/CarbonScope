import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { ActivityIndicator, AppState, Platform, StyleSheet, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AccessibilityProvider, useAccessibility } from '../context/AccessibilityContext';
import { AssessmentProvider } from '../context/AssessmentContext';
import { LanguageProvider, useLanguage } from '../context/LanguageContext';
import { CompanyInfoScreen } from '../screens/CompanyInfoScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { LanguageScreen } from '../screens/LanguageScreen';
import { LearnMoreScreen } from '../screens/LearnMoreScreen';
import { LearnLibraryScreen } from '../screens/LearnLibraryScreen';
import { LearnArticleScreen } from '../screens/LearnArticleScreen';
import { CompanyTrendsScreen } from '../screens/CompanyTrendsScreen';
import { EmissionFactorsScreen } from '../screens/EmissionFactorsScreen';
import { loadCustomElectricityFactors } from '../storage/customFactors';
import { OnboardingScreen } from '../screens/OnboardingScreen';
import { ResultsScreen } from '../screens/ResultsScreen';
import { Scope1Screen } from '../screens/Scope1Screen';
import { Scope2Screen } from '../screens/Scope2Screen';
import { PrivacyPolicyScreen } from '../screens/PrivacyPolicyScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import {
  initNotificationHandler,
  onAppForeground,
} from '../notifications/notificationService';
import { hasSeenOnboarding, hasSelectedLanguage } from '../storage';
import { colors } from '../theme';
import type { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

function NavigatorContent() {
  const { t, locale, ready: langReady } = useLanguage();
  const { ready: a11yReady } = useAccessibility();
  const [initialRoute, setInitialRoute] = useState<keyof RootStackParamList | null>(null);

  useEffect(() => {
    void loadCustomElectricityFactors();
  }, []);

  useEffect(() => {
    if (Platform.OS === 'web') return;
    initNotificationHandler();
    void onAppForeground(locale);
    const sub = AppState.addEventListener('change', (state) => {
      if (state === 'active') void onAppForeground(locale);
    });
    return () => sub.remove();
  }, [locale]);

  useEffect(() => {
    if (!langReady) return;
    Promise.all([hasSelectedLanguage(), hasSeenOnboarding()]).then(([hasLang, seenOnboarding]) => {
      if (!hasLang) setInitialRoute('Language');
      else if (!seenOnboarding) setInitialRoute('Onboarding');
      else setInitialRoute('Home');
    });
  }, [langReady]);

  if (!langReady || !a11yReady || !initialRoute) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <AssessmentProvider>
      <Stack.Navigator
        initialRouteName={initialRoute}
        screenOptions={{
          headerShown: true,
          headerTintColor: colors.primary,
          headerTitleStyle: { fontWeight: '600', color: colors.text },
          headerShadowVisible: false,
          headerStyle: { backgroundColor: colors.background },
          contentStyle: { backgroundColor: colors.background },
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name="Language" component={LanguageScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Onboarding" component={OnboardingScreen} options={{ headerShown: false }} />
        <Stack.Screen name="LearnMore" component={LearnMoreScreen} options={{ title: t.learnMore.title }} />
        <Stack.Screen
          name="LearnLibrary"
          component={LearnLibraryScreen}
          options={{ title: t.learnMore.libraryTitle }}
        />
        <Stack.Screen name="LearnArticle" component={LearnArticleScreen} />
        <Stack.Screen
          name="CompanyTrends"
          component={CompanyTrendsScreen}
          options={{ title: t.results.trendsTitle }}
        />
        <Stack.Screen
          name="EmissionFactors"
          component={EmissionFactorsScreen}
          options={{ title: t.settings.factorsSection }}
        />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Settings" component={SettingsScreen} options={{ title: t.common.settings }} />
        <Stack.Screen
          name="PrivacyPolicy"
          component={PrivacyPolicyScreen}
          options={{ title: t.privacy.title }}
        />
        <Stack.Screen
          name="CompanyInfo"
          component={CompanyInfoScreen}
          options={{ title: t.company.title }}
        />
        <Stack.Screen name="Scope1" component={Scope1Screen} options={{ title: t.scope1.title }} />
        <Stack.Screen name="Scope2" component={Scope2Screen} options={{ title: t.scope2.title }} />
        <Stack.Screen
          name="Results"
          component={ResultsScreen}
          options={{ title: t.results.titles['1_year'] }}
        />
      </Stack.Navigator>
    </AssessmentProvider>
  );
}

export function AppNavigator() {
  return (
    <GestureHandlerRootView style={styles.flex}>
      <LanguageProvider>
        <AccessibilityProvider>
          <NavigationContainer>
            <NavigatorContent />
          </NavigationContainer>
        </AccessibilityProvider>
      </LanguageProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
});
