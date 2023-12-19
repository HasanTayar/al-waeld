import  { useEffect } from 'react';
import { useGetGlobals, useTranslationsForPage } from "@/lib/query/hooks";
import Loader from "./components/common/loader";
import { useUserLanguage } from "./hooks/use-userlang";

import LangModal from "./components/common/lang-modal";


function App() {
  const { language: langCode } = useUserLanguage();

  const {
    data: translations,
    isLoading: isLoadingTranslations,
    error: translationsError,
  } = useTranslationsForPage({
    pageName: "home_page",
    langCode,
  });
console.log(translations)
  const {
    data: global,
    isLoading: isLoadingGlobals,
    error: globalsError
  } = useGetGlobals({
    pageName:'global',
    langCode,
  });

  useEffect(() => {
    if (global?.title) {
      document.title = global.title;
    }
  }, [global]);

  if (isLoadingTranslations || isLoadingGlobals) {
    return <Loader />;
  }

  if (translationsError || globalsError) {
    return <div>Error: {translationsError?.message || globalsError?.message}</div>;
  }

  return (
    <>
      <div className="App">
        <LangModal
        />
        {translations?.welcome_message}{" "}
      </div>
    </>
  );
}

export default App;
