import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import { HomeIcon, Menu } from "lucide-react";
import { useTranslationsForPage } from "@/lib/query/hooks-query";
import { useUserLanguage } from "@/hooks/use-userlang";

const Sidebar = () => {
  const { language: currentLangCode } = useUserLanguage();
  const {
    data: globalTranslations,
    isLoading: isLoadingGlobal,
    error: globalErorr,
  } = useTranslationsForPage({
    pageName: "global",
    langCode: currentLangCode,
  });
//   if(isLoadingGlobal){
//     return <Loader/>
//   }
  if(globalErorr && !isLoadingGlobal){
    console.log(globalErorr)
  }
  return (
    <Sheet>
      <SheetTrigger>
        <Button variant="outline" size="icon">
          <Menu className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
        </Button>
      </SheetTrigger>

      <SheetContent>
      <SheetHeader>
        <SheetTitle>{globalTranslations?.title}</SheetTitle>
        <SheetDescription>{globalTranslations?.description}</SheetDescription>
      </SheetHeader>
      <div className="grid gap-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <HomeIcon/>
      </div>
      </div>
      </SheetContent>
    </Sheet>
  );
};

export default Sidebar;
