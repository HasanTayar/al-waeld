import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import { HomeIcon, Info, Menu, ShoppingBag } from "lucide-react";
import { useTranslationsForPage } from "@/lib/query/hooks-query";
import { Link, useLocation } from "react-router-dom"; 
import { useUserLanguage } from "@/hooks/use-userlang";
import { CourseIcon } from "./icons/course-icon";
const Sidebar = () => {
  const {
    data: globalTranslations,
    isLoading: isLoadingGlobal,
    error: globalError,
  } = useTranslationsForPage("global");

  const location = useLocation();

  if(globalError && !isLoadingGlobal){
    console.log(globalError)
  }
  const {language} =useUserLanguage()

  const routes = [
    {
      path: "/",
      icon: <HomeIcon/>,
      name: language === 'ar' ? "الصفحة الرئيسية" : "דף ראשי",
    },
    {
      path: "/about-us",
      icon: <Info />,
      name: language === 'ar' ? "أقرأ عنا" : "לקריאה אודתנו",
    },
      {
        path: "/courses",
        icon: <CourseIcon/>,
        name: language === 'ar' ? "دورات" : "קורסים",
      },
      {
        path: "/mini-shop",
        icon: <ShoppingBag/>,
        name: language === 'ar' ? "متجر" : "חנות",
      },
  ];
  
  return (
    <Sheet>
      <SheetTrigger className="m-4">
        <Button variant="outline" size="icon" className="bg-slate-300 hover:bg-slate-200">
          <Menu className="h-6 w-6 text-black" />
        </Button>
      </SheetTrigger>
  
      <SheetContent className="p-4">
        <SheetHeader className="mb-6">
          <SheetTitle className="text-xl font-bold">{globalTranslations?.title}</SheetTitle>
          <SheetDescription className="text-sm">{globalTranslations?.description}</SheetDescription>
        </SheetHeader>
        <div className="space-y-4">
          {routes.map(route => (
            <Link to={route.path} key={route.name} className={`flex items-center gap-4 p-3 rounded-lg ${location.pathname === route.path ? "bg-blue-500 text-white" : "hover:bg-gray-700 hover:text-white"}`}>
              <div className="flex-shrink-0">{route.icon}</div>
              <span className="flex-grow">{route.name}</span>
            </Link>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
  
};

export default Sidebar;
