import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { FoundersSectionProps } from "@/constants";
import { useUserLanguage } from "@/hooks/use-userlang";
import Loader from "../common/loader";


export const FounderSection = ({ title, founders }: FoundersSectionProps) => {
  const { language } = useUserLanguage();
  const [code, setCode] = useState('');

  useEffect(() => {
    setCode(language === 'ar' ? 'ar' : 'he');
  }, [language]);

  // Set a consistent height for the card content and images
  const cardContentHeight = '150px'; // Adjust as needed
  const imageHeight = '200px'; // Adjust as needed

  return (
    <div className="bg-gradient-to-b from-slate-300 to-gray-200 p-4">
      <h2 className="text-2xl md:text-4xl lg:text-5xl my-6 text-center font-bold">
        {title}
      </h2>
      {/* Swiper for small screens */}
      <Swiper
        modules={[Pagination]}
        spaceBetween={50}
        slidesPerView={1.2}
        centeredSlides={true}
        pagination={{ clickable: true }}
        loop={true}

      >
        <div className="md:max-h-[500px] ">

        {founders.map((founder, index) => (
          <SwiperSlide key={index}>
            <Card className="flex flex-col items-center justify-center shadow-lg rounded-lg text-right">

              <div className="relative w-full" style={{ height: imageHeight }}>
                <img
                  src={founder.imageUrl || 'https://via.placeholder.com/150'}
                  alt={`Image of ${founder.name}`}
                  className="absolute inset-0 w-full h-full  object-cover rounded-t-lg"
                  onLoad={(e) => e.currentTarget.style.opacity = '1'} // Fade in the image after it's loaded
                />
              </div>
              <CardContent className="p-4" style={{ minHeight: cardContentHeight }}>
                <CardHeader>
                  <CardTitle>{founder.name}</CardTitle>
                </CardHeader>
                <CardDescription>
                  {founder.duties.map((duty, dutyIndex) => (
                    <p key={dutyIndex}>{duty[code]}</p>
                  ))}
                </CardDescription>
              </CardContent>
            </Card>
          </SwiperSlide>
        ))}
        </div>
      </Swiper>
        </div>
      

  );
};
