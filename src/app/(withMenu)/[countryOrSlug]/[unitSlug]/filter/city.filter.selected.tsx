import CityFilterSelectedItem from "./city.filter.selected.item";
import { CityNamespace } from "@/types/city";
import { FC } from "react";
import { removeFromShouldBeAddType } from "./category.filter";
import queryString from "query-string";
import { useSearchParams } from "next/navigation";

type CityFilterSelected = {
  cities: CityNamespace.city[];
  removeFromShouldBeAdd: removeFromShouldBeAddType;
};
const CityFilterSelected: FC<CityFilterSelected> = ({
  cities,
  removeFromShouldBeAdd,
}) => {
  const searchParams = useSearchParams();
  const citiesInQuery = queryString.parse(searchParams.toString(), {
    arrayFormat: "comma",
  }).city;

  
  return (
    <div className="flex flex-wrap items-center gap-3 sm:flex-nowrap">
      {Array.isArray(citiesInQuery) ? (
        // if city is multiple number, find all of that from cities
        citiesInQuery.map((cityId) => {
          if (!cityId) return;
          const city = cities.find((city) => city.id == +cityId);
          if (!city) return;
          return (
            <CityFilterSelectedItem
              removeFromShouldBeAdd={removeFromShouldBeAdd}
              key={`city-selected-item-xz-${cityId}`}
              city={city}
            />
          );
        })
      ) : citiesInQuery && cities.find((city) => city.id == +citiesInQuery) ? (
        <CityFilterSelectedItem
          removeFromShouldBeAdd={removeFromShouldBeAdd}
          key={`city-selected-item-xz-single-`}
          city={cities.find((city) => city.id == +citiesInQuery)!}
        />
      ) : null}
    </div>
  );
};

export default CityFilterSelected;
