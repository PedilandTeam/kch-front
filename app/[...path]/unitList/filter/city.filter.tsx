"use client";

import {
  Checkbox,
  CheckboxGroup,
  Stack,
} from "@client-packages/chakra-ui/components";
import { GENERAL } from "../../../../components/allTexts";
import { CityNamespace } from "@/types/city";
import CityFilterItem from "./city.filter.item";
import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import queryString from "query-string";
import { useRouter } from "next/navigation";
import CityFilterSelectedItem from "./city.filter.selected.item";

type CityFilterType = {
  cities: CityNamespace.city[];
};
export default function CityFilter({ cities }: CityFilterType) {
  const [modifiedCities, setModifiedCities] = useState(cities);

  /**
   * find cities that have includes() searched string
   * if cities not exist do anything
   * @param event
   * @returns void
   */
  const citySearchHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!cities) return;
    const find = cities.filter((city) =>
      city.name.includes(event.currentTarget.value)
    );
    setModifiedCities(find);
  };

  /**
   * auto focusing on search input
   */
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, [inputRef]);

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  /**
   * save cities that are in city query
   * if city query have a single number it's return string
   * if city query have multiple numbers it's return Array[]
   */
  const citiesInQuery = queryString.parse(searchParams.toString(), {
    arrayFormat: "comma",
  }).city;

  const deleteAllCityHandler = () => {
    const query = queryString.parse(searchParams.toString());
    if (query.city) {
      delete query.city;
    }
    router.replace(`${pathname}?${queryString.stringify(query)}`);
  };

  return (
    <div className="filter-section mb-4">
      <label
        htmlFor="my_modal_7"
        className="btn btn-primary btn-outline w-full"
      >
        {GENERAL.CITY_SELECT}
      </label>
      <div className="px-3 mt-3">
        {Array.isArray(citiesInQuery) ? (
          // if city is multiple number, find all of that from cities
          citiesInQuery.map((cityId) => {
            if (!cityId) return;
            const city = cities.find((city) => city.id == +cityId);
            if (!city) return;
            return <CityFilterSelectedItem city={city} />;
          })
        ) : citiesInQuery &&
          cities.find((city) => city.id == +citiesInQuery) ? (
          <CityFilterSelectedItem
            city={cities.find((city) => city.id == +citiesInQuery)!}
          />
        ) : null}
      </div>

      {/* Put this part before </body> tag */}
      <input type="checkbox" id="my_modal_7" className="modal-toggle" />
      <div className="modal">
        <div className=" modal-box p-0 max-h-[550px] ">
          <div className="pt-5 pb-3 px-8 bg-white w-full">
            <h3 className="flex justify-between content-center text-lg font-bold">
              {GENERAL.CITY_SELECT}
              {citiesInQuery ? (
                <span
                  onClick={deleteAllCityHandler}
                  className="cursor-pointer text-[15px] font-normal text-pink-800"
                >
                  {GENERAL.DELETE_ALL}
                </span>
              ) : null}
            </h3>
            <p className="py-3">شهر یا شهرهای مورد نظر خود را انتخاب نمایید.</p>
            <input
              onChange={citySearchHandler}
              type="text"
              placeholder="جستجو در لیست شهرها"
              className="input input-bordered w-full"
              autoFocus={true}
              ref={inputRef}
            />
          </div>
          <div className="px-8 h-[16rem] overflow-y-scroll">
            {modifiedCities?.map((city: CityNamespace.city) => {
              return <CityFilterItem key={city.name} city={city} />;
            })}
          </div>
          <div className="modal-action box-border w-full pt-3 pb-5 px-8 mt-3 flex justify-between items-center bg-white shadow-2xl">
            <label htmlFor="my_modal_7" className="btn btn-primary w-full">
              {GENERAL.CONFIRM}
            </label>
          </div>
        </div>
        <label className="modal-backdrop" htmlFor="my_modal_7">
          بستن
        </label>
      </div>
    </div>
  );
}
