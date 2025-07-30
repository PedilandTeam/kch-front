"use client";
import { CityNamespace } from "@/types/city";
import CityFilter from "../../filter/city.filter";
import PageSearch from "../../filter/page.search";
import { Sliders } from "@client-packages/phosphor-icons/react";
import { FILTER } from "@/text/directory";
import { useState } from "react";
import { removeFromShouldBeAddType } from "../../filter/category.filter";
import CityFilterSelected from "./city.filter.selected";
import DeleteFilter from "./delete.filter";

type ListFilterProps = {
  cities: CityNamespace.GET;
  // categories: CategoryNamespace.category[]
};
export default function CategoryListFilter({ cities }: ListFilterProps) {
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
    <div className="flex gap-3 py-7 _filter-catgory">
      <div className="flex items-center _filter-title">
        <Sliders size={24} weight="light" className="ml-1" />
        <span className="font-semibold">{FILTER._S}</span>
      </div>

      <div className="_search">
        <PageSearch />
      </div>

      <div className="_filter-body">
        <CityFilter
          setShouldBeAdd={setShouldBeAddCities}
          shouldBeAdd={shouldBeAddCities}
          id="category-cities-filter"
          cities={cities?.items}
        />
      </div>

      <div className="flex items-center _filter-resaults">
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
