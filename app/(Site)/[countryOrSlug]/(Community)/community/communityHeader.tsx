"use client";
import { useEffect, useState } from "react";
import { Bell, FadersHorizontal, SortAscending } from "@phosphor-icons/react";
import AddQModal from "./addQModal";
import HeaderFilter from "./component/headerFilter";
import SearchInputHeader from "./component/SearchInputHeader";

export default function CommunityHeader({
  params,
}: {
  params: { countryOrSlug: string };
}) {
  const countryOrSlug: string = params.countryOrSlug;
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
      <div className="bg-white xl:mt-3 xl:border-t xl:border-gray-50 xl:shadow-md pr-4 pl-2 pt-2 header w-full xl:max-w-[72rem] xl:rounded-t-2xl">
        <div className="flex flex-col gap-2 max-w-screen-xl mx-auto">
          <div className="flex items-center gap-1">
            <div className="avatar"></div>
            {/* searchInput */}
            <SearchInputHeader countryOrSlug={countryOrSlug} />

            <button className="btn xl:mb-4 bg-transparent btn-ghost btn-square rounded-[1rem]">
              <Bell size={33} color="#676567" className="xl:hidden" />
              <Bell size={65} color="#676567" className="hidden xl:block" />
            </button>
          </div>
        </div>
      </div>

      {/*  part2*/}
      <div
        className={`${
          fix === true ? "xl:fixed xl:top-[-5rem] xl:mt-20" : "block"
        } ${
          fixM === true ? "xl:static fixed top-${topFix} " : "block"
        }fixed top-${topFix} transition-transform duration-300 shadow-md bg-white 
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
    </>
  );
}
