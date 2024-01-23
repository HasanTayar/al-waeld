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
  const [selectedLangCode, setSelectedLangCode] = useState(currentLangCode);
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
      document.title = globalTranslations.title as unknown as string;
      document.dir = selectedLangCode === "ar" ? "rtl" : "ltr";
    }
  }, [globalTranslations?.title, selectedLangCode]);

  const handleLanguageChange = (newLangCode: "ar" | "he") => {
    setSelectedLangCode(newLangCode);
    dispatch(setLanguage(newLangCode));
    document.dir = "rtl";
  };

  const handleSubmit = () => {
    setIsOpen(false);
  };

  if (translationsError || globalError) {
    console.error(
      "Error loading translations",
      translationsError || globalError
    );
    return <div>Error loading translations</div>;
  }

  if (isLoadingTranslations || isLoadingGlobal) {
    return <Loader />;
  }

  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{translations?.welcome_section?.title}</DialogTitle>
          <DialogDescription>
            {translations?.header?.dialog_description}
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center justify-center">
          <Button
            type="button"
            variant="ghost"
            onClick={() => handleLanguageChange("ar")}
            className={`w-full sm:w-auto ${
              selectedLangCode === "ar" ? "bg-blue-500 text-white" : ""
            }`}
          >
            العربية
          </Button>
          <Button
            type="button"
            variant="ghost"
            onClick={() => handleLanguageChange("he")}
            className={`w-full sm:w-auto ${
              selectedLangCode === "he" ? "bg-blue-500 text-white" : ""
            }`}
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
            {translations?.header?.dialog_submit}{" "}
            <CheckCircle2Icon size={30} className="pl-2" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LangModal;
