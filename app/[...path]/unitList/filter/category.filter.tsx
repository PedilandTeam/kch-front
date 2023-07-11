"use client";

import { GENERAL } from "../../../../components/allTexts";
import { CategoryNamespace } from "@/types/category";
import CategoryFilterItem from "./category.filter.item";
import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import queryString from "query-string";
import { useRouter } from "next/navigation";
import CategoryFilterSelectedItem from "./category.filter.selected.item";

type CategoryFilterType = {
  categories: CategoryNamespace.category[];
};
export default function CategoryFilter({ categories }: CategoryFilterType) {
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

  const deleteAllCategoryHandler = () => {
    const query = queryString.parse(searchParams.toString());
    if (query.category) {
      delete query.category;
    }
    router.replace(`${pathname}?${queryString.stringify(query)}`);
  };

  return (
    <div className="filter-section mb-4">
      {/* <h3 className="font-medium">{GENERAL.CATEGORY}</h3> */}

      {/* The button to open modal */}
      <label
        htmlFor="category_modal"
        className={`btn ${
          !citiesInQuery ? "btn-outline" : "btn-outline"
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
            return <CategoryFilterSelectedItem category={category} />;
          })
        ) : categoriesInQuery &&
          categories.find((category) => category.id == +categoriesInQuery) ? (
          <CategoryFilterSelectedItem
            category={
              categories.find((category) => category.id == +categoriesInQuery)!
            }
          />
        ) : null}
      </div>

      {/* Put this part before </body> tag */}
      <input type="checkbox" id="category_modal" className="modal-toggle" />
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
                <CategoryFilterItem key={category.name} category={category} />
              );
            })}
          </div>

          <div className="modal-action box-border w-full pt-3 pb-5 px-8 mt-3 flex justify-between items-center bg-white shadow-2xl">
            <label htmlFor="category_modal" className="btn btn-primary w-full">
              {GENERAL.CONFIRM}
            </label>
          </div>
        </div>
        <label className="modal-backdrop" htmlFor="category_modal">
          Close
        </label>
      </div>
    </div>
  );
}
