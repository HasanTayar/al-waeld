import React from "react";
import { useTranslationsForPage } from "@/lib/query/hooks-query";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import Loader from "@/components/common/loader";
import SEO from "@/components/seo";
import { useUserLanguage } from "@/hooks/use-userlang";

const AboutUs = () => {
  const { data, error: aboutError } = useTranslationsForPage("about_us");
  const { language } = useUserLanguage();
  if (aboutError) {
    console.error(aboutError);
    return (
      <div className="text-center text-red-600">Failed to load content</div>
    );
  }

  if (!data) {
    return <div className="text-center">{<Loader />}</div>;
  }

  return (
    <>
      <SEO
        title={language === "ar" ? " أقرأ عنا" : "אדותנו"}
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
      <div className="flex flex-col items-center justify-center bg-slate-100 min-h-screen text-gray-800">
        <div className="max-w-2xl mx-auto p-5 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {data?.about.title}
          </h1>
          <p className="text-md md:text-lg mb-8">{data?.about.description}</p>
        </div>
        <Swiper
          modules={[Autoplay, Pagination]}
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={3}
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          className="w-full md:max-w-4xl"
          breakpoints={{
            // when window width is >= 320px
            320: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            // when window width is >= 640px
            640: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            // when window width is >= 1024px
            1024: {
              slidesPerView: 3,
              spaceBetween: 40,
            },
          }}
        >
          {data?.about.slides.map(
            (
              imageUrl: string | undefined,
              index: React.Key | null | undefined
            ) => (
              <SwiperSlide key={index}>
                <img
                  src={imageUrl}
                  alt={`Slide ${index}`}
                  className="w-full h-auto object-cover rounded-lg shadow-lg"
                  style={{ height: "250px" }}
                />
              </SwiperSlide>
            )
          )}
        </Swiper>
      </div>
    </>
  );
};

export default AboutUs;
