import { useQuery } from '@tanstack/react-query';
import { TranslationForPageProps, QUERY_KEYS } from '@/constants';
import { getTranslationsForPage } from '@/lib/services/supbase'; 

// Adjust the parameter to include `pageName`
export const useTranslationsForPage = ({ pageName , langCode }: TranslationForPageProps) => {
  return useQuery({
    queryKey: [QUERY_KEYS.translation, pageName, langCode],
    // Update the queryFn to pass all needed parameters
    queryFn: () => getTranslationsForPage({ pageName, langCode }),
  });
};
export const useGetGlobals = ({ pageName , langCode }: TranslationForPageProps) => {
  return useQuery({
    queryKey: [QUERY_KEYS.translation, pageName, langCode],
    queryFn: () => getTranslationsForPage({ pageName, langCode }),
  });
};
