import { useLanguage as useI18nLanguage, LANGUAGE_CONFIGS } from '../i18n';
import { LanguageCode, LanguageOption } from '../types';

export const LANGUAGE_OPTIONS: LanguageOption[] = [
  { code: 'EN', label: 'English', flag: '🇺🇸', nativeName: 'English' },
  { code: 'ES', label: 'Español', flag: '🇪🇸', nativeName: 'Español' },
  { code: 'DE', label: 'Deutsch', flag: '🇩🇪', nativeName: 'Deutsch' },
  { code: 'FR', label: 'Français', flag: '🇫🇷', nativeName: 'Français' },
  { code: 'IT', label: 'Italiano', flag: '🇮🇹', nativeName: 'Italiano' },
  { code: 'PT', label: 'Português', flag: '🇧🇷', nativeName: 'Português' },
];

export function useLanguage() {
  const { language, setLanguage, t, getToolTranslation } = useI18nLanguage();

  const currentOption =
    LANGUAGE_OPTIONS.find((l) => l.code === language) || LANGUAGE_OPTIONS[0];

  return {
    selectedLanguage: language,
    setSelectedLanguage: setLanguage,
    currentOption,
    options: LANGUAGE_OPTIONS,
    language,
    setLanguage,
    t,
    getToolTranslation,
  };
}
