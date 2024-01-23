import Loader from "@/components/common/loader";
import DonateSection from "@/components/home/donate-section";
import { FounderSection } from "@/components/home/founder-section";
import { WelcomeSection } from "@/components/home/welcome-section";
import SEO from "@/components/seo";
import { useUserLanguage } from "@/hooks/use-userlang";

import { useTranslationsForPage } from "@/lib/query/hooks-query";
import React from "react";
const Home = () => {
  const { language } = useUserLanguage();
  const {
    data: homeTranslation,
    isLoading: isLodatinTranslation,
    error: homeErorr,
  } = useTranslationsForPage("home_page");

  if (isLodatinTranslation) {
    return <Loader />;
  }

  if (homeErorr) {
    console.log(homeErorr);
  }
  return (
    <React.Fragment>
      <SEO
        title={language === "ar" ? "الصفحه الرئيسه" : "דף ראשי"}
        description={
          language === "ar"
            ? "هي عائلة للجميع تقع في مزرعة الوليد مخصصة لتعزيز وتنمية الوعي لدى الأطفال والشباب بشكل خاص والمجتمع بشكل عام يقدم في الجمعية خدمات ركوب الخيل العلاجية والعلاجات الطبية البرية، تعتني في الحيوانات الضالة والحفاظ على جودة البيئة"
            : "היא משפחה למען כולם שממוקמת בחוות אל-וליד עמותה לקידום ופיתוח המודעות בקרב ילדים ונוער במיוחד ולחברה בכלל בעמותת נותנת שירותי רכיבה טיפולית וטיפולים פרא רפואיים , דואגת למתן מענה לחיות משוטטים וצער בעלי חיים , ושמירה על איכות הסביבה"
        }
        name={
          language === "ar"
            ? "مركز خدمات الأنسان و الطبيعه"
            : "עמותת שירות אדם חיה וטבע"
        }
        type={language === "ar" ? "עמותה" : "جمعيه"}
      />

      <WelcomeSection
        title={homeTranslation?.welcome_section?.title}
        description={homeTranslation?.welcome_section?.description}
        readAboutUs={homeTranslation?.header?.read_about_us}
      />
      <FounderSection
        title={homeTranslation?.founders_section?.title}
        founders={homeTranslation?.founders_section?.description}
      />
      <DonateSection
        title={homeTranslation?.donation_section?.title}
        description={homeTranslation?.donation_section?.description}
        donate={homeTranslation?.donation_section?.donate}
      />
    </React.Fragment>
  );
};

export default Home;
