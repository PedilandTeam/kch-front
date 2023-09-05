import { API_ROUTES } from "@/routes";
import { CategoryNamespace } from "@/types/category";
import { CityNamespace } from "@/types/city";
import { Country, PageNamespace } from "@/types/page";
import { UnitType } from "@/types/unit";
import { notFound } from "next/navigation";
import { ItemBreadCrumb } from "./breadcrumb";
import { CardsList } from "./cardsList";
import ListFilter from "./filter/listFilter";

type PagesListProps = {
  unit: UnitType;
  country: Country;
  pageNumber?: number;
  city?: number | number[];
  category: number | number[];
};

async function fetchCities(countryCode: string, unitId: number): Promise<CityNamespace.GET> {
  let cities: CityNamespace.GET;

  try {
    cities = await (
      await API_ROUTES.CITIES.BY_COUNTRY(countryCode, {page:1, limit: 100, unitId: unitId})
    ).json();
  } catch (e) {
    console.log(await e);
    throw new Error("error in get cities fetchCities");
  }

  return cities;
}


async function fetchCategories(countryCode: string, unitId: number): Promise<CategoryNamespace.GET> {
  
  let categories: CategoryNamespace.GET | undefined
  try{
      categories = await (await API_ROUTES.CATEGOREIS.BY_COUNTRY(countryCode, {page: 1, limit: 100, unitId})).json()
  }catch(e){
    console.log(e);
    throw new Error("Error in get Categories fetchCategories")
  }

  return categories!

}

export default async function UntiList({unit, country, pageNumber, city, category}: PagesListProps) {
  
  const cities = await fetchCities(country.code, unit.id);
  const categories: CategoryNamespace.category[] = await (await fetchCategories(country.code, unit.id)).items
  let isNotFound = false
  let pages: PageNamespace.GET | undefined = undefined
  


  try{
    pages = await (await API_ROUTES.PAGES.GET_ALL(pageNumber ? pageNumber : 1, 30, {countryCode: country.code, unitId: unit.id, categoryIds: category, cityIds: city})).json()
  }catch(e: any){
    isNotFound = true

  }

  if(pages && pages.items.length == 0){
    isNotFound = true
  }

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
              country={{ name: country.name, code: country.code }}
            />
            <h1 className="text-[20px] font-bold mt-3 mb-5 text-pink-800">
              لیست {unit?.name} فارسی زبان در {country?.name}
            </h1>
            {
              isNotFound 
              ? 
              <h4>با فیلترهای وارد شده چیزی یافت نشد </h4>
              :
              <CardsList pages={pages!} unit={unit} country={country} />
            }
          </div>
        </div>
      </div>
    </div>
  );
}
