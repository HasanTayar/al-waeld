import hebrewLogo from "/assets/hebrew-logo.png";
import arabicLogo from "/assets/arabic-logo.png";
import { useUserLanguage } from "@/hooks/use-userlang";
import { LanguageSwitcher } from "../langauge-switcher";

const Header = () => {
  const { language } = useUserLanguage();
  const logo = language === "he" ? hebrewLogo : arabicLogo;

  return (
    <header className="flex justify-between items-center sticky top-0 bg-slate-300 p-4 shadow-md">
      <div className="w-full  h-[50px] md:h-[100px]  flex items-center  justify-center">
        <img src={logo} alt="logo" className="max-h-full max-w-full" />
      </div>
      <LanguageSwitcher />
    </header>
  );
};

export default Header;
