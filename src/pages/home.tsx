import Loader from '@/components/common/loader'
import {ViedoSection} from '@/components/home/viedo-section'
import { WelcomeSection } from '@/components/home/welcome-section'
import { useUserLanguage } from '@/hooks/use-userlang'
import { useTranslationsForPage } from '@/lib/query/hooks-query'

import React from 'react'


const Home = () => {
  const { language } = useUserLanguage();
  const {
    data: homeTranslation,
    isLoading: isLodatinTranslation,
    error: homeErorr
  } = useTranslationsForPage({
    langCode: language,
    pageName: 'home_page'
  });

  if (isLodatinTranslation) {
    return <Loader />;
  }

  if (homeErorr) {
    console.log(homeErorr);
  }
  return (
    <React.Fragment>
      <WelcomeSection title={homeTranslation?.welcome_section_title} description={homeTranslation?.welcome_section_description} />
      {/* <ViedoSection/> */}
    </React.Fragment>
  );
};

export default Home;

