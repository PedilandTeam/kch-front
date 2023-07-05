"use client"
import { GENERAL } from "../../../../components/allTexts";
import { FunnelIcon } from "@client-packages/heroicons/components";
import FilterMobile from "./filter.mobile";
import { CityNamespace } from "@/types/city";
import CityFilter from "./city.filter";
import CategoryFilter from "./category.filter";
import { CategoryNamespace } from "@/types/category";

type ListFilterProps = {
  cities: CityNamespace.GET,
  categories: CategoryNamespace.GET[]
}
export default function ListFilter({cities, categories}: ListFilterProps) {


  return (
    <div className="filter-wrap">

      <FilterMobile />

      <div className="filter-title w-full hidden md:flex md:items-center border-b pb-2">
        <FunnelIcon className="h-4 w-4 ml-2" />
        <span className="font-semibold">{GENERAL.FILTERS}</span>
      </div>

      <div className="filter-body pt-3 hidden md:block">


        <CityFilter cities={cities?.items} />
        <CategoryFilter categories={categories} />


      </div>
    </div>
  );
};
