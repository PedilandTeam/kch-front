
import { usePathSeparator } from "@/hooks/usePathSeparator";
import { API_ROUTES } from "@/routes";
import { CountryNamespace } from "@/types/country";
import { UnitType } from "@/types/unit";
import { CategoryNamespace } from "@/types/category";
import { Metadata } from "next";

type PathsType = "country" | "unit" | "category" | "item"
type PathGeneratorType = {
  type: PathsType | null,
  props?: any
}

const pathGenerator = async (path: string[]): Promise<PathGeneratorType> => {
    const paths = usePathSeparator(path);
    let countries: CountryNamespace.GET[]
    let currentCountry: undefined | CountryNamespace.GET
    try{
      const categories = await(await API_ROUTES.CATEGOREIS.GET_ALL(1, 300, undefined, undefined, 20)).json()
      countries = await (await API_ROUTES.COUNTRIES.GET_ALL(20)).json() 
      currentCountry = countries.find(country => country.code == paths.countryOrSlug)
  
  
      //Step1: check if page is country page
      if (currentCountry && !paths.unitOrCategory) {
        //show country
        // metadata = {...metadata, title: `کوچا | جامعه  ${isCountryExist.name}`}
        console.log("country", currentCountry.name);
        return {
          type: "country",
          props: {
            categories,
            currentCountry
          }
        }
        // return <Country metadata={metadata} categories={categories} currentCountry={isCountryExist} />;
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
    if (currentCountry && paths.unitOrCategory) {
      // show list of pages
  
      let units: UnitType[]
      let categories: CategoryNamespace.GET
      try{
        units = await (await API_ROUTES.UNITS.GET_ALL(10)).json()
        const unit = units.find(unit => unit.slug == decodeURIComponent(paths.unitOrCategory))
        
        if(unit){
          
          return {
            type: "unit",
            props: {
              unit,
              currentCountry
            }
          }
          // return <UnitList unit={isUnitExist} country={isCountryExist} paths={paths}/>
        }
  
        categories = await (await API_ROUTES.CATEGOREIS.GET_ALL(1, 1, paths.unitOrCategory)).json()
        const categoriesItems = categories.items
        const category = categoriesItems[0]
        if(category){
          return {
            type: "category",
            props: {
              category,
              paths,
              currentCountry
            }
          }
          // return <CategoryList category={targetCategory} paths={paths} country={isCountryExist} />
        }
  
      }catch(e){
        throw new Error("error in get all units")
      }
  
  
    }
  
  
    //show single page
    try{
      const pageData = await (await API_ROUTES.PAGES.GET_ALL(1, 1, paths.countryOrSlug, 20)).json()
      if(!pageData?.items){
        return {
            type: null
        }
      }
      return {
        type: "item",
        props: {
          pageData: pageData.items
        }
      }
      // return <PageItem metadata={metadata} pageData={pageData.items} />;
    }catch(e){
      // notFound()
      return {
        type: null
      }
    }
  
  }
  
  
  export let generateMetadata = ({params, searchParams}: GenerateMetadataProps): Metadata => {  
    console.log("params", params);
    console.log("searchParams", searchParams);
    
    
    return {
      title: `changed2 ${JSON.stringify(searchParams)}`
    }
  } 
  
  