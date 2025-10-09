import { API_ROUTES } from "@/routes";
import type { City, Country } from "@/schemas";
import type { Category } from "@/types/category";
import type { GetPagesResponse } from "@/types/page";
import type { UnitType } from "@/types/unit";
import fetchCampaigns from "@/utils/fetchCampaigns";
import joiner from "@/utils/joiner";
import { Suspense } from "react";

import {
  ItemCardsList,
  LoaderText,
  StaticAdvertise,
  UnitBreadcrumb,
  UnitSeoText,
} from "@components/index";

interface UnitsListPageProps {
  unit: UnitType;
  country: Country;
  pageNumber?: number;
  city?: number | number[];
  category?: number | number[];
  search?: string;
}

async function fetchCities(
  countryCode: string,
  unitIds: number,
  categoryIds?: number | number[],
): Promise<City[]> {
  let cities: City[];
  try {
    cities = await (
      await API_ROUTES.CITIES.BY_COUNTRY(countryCode, {
        page: 1,
        limit: 100,
        unitIds: unitIds,
        categoryIds: joiner(categoryIds),
      })
    ).json();
  } catch (e) {
    console.log(await e);
    throw new Error("error in get cities fetchCities");
  }

  return cities;
}

async function fetchCategories(
  countryCode: string,
  unitIds: number | number[],
  cityIds?: number | number[],
): Promise<Category[]> {
  let categories: Category[];
  try {
    categories = await (
      await API_ROUTES.CATEGOREIS.BY_COUNTRY(countryCode, {
        page: 1,
        limit: 100,
        unitIds: joiner(unitIds),
        cityIds: joiner(cityIds),
      })
    ).json();
  } catch (e) {
    console.log(e);
    throw new Error("Error in get Categories fetchCategories");
  }

  return categories!;
}

export async function UnitsListPage({
  unit,
  country,
  pageNumber,
  city,
  category,
  search,
}: UnitsListPageProps) {
  const cities = await fetchCities(country.code, unit.id, category);
  const categories: Category[] = await fetchCategories(
    country.code,
    unit.id,
    city,
  );

  let pages: GetPagesResponse | undefined = undefined;
  try {
    pages = await (
      await API_ROUTES.PAGES.GET_ALL(pageNumber ? pageNumber : 1, 24, {
        countryCode: country.code,
        unitId: unit.id,
        categoryIds: category,
        cityIds: city,
        search,
      })
    ).json();
  } catch (e: any) {
    // Because this handle in CardsList
    console.log(e);
    console.log(e?.response?.data);
  }

  const { customers, campaign } = await fetchCampaigns(country.code);

  return (
    <main className="_unit-list-page">
      {/* Unit Page Header */}
      <div className="flex items-center gap-3 p-3">
        <h1 className="text-secondary text-lg font-semibold">
          لیست {unit?.name} فارسی زبان در {country?.name}
        </h1>
        {/* <span className="hidden font-medium text-gray-500">
          ({pages?.meta.totalItems} آیتم)
        </span> */}
      </div>

      {/* Unit Page BreadCrumb */}
      <UnitBreadcrumb
        unit={{ name: unit.name, slug: unit.slug }}
        country={{ name: country.name, code: country.code }}
      />

      {/* Cards List */}
      <Suspense
        fallback={<LoaderText />}
        key={`unit-cardlist-${search}-${city}-${category}`}
      >
        <ItemCardsList
          unit={unit}
          country={country}
          category={category}
          search={search}
          pageNumber={pageNumber}
          city={city}
        />
      </Suspense>

      <div className="px-3">
        <StaticAdvertise
          from="unit"
          lgDisable={customers.length >= 4}
          imageUrlOrPath="/images/banner/ads-002-S1_V1.jpg"
          link="https://biz.koochaa.com/"
        />
      </div>

      {/* SEO Text */}
      <UnitSeoText currentCountry={country} unit={unit} />

      <div className="px-3 pb-6">
        <StaticAdvertise
          from="unit"
          lgDisable={customers.length >= 4}
          imageUrlOrPath="/images/banner/ads-001-S1_V6.jpg"
          link="https://tally.so/r/3XDljz"
        />
      </div>
    </main>
  );
}
