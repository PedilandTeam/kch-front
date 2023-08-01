"use client"

import { COUNTRY } from "@/components/allTexts";
import Image from "next/image";
import Link from "next/link";

export const HomeCountries = () => {
  return (
    <div className="container mx-auto max-w-[1144px] my-12 sm:mt-20 sm:mb-32">
      <div className="mod-home-countries mx-3 sm:mx-0">
        <div className="mod-header pr-3 pl-3 sm:pr-4 sm:pl-0 mb-5 sm:mb-7 border-r-[4px] sm:border-r-[5px] border-pink-600">
          <h2 className="text-[20px] sm:text-[22px] font-semibold">
            محبوب ترین کشورها:
          </h2>
        </div>
        <div className="wrap grid grid-cols-1 sm:grid-cols-3 gap-1">
          <div className="group relative h-min overflow-hidden">
            <Link href={"/at"}>
              <Image
                src="/img/modules/mod-austria-min.jpg"
                width="400"
                height="250"
                alt=""
                className="group-hover:scale-110 transition-all duration-500 cursor-pointer h-[220px] sm:h-auto object-cover"
              />
              <div className="info absolute bottom-0 w-full px-5 py-10 group-hover:py-12 sm:py-5 sm:group-hover:py-8 transition-all duration-500 cursor-pointer rounded-b-md text-[20px] bg-gradient-to-t from-black text-white">
                {COUNTRY.AUSTRIA}
              </div>
            </Link>
          </div>
          <div className="group relative h-min overflow-hidden">
            <Link href={"/fr"}>
              <Image
                src="/img/modules/mod-france-min.jpg"
                width="400"
                height="250"
                alt=""
                className="group-hover:scale-110 transition-all duration-500 cursor-pointer h-[220px] sm:h-auto object-cover"
              />
              <div className="info absolute bottom-0 w-full px-5 py-10 group-hover:py-12 sm:py-5 sm:group-hover:py-8 transition-all duration-500 cursor-pointer rounded-b-md text-[20px] bg-gradient-to-t from-black text-white">
                {COUNTRY.FRANCE}
              </div>
            </Link>
          </div>
          <div className="group relative h-min overflow-hidden">
            <Link href={"/de"}>
              <Image
                src="/img/modules/mod-germany-min.jpg"
                width="400"
                height="250"
                alt=""
                className="group-hover:scale-110 transition-all duration-500 cursor-pointer h-[220px] sm:h-auto object-cover"
              />
              <div className="info absolute bottom-0 w-full px-5 py-10 group-hover:py-12 sm:py-5 sm:group-hover:py-8 transition-all duration-500 cursor-pointer rounded-b-md text-[20px] bg-gradient-to-t from-black text-white">
                {COUNTRY.GERMANY}
              </div>
            </Link>
          </div>
          <div className="group relative h-min overflow-hidden">
            <Link href={"/dk"}>
              <Image
                src="/img/modules/mod-denmark-min.jpg"
                width="400"
                height="250"
                alt=""
                className="group-hover:scale-110 transition-all duration-500 cursor-pointer h-[220px] sm:h-auto object-cover"
              />
              <div className="info absolute bottom-0 w-full px-5 py-10 group-hover:py-12 sm:py-5 sm:group-hover:py-8 transition-all duration-500 cursor-pointer rounded-b-md text-[20px] bg-gradient-to-t from-black text-white">
                {COUNTRY.DENMARK}
              </div>
            </Link>
          </div>
          <div className="group relative h-min overflow-hidden">
            <Link href={"/uk"}>
              <Image
                src="/img/modules/mod-england-min.jpg"
                width="400"
                height="250"
                alt=""
                className="group-hover:scale-110 transition-all duration-500 cursor-pointer h-[220px] sm:h-auto object-cover"
              />
              <div className="info absolute bottom-0 w-full px-5 py-10 group-hover:py-12 sm:py-5 sm:group-hover:py-8 transition-all duration-500 cursor-pointer rounded-b-md text-[20px] bg-gradient-to-t from-black text-white">
                {COUNTRY.ENGLAND}
              </div>
            </Link>
          </div>
          <div className="group relative h-min overflow-hidden">
            <Link href={"/ge"}>
              <Image
                src="/img/modules/mod-georgia-min.jpg"
                width="400"
                height="250"
                alt=""
                className="group-hover:scale-110 transition-all duration-500 cursor-pointer h-[220px] sm:h-auto object-cover"
              />
              <div className="info absolute bottom-0 w-full px-5 py-10 group-hover:py-12 sm:py-5 sm:group-hover:py-8 transition-all duration-500 cursor-pointer rounded-b-md text-[20px] bg-gradient-to-t from-black text-white">
                {COUNTRY.GEORGIA}
              </div>
            </Link>
          </div>
        </div>
        <div className="mt-12 text-center">
          <button
            className="btn btn-wide"
            id="show-countries"
            onClick={() => {
              if (document) {
                (
                  document.getElementById("modal_country") as HTMLFormElement
                ).showModal();
              }
            }}
          >
            مشاهده تمام کشورها
          </button>
        </div>
      </div>
    </div>
  );
};
