import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "./ui/sheet";
import { Button } from "./ui/button";
import { BookHeart, HomeIcon, Info, Menu } from "lucide-react";
import { useTranslationsForPage } from "@/lib/query/hooks-query";
import { useLocation, useNavigate } from "react-router-dom";
import { useUserLanguage } from "@/hooks/use-userlang";
import { CourseIcon } from "./icons/course-icon";

const Sidebar = () => {
  const {
    data: globalTranslations,
    isLoading: isLoadingGlobal,
    error: globalError,
  } = useTranslationsForPage("global");

  const location = useLocation();
  const navigate = useNavigate();
  const { language } = useUserLanguage();
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const toggleSheet = () => setIsSheetOpen(!isSheetOpen);

  const handleLinkClick = (path: string) => {
    navigate(path);
    setIsSheetOpen(false);
    window.scrollTo(0, 0);
  };

  if (globalError && !isLoadingGlobal) {
    console.log(globalError);
  }

  const routes = [
    {
      path: `/?langCode=${language}`,
      icon: <HomeIcon />,
      name: language === "ar" ? "الصفحة الرئيسية" : "דף ראשי",
    },
    {
      path: `/about-us?langCode=${language}`,
      icon: <Info />,
      name: language === "ar" ? "أقرأ عنا" : "לקריאה אודתנו",
    },
    {
      path: `/courses?langCode=${language}`,
      icon: <CourseIcon />,
      name: language === "ar" ? "دورات" : "קורסים",
    },
    {
      path: `/our-treatments?langCode=${language}`,
      icon: <BookHeart />,
      name: language === "ar" ? "علاجاتنا" : "הטיפולים שלנו",
    },
  ];

  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetTrigger className="m-4">
        <Button
          variant="outline"
          size="icon"
          className="bg-slate-300 hover:bg-slate-200"
          onClick={toggleSheet}
        >
          <Menu className="h-6 w-6 text-black" />
        </Button>
      </SheetTrigger>

      <SheetContent className="p-4">
        <SheetHeader className="mb-6">
          <SheetTitle className="text-xl font-bold">
            {globalTranslations?.title}
          </SheetTitle>
          <SheetDescription className="text-sm">
            {globalTranslations?.description}
          </SheetDescription>
        </SheetHeader>
        <div className="space-y-4">
          {routes.map((route) => (
            <div
              key={route.name}
              onClick={() => handleLinkClick(route.path)}
              className={`flex items-center gap-4 p-3 rounded-lg cursor-pointer ${
                location.pathname === route.path
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-700 hover:text-white"
              }`}
            >
              <div className="flex-shrink-0">{route.icon}</div>
              <span className="flex-grow">{route.name}</span>
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Sidebar;
