import Loader from "@/components/common/loader";
import { WelcomeSection } from "@/components/home/welcome-section";
import { useUserLanguage } from "@/hooks/use-userlang";
import { useTranslationsForPage } from "@/lib/query/hooks-query";
import headLogo from '/assets/headLogo.png'
import React from "react";

const Home = () => {
  const { language } = useUserLanguage();
  const {
    data: homeTranslation,
    isLoading: isLodatinTranslation,
    error: homeErorr,
  } = useTranslationsForPage({
    langCode: language,
    pageName: "home_page",
  });

  if (isLodatinTranslation) {
    return <Loader />;
  }

  if (homeErorr) {
    console.log(homeErorr);
  }
  return (
    <React.Fragment>
      <WelcomeSection
        title={homeTranslation?.welcome_section_title}
        description={homeTranslation?.welcome_section_description}
        readAboutUs={homeTranslation?.read_about_us}
      />
            {/* <div className="my-10 flex justify-center items-center">
        <img src={headLogo} alt="logo" className="w-24 h-24 md:w-32 md:h-32 rounded-full shadow-lg" />
      </div> */}
    </React.Fragment>
  );
};

export default Home;
