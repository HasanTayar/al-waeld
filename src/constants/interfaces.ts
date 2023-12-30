import { TranslationValue } from ".";

export interface Translations {
  [key: string]: string  ; 
}
export interface UserState {
  language: string | "he";
  isFirstVisit: boolean;
}  
export interface TranslationObject {
  [key: string]: TranslationValue;
}
export interface TranslationForPageProps  {
  pageName: string;
  langCode: string;
};

export interface langModal  {
  title?: string;
  description?: string;
  submit?: string;
  isFirstVisit?: boolean;
};
export interface WelcomeSectionProps  {
  title?:string,
  description?:string,
  readAboutUs?:string,
}
export interface FoundersSectionProps{
  title?:string,
  founders?:string[]
}