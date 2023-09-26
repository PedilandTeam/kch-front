"use client";

import useCreateQueryString from "@/hooks/useCreateQueryString";
import useDeleteQueryString from "@/hooks/useDeleteQueryString";
import { CategoryNamespace } from "@/types/category";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import queryString from "query-string";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { removeFromShouldBeAddType } from "./city.filter";

type CategoryFilterSelectedItemProps = {
  category: CategoryNamespace.category;
  removeFromShouldBeAdd: removeFromShouldBeAddType;
};

type ParsedSearchParamsType = {
  category?: string[] | string;
};

export default function CategoryFilterSelectedItem({
  category,
  removeFromShouldBeAdd,
}: CategoryFilterSelectedItemProps) {




  const router = useRouter();
  const searchParams = useSearchParams() as unknown as URLSearchParams;
  const pathname = usePathname();
  const [parsedSearchParams, setParsedSearchParams] =
    useState<ParsedSearchParamsType>({});
  const ref = useRef<HTMLInputElement>(null);

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
      removeFromShouldBeAdd(currentTarget.value)
      return router.replace(
        `${pathname}?${deleteQueryString("category", currentTarget.value)}`
      );
    }
  };

  const isChecked = useCallback((parsedSearchParams: ParsedSearchParamsType) => {
    return parsedSearchParams.category
      ? Array.isArray(parsedSearchParams.category)
        ? !!parsedSearchParams.category.find(
          (param) => +param == category.id
        )
        : +parsedSearchParams.category == category.id
      : false
  }, [category.id])

  const id = useRef(`category-3413-select-${category.id}`)


  return (

    <div className="flex justify-right items-center" key={`cate-gory-filter-slected--${category.id}`}>
      <input
        ref={ref}
        className="checkbox checkbox-secondary checkbox-sm ml-3"
        onChange={inputClickHandler}
        id={id.current}
        value={category.id}
        type="checkbox"
        checked={isChecked(parsedSearchParams)}
      />
      <p
        className="item flex items-center py-2 cursor-pointer"
      >
        {category.name}
      </p>

    </div>
  );
}
