"use client";

import { FILTER } from "@/app/text/directory";
import { Sliders } from "app/client-packages/phosphor-icons/react";

export default function FilterMobile() {
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
        className="w-full p-3 border border-blue-200 border-dashed rounded-lg outline-none filter-title md:hidden bg-sky-50 text-primary"
      >
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center">
            <Sliders size={24} weight="light" className="ml-2" />
            <span className="font-semibold">{FILTER.SELECT}</span>
          </div>
          <span className="font-medium">(130 مورد)</span>
        </div>
      </button>
    </>
  );
}
