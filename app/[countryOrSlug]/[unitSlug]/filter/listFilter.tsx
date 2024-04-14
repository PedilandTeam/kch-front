"use client";
import { CityNamespace } from "@/types/city";
import { CategoryNamespace } from "@/types/category";
import CityFilter from "./city.filter";
import CategoryFilter from "./category.filter";
import PageSearch from "./page.search";
import FilterModalMobile from "./filterModal.mobile";
import { Sliders } from "app/client-packages/phosphor-icons/react";
import { FILTER } from "@/app/text/directory";

type ListFilterProps = {
  cities: CityNamespace.GET;
  categories: CategoryNamespace.category[];
};
export default function ListFilter({ cities, categories }: ListFilterProps) {
  return (
    <div className="flex gap-2 py-7 _filter-unit">
      <div className="flex items-center _filter-title">
        <Sliders size={24} weight="light" className="ml-1" />
        <span className="font-semibold">{FILTER._S}</span>
      </div>

      <div className="_search">
        <PageSearch />
      </div>

      <div className="flex gap-2 _filter-body">
        <CategoryFilter id="categoryfilter-modal" categories={categories} />
        <CityFilter id="cityfilter-modal" cities={cities?.items} />
      </div>
      
      <div className="flex items-center _filter-resaults">
        <div>نتایج فیلتر اینجا دیده شود</div>
      </div>
    </div>
  );
}
