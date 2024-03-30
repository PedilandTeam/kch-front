"use client";
import { _TXT } from "@app/text/index";
import FilterMobile from "./filterModal.mobile";
import { CityNamespace } from "@/types/city";
import CityFilter from "../../filter/city.filter";
import PageSearch from "../../filter/page.search";
import SideBanner from "@/app/banners/side-banner";
import { Sliders } from  "app/client-packages/phosphor-icons/react";

type ListFilterProps = {
  cities: CityNamespace.GET;
  // categories: CategoryNamespace.category[]
};
export default function CategoryListFilter({ cities }: ListFilterProps) {
  return (
    <div className="z-20 flex gap-4 py-7 sm:sticky sm:top-4 _filter-unit">
      <div className="flex items-center _filter-title">
        <Sliders size={24} weight="light" className="ml-1" />
        <span className="font-semibold">{_TXT.FILTER._S}</span>
      </div>

      <div className="_search">
        <PageSearch />
      </div>

      <div className="_filter-body">
        <CityFilter id="category-cities-filter" cities={cities?.items} />
      </div>
    </div>
  );
}
