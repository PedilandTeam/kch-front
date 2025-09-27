import { API_ROUTES } from "@/routes";
import { CategoryNamespace } from "@/types/category";
import { CityNamespace } from "@/types/city";
import { UnitType } from "@/types/unit";
import joiner from "@/utils/joiner";
import { notFound } from "next/navigation";
import { ItemBreadCrumb } from "./breadcrumb";
import { CardsList } from "./cardsList";
import ListFilter from "./filter/listFilter";
import { Country } from "@/types/country";
import { Suspense } from "react";
import Loading from "../_loading";
import FilterMobile from "./filter/filter.mobile";
import FilterModalMobile from "./filter/filterModal.mobile";
import PagesSearch from "./filter/pages.search";
import { PageNamespace } from "@/types/page";
import fetchCampaigns from "@/utils/fetchCampaigns";
import AdvertiseLg from "@/components/advertise/lg";
import AdvertiseSm from "@/components/advertise/sm";
import StaticAdvertise from "@/components/advertise/static";

type PagesListProps = {
  category: CategoryNamespace.category;
  country: Country;
  unit: UnitType;
  pageNumber: number;
  city: number | number[];
  search: string;
};

async function fetchCities(
  countryCode: string,
  categoryId: number,
): Promise<CityNamespace.GET> {
  let cities: CityNamespace.GET;

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

export default async function CategoryList({
  category,
  country,
  unit,
  pageNumber,
  city,
  search,
}: PagesListProps) {
  if (!country) return notFound();
  const cities = await fetchCities(country.code, category?.id);

  let pages: PageNamespace.GET | undefined = undefined;
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
    <div className="component _category-list pt-5">
      <div className="container mx-auto max-w-[1144px]">
        <div className="_page-content">
          <div className="_top-section">
            <div className="flex w-full flex-wrap items-center justify-between">
              <div className="mb-4 flex items-center gap-3 px-3">
                <h1 className="text-secondary text-xl font-bold">
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
            </div>

            {/* Advertising Section P03 */}
            <AdvertiseLg
              from="category"
              customers={[customers?.[0], customers?.[1]]}
              campaignId={campaign?.id}
            />
            <AdvertiseSm
              from="category"
              customers={[customers?.[0], customers?.[1]]}
              campaignId={campaign?.id}
            />

            <div className="_filter hidden">
              <ListFilter cities={cities} />
            </div>
          </div>

          <div className="pt-2">
            <div className="sticky top-0 z-[9] bg-white p-3">
              <FilterMobile pagesTotalItems={pages?.meta.totalItems} />
              <FilterModalMobile cities={cities.items} />
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
                category={category}
                country={country}
                pageNumber={pageNumber}
                city={city}
                search={search}
              />
            </Suspense>
          </div>

          {/* Advertising Section P04 */}
          <AdvertiseLg
            from="category"
            customers={[customers?.[2], customers?.[3]]}
            campaignId={campaign?.id}
          />
          <AdvertiseSm
            from="category"
            customers={[customers?.[2], customers?.[3]]}
            campaignId={campaign?.id}
          />

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
      </div>
    </div>
  );
}
