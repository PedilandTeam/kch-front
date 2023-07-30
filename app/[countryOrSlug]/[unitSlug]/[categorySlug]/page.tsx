import { API_ROUTES } from "@/routes";
import { CategoryNamespace } from "@/types/category";
import { CountryNamespace } from "@/types/country";
import { UnitType } from "@/types/unit";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import CategoryList from "../../categoryList/categoryList";
import { PathGeneratorType } from "../../page";



const pathGenerator = async(countryOrSlug: string, unitSlug: string, categorySlug: string): Promise<PathGeneratorType> => {
    const units = await (await API_ROUTES.UNITS.GET_ALL(2000)).json()    
    const currentUnit: UnitType = units.find((unit: UnitType) => unit.slug == unitSlug)
    const countryList = await(await API_ROUTES.COUNTRIES.GET_ALL(20)).json()
    const currentCountry = countryList.find((country: CountryNamespace.GET) => country.code == countryOrSlug)
    const categories: CategoryNamespace.GET = await (await API_ROUTES.CATEGOREIS.GET_ALL(1, 1, categorySlug)).json()
    const currentCategory = categories?.items[0]

    if(currentCategory?.unit?.id != currentUnit?.id){
        return {
            type: null
        }
    }

    return {
        type: 'category',
        props: {
            category: currentCategory,
            country: currentCountry
        }
    }
    // return <CategoryList category={currentCategory} country={currentCountry} />
}

export const generateMetadata = async({ params: {countryOrSlug, unitSlug, categorySlug} }: { params: { countryOrSlug: string, unitSlug: string, categorySlug: string } }): Promise<Metadata> => {

    let pathInfo: PathGeneratorType
    
    try {
      pathInfo = await pathGenerator(countryOrSlug, unitSlug, categorySlug)
    } catch (e: any) {
      throw Error(e)
    }

    return {
        title: `لیست ${pathInfo?.props?.category?.name} فارسی زبان | کوچا`
    }
}

export default async function CategoryPage({ params: {countryOrSlug, unitSlug, categorySlug} }: { params: { countryOrSlug: string, unitSlug: string, categorySlug: string } }) {
    

    let pathInfo: PathGeneratorType

    try {
      pathInfo = await pathGenerator(countryOrSlug, unitSlug, categorySlug)
    } catch (e: any) {
      throw Error(e)
    }
  
    if(pathInfo.type){
        //@ts-expect-error
        return <CategoryList {...pathInfo.props}/>
    }else{
        notFound()
    }

}