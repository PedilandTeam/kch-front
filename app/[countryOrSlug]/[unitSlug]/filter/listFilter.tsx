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
    <div className="filter-w">
      <FilterMobile cities={cities.items} categories={categories} />

      <div className="filter-body pt-4 hidden md:block">
        <CityFilter id="cityfilter-modal" cities={cities?.items} />
        <CategoryFilter id="categoryfilter-modal" categories={categories} />
      </div>
    </div>
  );
}
