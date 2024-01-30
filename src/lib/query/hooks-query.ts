import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants";
import { getTranslationsForPage } from "@/lib/services/supbase";
import { fetchContactList } from "@/lib/services/supbase";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

export const useTranslationsForPage = (pageName?: string) => {
  const language = useSelector((state: RootState) => state.user.language);

  return useQuery({
    queryKey: [QUERY_KEYS.translations, pageName, language],
    queryFn: () => getTranslationsForPage(pageName),
  });
};

export const useGetContactList = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.contact],
    queryFn: () => fetchContactList(),
  });
};
