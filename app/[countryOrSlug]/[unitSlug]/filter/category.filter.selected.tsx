"use client";

import { FC } from "react";
import CategoryFilterSelectedItem from "./category.filter.selected.item";
import { CategoryNamespace } from "@/types/category";
import { removeFromShouldBeAddType } from "./category.filter";
import queryString from "query-string";
import { useSearchParams } from "next/navigation";

type CategoryFilterSelected = {
  categories: CategoryNamespace.category[];
  removeFromShouldBeAdd: removeFromShouldBeAddType;
};
const CategoryFilterSelected: FC<CategoryFilterSelected> = ({
  categories,
  removeFromShouldBeAdd,
}) => {
  const searchParams = useSearchParams()
  const categoriesInQuery = queryString.parse(searchParams.toString(), {
    arrayFormat: "comma",
  }).category;
  return (
    <div className="flex items-center gap-3">
      {Array.isArray(categoriesInQuery) ? (
        categoriesInQuery.map((categoryId) => {
          if (!categoryId) return;
          const category = categories.find(
            (category) => category.id == +categoryId
          );
          if (!category) return;
          return (
            <CategoryFilterSelectedItem
              key={`category-in-query-${category.slug}`}
              removeFromShouldBeAdd={removeFromShouldBeAdd}
              category={category}
            />
          );
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
  );
};

export default CategoryFilterSelected;
