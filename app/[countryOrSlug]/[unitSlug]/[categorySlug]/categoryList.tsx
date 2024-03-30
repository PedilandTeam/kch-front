import { API_ROUTES } from "@/routes";
import { CategoryNamespace } from "@/types/category";
import { CityNamespace } from "@/types/city";
import { UnitType } from "@/types/unit";
import joiner from "@/utils/joiner";
import { notFound } from "next/navigation";
import { ItemBreadCrumb } from "./breadcrumb";
import { CardsList } from "./cardsList";
import ListFilter from "./filter/listFilter";
import { CountryNamespace } from "@/types/country";
import { Suspense } from "react";
import Loading from "../_loading";
import SideBanner from "@/app/banners/side-banner";
import FilterMobile from "./filter/filter.mobile";
import FilterModalMobile from "./filter/filterModal.mobile";
import Image from "next/image";

type PagesListProps = {
  category: CategoryNamespace.category;
  country: CountryNamespace.GET;
  unit: UnitType;
  pageNumber: number;
  city: number | number[];
  search: string;
};

async function fetchCities(
  countryCode: string,
  categoryId: number
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
  const cities = await fetchCities(country.code, category.id);

  return (
    <div className="pt-5 component _page-list">
      <div className="container mx-auto max-w-[1144px]">
        <div className="_page-content">
          <div className="_top-section">
            <div className="flex items-center justify-between w-full pb-5">
              <h1 className="text-2xl font-bold text-secondary">
                لیست{" "}
                {category?.seoTitle
                  ? category.seoTitle
                  : `${category.name} فارسی زبان`}{" "}
                در {country?.name}{" "}
              </h1>
              <ItemBreadCrumb
                unit={unit}
                category={category}
                country={{ name: country.name, code: country.code }}
              />
            </div>
            
            {/* Advertising Section P03 */}
            {/* <div className="flex flex-wrap gap-3 px-3 sm:gap-5 sm:px-0">
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

            <div className="hidden sm:block _filter">
              <ListFilter cities={cities} />
            </div>
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

          <div className="md:hidden">
            <FilterMobile />
            <FilterModalMobile cities={cities.items} />
          </div>
        </div>
      </div>
    </div>
  );
}
