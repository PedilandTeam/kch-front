"use client";
import { useEffect, useState } from "react";
import { Bell, FadersHorizontal, SortAscending } from "@phosphor-icons/react";
import AddQModal from "./addQModal";
import HeaderFilter from "./component/headerFilter";
import SearchInputHeader from "./component/SearchInputHeader";
import { CountryNamespace } from "@/types/country";
// import { CommunityBreadcrumb } from "../../[unitSlug]/breadcrumb";
import { useQuestions } from "./apiForum/useGetQuestions";
import { CommunityBreadcrumb } from "./component/breadcrumb";

export default function CommunityHeader({
  country,
  countryOrSlug,
}: {
  countryOrSlug: string;
  country: CountryNamespace.GET;
}) {
  console.log("countryOrSlug", country);

  const { question } = useQuestions(countryOrSlug, 1);

  const [topFix, setTopFix] = useState(18);
  const [fix, setfix] = useState(false);
  const [fixM, setfixM] = useState(false);

  const handleScroll = () => {
    let currentScrollY = window.scrollY;
    if (currentScrollY > 165) {
      setfix(true);
    }
    if (currentScrollY <= 165) {
      setfix(false);
    }
    if (currentScrollY > 70) {
      setfixM(true);
    }
    if (currentScrollY <= 70) {
      setfixM(false);
    }
    if (currentScrollY <= 1) {
      setTopFix(18);
    } else {
      setTopFix(0);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [fix, fixM]);

  return (
    <>
      {/* 1 */}

      <div className="_wrapper flex flex-wrap items-center justify-between w-full xl:max-w-[72rem] sm:flex-nowrap py-2 bg-white sm:px-4 xl:px-0 mt-[.1rem]">
        <div className="flex items-center gap-3 px-4 mb- sm:mb-0 sm:px-0">
          <h1 className="text-xl font-bold sm:text-2xl text-secondary ">
            لیست سوالات مهاجرت در {country?.name}
          </h1>
          <span className="hidden font-medium text-gray-500 sm:inline">
            ({question?.meta.totalItems} آیتم)
          </span>
        </div>
        <CommunityBreadcrumb
          country={{ name: country.name, code: country.code }}
        />
      </div>

      {/*2: searchInput */}
      <div className="w-full xl:max-w-[72rem] h-auto rounded-2xl shadow-md">



        <div className="bg-white xl:rounded-t-2xl px-4">
          <div className="flex flex-col gap-2 max-w-screen-xl mx-auto ">
            <SearchInputHeader countryOrSlug={countryOrSlug} />

            {/* <button className="btn xl:mb-4 bg-transparent btn-ghost btn-square rounded-[1rem]">
              <Bell size={33} color="#676567" className="xl:hidden" />
              <Bell size={65} color="#676567" className="hidden xl:block" />
            </button> */}
          </div>
        </div>

        {/*  part3*/}
        <div
          className={`${
            fix === true ? "xl:fixed xl:top-[-5rem] xl:mt-20" : "block"
          } ${
            fixM === true ? "xl:static fixed top-${topFix} " : "block"
          }fixed top-${topFix} transition-transform duration-300 bg-white 
         pr-4 pl-2 py-2 header w-full xl:py-4 xl:max-w-[72rem]  z-10 xl:rounded-b-2xl`}
        >
          <div className={`flex flex-col gap-2 max-w-screen- mx-auto  `}>
            <div className="flex justify-between">
              {/* modal  */}
              <AddQModal />
              {/* filter && sort */}
              <HeaderFilter countryOrSlug={countryOrSlug} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
