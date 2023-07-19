"use client";

import { CityNamespace } from "@/types/city";
import React, {
  memo, useEffect,
  useRef,
  useState
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


  const inputClickHandler = (event: React.ChangeEvent<HTMLInputElement>) => {


    const currentTarget = event.currentTarget;

    if(!currentTarget.checked){
      setIsChecked(false)
      removeFromShouldBeAdd(currentTarget.value)
    }else{
      setIsChecked(true)
      addToShouldBeAdd(currentTarget.value)
    }
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
        checked={isChecked}
      />
      <label htmlFor={`city-select-${city.name}`} className="text-md">
        {city.name}
      </label>
    </label>
  );
}

export default memo(CityFilterItem);
