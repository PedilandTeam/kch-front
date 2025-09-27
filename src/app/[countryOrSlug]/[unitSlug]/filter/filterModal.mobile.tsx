"use client";

import CityFilter from "./city.filter";
import CategoryFilter, { removeFromShouldBeAddType } from "./category.filter";
import { CityNamespace } from "@/types/city";
import { CategoryNamespace } from "@/types/category";
import { FILTER } from "@/text/directory";
import { Sliders } from "@phosphor-icons/react/dist/ssr";
import { useState } from "react";
import CategoryFilterSelected from "./category.filter.selected";
import CityFilterSelected from "./city.filter.selected";
import DeleteFilterMobile from "./delete.filter.mobile";

type FilterMobileProps = {
  cities: CityNamespace.city[];
  categories: CategoryNamespace.category[];
};

export default function FilterModalMobile({
  cities,
  categories,
}: FilterMobileProps) {
  const [shouldBeAddCities, setShouldBeAddCities] = useState<string[]>([]);
  const [shouldBeAddCategories, setShouldBeAddCategories] = useState<string[]>(
    [],
  );

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

  const removeFromShouldBeAddCategory: removeFromShouldBeAddType = (
    item: string,
  ) => {
    setShouldBeAddCategories((old) => {
      if (!old.includes(item)) {
        return [...old, item];
      } else {
        return old.filter((n) => n !== item);
      }
    });
  };

  return (
    <>
      <dialog id="modal_unit_filter" className="modal">
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
              id="mobile-cityfilter-modal"
              cities={cities}
            />
            <CategoryFilter
              setShouldBeAdd={setShouldBeAddCategories}
              shouldBeAdd={shouldBeAddCategories}
              id="mobile-categoryfilter-modal"
              categories={categories}
            />
            <CategoryFilterSelected
              categories={categories}
              removeFromShouldBeAdd={removeFromShouldBeAddCategory}
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
