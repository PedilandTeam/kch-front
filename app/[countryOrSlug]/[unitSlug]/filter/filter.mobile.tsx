"use client";

import { _TXT } from "@/app/text";
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
        <span className="font-semibold">{_TXT.FILTER._S}</span>
      </div>

      <dialog id="modal_unit_filter" className="modal">
        <form
          method="dialog"
          className="modal-box w-full max-h-full h-full rounded-none"
        >
          <div className="filter-title flex w-full border-b-[2px] border-b-gray-200 pb-2">
            <FunnelIcon className="h-4 w-4 ml-2" />
            <span className="font-semibold">{_TXT.FILTER._S}</span>
          </div>
          <div className="py-4">
            <input
              type="text"
              placeholder="جستجو"
              className="input input-bordered w-full mb-3"
            />
            <CityFilter id="mobile-cityfilter-modal" cities={cities} />
            <CategoryFilter
              id="mobile-categoryfilter-modal"
              categories={categories}
            />
          </div>
          <div className="modal-action">
            <button className="btn w-full">{_TXT.FILTER.APPLY}</button>
          </div>
        </form>
      </dialog>
    </>
  );
}
