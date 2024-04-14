"use client";

import { CategoryNamespace } from "@/types/category";
import CategoryFilterItem from "./category.filter.item";
import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import queryString from "query-string";
import { useRouter } from "next/navigation";
import CategoryFilterSelectedItem from "./category.filter.selected.item";
import { CATEGORY } from "@/app/text/directory";
import { GENERAL } from "@/app/text/general";

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
    <div className="mb-4 filter-section">
      {/* <h3 className="font-medium">{GENERAL.CATEGORY}</h3> */}

      {/* The button to open modal */}
      <label
        htmlFor="category_modal"
        className={`btn ${
          !citiesInQuery ? "btn-outline" : "btn-outline"
        }  btn-primary btn-wide`}
      >
        {citiesInQuery ? CATEGORY.SELECT : CATEGORY.SELECT}
      </label>
      <div className="py-3 mt-3">
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
          <div className="w-full px-8 pt-5 pb-3 bg-white">
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
          <div className="px-8 h-[16rem] overflow-y-scroll">
            {modifiedCategories?.map((category: CategoryNamespace.category) => {
              return (
                <CategoryFilterItem
                  key={`category-filter-selected-modified-${category.name}`}
                  category={category}
                />
              );
            })}
          </div>

          <div className="box-border flex items-center justify-between w-full px-8 pt-3 pb-5 mt-3 bg-white shadow-2xl modal-action">
            <label htmlFor="category_modal" className="w-full btn btn-primary">
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
