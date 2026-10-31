import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { getTranslations, type Locale, type TranslationKeys } from '../i18n';
import { getStoredLanguage, setStoredLanguage } from '../storage';
import { deviceLocale } from '../onboarding/device';

interface LanguageContextValue {
  locale: Locale;
  t: TranslationKeys;
  setLocale: (locale: Locale) => Promise<void>;
  ready: boolean;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en');
  const [ready, setReady] = useState(false);

  useEffect(() => {
    getStoredLanguage().then((stored) => {
      // Follow the device language until the user picks one explicitly.
      setLocaleState(stored ?? deviceLocale());
      setReady(true);
    });
  }, []);

  const setLocale = useCallback(async (next: Locale) => {
    if (next !== locale) {
      setLocaleState(next);
      await setStoredLanguage(next);
    }
  }, [locale]);

  const value = useMemo(
    () => ({
      locale,
      t: getTranslations(locale),
      setLocale,
      ready,
    }),
    [locale, setLocale, ready]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
