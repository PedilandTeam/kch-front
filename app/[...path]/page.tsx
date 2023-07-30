
import { usePathSeparator } from "@/hooks/usePathSeparator";
import { API_ROUTES } from "@/routes";
import { CountryNamespace } from "@/types/country";
import PageItem from "./item/item";
import { notFound } from "next/navigation";
import Country from "./country/country";
import UnitList from "./unitList/unitList";
import { UnitType } from "@/types/unit";
import { CategoryNamespace } from "@/types/category";
import CategoryList from "./categoryList/categoryList";
import { Metadata } from "next";


type PathsType = "country" | "unit" | "category" | "item"
type PathGeneratorType = {
  type: PathsType | null,
  props?: any
}
const pathGenerator = async function (path: string[]): Promise<PathGeneratorType> {
  const paths = usePathSeparator(path);

  console.log("this is paths", paths);


  let countries: CountryNamespace.GET[]
  let currentCountry: undefined | CountryNamespace.GET
  try {
    const categories = await (await API_ROUTES.CATEGOREIS.GET_ALL(1, 300, undefined, undefined, 20)).json()
    countries = await (await API_ROUTES.COUNTRIES.GET_ALL(20)).json()
    currentCountry = countries.find(country => country.code == paths.countryOrSlug)



    //Step1: check if page is country page
    if (currentCountry && !paths.unit) {

      //show country
      return {
        type: "country",
        props: {
          categories,
          currentCountry
        }
      }
    }
  }
  catch (e) {
    console.log("error in countries", e);
    throw new Error("cant get countries")
  }
  /**
   * Step2: check if the path is countryCode/unit
   * @example de/آبمیوه_و_بستنی
   * @example de/businesses
   */
  if (currentCountry && paths.unit) {
    // show list of pages

    let units: UnitType[]
    let categories: CategoryNamespace.GET
    try {
      units = await (await API_ROUTES.UNITS.GET_ALL(10)).json()
      const unit = units.find(unit => unit.slug == decodeURIComponent(paths.unit as string))

      if (!paths.category) {

        if(unit){
          return {
            type: "unit",
            props: {
              unit,
              currentCountry,
              paths
            }
          }
        }else{
          return {
            type: null
          }
        }
        // return <UnitList unit={isUnitExist} country={isCountryExist} paths={paths}/>
      }
    } catch (e) {
      throw new Error("error in get all units")
    }

    try {
      categories = await (await API_ROUTES.CATEGOREIS.GET_ALL(1, 1, paths.category)).json()
      const categoriesItems = categories.items
      const category = categoriesItems[0]
      if (category) {
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

    } catch (e) {
      throw new Error("error in get all units")
    }


  }


  if (paths.countryOrSlug) {
    //show single page
    try {
      const pageData = await (await API_ROUTES.PAGES.GET_ALL(1, 1, paths.countryOrSlug, 20)).json()
      if (!pageData?.items) {
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
    } catch (e) {
      // notFound()
      return {
        type: null
      }
    }
  }

  return {
    type: null
  }

}


type Props = {
  params: { path: string[] }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata({ params, searchParams }: Props) {
  let pathInfo: PathGeneratorType

  try {
    pathInfo = await pathGenerator(params.path)
  } catch (e: any) {
    throw Error(e)
  }


  switch (pathInfo.type) {
    case "country":
      return {
        title: `کوچا | جامعه ایرانیان مهاجر مقیم ${pathInfo?.props?.currentCountry?.name}`
      }
    case "unit":
      return {
        title: `لیست ${pathInfo?.props?.unit?.name} فارسی زبان | کوچا`
      }
    case "category":
      return {
        title: `لیست ${pathInfo?.props?.category?.name} فارسی زبان | کوچا`
      }
    case "item":
      return {
        title: `${pathInfo?.props?.pageData?.title} | کوچا`
      }

    default:
      "کوچا | یافت نشد"

  }
}

export default async function CenterPage({ params }: { params: { path: string[] } }) {


  let pathInfo: PathGeneratorType

  try {
    pathInfo = await pathGenerator(params.path)
  } catch (e: any) {
    throw Error(e)
  }


  switch (pathInfo.type) {
    case "country":
      return <Country {...pathInfo.props} />;

    case "unit":
      return <UnitList {...pathInfo.props} />

    case "category":
      return <CategoryList {...pathInfo.props} />

    case "item":
      return <PageItem {...pathInfo.props} />;

    default:
      notFound()

  }
}
