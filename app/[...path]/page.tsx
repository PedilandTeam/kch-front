
import { usePathSeparator } from "@/hooks/usePathSeparator";
import { API_ROUTES } from "@/routes";
import { CountryNamespace } from "@/types/country";
import PageItem from "./item/item";
import { notFound } from "next/navigation";
import Country from "./country/country";
import List from "./unitList/unitList";
import { UnitType } from "@/types/unit";
import { CategoryNamespace } from "@/types/category";
import CategoryList from "./categoryList/categoryList";

export default async function CenterPage({ params }: { params: { path: string[] } }) {

  const paths = usePathSeparator(params.path);


  let countries: CountryNamespace.GET[]
  let isCountryExist: undefined | CountryNamespace.GET
  try{
    const categories = await(await API_ROUTES.CATEGOREIS.GET_ALL(1, 100, undefined, 20)).json()
    countries = await (await API_ROUTES.COUNTRIES.GET_ALL(20)).json() 
    isCountryExist = countries.find(country => country.code == paths.countryOrSlug)


    //Step1: check if page is country page
    if (isCountryExist && !paths.unitOrCategory) {
      //show country
      return <Country categories={categories} currentCountry={isCountryExist} />;
    }
  }
  catch(e){
    console.log("error in countries", e);  
    throw new Error("cant get countries")
  }

  
  
  /**
   * Step2: check if the path is countryCode/unitOrCategory
   * @example de/آبمیوه_و_بستنی
   * @example de/businesses
   */ 
  if (isCountryExist && paths.unitOrCategory) {
    // show list of pages

    let units: UnitType[]
    let categories: CategoryNamespace.GET
    try{
      units = await (await API_ROUTES.UNITS.GET_ALL(10)).json()
      const isUnitExist = units.find(unit => unit.slug == decodeURIComponent(paths.unitOrCategory))
      
      if(isUnitExist){
        //@ts-expect-error Server Component
        return <List unit={isUnitExist} country={isCountryExist} paths={paths}/>
      }

      categories = await (await API_ROUTES.CATEGOREIS.GET_ALL(1, 1, paths.unitOrCategory)).json()
      const categoriesItems = categories.items
      const targetCategory = categoriesItems[0]
      if(targetCategory){
        //@ts-expect-error Server Component
        return <CategoryList cateogory={targetCategory} paths={paths} country={isCountryExist} />
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
