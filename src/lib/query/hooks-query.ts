import { useQuery } from '@tanstack/react-query';
import { TranslationForPageProps, QUERY_KEYS,  } from '@/constants';
import { getTranslationsForPage } from '@/lib/services/supbase'; 
import { fetchContactList } from '@/lib/services/supbase';

export const useTranslationsForPage = ({ pageName, langCode }: TranslationForPageProps) => {
  return useQuery({
    queryKey: [pageName, langCode],
    queryFn: () => getTranslationsForPage({ pageName, langCode })
  });
};


export const useGetContactList = () =>{
  return useQuery({
    queryKey:[QUERY_KEYS.contact],
    queryFn:()=> fetchContactList()
  })
}