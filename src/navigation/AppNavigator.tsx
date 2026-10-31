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
import { Scope3Screen } from '../screens/Scope3Screen';
import { PrivacyPolicyScreen } from '../screens/PrivacyPolicyScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import { WelcomeScreen } from '../screens/WelcomeScreen';
import { SetupGoalScreen } from '../screens/SetupGoalScreen';
import { SetupCompanyScreen } from '../screens/SetupCompanyScreen';
import { FirstDataScreen } from '../screens/FirstDataScreen';
import {
  initNotificationHandler,
  onAppForeground,
} from '../notifications/notificationService';
import { hasSeenOnboarding, loadAssessments } from '../storage';
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
    // New users go straight to Welcome (language defaults to the device's; a chip lets them
    // change it). Anyone with saved reports — or who has finished onboarding — lands on Home.
    Promise.all([hasSeenOnboarding(), loadAssessments()]).then(([seen, saved]) => {
      setInitialRoute(seen || saved.length > 0 ? 'Home' : 'Welcome');
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
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SetupGoal" component={SetupGoalScreen} options={{ title: '' }} />
        <Stack.Screen name="SetupCompany" component={SetupCompanyScreen} options={{ title: '' }} />
        <Stack.Screen name="FirstData" component={FirstDataScreen} options={{ title: '' }} />
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
        <Stack.Screen name="Scope3" component={Scope3Screen} options={{ title: t.scope3.title }} />
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
