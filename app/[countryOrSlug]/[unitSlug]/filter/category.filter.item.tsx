"use client";

import { CategoryNamespace } from "@/types/category";
import React, { useEffect, useRef, useState } from "react";
import {
  addToShouldBeAddType,
  checkHandlerType,
  removeFromShouldBeAddType,
} from "./city.filter";

type CategoryFilterItemProps = {
  category: CategoryNamespace.category;
  checkHandler: checkHandlerType;
  parsedSearchParams: ParsedSearchParamsType;
  shouldBeAdd: (number | string)[];
  addToShouldBeAdd: addToShouldBeAddType;
  removeFromShouldBeAdd: removeFromShouldBeAddType;
};

type ParsedSearchParamsType = {
  category?: string[] | string;
};

export default function CategoryFilterItem({
  category,
  shouldBeAdd,
  checkHandler,
  parsedSearchParams,
  addToShouldBeAdd,
  removeFromShouldBeAdd,
}: CategoryFilterItemProps) {
  const ref = useRef<HTMLInputElement>(null);
  const [isChecked, setIsChecked] = useState<boolean | undefined>(false);

  useEffect(() => {
    console.log();
    setIsChecked(checkHandler(category.id));
    console.log(shouldBeAdd);
    
  }, [shouldBeAdd]);

  const inputClickHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const currentTarget = event.currentTarget;

    if (!currentTarget.checked) {
      setIsChecked(false);
      removeFromShouldBeAdd(currentTarget.value);
    } else {
      setIsChecked(true);
      addToShouldBeAdd(currentTarget.value);
    }
  };

  return (
    <label
      key={`my-category-filter-item-${category.name}`}
      htmlFor={`category-select-${category.name}`}
      className="item flex items-center border-b-[1px] py-3"
    >
      <input
        ref={ref}
        className="checkbox checkbox-secondary checkbox-sm ml-3"
        onChange={inputClickHandler}
        id={`category-select-${category.name}`}
        value={category.id}
        type="checkbox"
        checked={isChecked}
      />
      <label htmlFor={`category-select-${category.name}`} className="text-md">
        {category.name}
      </label>
    </label>
  );
}
