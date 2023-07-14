"use client";

import { GENERAL } from "../../../../components/allTexts";
import { CategoryNamespace } from "@/types/category";
import CategoryFilterItem from "./category.filter.item";
import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import queryString from "query-string";
import { useRouter } from "next/navigation";
import CategoryFilterSelectedItem from "./category.filter.selected.item";
import useCreateQueryString from "@/hooks/useCreateQueryString";
import useDeleteQueryString from "@/hooks/useDeleteQueryString";

type CategoryFilterType = {
  categories: CategoryNamespace.category[];
  id: string
};

export type ParsedSearchParamsType = {
  category?: string[] | string;
};

export type addToShouldBeAddType = (item: string) => void;
export type removeFromShouldBeAddType = (item: string) => void;
export type checkHandlerType = (value: string | number) => boolean | undefined;

export default function CategoryFilter({ categories, id }: CategoryFilterType) {
  const [modifiedCategories, setModifiedCategories] = useState(categories);
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
  const categoriesInQuery = queryString.parse(searchParams.toString(), {
    arrayFormat: "comma",
  }).category;
  const citiesInQuery = queryString.parse(searchParams.toString(), {
    arrayFormat: "comma",
  }).city;



  const [parsedSearchParams, setParsedSearchParams] = useState<ParsedSearchParamsType>({});
  const [isParsedSearchParamsAdded, setIsParsedSearchParamsAdded] = useState(false)
  const [shouldBeAdd, setShouldBeAdd] = useState<(string)[]>([])

  const addToShouldBeAdd: addToShouldBeAddType = (item: string) => {
    if (shouldBeAdd.includes(item))
      return;
    setShouldBeAdd(old => [...old, item])
  }

  const removeFromShouldBeAdd: removeFromShouldBeAddType = (item: string) => {
    setShouldBeAdd(old => {
      const index = old.indexOf(item)
      if (index != -1) {
        old.splice(index, 1)
      }
      return [...old];
    })
  }

  const clearShouldBeAdd = () => {
    setShouldBeAdd([])
  }


  useEffect(() => {
    if (isParsedSearchParamsAdded) return;
    if (!parsedSearchParams?.category) return;
    if (Array.isArray(parsedSearchParams.category)) {
      parsedSearchParams.category.forEach(categoryId => {
        addToShouldBeAdd(categoryId)
      })
    } else {
      addToShouldBeAdd(parsedSearchParams.category)
    }
    setIsParsedSearchParamsAdded(true)
  }, [parsedSearchParams])

  const createQueryString = useCreateQueryString()
  const deleteQueryString = useDeleteQueryString()

  const applyFilters = () => {
    router.replace(`${pathname}?${createQueryString("category", shouldBeAdd)}`);
  }

  const deleteAllCategoryHandler = () => {
    clearShouldBeAdd()
  };

  const checkHandler: checkHandlerType = (value: string | number) => {
    const hasItem = shouldBeAdd.find(n => n == value)
    if (hasItem) {
      return true
    } else {
      return false
    }
  }


  return (
    <div className="filter-section mb-4">
      {/* <h3 className="font-medium">{GENERAL.CATEGORY}</h3> */}

      {/* The button to open modal */}
      <label
        htmlFor={id}
        className={`btn ${!citiesInQuery ? "btn-outline" : "btn-outline"
          }  btn-primary w-full`}
      >
        {citiesInQuery ? GENERAL.CATEGORY_SELECT : GENERAL.CATEGORY_SELECT}
      </label>
      <div className="mt-3 px-3">
        {Array.isArray(categoriesInQuery) ? (
          categoriesInQuery.map((categoryId) => {
            if (!categoryId) return;
            const category = categories.find(
              (category) => category.id == +categoryId
            );
            if (!category) return;
            return <CategoryFilterSelectedItem removeFromShouldBeAdd={removeFromShouldBeAdd} category={category} />;
          })
        ) : categoriesInQuery &&
          categories.find((category) => category.id == +categoriesInQuery) ? (
          <CategoryFilterSelectedItem
            removeFromShouldBeAdd={removeFromShouldBeAdd}
            category={
              categories.find((category) => category.id == +categoriesInQuery)!
            }
          />
        ) : null}
      </div>

      {/* Put this part before </body> tag */}
      <input type="checkbox" id={id} className="modal-toggle" />
      <div className="modal">
        <div className=" modal-box p-0 max-h-[550px] ">
          <div className="pt-5 pb-3 px-8 bg-white w-full">
            <h3 className="flex justify-between content-center text-lg font-bold">
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
              className="input input-bordered w-full"
            />
          </div>
          <div className="px-8 h-[16rem] overflow-y-scroll">
            {modifiedCategories?.map((category: CategoryNamespace.category) => {
              return (
                <CategoryFilterItem key={`category-filter-item-in-x-${category.name}`} removeFromShouldBeAdd={removeFromShouldBeAdd} parsedSearchParams={parsedSearchParams} checkHandler={checkHandler} shouldBeAdd={shouldBeAdd} addToShouldBeAdd={addToShouldBeAdd} category={category} />
              );
            })}
          </div>

          <div className="modal-action box-border w-full pt-3 pb-5 px-8 mt-3 flex justify-between items-center bg-white shadow-2xl">
            <label onClick={applyFilters} htmlFor={id} className="btn btn-primary w-full">
              {GENERAL.CONFIRM}
            </label>
          </div>
        </div>
        <label className="modal-backdrop" htmlFor={id}>
          Close
        </label>
      </div>
    </div>
  );
}
