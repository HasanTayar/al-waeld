export type TranslationForPageProps = {
  pageName: string;
  langCode: string;
};

export type langModal = {
  title?: string;
  description?: string;
  submit?: string;
  isFirstVisit?: boolean;
};
export type WelcomeSectionProps = {
  title?:string,
  description?:string,
  readAboutUs?:string,
}