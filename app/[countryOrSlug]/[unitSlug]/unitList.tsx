import { API_ROUTES } from "@/routes";
import { CategoryNamespace } from "@/types/category";
import { CityNamespace } from "@/types/city";
import { Country } from "@/types/page";
import { UnitType } from "@/types/unit";
import { ItemBreadCrumb } from "./breadcrumb";
import { CardsList } from "./cardsList";
import ListFilter from "./filter/listFilter";

type PagesListProps = {
  unit: UnitType;
  currentCountry: Country;
};

async function fetchCities(countryCode: string): Promise<CityNamespace.GET> {
  let cities: CityNamespace.GET;

  try {
    cities = await (
      await API_ROUTES.CITIES.GET_ALL(1, 100, countryCode, 20)
    ).json();
  } catch (e) {
    console.log(e);
    throw new Error("error in get cities fetchCities");
  }

  return cities;
}

export default async function UntiList({
  unit,
  currentCountry,
}: PagesListProps) {
  const cities = await fetchCities(currentCountry.code);
  const categories: CategoryNamespace.category[] = unit.categories;

  // if (!unit.id) {
  //   return <span className="loading loading-ring loading-lg"></span>;
  // }
  return (
    <div className="component mt-5 page-list">
      <div className="container mx-auto max-w-[1144px]">
        <div className="grid grid-cols-1 sm:grid-cols-8 gap-y-4 sm:gap-8 px-3 sm:px-0">
          <div className="sidebar sm:col-span-2">
            <ListFilter cities={cities} categories={categories} />
          </div>
          <div className="page-content sm:col-span-6">
            <ItemBreadCrumb
              unit={{ name: unit.name, slug: unit.slug }}
              country={{ name: currentCountry.name, code: currentCountry.code }}
            />
            <h1 className="text-[20px] font-bold mt-3 mb-5 text-pink-800">
              لیست {unit?.name} فارسی زبان
            </h1>
            <CardsList unit={unit} country={currentCountry} />
          </div>
        </div>
      </div>
    </div>
  );
}
