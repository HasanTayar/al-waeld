export type TranslationForPageProps = {
  pageName: string;
  langCode: string;
};
export interface Translations {
  [key: string]: string;
}

export interface UserState {
  language: string | "he";
  isFirstVisit: boolean;
}
export type langModal = {
  title?: string;
  description?: string;
  submit?: string;
  isFirstVisit?: boolean;
};
