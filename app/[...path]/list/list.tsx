

import { usePages } from "@/hooks/swr/usePages";
import { usePathSeparator, usePathSeparatorType } from "@/hooks/usePathSeparator";
import { API_ROUTES } from "@/routes";
import { Country } from "@/types/page";
import { UnitType } from "@/types/unit";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { ItemBreadCrumb } from "./breadcrumb";
import { CardsList } from "./cardsList";
import ListFilter from "./filter/listFilter";

type PagesListProps = {
  unit: UnitType,
  country: Country,
  paths: usePathSeparatorType,
}

async function fetchCities(countryCode: string){
  return await(await API_ROUTES.CITIES.GET_ALL(1, 100, countryCode,20)).json()
}

export default async function PagesList({unit, paths, country}: PagesListProps) {

  const cities = await fetchCities(country.code)

  if(!paths.countryOrSlug || !unit.id){
    return <p>loading</p>
  }
  return (
    <div className="component mt-5 page-list">
      <div className="container mx-auto max-w-[1144px]">
        <div className="grid grid-cols-1 sm:grid-cols-8 gap-y-4 sm:gap-8 px-3 sm:px-0">
          <div className="sidebar sm:col-span-2">
            <ListFilter cities={cities}/>
          </div>
          <div className="page-content sm:col-span-6">
            <ItemBreadCrumb unit={{name: unit.name, slug: unit.slug}} country={{name: country.name, code: country.code}}/>
            <h1 className="text-[20px] font-bold mt-3 mb-5 text-pink-800">لیست {unit?.name} فارسی زبان</h1>
            <div className="list-card grid grid-cols-1 sm:grid-cols-2 gap-y-4 sm:gap-4">
              <CardsList paths={paths} unit={unit} country={country} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
