export type RootStackParamList = {
  Language: undefined;
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
  Results: {
    assessmentId?: string;
    promptRate?: boolean;
    promptNotifications?: boolean;
  };
  PrivacyPolicy: undefined;
};
