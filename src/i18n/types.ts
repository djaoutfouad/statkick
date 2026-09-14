import { LanguageCode, ToolCategory } from '../types';

export interface ToolTranslation {
  name: string;
  tagline: string;
  description: string;
  formulaSummary: string;
  intro?: string;
  metricExplanation?: string;
  interpretation?: string;
  methodology?: string;
  footballContext?: string;
  faqs?: Array<{ question: string; answer: string }>;
  labels?: Record<string, string>;
  presets?: Record<string, string>;
  tiers?: Record<string, string>;
}

export interface TranslationSchema {
  // Navigation & Header
  nav: {
    tools: string;
    blog: string;
    guides: string;
    about: string;
    methodology: string;
    contact: string;
    allTools: string;
    subtitle: string;
    openMenu: string;
    closeMenu: string;
  };

  // Common UI
  common: {
    calculate: string;
    reset: string;
    copied: string;
    copyLink: string;
    share: string;
    exploreTools: string;
    learnMore: string;
    readArticle: string;
    readGuide: string;
    viewAll: string;
    search: string;
    all: string;
    advertisement: string;
    minutes: string;
    readingTime: string;
    published: string;
    updated: string;
    relatedTools: string;
    relatedArticles: string;
    relatedGuides: string;
    tableOfContents: string;
    keyTakeaways: string;
    inputConsole: string;
    inputConsoleDesc: string;
    calculatedOutput: string;
    howToInterpret: string;
    mathMethodology: string;
    tacticalContext: string;
    faqTitle: string;
    zeroLatency: string;
    clientSide: string;
    transparentFormulas: string;
    backToHome: string;
    backToBlog: string;
    backToGuides: string;
    noResults: string;
    step: string;
    proTip: string;
    difficulty: string;
    overviewPurpose: string;
    whyMetricMatters: string;
    loadPresets: string;
    preset: string;
    resetValues: string;
  };

  // Categories
  categories: {
    all: string;
    performance: string;
    market: string;
    fantasy: string;
    simulation: string;
    tactical: string;
    performanceDesc: string;
    marketDesc: string;
    fantasyDesc: string;
    simulationDesc: string;
    tacticalDesc: string;
  };

  // Home Page
  home: {
    badge: string;
    heroTitlePrefix: string;
    heroTitleHighlight: string;
    heroSubtitle: string;
    exploreCta: string;
    aboutCta: string;
    toolkitHeading: string;
    toolkitSubheading: string;
    howItWorksHeading: string;
    howItWorksSubheading: string;
    step1Title: string;
    step1Desc: string;
    step2Title: string;
    step2Desc: string;
    step3Title: string;
    step3Desc: string;
    featuredGuideBadge: string;
    featuredGuideHeading: string;
    featuredGuideSub: string;
    latestBlogHeading: string;
    latestBlogSub: string;
    whyBuiltTitle: string;
    whyBuiltBadge: string;
    whyBuiltP1: string;
    whyBuiltP2: string;
    methodologyCta: string;
    faqHeading: string;
    finalCtaTitle: string;
    finalCtaSubtitle: string;
    finalCtaButton: string;
  };

  // Tool specific summaries & localized content
  tools: Record<string, ToolTranslation>;

  // Blog UI
  blog: {
    badge: string;
    title: string;
    subtitle: string;
    featuredArticle: string;
    searchPlaceholder: string;
    allArticles: string;
    filterByCategory: string;
    writtenBy: string;
    readingTimeSuffix: string;
  };

  // Guides UI
  guides: {
    badge: string;
    title: string;
    subtitle: string;
    filterByDifficulty: string;
    allLevels: string;
    stepByStep: string;
    diagnosticFramework: string;
    keySummary: string;
  };

  // Methodology UI
  methodology: {
    badge: string;
    title: string;
    subtitle: string;
    philosophyTitle: string;
    philosophyBody: string;
    normalizationTitle: string;
    normalizationBody: string;
    limitationsTitle: string;
    limitationsBody: string;
    modelsHeading: string;
  };

  // Legal & Footer
  footer: {
    tagline: string;
    clientSideNotice: string;
    privacyNotice: string;
    explore: string;
    resources: string;
    legal: string;
    privacyPolicy: string;
    termsOfUse: string;
    cookiePolicy: string;
    disclaimer: string;
    allRightsReserved: string;
  };

  // Contact
  contact: {
    badge: string;
    title: string;
    subtitle: string;
    nameLabel: string;
    emailLabel: string;
    subjectLabel: string;
    messageLabel: string;
    sendButton: string;
    successTitle: string;
    successMessage: string;
    sendAnother: string;
  };
}

export const LANGUAGE_CONFIGS: Record<
  LanguageCode,
  { code: LanguageCode; label: string; flag: string; nativeName: string }
> = {
  EN: { code: 'EN', label: 'English', flag: '🇺🇸', nativeName: 'English' },
  ES: { code: 'ES', label: 'Español', flag: '🇪🇸', nativeName: 'Español' },
  DE: { code: 'DE', label: 'Deutsch', flag: '🇩🇪', nativeName: 'Deutsch' },
  FR: { code: 'FR', label: 'Français', flag: '🇫🇷', nativeName: 'Français' },
  IT: { code: 'IT', label: 'Italiano', flag: '🇮🇹', nativeName: 'Italiano' },
  PT: { code: 'PT', label: 'Português', flag: '🇧🇷', nativeName: 'Português' },
};
