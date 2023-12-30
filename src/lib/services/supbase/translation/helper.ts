import {store} from '@/store/store'
import { decodeHtmlEntities } from '../../html-entity-decoder';
import { TranslationItem, TranslationValue } from '@/constants';

function processTranslationItem(item: TranslationItem): string {
  const langCode = store.getState().user.language as 'ar' | 'he';
  return decodeHtmlEntities(item[langCode]);
}

export function processTranslationValue(value: TranslationValue): any {
  if (typeof value === 'string') {
    return decodeHtmlEntities(value);
  } else if (Array.isArray(value)) {
    return value.map(item => processTranslationValue(item));
  } else if (value && typeof value === 'object') {
    if ('ar' in value && 'he' in value) {
      return processTranslationItem(value as TranslationItem);
    } else {
      const result: Record<string, any> = {};
      Object.keys(value).forEach(key => {
        result[key] = processTranslationValue((value as any)[key]);
      });
      return result;
    }
  }
  return '';
}
