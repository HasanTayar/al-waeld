import { TranslationForPageProps, Translations } from '@/constants';
import { supabase } from '@/lib/services/supbase';

export async function getTranslationsForPage({ pageName, langCode }: TranslationForPageProps) {
  // Fetch the page_id based on the page name.
  const { data: pageData, error: pageError } = await supabase
    .from('pages')
    .select('page_id')
    .eq('page_name', pageName)
    .single();

  if (pageError) throw new Error(pageError.message);
  if (!pageData) throw new Error(`Page not found: ${pageName}`);

  // Fetch the translations for the retrieved page_id.
  const { data: translationsData, error: translationsError } = await supabase
    .from('translations')
    .select('translations')
    .eq('page_id', pageData.page_id)
    .single();

  if (translationsError) throw new Error(translationsError.message);
  if (!translationsData) throw new Error(`Translations not found for page: ${pageName}`);

  // Extract the translations for the specified language.
  const translations = Object.keys(translationsData.translations).reduce((acc, key) => {
    acc[key] = translationsData.translations[key][langCode];
    return acc;
  }, {} as Translations);

  return translations;
}
