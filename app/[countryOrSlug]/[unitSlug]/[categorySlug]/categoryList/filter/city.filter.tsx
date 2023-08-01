"use client";

import { GENERAL } from "../../../../../../components/allTexts";
import { CityNamespace } from "@/types/city";
import CityFilterItem from "./city.filter.item";
import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import queryString from "query-string";
import { useRouter } from "next/navigation";
import CityFilterSelectedItem from "./city.filter.selected.item";
import useCreateQueryString from "@/hooks/useCreateQueryString";
import useDeleteQueryString from "@/hooks/useDeleteQueryString";
import _ from "lodash"

type CityFilterType = {
  cities: CityNamespace.city[];
  id: string;
};
export type ParsedSearchParamsType = {
  city?: string[] | string;
};
export type addToShouldBeAddType = (item: string) => void;
export type removeFromShouldBeAddType = (item: string) => void;
export type checkHandlerType = (value: string | number) => boolean | undefined;

export default function CityFilter({ cities, id }: CityFilterType) {
  const [modifiedCities, setModifiedCities] = useState(cities);
  // const [shouldBeAdd, setShouldBeAdd] = useState<string[]>([])
  // const [shouldBeRemove, setShouldBeRemove] = useState<string[]>([])


  const searchParams = useSearchParams() as unknown as URLSearchParams;
  const pathname = usePathname();
  const [parsedSearchParams, setParsedSearchParams] = useState<ParsedSearchParamsType>({});
  const [isParsedSearchParamsAdded, setIsParsedSearchParamsAdded] = useState(false)

  const [shouldBeAdd, setShouldBeAdd] = useState<(string)[]>([])

  const addToShouldBeAdd: addToShouldBeAddType = (item: string) => {
    if(shouldBeAdd.includes(item))
      return;
    setShouldBeAdd(old => [...old, item])
  }

  const removeFromShouldBeAdd: removeFromShouldBeAddType = (item: string) => {
    setShouldBeAdd(old => {     
      const index = old.indexOf(item)
      if(index != -1){
        old.splice(index, 1)
      }
      return [...old];
    })
  }

  const clearShouldBeAdd = () => {
    setShouldBeAdd([])
  }

  useEffect(() => {
    setParsedSearchParams(
      queryString.parse(searchParams.toString(), { arrayFormat: "comma" })
    );
  }, [searchParams]);

  useEffect(() => {
    if(isParsedSearchParamsAdded)return;
    if(!parsedSearchParams?.city)return;
    if(Array.isArray(parsedSearchParams.city)){
      parsedSearchParams.city.forEach(cityId => {
        addToShouldBeAdd(cityId)
      })
    }else{
      addToShouldBeAdd(parsedSearchParams.city)
    }
    setIsParsedSearchParamsAdded(true)
  },[parsedSearchParams])
  
  const createQueryString = useCreateQueryString()
  const deleteQueryString = useDeleteQueryString()

  const applyFilters = () => {
    router.replace(`${pathname}?${createQueryString("city", shouldBeAdd)}`);
  }

  const deleteAllCityHandler = () => {

    clearShouldBeAdd()
  };

  const checkHandler: checkHandlerType = (value: string | number) => {
    const hasItem = shouldBeAdd.find(n => n == value)
    if(hasItem){
      return true
    }else{
      return false
    }
  }
  
  








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

  const router = useRouter();
  /**
   * save cities that are in city query
   * if city query have a single number it's return string
   * if city query have multiple numbers it's return Array[]
   */
  const citiesInQuery = queryString.parse(searchParams.toString(), {
    arrayFormat: "comma",
  }).city;



  return (
    <div className="filter-section mb-4">
      <label
        htmlFor={id}
        className="btn btn-primary btn-outline btn-wide"
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
            return <CityFilterSelectedItem removeFromShouldBeAdd={removeFromShouldBeAdd} key={`city-selected-item-xz-${cityId}`} city={city} />;
          })
        ) : citiesInQuery &&
          cities.find((city) => city.id == +citiesInQuery) ? (
          <CityFilterSelectedItem 
            removeFromShouldBeAdd={removeFromShouldBeAdd}
            key={`city-selected-item-xz-single-`}
            city={cities.find((city) => city.id == +citiesInQuery)!}
          />
        ) : null}
      </div>

      {/* Put this part before </body> tag */}
      <input type="checkbox" id={id} className="modal-toggle z-50" />
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
              return <CityFilterItem key={`modified-city-filter-${city.name}`} removeFromShouldBeAdd={removeFromShouldBeAdd} parsedSearchParams={parsedSearchParams} checkHandler={checkHandler} shouldBeAdd={shouldBeAdd} addToShouldBeAdd={addToShouldBeAdd}   city={city} />;
            })}
          </div>
          <div className="flex">
            <div className="modal-action box-border w-full pt-3 pb-5 px-8 mt-3 flex justify-between items-center ">
              <label onClick={applyFilters} htmlFor={id} className="btn btn-primary w-full">
                {GENERAL.CONFIRM}
              </label>
            </div>
          </div>
        </div>
        {/* <label className="modal-backdrop" htmlFor={id}>
          بستن
        </label> */}
      </div>
    </div>
  );
}
