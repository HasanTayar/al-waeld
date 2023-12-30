import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setLanguage } from "@/store/userSlice";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { useUserLanguage } from "@/hooks/use-userlang";
import { useTranslationsForPage } from "@/lib/query/hooks-query";
import Loader from "./common/loader";
import { CheckCircle2Icon } from "lucide-react";

const LangModal = () => {
  const dispatch = useDispatch();
  const { language: currentLangCode, isFirstVisit } = useUserLanguage();
  const [selectedLangCode, setSelectedLangCode] = useState(currentLangCode);
  const [isOpen, setIsOpen] = useState(isFirstVisit);

  const {
    data: translations,
    isLoading: isLoadingTranslations,
    error: translationsError,
  } = useTranslationsForPage({
    pageName: "home_page",
    langCode: selectedLangCode,
  });
  const {
    data: globalTranslations,
    isLoading: isLoadingGlobal,
    error: globalErorr,
  } = useTranslationsForPage({
    pageName: "global",
    langCode: selectedLangCode,
  });
  useEffect(() => {
    setSelectedLangCode(currentLangCode);
  }, [currentLangCode]);

  const handleLanguageChange = (newLangCode: string) => {
    setSelectedLangCode(newLangCode);
  };

  const handleSubmit = () => {
    if (selectedLangCode) {
      dispatch(setLanguage(selectedLangCode));
    }
    setIsOpen(false);
  };

  if (translationsError || globalErorr) {
    console.log(translationsError);
  }
  useEffect(() => {
    document.title = globalTranslations?.title || "אלוליד";
    document.dir = "rtl";
  }, [globalTranslations, selectedLangCode]);

  return (
    <>
      {isLoadingTranslations || isLoadingGlobal ? (
        <Loader />
      ) : (
        <div dir="rtl" className="max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl">
          <Dialog open={isOpen}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>
                  {translations?.sections?.welcome_section?.title ||
                    "Default Title"}
                </DialogTitle>
                <DialogDescription>
                  {translations?.sections?.header?.dialog_description ||
                    "Default Description"}
                </DialogDescription>
              </DialogHeader>
              <div className="flex items-center justify-center">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => handleLanguageChange("ar")}
                  className="w-full sm:w-auto"
                >
                  العربية
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => handleLanguageChange("he")}
                  className="w-full sm:w-auto"
                >
                  עברית
                </Button>
              </div>
              <DialogFooter className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-x-2 sm:space-y-0">
                <Button
                  type="button"
                  disabled={isLoadingTranslations}
                  onClick={handleSubmit}
                  className="w-full sm:w-auto"
                >
                  {translations?.sections?.header?.dialog_submit || "Submit"}{" "}
                  <CheckCircle2Icon size={30} className="pl-2" />
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </>
  );
};

export default LangModal;
