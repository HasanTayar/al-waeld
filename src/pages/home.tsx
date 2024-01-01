import Loader from "@/components/common/loader";
import DonateSection from "@/components/home/donate-section";
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
        title={homeTranslation?.welcome_section?.title}
        description={homeTranslation?.welcome_section?.description}
        readAboutUs={homeTranslation?.header?.read_about_us}
      />
      <FounderSection title={homeTranslation?.founders_section?.title} founders={homeTranslation?.founders_section?.description}/>
      <DonateSection title={homeTranslation?.donation_section?.title} description={homeTranslation?.donation_section?.description} donate={homeTranslation?.donation_section?.donate}/>
    </React.Fragment>
  );
};

export default Home;
