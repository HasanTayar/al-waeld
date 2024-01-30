import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUserLanguage } from "@/hooks/use-userlang";
import { setLanguage } from "@/store/userSlice";

const LangTabs = () => {
  const dispatch = useDispatch();
  const { language } = useUserLanguage();
  const [_, setSelectedLangCode] = useState(language);

  const handleLanguageChange = (newLangCode: "ar" | "he") => () => {
    setSelectedLangCode(newLangCode);
    dispatch(setLanguage(newLangCode));
  };

  const defaultValue = language === "ar" ? "ar" : "he";

  return (
    <div className="flex flex-col items-center">
      <Tabs defaultValue={defaultValue} className="w-[400px]">
        <TabsList>
          <TabsTrigger value="ar" onClick={handleLanguageChange("ar")}>
            להצפיה בערבית
          </TabsTrigger>{" "}
          {/* Arabic Tab */}
          <TabsTrigger value="he" onClick={handleLanguageChange("he")}>
            להצפיה בעברית
          </TabsTrigger>{" "}
          {/* Hebrew Tab */}
        </TabsList>
      </Tabs>
    </div>
  );
};

export default LangTabs;
