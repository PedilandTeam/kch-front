"use client";
import { CityNamespace } from "@/types/city";
import CityFilter from "../../filter/city.filter";
import PageSearch from "../../filter/page.search";
import { Sliders } from "app/client-packages/phosphor-icons/react";
import { FILTER } from "@/app/text/directory";

type ListFilterProps = {
  cities: CityNamespace.GET;
  // categories: CategoryNamespace.category[]
};
export default function CategoryListFilter({ cities }: ListFilterProps) {
  return (
    <div className="flex gap-2 py-7 _filter-catgory">
      <div className="flex items-center _filter-title">
        <Sliders size={24} weight="light" className="ml-1" />
        <span className="font-semibold">{FILTER._S}</span>
      </div>

      <div className="_search">
        <PageSearch />
      </div>

      <div className="_filter-body">
        <CityFilter id="category-cities-filter" cities={cities?.items} />
      </div>

      <div className="flex items-center _filter-resaults">
        <div>نتایج فیلتر اینجا دیده شود</div>
      </div>
    </div>
  );
}
