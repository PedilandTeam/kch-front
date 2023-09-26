"use client";
import { UNITS_LIST_ARRAY } from "@/routes";
import { CategoryNamespace } from "@/types/category";
import { CountryNamespace } from "@/types/country";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type CountryCategoriesItemsProps = {
  recentlyUpdatedCategories: CategoryNamespace.MOST_USED;
  currentCountry: CountryNamespace.GET;
};

export default function CountryCategoriesItems({
  recentlyUpdatedCategories,
  currentCountry,
}: CountryCategoriesItemsProps) {
  const units = UNITS_LIST_ARRAY;

  const [activeTab, setActive] = useState<number>(1);
  const activeTabChangeHandler = (value: number) => {
    setActive(value);
  };

  type emptyUnitsType = {
    unit: string;
    childs: number;
  };
  const unitFinder = (unitId: number) => {
    const unit = UNITS_LIST_ARRAY.find((unit) => unit.id == unitId);
    if (unit?.categories) {
      unit.categories = [];
    }
    return unit;
  };

  return (
    <>
      <div className="text-center">
        {units.map((unit) => {
          if (recentlyUpdatedCategories[`${unit.id}`].length == 0) {
            return;
          }
          return (
            <a
              onClick={() => activeTabChangeHandler(unit.id)}
              key={`unit-${unit.id}`}
              className={`tab tab-bordered border-b-[2px] font-medium h-[60px] text-[18px] ${
                activeTab == unit.id ? "tab-active border-lime-600" : ""
              } `}
            >
              {unit.name} فارسی زبان
            </a>
          );
        })}
      </div>
      <div className="content mt-8 grid sm:grid-cols-6 gap-4 mx-3 sm:mx-0">
        {recentlyUpdatedCategories[`${activeTab}`].map((category, index) => {
          return (
            <Link
              scroll
              key={"country-category" + category.id}
              href={`/${currentCountry.code}/${
                unitFinder(category.unitId)?.slug
              }/${category.slug}`}
            >
              <div
                key={`country-category-list-${category.id}${index}`}
                className="cat-card group border border-gray-200 hover:border-pink-200 text-gray-500 hover:text-gray-600 hover:bg-pink-50 hover:bg-opacity-20 rounded-md
                flex justify-center items-center sm:flex-wrap sm:flex-row font-medium sm:font-normal sm:hover:font-medium transition-all pr-4 pl-0 py-3 sm:pl-4 sm:pb-0"
              >
                <Image
                  src="/images/icon/category.svg"
                  height={40}
                  width={40}
                  alt=""
                  className="ml-4 sm:ml-0"
                />
                <div className="w-full mt-4 mb-5 sm:text-center group-hover:text-pink-900 flex sm:justify-center items-center h-[48px]">
                  {category.name}
                </div>
                <span className="flex justify-center items-center min-w-[42px] h-[42px] sm:h-[34px] border text-[18px] pt-[4px] sm:pt-0 ml-5 bg-gray-100 group-hover:bg-pink-50 sm:bg-white sm:group-hover:bg-white sm:items-end group-hover:text-blue-900 group-hover:font-bold sm:border-b-white sm:group-hover:border-b-white group-hover:border-pink-200 sm:group-hover:border-l-pink-200 sm:-mb-[1px] rounded-full sm:rounded-br-none sm:rounded-bl-none sm:min-w-[42px] sm:leading-none">
                  {category.pageCount}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}
