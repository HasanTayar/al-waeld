// In your translations fetching function file
import { decodeHtmlEntities } from '../html-entity-decoder';
import { TranslationForPageProps, Translations } from '@/constants';
import { supabase } from '.';

export async function getTranslationsForPage({ pageName, langCode }: TranslationForPageProps): Promise<Translations> {
  const { data: pageData, error: pageError } = await supabase
    .from('pages')
    .select('page_id')
    .eq('page_name', pageName)
    .single();

  if (pageError) throw new Error(pageError.message);
  if (!pageData) throw new Error(`Page not found: ${pageName}`);

  const { data: translationsData, error: translationsError } = await supabase
    .from('translations')
    .select('translations')
    .eq('page_id', pageData.page_id)
    .single();

  if (translationsError) throw new Error(translationsError.message);
  if (!translationsData) throw new Error(`Translations not found for page: ${pageName}`);

  const translations = Object.keys(translationsData.translations).reduce((acc, key) => {
    const translatedText = translationsData.translations[key][langCode];
    acc[key] = translatedText ? decodeHtmlEntities(translatedText) : '';
    return acc;
  }, {} as Translations);

  return translations;
}
