import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setLanguage } from '@/store/userSlice';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '../ui/button';
import { useUserLanguage } from '@/hooks/use-userlang';
import { useTranslationsForPage } from '@/lib/query/hooks';
import Loader from './loader';

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
    langCode: selectedLangCode, // Use selectedLangCode to load translations
  });

  useEffect(() => {
    // Update the language state when the component mounts
    setSelectedLangCode(currentLangCode);
  }, [currentLangCode]);

  const handleLanguageChange = (newLangCode: string) => {
    setSelectedLangCode(newLangCode); // Temporarily update the language
  };

  const handleSubmit = () => {
    if (selectedLangCode) {
      dispatch(setLanguage(selectedLangCode)); // Permanently update the language
    }
    setIsOpen(false); // Close the modal
  };

  if (translationsError) {
    console.log(translationsError);
    // You might want to handle this error more gracefully in a production environment
  }

  return (
    <div dir="rtl" className="max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl">
      <Dialog open={isOpen}>
        {isLoadingTranslations ? <Loader /> : (
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{translations?.welcome_message}</DialogTitle>
              <DialogDescription>{translations?.dialog_description}</DialogDescription>
            </DialogHeader>
            <DialogFooter className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-x-2 sm:space-y-0">
              <Button type="button" variant='ghost' onClick={() => handleLanguageChange("ar")} className="w-full sm:w-auto">
                العربية
              </Button>
              <Button type="button" variant='ghost' onClick={() => handleLanguageChange("he")} className="w-full sm:w-auto">
                עברית
              </Button>
              <Button type="button" disabled={isLoadingTranslations} onClick={handleSubmit} className="w-full sm:w-auto">
                {translations?.dialog_submit}
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
};

export default LangModal;
