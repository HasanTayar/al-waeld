import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setLanguage } from "@/store/userSlice";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { useUserLanguage } from "@/hooks/use-userlang";
import { useTranslationsForPage } from "@/lib/query/hooks-query";
import Loader from "./common/loader";
import { CheckCircle2Icon } from "lucide-react";

const LangModal = () => {
  const dispatch = useDispatch();
  const { language: currentLangCode, isFirstVisit } = useUserLanguage();
  const [selectedLangCode, setSelectedLangCode] = useState<'ar' | 'he'>(currentLangCode);
  const [isOpen, setIsOpen] = useState(isFirstVisit);

  const {
    data: translations,
    isLoading: isLoadingTranslations,
    error: translationsError,
  } = useTranslationsForPage("home_page");

  const {
    data: globalTranslations,
    isLoading: isLoadingGlobal,
    error: globalError,
  } = useTranslationsForPage("global");

  useEffect(() => {
    setSelectedLangCode(currentLangCode);
  }, [currentLangCode]);

  useEffect(() => {
    if (globalTranslations?.title) {
      document.title = globalTranslations.title as unknown as string ;
      document.dir = 'rtl';
    }
  }, [globalTranslations?.title]);

  const handleLanguageChange = (newLangCode: 'ar' | 'he') => {
    setSelectedLangCode(newLangCode);
  };

  const handleSubmit = () => {
    if (selectedLangCode) {
      dispatch(setLanguage(selectedLangCode));
    }
    setIsOpen(false);
  };

  if (translationsError || globalError) {
    console.error("Error loading translations", translationsError || globalError);
    return <div>Error loading translations</div>;
  }

  if (isLoadingTranslations || isLoadingGlobal) {
    return <Loader />;
  }

  return (
        <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{translations?.sections?.welcome_section?.title || "Default Title"}</DialogTitle>
          <DialogDescription>{translations?.sections?.header?.dialog_description || "Default Description"}</DialogDescription>
        </DialogHeader>
        <div className="flex items-center justify-center">
          <Button type="button" variant="ghost" onClick={() => handleLanguageChange("ar")} className="w-full sm:w-auto">
            العربية
          </Button>
          <Button type="button" variant="ghost" onClick={() => handleLanguageChange("he")} className="w-full sm:w-auto">
            עברית
          </Button>
        </div>
        <DialogFooter className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-x-2 sm:space-y-0">
          <Button type="button" disabled={isLoadingTranslations} onClick={handleSubmit} className="w-full sm:w-auto">
            {translations?.sections?.header?.dialog_submit || "Submit"} <CheckCircle2Icon size={30} className="pl-2" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LangModal;
