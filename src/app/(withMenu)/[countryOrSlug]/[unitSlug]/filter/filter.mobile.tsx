"use client";

import { FILTER } from "@/text/directory";
import { Sliders } from "@phosphor-icons/react";
import { FC } from "react";

type FilterMobile = {
  pagesTotalItems?: number;
};
const FilterMobile: FC<FilterMobile> = ({ pagesTotalItems }) => {
  const openFilters = () => {
    if (document) {
      (
        document.getElementById("modal_unit_filter") as HTMLFormElement
      ).showModal();
    }
  };
  return (
    <>
      <button
        onClick={openFilters}
        className="filter-title w-full rounded-lg border border-dashed border-blue-200 bg-sky-50 p-3 text-primary outline-none md:hidden"
      >
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center">
            <Sliders size={24} weight="light" className="ml-2" />
            <span className="font-semibold">{FILTER.SELECT}</span>
          </div>
          <span className="font-medium">({pagesTotalItems} آیتم)</span>
        </div>
      </button>
    </>
  );
};

export default FilterMobile;
