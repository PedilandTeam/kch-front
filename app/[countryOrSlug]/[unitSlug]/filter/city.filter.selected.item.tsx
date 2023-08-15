"use client";

import useCreateQueryString from "@/hooks/useCreateQueryString";
import useDeleteQueryString from "@/hooks/useDeleteQueryString";
import { CityNamespace } from "@/types/city";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import queryString from "query-string";
import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { removeFromShouldBeAddType } from "./city.filter";

type CityFilterItemProps = {
  city: CityNamespace.city;
  removeFromShouldBeAdd: removeFromShouldBeAddType;
};

type ParsedSearchParamsType = {
  city?: string[] | string;
};
function CityFilterSelectedItem({
  city,
  removeFromShouldBeAdd,
}: CityFilterItemProps) {
  const ref = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const searchParams = useSearchParams() as unknown as URLSearchParams;
  const pathname = usePathname();
  const [parsedSearchParams, setParsedSearchParams] =
    useState<ParsedSearchParamsType>({});

  useEffect(() => {
    setParsedSearchParams(
      queryString.parse(searchParams.toString(), { arrayFormat: "comma" })
    );
  }, [searchParams]);

  const createQueryString = useCreateQueryString();
  const deleteQueryString = useDeleteQueryString();

  const inputClickHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const currentTarget = event.currentTarget;
    if (!currentTarget.checked) {
      removeFromShouldBeAdd(currentTarget.value);
      return router.replace(
        `${pathname}?${deleteQueryString("city", currentTarget.value)}`
      );
    }
  };

  const isChecked = useCallback((parsedSearchParams: ParsedSearchParamsType) => {
    return parsedSearchParams.city
      ? Array.isArray(parsedSearchParams.city)
        ? !!parsedSearchParams.city.find(
          (param) => +param == city.id
        )
        : +parsedSearchParams.city == city.id
      : false
  }, [city.id])


  const id = useRef(`category-3413-select-${city.id}`)

  return (

    <div className="flex justify-right items-center" key={`cate-gory-filter-slected--${city.id}`}>
      <input
        ref={ref}
        className="checkbox checkbox-secondary checkbox-sm ml-3"
        onChange={inputClickHandler}
        id={id.current}
        value={city.id}
        type="checkbox"
        checked={isChecked(parsedSearchParams)}
      />
      <p
        onClick={() => ref.current?.click()}
        className="item flex items-center py-2 cursor-pointer"
      >
        {city.name}
      </p>

    </div>
  );
}

export default memo(CityFilterSelectedItem);
