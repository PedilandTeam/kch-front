import { API_ROUTES } from "@/routes";
import { CategoryNamespace } from "@/types/category";
import { CityNamespace } from "@/types/city";
import { CountryNamespace } from "@/types/country";
import { UnitType } from "@/types/unit";
import joiner from "@/utils/joiner";
import { ItemBreadCrumb } from "./breadcrumb";
import { CardsList } from "./cardsList";
import ListFilter from "./filter/listFilter";
import { Suspense } from "react";
import Loading from "./_loading";
import SideBanner from "@/app/banners/side-banner";
import { FunnelIcon } from "@heroicons/react/24/solid";
import { _TXT } from "@/app/text";

type PagesListProps = {
  unit: UnitType;
  country: CountryNamespace.GET;
  pageNumber?: number;
  city?: number | number[];
  category?: number | number[];
  search?: string;
};

async function fetchCities(
  countryCode: string,
  unitIds: number,
  categoryIds?: number | number[]
): Promise<CityNamespace.GET> {
  let cities: CityNamespace.GET;
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
  cityIds?: number | number[]
): Promise<CategoryNamespace.GET> {
  let categories: CategoryNamespace.GET | undefined;
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

export default async function UntiList({
  unit,
  country,
  pageNumber,
  city,
  category,
  search,
}: PagesListProps) {
  const cities = await fetchCities(country.code, unit.id, category);
  const categories: CategoryNamespace.category[] = (
    await fetchCategories(country.code, unit.id, city)
  ).items;

  return (
    <div className="component sm:mt-3 page-list">
      <div className="container mx-auto max-w-[1144px]">
        <div className="grid grid-cols-1 sm:grid-cols-8 gap-y-4 sm:gap-8">
          <div className="sidebar hidden sm:block sm:col-span-2">
            <ListFilter cities={cities} categories={categories} />
          </div>

          <div className="page-content sm:col-span-6">
            <div className="flex flex-wrap">
              <div className="sm:order-2 w-full sm:mb-2">
                <ItemBreadCrumb
                  unit={{ name: unit.name, slug: unit.slug }}
                  country={{ name: country.name, code: country.code }}
                />
              </div>

              <div className="page-header sm:order-1 w-full px-3 sm:px-0">
                <h1 className="text-xl font-semibold my-4 sm:mt-0 sm:mb-3 text-pink-800">
                  لیست {unit?.name} فارسی زبان در {country?.name}
                </h1>
              </div>
            </div>

            <div className="px-3 sm:px-0">
              <div
                className="filter-title w-full flex md:hidden border p-3 bg-slate-50 rounded-xl mb-3"
                // onClick={() => {
                //   if (document) {
                //     (
                //       document.getElementById(
                //         "modal_unit_filter"
                //       ) as HTMLFormElement
                //     ).showModal();
                //   }
                // }}
              >
                <FunnelIcon className="h-5 w-5 ml-2" />
                <span className="font-semibold">{_TXT.FILTER.SELECT}</span>
              </div>
              <Suspense
                fallback={<Loading />}
                key={`unit-cardlist-${search}-${city}-${category}`}
              >
                <CardsList
                  unit={unit}
                  country={country}
                  category={category}
                  search={search}
                  pageNumber={pageNumber}
                  city={city}
                />
              </Suspense>
            </div>
          </div>

          <div className="sm:hidden mt-5 mx-3">
            <SideBanner />
          </div>
        </div>
      </div>
    </div>
  );
}
