"use client";
import { UNITS_LIST_ARRAY } from "@/routes";
import { CategoryNamespace } from "@/types/category";
import { CountryNamespace } from "@/types/country";
import { FolderOpen } from "app/client-packages/phosphor-icons/react";
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
    <div className="_wrap">
      <div className="text-center">
        {units.map((unit) => {
          if (recentlyUpdatedCategories[`${unit.id}`]?.length == 0) {
            return;
          }
          return (
            <a
              onClick={() => activeTabChangeHandler(unit.id)}
              key={`unit-${unit.id}`}
              className={`tab tab-bordered border-b-[3px] px-3 sm:px-6 font-medium h-16 text-[18px] ${
                activeTab == unit.id ? "tab-active border-secondary" : ""
              } `}
            >
              {unit.name} فارسی زبان
            </a>
          );
        })}
      </div>
      <div className="_content flex flex-wrap justify-center gap-3 sm:gap-5 mt-6">
        {recentlyUpdatedCategories[`${activeTab}`]?.map((category, index) => {
          return (
            <Link
              scroll
              className="w-full sm:basis-1/6"
              key={"country-category" + category.id}
              href={`/${currentCountry.code}/${
                unitFinder(category.unitId)?.slug
              }/${category.slug}`}
            >
              <div
                key={`country-category-list-${category.id}${index}`}
                className="flex items-center justify-center py-3 pl-0 pr-4 font-medium transition-all border-2 border-gray-200 rounded-md cat-card group hover:border-blue-300 hover:bg-blue-100 hover:bg-opacity-20 hover:border-dashed sm:flex-wrap sm:flex-row sm:pl-4 sm:pb-0"
              >
                <FolderOpen
                  weight="duotone"
                  className="ml-4 text-gray-400 sm:w-10 sm:h-10 w-14 h-14 sm:ml-0 group-hover:text-primary"
                />
                <div className="w-full my-4 sm:text-center group-hover:text-blue-900 flex sm:justify-center items-center h-[48px]">
                  {category.name}
                </div>
                <span className="flex justify-center items-center min-w-[42px] h-[42px] sm:h-[34px] border-2 text-[18px] pt-[4px] sm:pt-0 ml-5 bg-white sm:group-hover:bg-white sm:items-end group-hover:text-blue-900 group-hover:font-bold sm:border-b-white sm:group-hover:border-b-white group-hover:border-blue-300 sm:group-hover:border-l-blue-300 sm:-mb-[2px] rounded-full sm:rounded-br-none sm:rounded-bl-none sm:min-w-[42px] sm:leading-none group-hover:border-dashed">
                  {category.pageCount}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
