import { CountryNamespace } from "@/types/country";
import { UnitType } from "@/types/unit";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import queryString from "query-string";
import { PathGeneratorType } from "../page";
import UnitList from "./unitList";
import fetchWrapper from "@/modules/fetchWrapper";

const pathGenerator = async (
  countryOrSlug: string,
  unitSlug: string
): Promise<PathGeneratorType> => {
  const currentUnit = (
    await fetchWrapper<UnitType[]>("units", {
      filters: {
        slug: unitSlug,
      },
      revalidate:
        +process.env.DEFAULT_REVALIDATE_TIME_FOR_PAGE_HANDLERS || 2000,
    })
  )[0];

  const countryList = await fetchWrapper<CountryNamespace.GET[]>('countries', {
    filters: {
      code: countryOrSlug,
    },
    revalidate: +process.env.DEFAULT_REVALIDATE_TIME_FOR_PAGE_HANDLERS || 2000,
  })
  const currentCountry = countryList[0]

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

type generateMetadata = {
  params: { countryOrSlug: string; unitSlug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};
export const generateMetadata = async ({
  params: { countryOrSlug, unitSlug },
  searchParams,
}: generateMetadata): Promise<Metadata> => {
  let pathInfo: PathGeneratorType;
  try {
    pathInfo = await pathGenerator(countryOrSlug, unitSlug);
  } catch (e: any) {
    throw Error(e);
  }

  const unit = pathInfo.props?.unit;
  if (!unit) {
    return {
      title: "صفحه مورد نظر وجود ندارد | کوچا",
      description:
        "متاسفانه چنین صفحه‌ای وجود نداره و یا ممکنه بخاطر تغییرات وب‌سایت جدید کـوچـا آدرسش تغییر کرده باشه.",
    };
  }

  const countries = await fetchWrapper<CountryNamespace.GET[]>('countries', {
    filters: {
      code: countryOrSlug,
    },
    revalidate: +process.env.DEFAULT_REVALIDATE_TIME_FOR_PAGE_HANDLERS || 2000,
  })
  const currentCountry: CountryNamespace.GET | undefined = countries[0]

  const pageSearchParams = searchParams?.page;

  return {
    title: `لیست ${pathInfo?.props?.unit?.name} فارسی زبان در ${
      countryOrSlug && currentCountry && currentCountry.name
    } | کوچا`,
    description: `به جامعه مجازی ایرانیان مهاجر مقیم ${
      countryOrSlug && currentCountry && currentCountry.name
    } خوش آمدید. در این صفحه لیست کاملی از ${
      pathInfo?.props?.unit?.name
    } فارسی زبان این کشور وجود دارد که می توانید صفحه اختصاصی شان را نیز مشاهده نمایید.`,
    alternates: {
      canonical: `${process.env.FRONT_URL}/${currentCountry?.code}/${
        pathInfo?.props?.unit?.slug
      }${pageSearchParams ? `?page=${pageSearchParams}` : ""}`,
    },
  };
};

type Param = number | undefined;
type ParsedSearchParams = {
  page?: number | number[];
  category?: number | number[];
  city?: any;
  search: string;
};

export default async function UnitPage({
  params: { countryOrSlug, unitSlug },
  searchParams,
}: {
  params: { countryOrSlug: string; unitSlug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  let parsedSearchParams: ParsedSearchParams;
  let pathInfo: PathGeneratorType;

  parsedSearchParams = queryString.parse(
    queryString.stringify(searchParams ?? {}),
    { arrayFormat: "comma", parseNumbers: true }
  ) as ParsedSearchParams;
  //get filters from query
  const { page: pageNumber, category, city, search } = parsedSearchParams;

  try {
    pathInfo = await pathGenerator(countryOrSlug, unitSlug);
  } catch (e: any) {
    throw Error(e);
  }

  if (pathInfo.type) {
    return (
      <UnitList
        {...pathInfo.props}
        city={city}
        category={category}
        pageNumber={pageNumber}
        search={search}
      />
    );
  } else {
    notFound();
  }
}
