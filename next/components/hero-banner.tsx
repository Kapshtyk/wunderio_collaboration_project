import Image from "next/image";
import React from "react";

import Icon from "@/styles/icons/arrow-down.svg";
import User1 from "@/styles/icons/user_1.svg";
import User2 from "@/styles/icons/user_2.svg";

import { Button } from "@/ui/button";

const HeroBanner = () => {
  return (
    <div className="h-auto xl:h-[640px] py-12 md:py-[96px] lg:py-[120px] flex flex-col lg:flex-row gap-4 lg:gap-8">
      <div className="w-full lg:w-1/2 h-full lg:py-8 flex flex-col lg:gap-4">
        <h2>Shaping the Digital Experience</h2>
        <p>
          Our mission is to bring people together and shape the way digital
          services are used in everyday life. We help our clients to improve
          their digital business, competitiveness and customer experience.
        </p>
        <div className="flex gap-8 mt-2 md:mt-0">
          <Button>View Our Work</Button>
          <Button variant="tertiary">
            Get to know us
            <Icon className="w-4 h-4 -rotate-90" />
          </Button>
        </div>
      </div>
      <div
        aria-details="collage of the images within the hero banner"
        className="relative w-full lg:w-1/2 h-full flex justify-center"
      >
        <div className="absolute w-[226px] h-[226px] 2sm:w-[400px] 2sm:h-[400px]">
          <div className="h-10 w-40 2sm:w-72 2sm:h-20 p-2 2sm:p-3 flex items-center gap-3 absolute z-30 bg-white rounded-lg -left-8 top-8 2sm:top-6 2sm:-left-16">
            <User1 className="w-7 h-7 2sm:w-12 2sm:h-12" />
            <div className="flex flex-col gap-3">
              <div className="h-2 w-10 2sm:h-4 2sm:w-16 bg-finnishwinter rounded-2xl"></div>
              <div className="h-[5px] w-28 2sm:h-2 2sm:w-48 bg-finnishwinter rounded-xl"></div>
            </div>
          </div>
          <div className="h-10 w-40 2sm:w-72 2sm:h-20 p-2 2sm:p-3 flex items-center gap-3 absolute z-30 bg-white rounded-lg -right-8 bottom-2 2sm:bottom-6 2sm:-right-16">
            <User2 className="w-7 h-7 2sm:w-12 2sm:h-12" />
            <div className="flex flex-col gap-3">
              <div className="h-2 w-10 2sm:h-4 2sm:w-16 bg-finnishwinter rounded-2xl"></div>
              <div className="h-[5px] w-28 2sm:h-2 2sm:w-48 bg-finnishwinter rounded-xl"></div>
            </div>
          </div>
        </div>
        <div className="relative w-[226px] h-[226px] 2sm:w-[400px] 2sm:h-[400px] rounded-full bg-primary-50 flex justify-center overflow-hidden">
          <Image
            className="z-10 object-contain relative translate-y-[64px] scale-[105%] 2sm:translate-y-[90px] "
            src={"/d55a3810d2379fa7c06c469c92a086d6.png"}
            fill={true}
            sizes="(max-width: 570px) 50vw, (max-width: 1200px) 100vw, 30vw"
            alt="Website example"
          />
          <Image
            className="z-20 relative px-[43px] translate-y-[33px] 2sm:px-[82px] 2sm:translate-y-[25px] object-contain"
            src={"/iPhone_X.png"}
            fill={true}
            sizes="(max-width: 570px) 50vw, (max-width: 1200px) 100vw, 30vw"
            alt="iPhone photo frame"
          ></Image>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
