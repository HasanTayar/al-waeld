// Represents a single language translation
export interface TranslationItem {
  ar: string;
  he: string;
}

// Represents a translation that could be a simple string or a TranslationItem
export type TranslationContent = string | TranslationItem;

// Represents a section which can have nested translations
export interface SectionTranslations {
  [key: string]: TranslationContent | SectionTranslations;
}

// Represents the entire set of translations for a page
export interface PageTranslations {
  [pageName: string]: SectionTranslations;
}

// Represents a founder, as previously defined
export interface Founder {
  name: any;
  duties: any[];
  imageUrl?: any;
}

export interface FoundersSectionProps {
  title: any;
  founders: any;
}

export interface DataObject {
  id: number;
  page_id: number;
  translations: PageTranslations;
}

export interface UserState {
  language: 'ar' | 'he';
  isFirstVisit: boolean;
}

export interface TranslationForPageProps {
  pageName: string;
  translations?: SectionTranslations;
}

export interface LangModal {
  title: TranslationItem;
  description: TranslationItem;
  submit: TranslationItem;
  isFirstVisit: boolean;
}

export interface WelcomeSectionProps {
  title: any;
  description: any;
  readAboutUs: any;
}

// Define a type that can handle both string and TranslationItem
export type TranslationValue = string | TranslationItem | SectionTranslations | undefined;
