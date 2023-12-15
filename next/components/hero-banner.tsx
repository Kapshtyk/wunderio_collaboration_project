import Image from "next/image";
import React from "react";

import Icon from "@/styles/icons/arrow-down.svg";
import User1 from "@/styles/icons/user_1.svg";
import User2 from "@/styles/icons/user_2.svg";

import { Button } from "@/ui/button";

const HeroBanner = () => {
  return (
    <div className="h-auto lg:h-[640px] py-[120px] flex flex-col lg:flex-row gap-8">
      <div className="w-full lg:w-1/2 h-full py-8 flex flex-col gap-4">
        <h2 className="text-heading-lg lg:text-heading-xl font-bold text-main">
          Shaping the Digital Experience
        </h2>
        <p className="text-lg text-foreground">
          Our mission is to bring people together and shape the way digital
          services are used in everyday life. We help our clients to improve
          their digital business, competitiveness and customer experience.
        </p>
        <div className="flex gap-8">
          <Button>View Our Work</Button>
          <Button variant="tertiary">
            <span>Get to know us</span>
            <Icon className="w-4 h-4 -rotate-90" />
          </Button>
        </div>
      </div>
      <div
        aria-details="collage of the images within the hero banner"
        className="relative w-full lg:w-1/2 h-full flex justify-center"
      >
        <div className="absolute w-[400px] h-[400px]">
          <div className="w-72 h-20 p-3 flex items-center gap-3 absolute z-30 bg-white rounded-lg top-6 -left-16">
            <User1 className="w-12 h-12" />
            <div className="flex flex-col gap-3">
              <div className="h-4 w-16 bg-finnishwinter rounded-2xl"></div>
              <div className="h-2 w-48 bg-finnishwinter rounded-xl"></div>
            </div>
          </div>
          <div className="w-72 h-20 p-3 flex items-center gap-3 absolute z-30 bg-white rounded-lg bottom-6 -right-16">
            <User2 className="w-12 h-12" />
            <div className="flex flex-col gap-3">
              <div className="h-4 w-16 bg-finnishwinter rounded-2xl"></div>
              <div className="h-2 w-48 bg-finnishwinter rounded-xl"></div>
            </div>
          </div>
        </div>
        <div className="relative w-[400px] h-[400px] rounded-full bg-primary-50 flex justify-center overflow-hidden pt-16">
          <Image
            className="absolute z-10 top-[78px]"
            src={"/d55a3810d2379fa7c06c469c92a086d6.png"}
            width={220}
            height={430}
            alt="Website example"
          />
          <Image
            className="z-20 relative"
            src={"/iPhone_X.png"}
            width={250}
            height={500}
            alt="iPhone photo frame"
          ></Image>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
