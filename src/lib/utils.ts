import { TranslationContent } from "@/constants";
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getTranslationString = (item: TranslationContent, langCode: 'ar' | 'he'): string => {
  if (typeof item === 'string') {
    return item;
  } else if (item && typeof item === 'object') {
    return item[langCode] || '';
  }
  return '';
};