import hebrewLogo from "/assets/hebrew-logo.png";
import arabicLogo from "/assets/arabic-logo.png";
import { useUserLanguage } from "@/hooks/use-userlang";
import { LanguageSwitcher } from "../langauge-switcher";
import Sidebar from "../sidebar";

const Header = () => {
  const { language } = useUserLanguage();
  const logo = language === "he" ? hebrewLogo : arabicLogo;

  return (
    <header className="flex justify-between items-center sticky top-0 bg-slate-300 p-4 shadow-md z-10">
      <div className="flex items-center">
        <Sidebar />
      </div>
      <div className="flex-grow flex justify-center items-center h-16 md:h-20">
        <img src={logo} alt="logo" className="max-h-full" />
      </div>
      <div className="flex items-center">
        <LanguageSwitcher />
      </div>
    </header>
  );
};

export default Header;
