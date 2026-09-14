export type ToolCategory = 'Performance' | 'Market' | 'Fantasy' | 'Simulation' | 'Tactical';

export interface ToolMeta {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  category: ToolCategory;
  description: string;
  icon: string; // Lucide icon name
  keywords: string[];
  formulaSummary: string;
  personaImageUrl?: string;
  personaRole?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface BreadcrumbItem {
  label: string;
  path?: string;
}

export interface SEOMeta {
  title: string;
  description: string;
  canonicalUrl?: string;
  keywords?: string[];
  structuredData?: Record<string, any>;
}

export type LanguageCode = 'EN' | 'ES' | 'DE' | 'FR' | 'IT' | 'PT';

export interface LanguageOption {
  code: LanguageCode;
  label: string;
  flag: string;
  nativeName: string;
}

export type BlogCategory =
  | 'Performance Analysis'
  | 'Football Statistics'
  | 'Tactics & Strategy'
  | 'Player Analysis'
  | 'Team Analysis'
  | 'Fantasy Football'
  | 'Football Data'
  | 'Transfer Analysis';

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: BlogCategory;
  date: string;
  lastReviewed?: string;
  readTime: string;
  author: string;
  tags: string[];
  relatedToolSlugs: string[];
  relatedPostSlugs: string[];
  featured?: boolean;
  references?: Array<{ title: string; source: string; url?: string }>;
  content: {
    intro: string;
    sections: {
      heading: string;
      subheading?: string;
      body: string[];
      keyTakeaway?: string;
      example?: {
        title: string;
        details: string;
      };
    }[];
    conclusion: string;
    keyTakeawaysList: string[];
  };
}

export interface GuideItem {
  slug: string;
  title: string;
  tagline: string;
  excerpt: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  readTime: string;
  author?: string;
  date?: string;
  lastReviewed?: string;
  relatedToolSlugs: string[];
  references?: Array<{ title: string; source: string; url?: string }>;
  steps: {
    title: string;
    summary: string;
    details: string[];
    proTip?: string;
  }[];
  summaryTakeaway: string;
}
