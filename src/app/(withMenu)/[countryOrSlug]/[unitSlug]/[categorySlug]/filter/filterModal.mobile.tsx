"use client";

import { CityNamespace } from "@/types/city";
import CityFilter from "../../filter/city.filter";
import { Sliders } from "@phosphor-icons/react";
import { FILTER } from "@/text/directory";
import { useState } from "react";
import { removeFromShouldBeAddType } from "../../filter/category.filter";
import CityFilterSelected from "./city.filter.selected";
import DeleteFilterMobile from "./delete.filter.mobile";

type FilterMobileProps = {
  cities: CityNamespace.city[];
};

export default function FilterModalMobile({ cities }: FilterMobileProps) {
  const [shouldBeAddCities, setShouldBeAddCities] = useState<string[]>([]);

  const removeFromShouldBeAddCities: removeFromShouldBeAddType = (
    item: string,
  ) => {
    setShouldBeAddCities((old) => {
      const index = old.indexOf(item);
      if (index != -1) {
        old.splice(index, 1);
      }
      return [...old];
    });
  };

  return (
    <>
      <dialog id="modal_category_filter" className="modal">
        <form
          method="dialog"
          className="modal-box h-full max-h-full w-full rounded-none bg-blue-50"
        >
          <div className="_filter-title mb-5 flex w-full border-b-[2px] border-dashed border-b-blue-800 pb-3 text-primary">
            <Sliders size={24} weight="light" className="ml-1" />
            <span className="font-semibold">{FILTER.SELECT}</span>
          </div>

          <div className="flex flex-wrap gap-3">
            <CityFilter
              setShouldBeAdd={setShouldBeAddCities}
              shouldBeAdd={shouldBeAddCities}
              id="mobile-categoryList-cityfilter-modal"
              cities={cities}
            />
            <CityFilterSelected
              cities={cities}
              removeFromShouldBeAdd={removeFromShouldBeAddCities}
            />
          </div>

          <div className="modal-action grid grid-cols-2 gap-3">
            <button className="btn btn-primary w-full">{FILTER.APPLY}</button>
            <DeleteFilterMobile />
          </div>
        </form>
      </dialog>
    </>
  );
}
