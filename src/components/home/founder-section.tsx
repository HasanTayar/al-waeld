import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../ui/card";
import { FoundersSectionProps } from "@/constants";

export const FounderSection = ({ title, founders }: FoundersSectionProps) => {
  const cardContentHeight = "100px";
  const imageHeight = "400px";

  // Function to handle MotionValue
  const renderDuty = (duty: any) => {
    if (typeof duty === "string" || typeof duty === "number") {
      return duty;
    }
    // Add more conditions if there are other types that need to be handled
    return null; // or some default value
  };

  return (
    <div className="bg-gradient-to-b from-slate-300 to-gray-200 p-4 ">
      <h1 className="text-2xl md:text-4xl lg:text-5xl my-6 text-center font-bold">
        {title}
      </h1>
      <div className="flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 mx-auto">
          {founders?.map(
            (
              founder: {
                imageUrl: any;
                name:
                  | string
                  | number
                  | boolean
                  | React.ReactElement<
                      any,
                      string | React.JSXElementConstructor<any>
                    >
                  | Iterable<React.ReactNode>
                  | React.ReactPortal
                  | null
                  | undefined;
                duties: any[];
              },
              index: React.Key | null | undefined
            ) => (
              <Card
                key={index}
                className="flex flex-col items-center justify-between shadow-lg rounded-lg text-right"
              >
                <div
                  className="relative w-full"
                  style={{ height: imageHeight }}
                >
                  <img
                    src={founder.imageUrl || "https://via.placeholder.com/150"}
                    alt={`Image of ${founder.name}`}
                    className="absolute inset-0 w-full h-full object-cover rounded-t-lg"
                    onLoad={(e) => (e.currentTarget.style.opacity = "1")}
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
                      (duty: any, dutyIndex: React.Key | null | undefined) => (
                        <p key={dutyIndex}>{renderDuty(duty)}</p>
                      )
                    )}
                  </CardDescription>
                </CardContent>
              </Card>
            )
          )}
        </div>
      </div>
    </div>
  );
};
