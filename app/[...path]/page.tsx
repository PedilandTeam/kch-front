
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

export default async function CenterPage({ params }: { params: { path: string[] } }) {

  const paths = usePathSeparator(params.path);


  let countries: CountryNamespace.GET[]
  let isCountryExist: undefined | CountryNamespace.GET
  try{
    countries = await (await API_ROUTES.COUNTRIES.GET_ALL("default", 20)).json()
    isCountryExist = countries.find(country => country.code == paths.countryOrSlug)
    if (isCountryExist && !paths.unit) {
      //show country
      return <Country />;
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
      units = await (await API_ROUTES.UNITS.GET_ALL("default", 10)).json()
      const isUnitExist = units.find(unit => unit.slug == decodeURIComponent(paths.unit))
      
      if(isUnitExist){
        return <List unit={isUnitExist} />;
      }
    }catch(e){
      throw new Error("error in get all units")
    }


  }


  //show single page
  try{
    const pageData = await (await API_ROUTES.PAGES.GET_ALL(1, 1, paths.countryOrSlug, "default", 5)).json()
    if(!pageData?.items){
      notFound()
    }
    return <PageItem pageData={pageData.items} />;
  }catch(e){
    notFound()
  }
}
