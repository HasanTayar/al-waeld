import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import Loader from "@/components/common/loader";
import { useTranslationsForPage } from "@/lib/query/hooks-query";

const CoursesPage = () => {
  const cardContentHeight = "150px";
  const imageHeight = "200px";
  const { data, error: aboutError } = useTranslationsForPage("courses");

  const controls = useAnimation();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  const fadeInOut = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

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
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={fadeInOut}
      className="bg-gradient-to-b from-slate-300 to-gray-200 p-4"
    >

      <div className="flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-4 mx-auto">
          {data.courses.map((course:any, index:number) => (
            <Card
              key={index}
              className="flex flex-col items-center justify-between shadow-lg rounded-lg text-right"
            >
              <div className="relative w-full" style={{ height: imageHeight }}>
                <img
                  src={course.imageUrl || "https://via.placeholder.com/150"}
                  alt={`Imageof ${course.title}`}
                  className="absolute inset-0 w-full h-full object-cover rounded-t-lg"
                  onLoad={(e) => (e.currentTarget.style.opacity = "1")} // Fade in the image after it's loaded
                />
              </div>
              <CardContent
                className="p-4"
                style={{ minHeight: cardContentHeight }}
              >
                <CardHeader>
                  <CardTitle>{course.title}</CardTitle>
                </CardHeader>
                <CardDescription>{course.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
export default CoursesPage