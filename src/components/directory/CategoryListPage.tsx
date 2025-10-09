import { API_ROUTES } from "@/routes";
import type { City, Country } from "@/schemas";
import type { Category } from "@/types/category";
import type { GetPagesResponse } from "@/types/page";
import type { UnitType } from "@/types/unit";
import fetchCampaigns from "@/utils/fetchCampaigns";
import joiner from "@/utils/joiner";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import Loading from "../../app/[countryOrSlug]/[unitSlug]/_loading";
import { ItemBreadCrumb } from "./CategoryBreadcrumb";

import { ItemCardsList, StaticAdvertise } from "@components/index";

type PagesListProps = {
  category: Category;
  country: Country;
  unit: UnitType;
  pageNumber: number;
  city: number | number[];
  search: string;
};

async function fetchCities(
  countryCode: string,
  categoryId: number,
): Promise<City[]> {
  let cities: City[];

  try {
    cities = await (
      await API_ROUTES.CITIES.BY_COUNTRY(countryCode, {
        page: 1,
        limit: 100,
        categoryIds: joiner(categoryId),
      })
    ).json();
  } catch (e) {
    console.log(await e);
    throw new Error("error in get cities fetchCities");
  }

  return cities;
}

interface CategoryListPageProps {
  category: Category;
  country: Country;
  unit: UnitType;
  pageNumber: number;
  city: number | number[];
  search: string;
}

export const CategoryListPage = async ({
  category,
  country,
  unit,
  pageNumber,
  city,
  search,
}: CategoryListPageProps) => {
  if (!country) return notFound();
  const cities = await fetchCities(country.code, category?.id);

  let pages: GetPagesResponse | undefined = undefined;
  try {
    pages = await (
      await API_ROUTES.PAGES.GET_ALL(pageNumber ? pageNumber : 1, 24, {
        countryCode: country.code,
        cityIds: city,
        categoryIds: category?.id,
        search,
      })
    ).json();
  } catch (e: any) {
    // Because this handle in CardsList
    console.log(e);
    console.log(e?.response?.data);
  }

  const defaultSeoDescription =
    category.seoDescription &&
    category.seoDescription.replace(
      /{{country}}/g,
      country.name || country.englishName,
    );

  const { customers, campaign } = await fetchCampaigns(country.code);

  return (
    <div className="_category-list-page">
      <div className="_header flex items-center gap-3 p-3">
        <h1 className="text-secondary text-lg font-semibold">
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

      <ItemBreadCrumb
        unit={unit}
        category={category}
        country={{ name: country.name, code: country.code }}
      />

      {/* Cards List */}
      <Suspense
        fallback={<Loading />}
        key={`unit-cardlist-${search}-${city}-${category}`}
      >
        <ItemCardsList
          category={category}
          country={country}
          pageNumber={pageNumber}
          city={city}
          search={search}
        />
      </Suspense>

      <div className="mt-12 mb-5 flex flex-wrap gap-3 px-3">
        <StaticAdvertise
          from="category"
          lgDisable={customers.length >= 4}
          imageUrlOrPath="/images/banner/ads-002-S1_V1.jpg"
          link="https://biz.koochaa.com/"
        />
        <StaticAdvertise
          from="category"
          lgDisable={customers.length >= 4}
          imageUrlOrPath="/images/banner/ads-001-S1_V6.jpg"
          link="https://tally.so/r/3XDljz"
        />
      </div>

      {/* SEO Text */}
      <div className="_SEO-text mx-7 my-10">
        <p className="text-justify font-normal text-gray-500">
          {defaultSeoDescription}
        </p>
      </div>
    </div>
  );
};
