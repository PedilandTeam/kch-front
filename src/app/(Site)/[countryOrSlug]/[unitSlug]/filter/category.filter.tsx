"use client";

import { CategoryNamespace } from "@/types/category";
import CategoryFilterItem from "./category.filter.item";
import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import queryString from "query-string";
import { useRouter } from "next/navigation";
import CategoryFilterSelectedItem from "./category.filter.selected.item";
import useCreateQueryString from "@/hooks/useCreateQueryString";
import useDeleteQueryString from "@/hooks/useDeleteQueryString";
import { CATEGORY } from "@/text/directory";
import { GENERAL } from "@/text/general";
import CategoryFilterSelected from "./category.filter.selected";

type CategoryFilterType = {
  categories: CategoryNamespace.category[];
  id: string;
  shouldBeAdd: string[];
  setShouldBeAdd: React.Dispatch<React.SetStateAction<string[]>>;
};

export type ParsedSearchParamsType = {
  category?: string[] | string;
};

export type addToShouldBeAddType = (item: string) => void;
export type removeFromShouldBeAddType = (item: string) => void;
export type checkHandlerType = (value: string | number) => boolean | undefined;

export default function CategoryFilter({
  categories,
  id,
  setShouldBeAdd,
  shouldBeAdd,
}: CategoryFilterType) {
  const [modifiedCategories, setModifiedCategories] = useState(categories);

  useEffect(() => {
    setModifiedCategories(categories);
  }, [categories]);

  const categorySearchHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!categories) return;
    const find = categories.filter((category) =>
      category.name.includes(event.currentTarget.value)
    );
    setModifiedCategories(find);
  };
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  //category=1,2 -> [1,2] or category=3 -> "3"
  const categoriesInQuery = queryString.parse(searchParams.toString(), {
    arrayFormat: "comma",
  }).category;

  useEffect(() => {
    if (!Array.isArray(categoriesInQuery) || categoriesInQuery.length == 0) {
      clearShouldBeAdd();
    }
  }, [categoriesInQuery]);

  // city=1,2 -> [1,2] or city=1 -> "1"
  const citiesInQuery = queryString.parse(searchParams.toString(), {
    arrayFormat: "comma",
  }).city;

  const [parsedSearchParams, setParsedSearchParams] =
    useState<ParsedSearchParamsType>({});

  const [isParsedSearchParamsAdded, setIsParsedSearchParamsAdded] =
    useState(false);

  const addToShouldBeAdd: addToShouldBeAddType = (item: string) => {
    if (shouldBeAdd.includes(item)) return;
    setShouldBeAdd((old) => [...old, item]);
  };

  const removeFromShouldBeAdd: removeFromShouldBeAddType = (item: string) => {
    setShouldBeAdd((old) => {
      if (!old.includes(item)) {
        return [...old, item];
      } else {
        return old.filter((n) => n !== item);
      }
    });
  };

  const clearShouldBeAdd = () => {
    setShouldBeAdd([]);
  };

  useEffect(() => {
    if (isParsedSearchParamsAdded) return;
    if (!parsedSearchParams?.category) return;
    if (Array.isArray(parsedSearchParams.category)) {
      parsedSearchParams.category.forEach((categoryId) => {
        addToShouldBeAdd(categoryId);
      });
    } else {
      addToShouldBeAdd(parsedSearchParams.category);
    }
    setIsParsedSearchParamsAdded(true);
  }, [parsedSearchParams]);

  useEffect(() => {
    setParsedSearchParams(
      queryString.parse(searchParams.toString(), { arrayFormat: "comma" })
    );
  }, [searchParams]);

  const createQueryString = useCreateQueryString();
  const deleteQueryString = useDeleteQueryString();

  const applyFilters = () => {
    router.replace(`${pathname}?${createQueryString("category", shouldBeAdd)}`);
  };

  const deleteAllCategoryHandler = () => {
    clearShouldBeAdd();
  };

  const checkHandler: checkHandlerType = (value: string | number) => {
    const hasItem = shouldBeAdd.some((n) => n == value);
    return hasItem;
  };

  return (
    <div className="w-full max-w-1/2 _filter-wrap sm:w-auto">
      <div className="flex items-center justify-start _filter-section">
        {/* The button to open modal */}
        <label
          htmlFor={id}
          className="w-full btn btn-primary btn-outline sm:w-auto"
        >
          {citiesInQuery ? CATEGORY.SELECT : CATEGORY.SELECT}
        </label>

        {/* the modal */}
        <input type="checkbox" id={id} className="modal-toggle" />
        <div className="modal">
          <div className="modal-box p-0 max-h-[550px]">
            <div className="w-full p-4 bg-white sm:p-6">
              <h3 className="flex content-center justify-between text-lg font-bold">
                انتخاب دسته بندی
                {categoriesInQuery ? (
                  <span
                    onClick={deleteAllCategoryHandler}
                    className="cursor-pointer text-[15px] font-normal text-pink-800"
                  >
                    {GENERAL.DELETE_ALL}
                  </span>
                ) : null}
              </h3>
              <p className="py-3">
                دسته بندی یا دسته بندی های مورد نظر خود را انتخاب نمایید.
              </p>
              <input
                onChange={categorySearchHandler}
                type="text"
                placeholder="جستجو در لیست دسته بندی ها"
                className="w-full input input-bordered"
              />
            </div>
            <div className="px-6 sm:px-8 h-[16rem] overflow-y-scroll">
              {modifiedCategories?.map(
                (category: CategoryNamespace.category) => {
                  return (
                    <CategoryFilterItem
                      key={`category-filter-item-in-x-${category.name}`}
                      removeFromShouldBeAdd={removeFromShouldBeAdd}
                      parsedSearchParams={parsedSearchParams}
                      checkHandler={checkHandler}
                      shouldBeAdd={shouldBeAdd}
                      addToShouldBeAdd={addToShouldBeAdd}
                      category={category}
                    />
                  );
                }
              )}
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
        </div>
      </div>
    </div>
  );
}
