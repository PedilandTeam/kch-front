"use client";

import CityFilter from "./city.filter";
import CategoryFilter from "./category.filter";
import { CityNamespace } from "@/types/city";
import { CategoryNamespace } from "@/types/category";
import { FILTER } from "@/app/text/directory";
import { Sliders } from "app/client-packages/phosphor-icons/react";

type FilterMobileProps = {
  cities: CityNamespace.city[];
  categories: CategoryNamespace.category[];
};

export default function FilterModalMobile({
  cities,
  categories,
}: FilterMobileProps) {
  return (
    <>
      <dialog id="modal_unit_filter" className="modal">
        <form
          method="dialog"
          className="w-full h-full max-h-full rounded-none modal-box bg-blue-50"
        >
          <div className="_filter-title flex w-full border-b-[2px] border-b-blue-800 border-dashed pb-3 mb-5 text-primary">
            <Sliders size={24} weight="light" className="ml-1" />
            <span className="font-semibold">{FILTER.SELECT}</span>
          </div>

          <div className="flex flex-wrap gap-3">
            <CityFilter id="mobile-cityfilter-modal" cities={cities} />
            <CategoryFilter
              id="mobile-categoryfilter-modal"
              categories={categories}
            />
            <div>نتایج فیلتر اینجا دیده شود</div>
          </div>

          <div className="grid grid-cols-2 gap-3 modal-action">
            <button className="w-full btn btn-primary">{FILTER.APPLY}</button>
            <button className="w-full btn btn-info">{FILTER.DELETE_ALL}</button>
          </div>
        </form>
      </dialog>
    </>
  );
}
