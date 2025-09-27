"use client";
import { CityNamespace } from "@/types/city";
import CityFilter from "../../filter/city.filter";
import PageSearch from "../../filter/page.search";
import { Sliders } from "@phosphor-icons/react/dist/ssr";
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
    <div className="_filter-catgory flex gap-3 py-7">
      <div className="_filter-title flex items-center">
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

      <div className="_filter-resaults flex items-center">
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
