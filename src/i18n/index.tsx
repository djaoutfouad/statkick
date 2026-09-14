import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { LanguageCode } from '../types';
import { TranslationSchema, ToolTranslation, LANGUAGE_CONFIGS } from './types';
import { enTranslations } from './translations/en';
import { esTranslations } from './translations/es';
import { deTranslations } from './translations/de';
import { frTranslations } from './translations/fr';
import { itTranslations } from './translations/it';
import { ptTranslations } from './translations/pt';

const STORAGE_KEY = 'statkick-language';
const VALID_LANGUAGES: LanguageCode[] = ['EN', 'ES', 'DE', 'FR', 'IT', 'PT'];
const DEFAULT_LANGUAGE: LanguageCode = 'EN';

const TRANSLATIONS: Record<LanguageCode, TranslationSchema> = {
  EN: enTranslations,
  ES: esTranslations,
  DE: deTranslations,
  FR: frTranslations,
  IT: itTranslations,
  PT: ptTranslations,
};

interface LanguageContextValue {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: TranslationSchema;
  getToolTranslation: (slug: string) => ToolTranslation;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

function getInitialLanguage(): LanguageCode {
  try {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && VALID_LANGUAGES.includes(saved.toUpperCase() as LanguageCode)) {
        return saved.toUpperCase() as LanguageCode;
      }
    }
  } catch {
    // ignore storage errors
  }
  return DEFAULT_LANGUAGE;
}

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<LanguageCode>(getInitialLanguage);

  const setLanguage = (newLang: LanguageCode) => {
    if (VALID_LANGUAGES.includes(newLang)) {
      setLanguageState(newLang);
      try {
        localStorage.setItem(STORAGE_KEY, newLang);
      } catch {
        // ignore
      }
    }
  };

  useEffect(() => {
    // Ensure document lang attribute is updated
    document.documentElement.lang = language.toLowerCase();
  }, [language]);

  const t = useMemo(() => {
    return TRANSLATIONS[language] || TRANSLATIONS.EN;
  }, [language]);

  const getToolTranslation = useMemo(() => {
    return (slug: string): ToolTranslation => {
      const activeDict = TRANSLATIONS[language] || TRANSLATIONS.EN;
      const fallbackDict = TRANSLATIONS.EN;
      const activeTool = activeDict.tools?.[slug];
      const fallbackTool = fallbackDict.tools?.[slug];

      return {
        name: activeTool?.name || fallbackTool?.name || slug,
        tagline: activeTool?.tagline || fallbackTool?.tagline || '',
        description: activeTool?.description || fallbackTool?.description || '',
        formulaSummary: activeTool?.formulaSummary || fallbackTool?.formulaSummary || '',
        intro: activeTool?.intro || fallbackTool?.intro,
        metricExplanation: activeTool?.metricExplanation || fallbackTool?.metricExplanation,
        interpretation: activeTool?.interpretation || fallbackTool?.interpretation,
        methodology: activeTool?.methodology || fallbackTool?.methodology,
        footballContext: activeTool?.footballContext || fallbackTool?.footballContext,
        faqs: activeTool?.faqs || fallbackTool?.faqs || [],
        labels: { ...(fallbackTool?.labels || {}), ...(activeTool?.labels || {}) },
        presets: { ...(fallbackTool?.presets || {}), ...(activeTool?.presets || {}) },
        tiers: { ...(fallbackTool?.tiers || {}), ...(activeTool?.tiers || {}) },
      };
    };
  }, [language]);

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      t,
      getToolTranslation,
    }),
    [language, t, getToolTranslation]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = (): LanguageContextValue => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const useTranslation = (): TranslationSchema => {
  const { t } = useLanguage();
  return t;
};

export { LANGUAGE_CONFIGS, VALID_LANGUAGES };
