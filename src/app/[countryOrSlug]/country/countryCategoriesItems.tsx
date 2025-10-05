"use client";
import { UNITS_LIST_ARRAY } from "@/routes";
import { CategoryNamespace } from "@/types/category";
import { Country } from "@/types/country";
import { FolderOpenIcon } from "@phosphor-icons/react";
import Link from "next/link";
import { useState } from "react";

type CountryCategoriesItemsProps = {
  recentlyUpdatedCategories: CategoryNamespace.MOST_USED;
  currentCountry: Country;
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
              className={`tab-bordered tab h-16 border-b-[3px] px-3 text-[18px] font-medium ${
                activeTab == unit.id ? "tab-active border-secondary" : ""
              } `}
            >
              {unit.name} فارسی زبان
            </a>
          );
        })}
      </div>
      <div className="_content mt-6 flex flex-wrap justify-center gap-3">
        {recentlyUpdatedCategories[`${activeTab}`]?.map((category, index) => {
          return (
            <Link
              scroll
              className="w-full"
              key={"country-category" + category.id}
              href={`/${currentCountry.code}/${
                unitFinder(category.unitId)?.slug
              }/${category.slug}`}
            >
              <div
                key={`country-category-list-${category.id}${index}`}
                className="cat-card group hover:bg-opacity-20 flex items-center justify-center rounded-md border-2 border-gray-200 py-3 pr-4 pl-0 font-medium transition-all hover:border-dashed hover:border-blue-300 hover:bg-blue-100"
              >
                <FolderOpenIcon
                  weight="duotone"
                  className="group-hover:text-primary ml-4 h-14 w-14 text-gray-400"
                />
                <div className="my-4 flex h-[48px] w-full items-center group-hover:text-blue-900">
                  {category.name}
                </div>
                <span className="ml-5 flex h-[42px] min-w-[42px] items-center justify-center rounded-full border-2 bg-white pt-[4px] text-[18px] group-hover:border-dashed group-hover:border-blue-300 group-hover:font-bold group-hover:text-blue-900">
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
