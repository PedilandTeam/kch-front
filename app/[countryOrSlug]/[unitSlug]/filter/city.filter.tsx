"use client";

import { CityNamespace } from "@/types/city";
import CityFilterItem from "./city.filter.item";
import { useEffect, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import queryString from "query-string";
import { useRouter } from "next/navigation";
import CityFilterSelectedItem from "./city.filter.selected.item";
import useCreateQueryString from "@/hooks/useCreateQueryString";
import useDeleteQueryString from "@/hooks/useDeleteQueryString";
import { CITY } from "@/app/text/location";
import { GENERAL } from "@/app/text/general";
import CityFilterSelected from "./city.filter.selected";
import { addToShouldBeAddType, removeFromShouldBeAddType } from "./category.filter";

type CityFilterType = {
  cities: CityNamespace.city[];
  id: string;
  shouldBeAdd: string[];
  setShouldBeAdd: React.Dispatch<React.SetStateAction<string[]>>;
};
export type ParsedSearchParamsType = {
  city?: string[] | string;
};

export type checkHandlerType = (value: string | number) => boolean | undefined;

export default function CityFilter({cities, setShouldBeAdd, shouldBeAdd, id}: CityFilterType) {

  const [modifiedCities, setModifiedCities] = useState(cities);
  const searchParams = useSearchParams() as unknown as URLSearchParams;
  const pathname = usePathname();
  const [parsedSearchParams, setParsedSearchParams] =
    useState<ParsedSearchParamsType>({});
  const [isParsedSearchParamsAdded, setIsParsedSearchParamsAdded] =
    useState(false);


  useEffect(() => {
    setModifiedCities(cities);
  }, [cities]);


  const addToShouldBeAdd: addToShouldBeAddType = (item: string) => {
    if (shouldBeAdd.includes(item)) return;
    setShouldBeAdd((old) => [...old, item]);
  };

  const removeFromShouldBeAdd: removeFromShouldBeAddType = (item: string) => {
    setShouldBeAdd((old) => {
      const index = old.indexOf(item);
      if (index != -1) {
        old.splice(index, 1);
      }
      return [...old];
    });
  };




  const clearShouldBeAdd = () => {
    setShouldBeAdd([]);
  };

  useEffect(() => {
    //parse query params to array
    setParsedSearchParams(
      queryString.parse(searchParams.toString(), { arrayFormat: "comma" })
    );
  }, [searchParams]);

  useEffect(() => {
    if (isParsedSearchParamsAdded) return;
    if (!parsedSearchParams?.city) return;

    //this condition is because if city filter be a single number we give number
    //and if we have multiple cities we give an Array
    if (Array.isArray(parsedSearchParams.city)) {
      parsedSearchParams.city.forEach((cityId) => {
        addToShouldBeAdd(cityId);
      });
    } else {
      addToShouldBeAdd(parsedSearchParams.city);
    }
    setIsParsedSearchParamsAdded(true);
  }, [parsedSearchParams]);

  const createQueryString = useCreateQueryString();

  const applyFilters = () => {
    router.replace(`${pathname}?${createQueryString("city", shouldBeAdd)}`);
  };

  const deleteAllCityHandler = () => {
    clearShouldBeAdd();
  };

  const checkHandler: checkHandlerType = (value: string | number) => {
    const hasItem = shouldBeAdd.find((n) => n == value);
    if (hasItem) {
      return true;
    } else {
      return false;
    }
  };

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

  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  /**
   * save cities that are in city query
   * if city query have a single number it's return string
   * if city query have multiple numbers it's return Array[]
   */
  const citiesInQuery = queryString.parse(searchParams.toString(), {
    arrayFormat: "comma",
  }).city;

  useEffect(() => {
    if (!Array.isArray(citiesInQuery) || citiesInQuery.length == 0) {
      clearShouldBeAdd()
    }
  }, [citiesInQuery])

  return (
    <div className="w-full _filter-wrap sm:w-auto">
      <div className="flex items-center justify-start _filter-section">
        {/* The button to open modal */}
        <label
          htmlFor={id}
          className="w-full btn btn-primary btn-outline sm:w-auto"
        >
          {CITY.SELECT}
        </label>
      </div>

      {/* the modal */}
      <input type="checkbox" id={id} className="modal-toggle" />
      <div className="modal">
        <div className="modal-box p-0 max-h-[550px]">
          <div className="w-full p-4 bg-white sm:p-6">
            <h3 className="flex content-center justify-between text-lg font-bold">
              {CITY.SELECT}
              {/* delete text */}
              {citiesInQuery ? (
                <span
                  onClick={deleteAllCityHandler}
                  className="cursor-pointer text-[15px] font-normal text-pink-800"
                >
                  {GENERAL.DELETE_ALL}
                </span>
              ) : null}
            </h3>
            <p className="py-3">{CITY.SELECT_MULTI}</p>
            <input
              onChange={citySearchHandler}
              type="text"
              placeholder={CITY.SEARCH_IN_LIST}
              className="w-full input input-bordered"
              ref={inputRef}
            />
          </div>
          <div className="px-6 sm:px-8 h-[16rem] overflow-y-scroll">
            {modifiedCities?.map((city: CityNamespace.city) => {
              return (
                <CityFilterItem
                  key={`modified-city-filter-${city.name}`}
                  removeFromShouldBeAdd={removeFromShouldBeAdd}
                  parsedSearchParams={parsedSearchParams}
                  checkHandler={checkHandler}
                  shouldBeAdd={shouldBeAdd}
                  addToShouldBeAdd={addToShouldBeAdd}
                  city={city}
                />
              );
            })}
          </div>
          <div className="w-full px-4 mb-4 sm:mb-6 sm:px-6 modal-action">
            <label
              onClick={applyFilters}
              htmlFor={id}
              className="w-full btn btn-primary"
            >
              {GENERAL.CONFIRM}
            </label>
          </div>
        </div>
        {/* <label className="modal-backdrop" htmlFor={id}>
          بستن
        </label> */}
      </div>
    </div>
  );
}
