"use client";
import { _TXT } from "@app/text/index";
import { FunnelIcon } from "@client-packages/heroicons/components";
import FilterMobile from "./filter.mobile";
import { CityNamespace } from "@/types/city";
import CityFilter from "../../filter/city.filter";
import PageSearch from "../../filter/page.search";
import SideBanner from "@/app/banners/side-banner";

type ListFilterProps = {
  cities: CityNamespace.GET;
  // categories: CategoryNamespace.category[]
};
export default function CategoryListFilter({ cities }: ListFilterProps) {
  return (
    <div className="filter-unit sm:sticky sm:top-4 z-20">
      <div className="filter-title w-full hidden md:flex md:items-center border-b-[2px] border-b-gray-200 pb-2 mb-4">
        <FunnelIcon className="h-4 w-4 ml-2" />
        <span className="font-semibold">{_TXT.FILTER._S}</span>
      </div>

      <div className="filter-body hidden md:block">
        <PageSearch />
        <CityFilter id="category-cities-filter" cities={cities?.items} />
      </div>

      <div className="hidden sm:block">
        <SideBanner />
      </div>

      <FilterMobile cities={cities.items} />
    </div>
  );
}
