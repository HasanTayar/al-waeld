import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import Loader from "@/components/common/loader";
import SEO from "@/components/seo";
import { useUserLanguage } from "@/hooks/use-userlang";
import { useTranslationsForPage } from "@/lib/query/hooks-query";

const OurTreatments = () => {
  const { language } = useUserLanguage();
  const { data, error: aboutError } = useTranslationsForPage("treatments");

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
        title={language === "ar" ? "علاجاتنا " : "טיפולים שלנו"}
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
      <div className="bg-gradient-to-b from-slate-300 to-gray-200 p-4">
        <div className="flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 mx-auto">
            {data.treatments.map((course: any, index: number) => (
              <Card
                key={index}
                className="flex flex-col items-center justify-between shadow-lg rounded-lg text-right"
              >
                <div className="relative w-full">
                  <img
                    src={course.imageUrl || "https://via.placeholder.com/150"}
                    alt={`Imageof ${course.title}`}
                    onLoad={(e) => (e.currentTarget.style.opacity = "1")}
                  />
                </div>
                <CardContent className="p-4">
                  <CardHeader>
                    <CardTitle>{course.title}</CardTitle>
                  </CardHeader>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
export default OurTreatments;
