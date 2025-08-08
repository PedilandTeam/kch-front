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
import fetchCampaigns from "@/utils/fetchCampaigns";
import AdvertiseLg from "@/components/advertise/lg";
import AdvertiseSm from "@/components/advertise/sm";
import StaticAdvertise from "@/components/advertise/static";

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
  categoryIds?: number | number[],
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
  cityIds?: number | number[],
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

  const { customers, campaign } = await fetchCampaigns(country.code);

  return (
    <div className="component _unit-list pt-5">
      <div className="container">
        <div className="_page-content">
          <div className="_top-section">
            <div className="_wrapper flex w-full flex-wrap items-center justify-between">
              <div className="mb-4 flex items-center gap-3 px-3">
                <h1 className="text-secondary text-xl font-bold">
                  لیست {unit?.name} فارسی زبان در {country?.name}
                </h1>
                <span className="hidden font-medium text-gray-500">
                  ({pages?.meta.totalItems} آیتم)
                </span>
              </div>
              <ItemBreadCrumb
                unit={{ name: unit.name, slug: unit.slug }}
                country={{ name: country.name, code: country.code }}
              />
            </div>

            {/* Advertising Section P03 */}

            <AdvertiseLg
              from="unit"
              customers={[customers?.[0], customers?.[1]]}
              campaignId={campaign?.id}
            />
            <AdvertiseSm
              from="unit"
              customers={[customers?.[0], customers?.[1]]}
              campaignId={campaign?.id}
            />

            <div className="_filter hidden">
              <ListFilter cities={cities} categories={categories} />
            </div>
          </div>

          <div className="pt-2">
            <div className="sticky top-0 z-[9] bg-white p-3">
              <FilterMobile pagesTotalItems={pages?.meta.totalItems} />
              <FilterModalMobile
                cities={cities.items}
                categories={categories}
              />
            </div>
            <div className="px-3 pb-5">
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
          <AdvertiseLg
            from="unit"
            customers={[customers?.[2], customers?.[3]]}
            campaignId={campaign?.id}
          />
          <AdvertiseSm
            from="unit"
            customers={[customers?.[2], customers?.[3]]}
            campaignId={campaign?.id}
          />

          <div className="_wrapper mt-12 mb-5 flex flex-col items-center gap-3 px-3 xl:flex-row">
            <StaticAdvertise
              from="unit"
              lgDisable={customers.length >= 4}
              imageUrlOrPath="/images/banner/ads-002-S1_V1.jpg"
              link="https://biz.koochaa.com/"
            />
            <StaticAdvertise
              from="unit"
              lgDisable={customers.length >= 4}
              imageUrlOrPath="/images/banner/ads-001-S1_V6.jpg"
              link="https://tally.so/r/3XDljz"
            />
          </div>

          {/* SEO Text */}
          <SeoText currentCountry={country} unit={unit} />
        </div>
      </div>
    </div>
  );
}
