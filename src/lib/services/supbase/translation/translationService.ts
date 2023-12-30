import { PageTranslations } from '@/constants';
import { supabase } from '..'; // Update the path according to your project structure
import { processTranslationValue } from './helper';

export async function getTranslationsForPage(pageName: string): Promise<PageTranslations> {
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

  const translations: PageTranslations = {};
  Object.keys(translationsData.translations).forEach((key) => {
    translations[key] = processTranslationValue(translationsData.translations[key]);
  });

  return translations;
}
