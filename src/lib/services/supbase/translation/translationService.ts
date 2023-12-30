import { decodeHtmlEntities } from '../../html-entity-decoder';
import { TranslationForPageProps, Translations, TranslationValue } from '@/constants';
import { supabase } from '..';

function processTranslationValue(value: TranslationValue, langCode: string): string | Record<string, any> {
  if (typeof value === 'string') {
    return decodeHtmlEntities(value);
  }

  if (Array.isArray(value)) {
    return value.map(item => processItem(item, langCode)); 
  }

  if (typeof value === 'object' && value !== null) {
    if (langCode in value && typeof value[langCode] === 'string') {
      return decodeHtmlEntities(value[langCode]);
    } else {
      const result: Record<string, any> = {};
      Object.keys(value).forEach(key => {
        result[key] = processTranslationValue(value[key], langCode);
      });
      return result;
    }
  }

  return '';
}

function processItem(item: any, langCode: string): string | Record<string, any> {
  if (typeof item === 'string') {
    return decodeHtmlEntities(item);
  } else if (typeof item === 'object' && item !== null) {
    const processedItem: Record<string, any> = {};
    Object.keys(item).forEach(key => {
      processedItem[key] = processTranslationValue(item[key], langCode);
    });
    return processedItem;
  }
  return '';
}

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
    acc[key] = processTranslationValue(translationsData.translations[key], langCode);
    return acc;
  }, {} as Translations);

  return translations;
}
