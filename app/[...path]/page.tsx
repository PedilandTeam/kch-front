
import { usePathSeparator } from "@/hooks/usePathSeparator";
import PagesList from "./list/list";
import { API_ROUTES } from "@/routes";
import { CountryNamespace } from "@/types/country";
import PageItem from "./item/item";
import {notFound} from "next/navigation"
import Item from "./item/item";
import Country from "./country/country";
import List from "./list/list";
import { UnitType } from "@/types/unit";
import ListFilter from "./list/filter/listFilter";

export default async function CenterPage({ params }: { params: { path: string[] } }) {

  const paths = usePathSeparator(params.path);


  let countries: CountryNamespace.GET[]
  let isCountryExist: undefined | CountryNamespace.GET
  const categories = await(await API_ROUTES.CATEGOREIS.GET_ALL(1, 100, undefined, 20)).json()
  try{
    countries = await (await API_ROUTES.COUNTRIES.GET_ALL(20)).json() 
    isCountryExist = countries.find(country => country.code == paths.countryOrSlug)
    if (isCountryExist && !paths.unit) {
      //show country
      return <Country categories={categories} currentCountry={isCountryExist} />;
    }
  }
  catch(e){
    console.log("error in countries", e);  
    throw new Error("cant get countries")
  }

  
  
  if (isCountryExist && paths.unit) {
    // show list of pages

    let units: UnitType[]
    try{
      units = await (await API_ROUTES.UNITS.GET_ALL(10)).json()
      const isUnitExist = units.find(unit => unit.slug == decodeURIComponent(paths.unit))
      
      if(isUnitExist){
        //@ts-expect-error Server Component
        return <List unit={isUnitExist} country={isCountryExist} paths={paths}/>
      }
    }catch(e){
      throw new Error("error in get all units")
    }


  }


  //show single page
  try{
    const pageData = await (await API_ROUTES.PAGES.GET_ALL(1, 1, paths.countryOrSlug, 20)).json()
    if(!pageData?.items){
      notFound()
    }
    return <PageItem pageData={pageData.items} />;
  }catch(e){
    notFound()
  }
}
