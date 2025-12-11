"use client";

import { AdsClubBanner } from "@/components/banners/AdsClubBanner";
import { TelegramBanner } from "@/components/banners/TelegramBanner";
import { CategoryBreadcrumb } from "@/components/directory/CategoryBreadcrumb";
import { ItemCardsList } from "@/components/directory/item";
import { WrapContainer } from "@/components/layout/WrapContainer";
import { WrapPageImage } from "@/components/layout/WrapPageImage";
import { usePagesList } from "@/hooks/swr/usePagesList";
import type { Country } from "@/schemas";
import type { Category } from "@/types/category";
import type { UnitType } from "@/types/unit";

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
  const { pages, loading } = usePagesList({
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
        <div className="flex flex-col items-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <h1 className="text-lg font-semibold text-white drop-shadow-sm drop-shadow-black/70">
              لیست {category?.seoTitle ? category.seoTitle : category.name}{" "}
              ایرانی در {country?.name}
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
      </WrapContainer>

      {loading ? (
        <div className="flex min-h-[400px] items-center justify-center py-8">
          <div className="text-white">در حال بارگذاری...</div>
        </div>
      ) : (
        <ItemCardsList pages={pages} country={country} />
      )}

      <AdsClubBanner />

      <TelegramBanner />

      {/* SEO Text */}
      <WrapContainer>
        <p className="text-justify font-normal text-gray-500">
          {defaultSeoDescription}
        </p>
      </WrapContainer>
    </WrapPageImage>
  );
}
