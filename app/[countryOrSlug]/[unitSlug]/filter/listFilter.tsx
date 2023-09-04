"use client";
import { _TXT } from "@/app/text";
import { FunnelIcon } from "@client-packages/heroicons/components";
import FilterMobile from "./filter.mobile";
import { CityNamespace } from "@/types/city";
import { CategoryNamespace } from "@/types/category";
import CityFilter from "./city.filter";
import CategoryFilter from "./category.filter";

type ListFilterProps = {
  cities: CityNamespace.GET;
  categories: CategoryNamespace.category[];
};
export default function ListFilter({ cities, categories }: ListFilterProps) {
  return (
    <div className="filter-unit sticky top-5 z-20">
      <div className="filter-title w-full hidden md:flex md:items-center border-b-[2px] border-b-gray-200 pb-2 mb-4">
        <FunnelIcon className="h-4 w-4 ml-2" />
        <span className="font-semibold">{_TXT.FILTER._S}</span>
      </div>

      <div className="filter-body hidden md:block">
        <input
          type="text"
          placeholder="جستجو"
          className="input input-bordered w-full mb-3"
        />
        <CityFilter id="cityfilter-modal" cities={cities?.items} />
        <CategoryFilter id="categoryfilter-modal" categories={categories} />
      </div>

      <FilterMobile cities={cities.items} categories={categories} />
    </div>
  );
}
