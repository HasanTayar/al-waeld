import React, { useEffect } from "react";
import { MotionValue, motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { FoundersSectionProps } from "@/constants";

export const FounderSection = ({ title, founders }: FoundersSectionProps) => {
  const cardContentHeight = "150px";
  const imageHeight = "200px";

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
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      className="bg-gradient-to-b from-slate-300 to-gray-200 p-4 "
    >
      <h1 className="text-2xl md:text-4xl lg:text-5xl my-6 text-center font-bold">
        {title}
      </h1>
      <div className="flex justify-center"> 
  <motion.div
    variants={fadeInOut}
    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 mx-auto"
  >

        {founders &&
          founders.map((founder: { imageUrl: any; name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; duties: (string | number | boolean | React.ReactPortal | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | MotionValue<number> | MotionValue<string> | null | undefined)[]; }, index: React.Key | null | undefined) => (
            <Card key={index} className="flex flex-col items-center justify-between shadow-lg rounded-lg text-right">

              <div className="relative w-full" style={{ height: imageHeight }}>
                <img
                  src={founder.imageUrl || "https://via.placeholder.com/150"}
                  alt={`Image of ${founder.name}`}
                  className="absolute inset-0 w-full h-full object-cover rounded-t-lg"
                  onLoad={(e) => (e.currentTarget.style.opacity = "1")} // Fade in the image after it's loaded
                />
              </div>
              <CardContent
                className="p-4"
                style={{ minHeight: cardContentHeight }}
              >
                <CardHeader>
                  <CardTitle>{founder.name}</CardTitle>
                </CardHeader>
                <CardDescription>
                  {founder.duties.map(
                    (
                      duty:
                        | string
                        | number
                        | boolean
                        | React.ReactElement<
                            any,
                            string | React.JSXElementConstructor<any>
                          >
                        | Iterable<React.ReactNode>
                        | React.ReactPortal
                        | MotionValue<number>
                        | MotionValue<string>
                        | null
                        | undefined,
                      dutyIndex: React.Key | null | undefined
                    ) => (
                      <motion.p variants={fadeInOut} key={dutyIndex}>
                        {duty}
                      </motion.p>
                    )
                  )}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
      </motion.div>
      </div>

    </motion.div>
  );
};
