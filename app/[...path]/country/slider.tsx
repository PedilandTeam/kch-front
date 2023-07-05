"use client";

import {
  CursorArrowRaysIcon,
  CursorArrowRippleIcon,
  HandThumbUpIcon,
  LightBulbIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";

export const SliderHome = () => {
  return (
    <div className="slider h-[520px] flex justify-center content-center mx-3 sm:mx-auto sm:max-w-[95%] relative">
      <Image
        className="rounded-xl brightness-[.60] object-cover"
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
      <div className="max-w-[1144px] sm:m-auto absolute w-auto bottom-[10%] sm:bottom-[15%] sm:left-0 sm:right-0 sm:w-full">
        <div>
          <h3 className="text-gray-300 bg-pink-700 bg-opacity-60 whitespace-normal p-3 sm:pt-2 sm:pb-[45px] px-3 sm:px-2 inline-flex flex-wrap text-[18px] sm:text-[21px] sm:rounded-md">
            اگر در
            <span className="text-white font-semibold mx-1">آلمان</span> فعالیت
            می‌کنید و خدمات خود را به
            <span className="text-white font-semibold mx-1">زبـان فـارسـی</span>
            هم ارائه می‌دهید؛
          </h3>
          <h2 className="text-white font-bold text-[30px] sm:text-[40px] mt-3 mx-3 sm:mx-0 sm:-mt-[36px] drop-shadow">
            به راحتی <span className="">پـروفایل حـرفـه‌ای</span> خـودتون رو
            بـسـازیـد!
          </h2>
          <button className="btn my-3 sm:my-5 px-3 mx-3 sm:mx-0 bg-lime-300 border-lime-300 text-lime-900 hover:bg-lime-400 hover:border-lime-400 hover:text-lime-950">
            از اینجا شروع کنید
            <CursorArrowRippleIcon className="w-7 h-7" />
          </button>
          <h3 className="text-white mx-3 sm:mx-0 text-[17px] tracking-wide mb-3">
            و یا دسته‌بندی‌های پربازدید رو مرور کنید:
          </h3>
          <div className="flex flex-wrap gap-1 sm:gap-2 mx-3 sm:mx-0">
            <button className="btn btn-sm btn-neutral font-normal text-gray-50 px-2">
              وکیل فارسی زبان
            </button>
            <button className="btn btn-sm btn-neutral font-normal text-gray-50 px-2">
              سالن زیبایی
            </button>
            <button className="btn btn-sm btn-neutral font-normal text-gray-50 px-2">
              مترجم رسمی
            </button>
            <button className="btn btn-sm btn-neutral font-normal text-gray-50 px-2">
              رستوران ایرانی
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
