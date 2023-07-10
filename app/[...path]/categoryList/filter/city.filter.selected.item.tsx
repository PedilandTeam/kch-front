"use client";

import { CityNamespace } from "@/types/city";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import queryString from "query-string";
import React, {
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
  useTransition,
} from "react";

type CityFilterItemProps = {
  city: CityNamespace.city;
};

type ParsedSearchParamsType = {
  city?: string[] | string;
};
function CityFilterSelectedItem({ city }: CityFilterItemProps) {
  const ref = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const searchParams = useSearchParams() as unknown as URLSearchParams;
  const pathname = usePathname();
  const [parsedSearchParams, setParsedSearchParams] =
    useState<ParsedSearchParamsType>({});
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setParsedSearchParams(
      queryString.parse(searchParams.toString(), { arrayFormat: "comma" })
    );
  }, [searchParams]);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = queryString.parse(searchParams.toString());
      let targetValues = params?.[name];
      const newValue = [value];
      if (!targetValues) {
        params[name] = value;
        return queryString.stringify(params);
      }
      if (!Array.isArray(targetValues)) {
        newValue.push(targetValues);
      } else {
        //@ts-expect-error
        newValue.push(...targetValues);
      }
      params[name] = newValue;
      return queryString.stringify(params, { arrayFormat: "comma" });
    },
    [searchParams]
  );

  const deleteQueryString = useCallback(
    (name: string, value: string) => {
      const params = queryString.parse(searchParams.toString(), {
        arrayFormat: "comma",
      });
      let targetValues = params?.[name];

      if (!targetValues) {
        return;
      }
      if (!Array.isArray(targetValues)) {
        delete params[name];
      } else {
        const indexofTarget = targetValues.findIndex((param) => param == value);
        if (indexofTarget == -1) return;
        targetValues.splice(indexofTarget, 1);
      }
      return queryString.stringify(params, { arrayFormat: "comma" });
    },
    [searchParams]
  );
  const inputClickHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const currentTarget = event.currentTarget;
    if (!currentTarget.checked) {
      return router.replace(
        `${pathname}?${deleteQueryString("city", currentTarget.value)}`
      );
    }
    router.replace(
      `${pathname}?${createQueryString("city", currentTarget.value)}`
    );
  };

  // const containerClickHandler = () => {
  //     if(ref.current)
  //         ref.current.click()
  // }

  return (
    <label
      key={city.name}
      htmlFor={`city-select-${city.name}`}
      className="item flex items-center py-2 cursor-pointer"
    >
      <input
        ref={ref}
        className="checkbox checkbox-secondary checkbox-sm ml-3"
        onChange={inputClickHandler}
        id={`city-select-${city.name}`}
        value={city.id}
        type="checkbox"
        checked={
          parsedSearchParams.city ?
            Array.isArray(parsedSearchParams.city)
              ? !!parsedSearchParams.city.find((param) => +param == city.id)
              : +parsedSearchParams.city == city.id
            : false
        }
      />
      <label htmlFor={`city-select-${city.name}`}>{city.name}</label>
    </label>
  );
}

export default memo(CityFilterSelectedItem);
