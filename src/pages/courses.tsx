import {
  Card,
  CardContent,

  CardHeader,
  CardTitle,
} from "../components/ui/card";
import Loader from "@/components/common/loader";
import { useTranslationsForPage } from "@/lib/query/hooks-query";

const CoursesPage = () => {

  const { data, error: aboutError } = useTranslationsForPage("courses");

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
    <div className="bg-gradient-to-b from-slate-300 to-gray-200 p-4">
      <div className="flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 mx-auto">
          {data.courses.map((course: any, index: number) => (
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
              <CardContent
                className="p-4"
              
              >
                <CardHeader>
                  <CardTitle>{course.title}</CardTitle>
                </CardHeader>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
export default CoursesPage;
