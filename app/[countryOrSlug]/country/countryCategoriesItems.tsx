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
      {units.map((unit) => {
        if (recentlyUpdatedCategories[`${unit.id}`].length == 0) {
          return;
        }
        return (
          <a
            onClick={() => activeTabChangeHandler(unit.id)}
            key={`unit-${unit.id}`}
            className={`tab tab-bordered border-b-[2px] font-medium h-[50px] text-[16px] ${
              activeTab == unit.id ? "tab-active border-lime-600" : ""
            } `}
          >
            {unit.name} فارسی زبان
          </a>
        );
      })}
      <div className="content mt-6 grid sm:grid-cols-6 gap-4 mx-3 sm:mx-0">
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
                className="cat-card group"
              >
                <Image
                  src="/images/icon/cat-restaurant.svg"
                  width="34"
                  height="34"
                  alt="Restaurant Icon"
                />
                <div className="w-full text-center my-3">{category.name}</div>
                <span className="tracking-[1px] text-sm group-hover:font-semibold">
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
