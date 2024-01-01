import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import welcomeImage from "/assets/welcomeImage.jpg";
import { VideoSection } from "./video-section";
import { WelcomeSectionProps } from "@/constants";
import { Button } from "../ui/button";
import { MoveLeft } from "lucide-react";

export const WelcomeSection = ({
  title,
  description,
  readAboutUs,
}: WelcomeSectionProps) => {
  // Ensure you define --header-height in your global CSS
  const headerHeight = "var(--header-height, 64px)";

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
    <div className="relative overflow-hidden" ref={ref}>
      {/* Background Image */}
      <img
        src={welcomeImage}
        alt="Family in a field"
        className="w-full object-cover blur-sm"
        style={{
          minHeight: `calc(100vh - ${headerHeight})`, // This will ensure the image covers the viewport minus the header height.
          maxHeight: '100vh', // Ensures that the image is not taller than the viewport.
        }}
      />

      {/* Overlay Container with Fade In/Out */}
      <motion.div
        initial="hidden"
        animate={controls}
        variants={fadeInOut}
        className="absolute inset-0 flex flex-col justify-center items-center p-4"
        style={{
          minHeight: `calc(100vh - ${headerHeight})`, // Same here for the content.
        }}
      >
        {/* Video */}
        <VideoSection />

        {/* Text Content */}
        <div className="bg-black bg-opacity-50 text-white mt-4 p-4 text-center">
          <motion.h1
            variants={fadeInOut}
            className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2"
          >
            {title}
          </motion.h1>
          <motion.p
            variants={fadeInOut}
            className="text-base sm:text-lg md:text-xl text-right"
          >
            {description}
          </motion.p>
        </div>

        {/* Button */}
        <motion.div variants={fadeInOut} className="mt-4">
          <Button
            className="bg-slate-300 text-black rounded-lg font-bold py-2 px-4 flex items-center space-x-2 shadow-md hover:bg-slate-400 transition-colors duration-300"
          >
            <a href="/about-us">

            <span>{readAboutUs}</span>
            </a>
            <MoveLeft />
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};
