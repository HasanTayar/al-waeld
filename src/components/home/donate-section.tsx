import  { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Button } from "../ui/button";
import { Landmark } from "lucide-react";
interface test{
  title?:any,
  description?:any,
  donate?:any,
}
const DonateSection = ({ title, description, donate }:test) => {
  const controls = useAnimation();
  const { ref, inView } = useInView({
    triggerOnce: true, // Adjust if you want the animation every time it comes into view
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
      className="bg-gradient-to-b from-gray-200 to-slate-300 p-4"
    >
      <motion.h2 
        variants={fadeInOut}
        className="text-2xl md:text-4xl lg:text-5xl my-6 text-center font-bold"
      >
        {title}
      </motion.h2>

      <motion.p 
        variants={fadeInOut}
        className="sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-right  my-4 lg:my-6 leading-normal lg:leading-loose"
      >
        {description}
      </motion.p>

      <motion.div 
        variants={fadeInOut} 
        className="mt-4 flex justify-center"
      >
        <Button
          className=" text-white rounded-lg font-bold py-2 px-4 flex items-center space-x-2 shadow-md hover:bg-slate-400 transition-colors duration-300"
        >
          <span>{donate}</span>
          <Landmark />
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default DonateSection;
