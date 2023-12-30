import { Languages } from "lucide-react";
import { Button } from "./ui/button";
import { useUserLanguage } from "@/hooks/use-userlang";
import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { setLanguage } from "@/store/userSlice";

export const LanguageSwitcher = () => {
  const dispatch = useDispatch(); // Get the dispatch function
  const { language: currentLangCode } = useUserLanguage();
  const [selectedLangCode, setSelectedLangCode] = useState(currentLangCode);

  useEffect(() => {
    // Update the language state when the component mounts
    setSelectedLangCode(currentLangCode);
  }, [currentLangCode]);

  const handleLanguageChange = (newLangCode: 'ar' | 'he') => {
    setSelectedLangCode(newLangCode);
    dispatch(setLanguage(newLangCode)); // Dispatch the setLanguage action with the new language code
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' size='icon'>
          <Languages className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all"/>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => handleLanguageChange('he')} className={selectedLangCode === 'he' ? 'bg-blue-500 text-white' : ''}>
            עברית
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleLanguageChange('ar')} className={selectedLangCode === 'ar' ? 'bg-blue-500 text-white' : ''}>
            العربية
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
