"use client";
import { CityNamespace } from "@/types/city";
import { CategoryNamespace } from "@/types/category";
import CityFilter from "./city.filter";
import CategoryFilter from "./category.filter";
import PageSearch from "./page.search";
import { Sliders } from "@phosphor-icons/react/dist/ssr";
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
    <div className="_filter-unit flex gap-3 py-7">
      <div className="_filter-title flex items-center">
        <Sliders size={24} weight="light" className="ml-1" />
        <span className="font-semibold">{FILTER._S}</span>
      </div>

      <div className="_search">
        <PageSearch />
      </div>

      <div className="_filter-body flex gap-3">
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

      <div className="_filter-resaults flex flex-1 items-center gap-3 truncate">
        <CategoryFilterSelected
          categories={categories}
          removeFromShouldBeAdd={removeFromShouldBeAddCategory}
        />
        <CityFilterSelected
          cities={cities.items}
          removeFromShouldBeAdd={removeFromShouldBeAddCities}
        />
      </div>

      <div className="mr-auto flex items-center">
        <DeleteFilter />
      </div>
    </div>
  );
}
