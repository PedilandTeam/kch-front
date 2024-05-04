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
import FilterMobile from "./filter/filter.mobile";
import FilterModalMobile from "./filter/filterModal.mobile";
import PagesSearch from "./[categorySlug]/filter/pages.search";
import { PageNamespace } from "@/types/page";
import { SeoText } from "./seoText";

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

  let pages: PageNamespace.GET | undefined = undefined;
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

  return (
    <div className="pt-5 component _unit-list">
      <div className="container mx-auto max-w-[1144px]">
        <div className="_page-content">
          <div className="_top-section">
            <div className="flex flex-wrap items-center justify-between w-full sm:flex-nowrap">
              <div className="flex items-center gap-3 px-3 mb-4 sm:mb-0 sm:px-0">
                <h1 className="text-xl font-bold sm:text-2xl text-secondary">
                  لیست {unit?.name} فارسی زبان در {country?.name}
                </h1>
                <span className="hidden font-medium text-gray-500 sm:inline">
                  ({pages?.meta.totalItems} آیتم)
                </span>
              </div>
              <ItemBreadCrumb
                unit={{ name: unit.name, slug: unit.slug }}
                country={{ name: country.name, code: country.code }}
              />
            </div>

            {/* Advertising Section P03 */}
            {/* <div className="flex flex-wrap gap-3 px-3 pt-5 sm:gap-5 sm:px-0">
              <div>
                <Image
                  src={"/images/banner/bnr-04.gif"}
                  width={562}
                  height={72}
                  alt="banner"
                />
              </div>
              <div className="hidden sm:block">
                <Image
                  src={"/images/banner/bnr-04.gif"}
                  width={562}
                  height={72}
                  alt="banner"
                />
              </div>
            </div> */}

            <div className="hidden sm:block _filter">
              <ListFilter cities={cities} categories={categories} />
            </div>
          </div>

          <div className="pt-2 sm:pt-0">
            <div className="sticky top-0 z-[9] p-3 bg-white sm:hidden">
              <FilterMobile pagesTotalItems={pages?.meta.totalItems} />
              <FilterModalMobile
                cities={cities.items}
                categories={categories}
              />
            </div>
            <div className="px-3 pb-5 sm:hidden">
              <PagesSearch />
            </div>

            {/* Cards List */}
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

          {/* Advertising Section P05 */}
          {/* <div className="flex flex-wrap gap-3 px-3 sm:gap-5 sm:px-0 my-14">
            <div>
              <Image
                src={"/images/banner/bnr-04.gif"}
                width={562}
                height={72}
                alt="banner"
              />
            </div>
            <div>
              <Image
                src={"/images/banner/bnr-04.gif"}
                width={562}
                height={72}
                alt="banner"
              />
            </div>
          </div> */}

          {/* SEO Text */}
          <SeoText currentCountry={country} unit={unit} />
        </div>
      </div>
    </div>
  );
}
