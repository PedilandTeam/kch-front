"use client";

import useCreateQueryString from "@/hooks/useCreateQueryString";
import useDeleteQueryString from "@/hooks/useDeleteQueryString";
import { CityNamespace } from "@/types/city";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import queryString from "query-string";
import React, {
  Dispatch,
  SetStateAction,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
  useTransition,
} from "react";
import { ParsedSearchParamsType, addToShouldBeAddType, checkHandlerType, removeFromShouldBeAddType } from "./city.filter";

type CityFilterItemProps = {
  city: CityNamespace.city;
  checkHandler: checkHandlerType;
  parsedSearchParams: ParsedSearchParamsType
  shouldBeAdd: (number | string)[],
  addToShouldBeAdd: addToShouldBeAddType
  removeFromShouldBeAdd: removeFromShouldBeAddType
};


function CityFilterItem({ city, shouldBeAdd, checkHandler, parsedSearchParams, addToShouldBeAdd, removeFromShouldBeAdd }: CityFilterItemProps) {
  
  
  const ref = useRef<HTMLInputElement>(null);
  const [isChecked, setIsChecked] = useState<boolean | undefined>(false)  

  useEffect(() => {

    setIsChecked(checkHandler(city.id))
    
  },[shouldBeAdd])

  // useEffect(() => {
  //   if(!parsedSearchParams) return;
  //   // startTransition(() => {
  //     setIsChecked(checkHandler(city))
  //   // })

  // },[shouldBeAdd, parsedSearchParams])

  // useEffect(() => {
  //   console.log(isChecked);
    
  // },[isChecked])

  const inputClickHandler = (event: React.ChangeEvent<HTMLInputElement>) => {


    const currentTarget = event.currentTarget;

    if(!currentTarget.checked){
      console.log("delete");
      setIsChecked(false)
      removeFromShouldBeAdd(currentTarget.value)
    }else{
      setIsChecked(true)
      addToShouldBeAdd(currentTarget.value)
    }

    
    // if (!currentTarget.checked) {
      // return router.replace(
        //   `${pathname}?${deleteQueryString("city", currentTarget.value)}`
        // );
        // setIsChecked(false)
        // if(!shouldBeRemove.includes(currentTarget.value)){
        //   console.log(currentTarget.checked);
        //   setShouldBeRemove(old => [...old, currentTarget.value])
        // }
        // const indexInIsShouldBeRemove = shouldBeRemove.findIndex(value => value == currentTarget.value);
        // console.log(indexInIsShouldBeRemove);
        
        // indexInIsShouldBeRemove != -1 && setShouldBeAdd(old => old.splice(indexInIsShouldBeRemove, 1))
        // return;
    // }
    // router.replace(
    // `${pathname}?${createQueryString("city", currentTarget.value)}`
    // );
    // setIsChecked(true)
    // if(!shouldBeAdd.includes(currentTarget.value)){
    //   setShouldBeAdd(old => [...old, currentTarget.value])
    // }
    // const indexInIsShouldBeRemove = shouldBeRemove.findIndex(value => value == currentTarget.value);
    // indexInIsShouldBeRemove != -1 && setShouldBeRemove(old => old.splice(indexInIsShouldBeRemove, 1))
    // return router.replace(
    //   `${pathname}?${deleteQueryString("city", currentTarget.value)}`
    // );
  }

  return (
    <label
      key={"selected-city-cfilter-item-" + city.name}
      htmlFor={`city-select-${city.name}`}
      className="item flex items-center border-b-[1px] py-3"
    >
      <input
        ref={ref}
        className="checkbox checkbox-secondary checkbox-sm ml-3"
        onChange={inputClickHandler}
        id={`city-select-${city.name}`}
        value={city.id}
        type="checkbox"
        // checked={
        //     parsedSearchParams.city ?
        //       Array.isArray(parsedSearchParams.city)
        //         ? !!parsedSearchParams.city.find((param) => +param == city.id)
        //         : +parsedSearchParams.city == city.id
        //       : false
        // }
        checked={isChecked}
      />
      <label htmlFor={`city-select-${city.name}`} className="text-md">
        {city.name} {city.id}
      </label>
    </label>
  );
}

export default memo(CityFilterItem);
