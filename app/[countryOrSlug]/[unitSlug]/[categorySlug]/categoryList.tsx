import { API_ROUTES } from "@/routes";
import { CategoryNamespace } from "@/types/category";
import { CityNamespace } from "@/types/city";
import { Country, PageNamespace } from "@/types/page";
import { UnitType } from "@/types/unit";
import joiner from "@/utils/joiner";
import { notFound } from "next/navigation";
import { ItemBreadCrumb } from "./breadcrumb";
import { CardsList } from "./cardsList";
import ListFilter from "./filter/listFilter";

type PagesListProps = {
  category: CategoryNamespace.category;
  country: Country;
  unit: UnitType;
  pageNumber: number;
  city: number | number[];
  search: string
};

async function fetchCities(countryCode: string, categoryId: number): Promise<CityNamespace.GET> {
  let cities: CityNamespace.GET;

  try {
    cities = await (
      await API_ROUTES.CITIES.BY_COUNTRY(countryCode, {page:1, limit: 100, categoryIds: joiner(categoryId)})
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
  search
}: PagesListProps) {
  if (!country) return notFound();
  const cities = await fetchCities(country.code, category.id);
  let pages: PageNamespace.GET | undefined;
  let isNotFound = false;

  try {
    pages = await (
      await API_ROUTES.PAGES.GET_ALL(pageNumber ? pageNumber : 1, 30, {
        countryCode: country.code,
        unitId: unit.id,
        cityIds: city,
        categoryIds: category.id,
        search
      })
    ).json();
  } catch (e) {
    isNotFound = true;
  }

  if (pages && pages.items.length == 0) {
    isNotFound = true;
  }

  return (
    <div className="component mt-5 page-list">
      <div className="container mx-auto max-w-[1144px]">
        <div className="grid grid-cols-1 sm:grid-cols-8 gap-y-4 sm:gap-8 px-3 sm:px-0">
          <div className="sidebar sm:col-span-2">
            <ListFilter cities={cities} />
          </div>
          <div className="page-content sm:col-span-6">
            <ItemBreadCrumb
              unit={unit}
              category={category}
              country={{ name: country.name, code: country.code }}
            />
            <h1 className="text-[20px] font-bold mt-3 mb-5 text-pink-800">
              لیست {category?.name} فارسی زبان در {country?.name}
            </h1>
            {isNotFound ? (
              <h4>متاسفانه، نتیجه‌ای برای جستجو شما یافت نشد.</h4>
            ) : (
              <CardsList pages={pages!} category={category} country={country} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
