import { metadata } from "@/app/layout";
import { API_ROUTES } from "@/routes";
import { CountryNamespace } from "@/types/country";
import { UnitType } from "@/types/unit";
import { isNumber } from "lodash";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import queryString from "query-string";
import { PathGeneratorType } from "../page";
import UnitList from "./unitList";

const pathGenerator = async (
  countryOrSlug: string,
  unitSlug: string,
): Promise<PathGeneratorType> => {
  const units = await (await API_ROUTES.UNITS.GET_ALL(2000)).json();
  const currentUnit = units.find((unit: UnitType) => unit.slug == unitSlug);
  const countryList = await (
    await API_ROUTES.COUNTRIES.GET_ALL(false, 20)
  ).json();
  const currentCountry = countryList.find(
    (country: CountryNamespace.GET) => country.code == countryOrSlug
  );

  if (!currentUnit || !currentCountry) {
    return {
      type: null,
    };
  }

  return {
    type: "unit",
    props: {
      unit: currentUnit,
      country: currentCountry,
    },
  };
};

type generateMetadata = {params: { countryOrSlug: string; unitSlug: string }}
export const generateMetadata = async ({params: { countryOrSlug, unitSlug }}: generateMetadata): Promise<Metadata> => {
  let pathInfo: PathGeneratorType;

  try {
    pathInfo = await pathGenerator(countryOrSlug, unitSlug);
  } catch (e: any) {
    throw Error(e);
  }

  const unit = pathInfo.props?.unit;
  if (!unit) {
    return {
      title: 'پیدا نشد!',
      description: 'این صفحه در کوچا موجود نیست'
    }
  }
  
  const countries = await (await API_ROUTES.COUNTRIES.GET_ALL(false, 120)).json();
  const currentCountry: CountryNamespace.GET | undefined = countries.find((country: CountryNamespace.GET) => country.code == countryOrSlug);
  return {
    title: `لیست ${pathInfo?.props?.unit?.name} فارسی زبان در ${
      countryOrSlug && currentCountry && currentCountry.name
    } | کوچا`,
    description: `به جامعه مجازی ایرانیان مهاجر مقیم ${
      countryOrSlug && currentCountry && currentCountry.name
    } خوش آمدید. در این صفحه لیست کاملی از ${
      pathInfo?.props?.unit?.name
    } فارسی زبان این کشور وجود دارد که می توانید صفحه اختصاصی شان را نیز مشاهده نمایید.`,
    alternates:{
      canonical: `${process.env.FRONT_URL}/${currentCountry?.code}/${pathInfo?.props?.unit?.slug}`
    }
  };
};

type Param =  number | undefined;
type ParsedSearchParams = {page?: number | number[], category?: number | number[], city?: any, search: string}


export default async function UnitPage({params: { countryOrSlug, unitSlug }, searchParams}: {params: { countryOrSlug: string; unitSlug: string }, searchParams:{ [key: string]: string | string[] | undefined }}) {

  
  let parsedSearchParams: ParsedSearchParams
  let pathInfo: PathGeneratorType;

  parsedSearchParams = queryString.parse(queryString.stringify(searchParams ?? {}), {arrayFormat:"comma", parseNumbers: true}) as ParsedSearchParams
  //get filters from query
  const {page: pageNumber, category, city, search} = parsedSearchParams

  try {
    pathInfo = await pathGenerator(countryOrSlug, unitSlug);
  } catch (e: any) {
    throw Error(e);
  }

  if (pathInfo.type) {
    return <UnitList {...pathInfo.props} city={city} category={category} pageNumber={pageNumber} search={search} />;
  } else {
    notFound();
  }
}
