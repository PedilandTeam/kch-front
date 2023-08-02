"use client";
import { GENERAL } from "../../../../../../components/allTexts";
import { FunnelIcon } from "@client-packages/heroicons/components";
import FilterMobile from "./filter.mobile";
import { CityNamespace } from "@/types/city";
import CityFilter from "../../../filter/city.filter";
import { CategoryNamespace } from "@/types/category";

type ListFilterProps = {
  cities: CityNamespace.GET,
  // categories: CategoryNamespace.category[]
}
export default function CategoryListFilter({cities}: ListFilterProps) {
  return (
    <div className="filter-wrap">
      <FilterMobile cities={cities.items} />

      <div className="filter-title w-full hidden md:flex md:items-center border-b-[2px] border-b-gray-200 pb-2">
        <FunnelIcon className="h-4 w-4 ml-2" />
        <span className="font-semibold">{GENERAL.FILTERS}</span>
      </div>

      <div className="filter-body pt-4 hidden md:block">
        <CityFilter id="category-cities-filter" cities={cities?.items} />
        {/* <CategoryFilter categories={categories} /> */}
      </div>
    </div>
  );
}
