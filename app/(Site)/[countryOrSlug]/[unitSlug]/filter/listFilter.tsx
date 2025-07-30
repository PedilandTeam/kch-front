"use client";
import { CityNamespace } from "@/types/city";
import { CategoryNamespace } from "@/types/category";
import CityFilter from "./city.filter";
import CategoryFilter from "./category.filter";
import PageSearch from "./page.search";
import { Sliders } from "@client-packages/phosphor-icons/react";
import { FILTER } from "@/text/directory";
import { useState } from "react";
import CityFilterSelected from "./city.filter.selected";
import CategoryFilterSelected from "./category.filter.selected";
import DeleteFilter from "./delete.filter";

type ListFilterProps = {
  cities: CityNamespace.GET;
  categories: CategoryNamespace.category[];
};
export type addToShouldBeAddType = (item: string) => void;
export type removeFromShouldBeAddType = (item: string) => void;
export default function ListFilter({ cities, categories }: ListFilterProps) {
  const [shouldBeAddCities, setShouldBeAddCities] = useState<string[]>([]);
  const [shouldBeAddCategories, setShouldBeAddCategories] = useState<string[]>(
    []
  );

  const removeFromShouldBeAddCities: removeFromShouldBeAddType = (
    item: string
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
    item: string
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
    <div className="flex gap-3 py-7 _filter-unit">
      <div className="flex items-center _filter-title">
        <Sliders size={24} weight="light" className="ml-1" />
        <span className="font-semibold">{FILTER._S}</span>
      </div>

      <div className="_search">
        <PageSearch />
      </div>

      <div className="flex gap-3 _filter-body">
        <CategoryFilter
          setShouldBeAdd={setShouldBeAddCategories}
          shouldBeAdd={shouldBeAddCategories}
          id="categoryfilter-modal"
          categories={categories}
        />
        <CityFilter
          setShouldBeAdd={setShouldBeAddCities}
          shouldBeAdd={shouldBeAddCities}
          id="cityfilter-modal"
          cities={cities?.items}
        />
      </div>

      <div className="flex items-center flex-1 gap-3 truncate _filter-resaults">
        <CategoryFilterSelected
          categories={categories}
          removeFromShouldBeAdd={removeFromShouldBeAddCategory}
        />
        <CityFilterSelected
          cities={cities.items}
          removeFromShouldBeAdd={removeFromShouldBeAddCities}
        />
      </div>

      <div className="flex items-center mr-auto">
        <DeleteFilter />
      </div>
    </div>
  );
}
