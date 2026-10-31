export type RootStackParamList = {
  Language: undefined;
  Welcome: undefined;
  SetupGoal: undefined;
  SetupCompany: undefined;
  FirstData: undefined;
  Onboarding: undefined;
  LearnMore: undefined;
  LearnLibrary: undefined;
  LearnArticle: { articleId: string };
  CompanyTrends: { assessmentId: string };
  EmissionFactors: undefined;
  Home: undefined;
  Settings: undefined;
  CompanyInfo: undefined;
  Scope1: undefined;
  Scope2: undefined;
  Scope3: undefined;
  Results: {
    assessmentId?: string;
    promptRate?: boolean;
    promptNotifications?: boolean;
    /** First result after onboarding: animate the ring and show the biggest lever. */
    reveal?: boolean;
  };
  PrivacyPolicy: undefined;
};
