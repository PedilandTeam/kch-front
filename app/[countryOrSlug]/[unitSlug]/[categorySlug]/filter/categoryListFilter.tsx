"use client";
import { _TXT } from "@app/text/index";
import { FunnelIcon } from "@client-packages/heroicons/components";
import FilterMobile from "./filter.mobile";
import { CityNamespace } from "@/types/city";
import CityFilter from "../../filter/city.filter";

type ListFilterProps = {
  cities: CityNamespace.GET;
  // categories: CategoryNamespace.category[]
};
export default function CategoryListFilter({ cities }: ListFilterProps) {
  return (
    <>
      {/* <div className="filter-body pt-4 hidden md:block">
          <CategoryFilter categories={categories} />
        </div> */}
      <CityFilter id="category-cities-filter" cities={cities?.items} />

      <FilterMobile cities={cities.items} />
    </>
  );
}
