"use client";

import { GENERAL } from "@/app/text/allTexts";
import { FunnelIcon } from "@heroicons/react/24/solid";
import CityFilter from "./city.filter";
import CategoryFilter from "./category.filter";
import { CityNamespace } from "@/types/city";
import { CategoryNamespace } from "@/types/category";

type FilterMobileProps = {
  cities: CityNamespace.city[];
  categories: CategoryNamespace.category[];
};

export default function FilterMobile({
  cities,
  categories,
}: FilterMobileProps) {
  return (
    <>
      <div
        className="filter-title w-full flex md:hidden pt-1"
        onClick={() => {
          if (document) {
            (
              document.getElementById("modal_unit_filter") as HTMLFormElement
            ).showModal();
          }
        }}
      >
        <FunnelIcon className="h-5 w-5 ml-2" />
        <span className="font-semibold">{GENERAL.FILTERS}</span>
      </div>

      <dialog id="modal_unit_filter" className="modal">
        <form
          method="dialog"
          className="modal-box w-full max-h-full h-full rounded-none"
        >
          <div className="filter-title flex w-full border-b-[2px] border-b-gray-200 pb-2">
            <FunnelIcon className="h-4 w-4 ml-2" />
            <span className="font-semibold">{GENERAL.FILTERS}</span>
          </div>
          <div className="py-4">
            <CityFilter id="mobile-cityfilter-modal" cities={cities} />
            <CategoryFilter id="mobile-categoryfilter-modal" categories={categories} />
          </div>
          <div className="modal-action">
            <button className="btn w-full">اعمال فیلترها</button>
          </div>
        </form>
      </dialog>
    </>
  );
}
