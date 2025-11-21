"use client";

import useSWR from "swr";
import axios from "axios";
import type { Country } from "@/schemas";
import type { Category } from "@/types/category";
import type { GetPagesResponse } from "@/types/page";
import type { UnitType } from "@/types/unit";
import { CategoryBreadcrumb } from "./CategoryBreadcrumb";
import { WrapPageImage } from "../layout/WrapPageImage";
import { WrapContainer } from "../layout/WrapContainer";
import { ItemCardsList } from "./item";
import { fetcher } from "@/hooks/swr/fetcher";
import { usePagesList } from "@/hooks/swr/usePageList";

interface CategoryListPageProps {
  category: Category;
  country: Country;
  unit: UnitType;
  pageNumber?: number;
  city?: number | number[];
  search?: string;
}

export function CategoryListPage({
  category,
  country,
  unit,
  pageNumber,
  city,
  search,
}: CategoryListPageProps) {
  const { pages, loading, error } = usePagesList({
    page: pageNumber || 1,
    limit: 24,
    countryCode: country.code,
    categoryIds: category.id,
    cityIds: city,
    search,
  });

  const defaultSeoDescription =
    category.seoDescription &&
    category.seoDescription.replace(
      /{{country}}/g,
      country.name || country.englishName,
    );

  return (
    <WrapPageImage className="_category-list-page h-full" country={country}>
      <WrapContainer>
        <div className="mb-6 flex flex-col items-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <h1 className="text-lg font-semibold text-white drop-shadow-sm drop-shadow-black/70">
              لیست{" "}
              {category?.seoTitle
                ? category.seoTitle
                : `${category.name} فارسی زبان`}{" "}
              در {country?.name}
            </h1>
            <span className="hidden font-medium text-gray-500">
              ({pages?.meta.totalItems} آیتم)
            </span>
          </div>
          <CategoryBreadcrumb
            unit={{ name: unit.name, slug: unit.slug }}
            category={{ name: category.name, slug: category.slug }}
            country={{ name: country.name, code: country.code }}
          />
        </div>

        {loading ? (
          <div className="flex min-h-[400px] items-center justify-center py-8">
            <div className="text-white">در حال بارگذاری...</div>
          </div>
        ) : (
          <ItemCardsList pages={pages} country={country} />
        )}

        {/* SEO Text */}
        <div className="_SEO-text px-4">
          <p className="text-justify font-normal text-gray-500">
            {defaultSeoDescription}
          </p>
        </div>
      </WrapContainer>
    </WrapPageImage>
  );
}
