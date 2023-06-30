"use client";

import { ButtonGroup } from "@chakra-ui/react";
import Button from "@client-packages/chakra-ui/button";
import {
  CursorArrowRaysIcon,
  CursorArrowRippleIcon,
  HandThumbUpIcon,
  LightBulbIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";

export const SliderHome = () => {
  return (
    <div className="slider h-[600px] flex justify-center content-center mx-auto max-w-[95%] relative">
      <Image
        className="rounded-xl brightness-[.60] "
        src={"/img/slide/home-slider-01-min.jpg"}
        width={1700}
        height={600}
        alt=""
      />
      {/* <Typewriter
              options={{
                strings: ["Hello", "World"],
                autoStart: true,
                loop: true,
              }}
            /> */}
      <div className="m-auto max-w-[1144px] absolute sm:bottom-[15%] sm:left-0 sm:right-0 sm:w-full w-3/4">
        <div>
          <h3 className="text-gray-300 bg-pink-700 bg-opacity-60 pt-2 pb-[45px] px-2 inline-flex flex-wrap text-[21px] rounded-md">
            اگر در
            <span className="text-white font-semibold mx-1">آلمان</span> فعالیت
            می‌کنید و خدمات خود را به
            <span className="text-white font-semibold mx-1">زبـان فـارسـی</span>
            هم ارائه می‌دهید؛
          </h3>
          <h2 className="text-white font-bold text-[40px] -mt-[36px] drop-shadow">
            به راحتی <span className="">پـروفایل حـرفـه‌ای</span> خـودتون رو
            بـسـازیـد!
          </h2>
          <Button
            colorScheme="green"
            rightIcon={<CursorArrowRippleIcon className="w-7 h-7" />}
            mt={4}
            mb={6}
            size="lg"
          >
            از اینجا شروع کنید
          </Button>
          <h3 className="text-gray-100 font-light text-[17px] tracking-wide">
            و یا دسته‌بندی‌های پربازدید رو مرور کنید:
          </h3>
          <ButtonGroup
            variant="solid"
            spacing="2"
            size="xs"
            colorScheme={"gray"}
            mt={4}
          >
            <Button>وکیل فارسی زبان</Button>
            <Button>سالن زیبایی</Button>
            <Button>مترجم رسمی</Button>
            <Button>رستوران ایرانی</Button>
          </ButtonGroup>
        </div>
      </div>
    </div>
  );
};
