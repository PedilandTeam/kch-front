import { API_ROUTES } from "@/routes";
import { CategoryNamespace } from "@/types/category";
import { CountryNamespace } from "@/types/country";
import { UnitType } from "@/types/unit";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import CategoryList from "./categoryList";
import { PathGeneratorType } from "../../page";
import queryString from "query-string";



type ParsedSearchParams = { page?: number | number[], city?: any, search: string }

const pathGenerator = async (countryOrSlug: string, unitSlug: string, categorySlug: string): Promise<PathGeneratorType> => {

  // const units = await (await API_ROUTES.UNITS.GET_ALL(2000)).json();
  const units = await API_ROUTES.UNITS.GET_ALL(2000)
    .then(async res => await res.json())
    .catch(e => {
      console.log(e);
    })
  const currentUnit: UnitType = units.find((unit: UnitType) => unit.slug == unitSlug);
  // const countryList = await (await API_ROUTES.COUNTRIES.GET_ALL(false, 20)).json();
  const countryList = await API_ROUTES.COUNTRIES.GET_ALL(false, 20)
  .then(res => res.json())
  .catch(e => {
    console.log(e);
  })
  const currentCountry = countryList.find((country: CountryNamespace.GET) => country.code == countryOrSlug);

  // const categories: CategoryNamespace.GET = await (await API_ROUTES.CATEGOREIS.GET_ALL(1, 1, categorySlug)).json();
  const categories: CategoryNamespace.GET = await API_ROUTES.CATEGOREIS.GET_ALL(1, 1, categorySlug)
  .then(res => res.json())
  .catch(e => {
    console.log(e);
    throw new Error('error in get categories categorySlug/page')
  })

  const currentCategory = categories?.items[0];

  if (currentCategory?.unit?.id != currentUnit?.id) {
    return {
      type: null,
    };
  }

  return {
    type: "category",
    props: {
      category: currentCategory,
      country: currentCountry,
      unit: currentUnit,
    },
  };
  // return <CategoryList category={currentCategory} country={currentCountry} />
};

type generateMetadata = { params: { countryOrSlug: string; unitSlug: string; categorySlug: string } }
export const generateMetadata = async ({ params: { countryOrSlug, unitSlug, categorySlug } }: generateMetadata): Promise<Metadata> => {
  let pathInfo: PathGeneratorType;

  try {
    pathInfo = await pathGenerator(countryOrSlug, unitSlug, categorySlug);
  } catch (e: any) {
    throw Error(e);
  }

  const countries = await (await API_ROUTES.COUNTRIES.GET_ALL(false, 120)).json();
  const currentCountry: CountryNamespace.GET | undefined = countries.find((country: CountryNamespace.GET) => country.code == countryOrSlug);
  return {
    title: `لیست ${pathInfo?.props?.category?.name} فارسی زبان در ${countryOrSlug && currentCountry && currentCountry.name
      } | کوچا`,
    description: `به جامعه مجازی ایرانیان مهاجر مقیم ${countryOrSlug && currentCountry && currentCountry.name
      } خوش آمدید. در این صفحه لیست کاملی از ${pathInfo?.props?.category?.name
      } فارسی زبان این کشور وجود دارد که می توانید صفحه اختصاصی شان را نیز مشاهده نمایید.`,
    alternates: {
      canonical: `${process.env.FRONT_URL}/${currentCountry?.code}/${unitSlug}/${pathInfo?.props?.category?.slug}`
    }
  };
};

export default async function CategoryPage({ params: { countryOrSlug, unitSlug, categorySlug }, searchParams }: { params: { countryOrSlug: string; unitSlug: string; categorySlug: string }, searchParams: { [key: string]: string | string[] | undefined } }) {

  let parsedSearchParams: ParsedSearchParams
  let pathInfo: PathGeneratorType;

  parsedSearchParams = queryString.parse(queryString.stringify(searchParams ?? {}), { arrayFormat: "comma", parseNumbers: true }) as ParsedSearchParams
  const { page: pageNumber, city, search } = parsedSearchParams


  try {
    pathInfo = await pathGenerator(countryOrSlug, unitSlug, categorySlug);
  } catch (e: any) {
    throw Error(e);
  }

  if (pathInfo.type) {
    return <CategoryList {...pathInfo.props} pageNumber={pageNumber} city={city} search={search} />;
  } else {
    notFound();
  }
}
