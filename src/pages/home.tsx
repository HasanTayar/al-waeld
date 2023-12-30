import Loader from "@/components/common/loader";
import { FounderSection } from "@/components/home/founder-section";
import { WelcomeSection } from "@/components/home/welcome-section";

import { useTranslationsForPage } from "@/lib/query/hooks-query";
import React from "react";
const Home = () => {
  const {
    data: homeTranslation,
    isLoading: isLodatinTranslation,
    error: homeErorr,
  } = useTranslationsForPage(
    "home_page",
  );

  if (isLodatinTranslation) {
    return <Loader />;
  }

  if (homeErorr) {
    console.log(homeErorr);
  }

  return (
    <React.Fragment>
      <WelcomeSection
        title={homeTranslation?.sections?.welcome_section?.title}
        description={homeTranslation?.sections?.welcome_section?.description}
        readAboutUs={homeTranslation?.sections?.header?.read_about_us}
      />
      <FounderSection title={homeTranslation?.sections?.founders_section?.title} founders={homeTranslation?.sections?.founders_section?.description}/>
    </React.Fragment>
  );
};

export default Home;
