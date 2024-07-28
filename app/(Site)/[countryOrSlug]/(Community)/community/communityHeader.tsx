"use client";
import { useEffect, useState } from "react";
import { Bell, FadersHorizontal, SortAscending } from "@phosphor-icons/react";
import { usePathname } from "next/navigation";
import AddQModal from "./addQModal";

export default function CommunityHeader({
  params,
}: {
  params: { countryOrSlug: string };
}) {
  const countryOrSlug: string = params.countryOrSlug;

  const [filterDropdown, setFilterDropdown] = useState("ترتیب");
  const [colseFilterDropdown, setColseFilterDropdown] = useState(false);
  const [colseSortDropdown, setColseSortDropdown] = useState(false);

  const [topFix, setTopFix] = useState(18);
  const [fix, setfix] = useState(false);
  const [fixM, setfixM] = useState(false);
  const pathName = usePathname();

  // console.log(lastScrollY);
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
            <input
              type="text"
              placeholder="دنبال چی می گردی؟"
              className="input w-full bg-gray-50 rounded-[1rem]"
            />
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
            {/* filter  */}
            <div className="flex items-center ">
              {pathName === `/${countryOrSlug}/community` && (
                <div className="dropdown dropdown-bottom dropdown-end">
                  <div
                    tabIndex={0}
                    role="button"
                    onClick={() => {
                      setColseFilterDropdown(!colseFilterDropdown);
                      setColseSortDropdown(false);
                    }}
                    className="btn btn-ghost  btn-sm dropdown-hover m- bg-transparent bg-contain border-none font-medium xl:text-base"
                  >
                    <FadersHorizontal size={21} color="#676567" />
                    فیلتر
                  </div>
                  {colseFilterDropdown && (
                    <ul
                      onClick={() =>
                        setColseFilterDropdown(!colseFilterDropdown)
                      }
                      tabIndex={0}
                      className="menu dropdown-content bg-base-100 rounded-box z-[1] w-48 p-2 shadow"
                    >
                      <li>
                        <a>Item 1</a>
                      </li>
                      <li>
                        <a>Item 2</a>
                      </li>
                    </ul>
                  )}
                </div>
              )}

              {/* sort */}
              <div className="dropdown dropdown-bottom dropdown-end">
                <div
                  onClick={() => {
                    setColseSortDropdown(!colseSortDropdown);
                    setColseFilterDropdown(false);
                  }}
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost xl:text-base btn-sm dropdown-hover m- bg-transparent bg-contain border-none  font-medium font-sm"
                >
                  <SortAscending size={21} color="#676567" />
                  {filterDropdown}
                </div>
                {colseSortDropdown && (
                  <ul
                    onClick={() => setColseSortDropdown(!colseSortDropdown)}
                    tabIndex={0}
                    className=" menu dropdown-content bg-base-100 rounded-box  w-48 p-2 shadow"
                  >
                    <li>
                      <a>Item 1</a>
                    </li>
                    <li>
                      <a>Item 2</a>
                    </li>
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
