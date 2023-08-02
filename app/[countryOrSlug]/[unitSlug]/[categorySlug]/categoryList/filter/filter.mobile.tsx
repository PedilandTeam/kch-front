"use client";

import { GENERAL } from "@text/allTexts";
import { FunnelIcon } from "@heroicons/react/24/solid";
// import CityFilter from "./city.filter";
import CategoryFilter from "./category.filter";
import { CityNamespace } from "@/types/city";
import { CategoryNamespace } from "@/types/category";
import CityFilter from "../../../filter/city.filter";

type FilterMobileProps = {
  cities: CityNamespace.city[];
};

export default function FilterMobile({
  cities,
}: FilterMobileProps) {
  return (
    <>
      <div
        className="filter-title w-full flex md:hidden pt-1"
        onClick={() => {
          if (document) {
            (
              document.getElementById("modal_category_filter") as HTMLFormElement
            ).showModal();
          }
        }}
      >
        <FunnelIcon className="h-5 w-5 ml-2" />
        <span className="font-semibold">{GENERAL.FILTERS}</span>
      </div>

      <dialog id="modal_category_filter" className="modal">
        <form
          method="dialog"
          className="modal-box w-full max-h-full h-full rounded-none"
        >
          <div className="filter-title flex w-full border-b-[2px] border-b-gray-200 pb-2">
            <FunnelIcon className="h-4 w-4 ml-2" />
            <span className="font-semibold">{GENERAL.FILTERS}</span>
          </div>
          <div className="py-4">
            <CityFilter id="mobile-categoryList-cityfilter-modal" cities={cities} />
          </div>
          <div className="modal-action">
            <button className="btn w-full">اعمال فیلترها</button>
          </div>
        </form>
      </dialog>
    </>
  );
}
