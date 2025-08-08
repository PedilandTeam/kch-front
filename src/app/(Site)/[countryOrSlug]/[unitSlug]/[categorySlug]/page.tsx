// src/app/(Site)/[countryOrSlug]/[unitSlug]/[categorySlug]/page.tsx

import { API_ROUTES } from "@/routes";
import { CategoryNamespace } from "@/types/category";
import { Country } from "@/types/country";
import { UnitType } from "@/types/unit";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import CategoryList from "./categoryList";
import { PathGeneratorType } from "../../page";
import queryString from "query-string";
import fetchWrapper, { FetchWrapperError } from "@/modules/fetchWrapper";

type ParsedSearchParams = {
  page?: number | number[];
  city?: any;
  search: string;
};

/**
 *
 * @param countryOrSlug get country with [countryOrSlug]
 * @param unitSlug get unit of category to check is entered category part of current unit
 * @param categorySlug get targeted category by Slug
 * @returns
 */
const pathGenerator = async (
  countryOrSlug: string,
  unitSlug: string,
  categorySlug: string,
): Promise<PathGeneratorType> => {
  // const units = await (await API_ROUTES.UNITS.GET_ALL(2000)).json();
  const currentUnit = (
    await fetchWrapper<UnitType[]>("units", {
      filters: {
        slug: unitSlug,
      },
      tags: ["country", "page"],
      revalidate:
        +process.env.DEFAULT_REVALIDATE_TIME_FOR_PAGE_HANDLERS || 2000,
    })
  )[0];

  // const countryList = await (await API_ROUTES.COUNTRIES.GET_ALL(false, 20)).json();
  const countryList = await fetchWrapper<Country[]>("countries", {
    filters: {
      code: countryOrSlug,
    },
    tags: ["country", "page"],
    revalidate: +process.env.DEFAULT_REVALIDATE_TIME_FOR_PAGE_HANDLERS || 2000,
  });
  const currentCountry = countryList[0];

  // const categories: CategoryNamespace.GET = await (await API_ROUTES.CATEGOREIS.GET_ALL(1, 1, categorySlug)).json();

  const categories = await fetchWrapper<CategoryNamespace.GET>("categories", {
    filters: {
      page: 1,
      limit: 1,
      slug: categorySlug,
    },
    tags: ["country", "page"],
    revalidate: +process.env.DEFAULT_REVALIDATE_TIME_FOR_PAGE_HANDLERS || 2000,
  });

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

type generateMetadata = {
  params: { countryOrSlug: string; unitSlug: string; categorySlug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export const generateMetadata = async (_props: any): Promise<Metadata> => {
  // قدم اول: resolve props (در صورت Promise بودن)
  const props = _props?.then ? await _props : _props;
  // قدم دوم: resolve params (در صورت Promise بودن)
  const params = props.params?.then ? await props.params : props.params;
  const searchParams = props.searchParams?.then
    ? await props.searchParams
    : props.searchParams;
  // حالا میتونی استفاده کنی:
  const { countryOrSlug, unitSlug, categorySlug } = params;

  let pathInfo: PathGeneratorType;

  try {
    pathInfo = await pathGenerator(countryOrSlug, unitSlug, categorySlug);
  } catch (e: any) {
    throw Error(e);
  }

  const category = pathInfo.props?.category;
  if (!category) {
    return {
      title: "صفحه مورد نظر وجود ندارد | کوچا",
      description:
        "متاسفانه چنین صفحه‌ای وجود نداره و یا ممکنه بخاطر تغییرات وب‌سایت جدید کـوچـا آدرسش تغییر کرده باشه.",
    };
  }

  const countries = await (
    await API_ROUTES.COUNTRIES.GET_ALL(false, 120)
  ).json();
  const currentCountry: Country | undefined = countries.find(
    (country: Country) => country.code == countryOrSlug,
  );

  const pageSearchParams = searchParams?.page;

  return {
    title: `لیست ${
      category?.seoTitle ? category.seoTitle : `${category.name} فارسی زبان`
    } در ${pathInfo?.props?.country?.name} | کوچا`,
    description: `به جامعه مجازی ایرانیان مهاجر مقیم ${
      countryOrSlug && currentCountry && currentCountry.name
    } خوش آمدید. در این صفحه لیست کاملی از ${
      pathInfo?.props?.category?.name
    } فارسی زبان این کشور وجود دارد که می توانید صفحه اختصاصی شان را نیز مشاهده نمایید.`,
    alternates: {
      canonical: `${process.env.FRONT_URL}/${
        currentCountry?.code
      }/${unitSlug}/${pathInfo?.props?.category?.slug}${
        pageSearchParams ? `?page=${pageSearchParams}` : ""
      }`,
    },
  };
};

export default async function CategoryPage(_props: any) {
  const props = _props?.then ? await _props : _props;
  const params = props.params?.then ? await props.params : props.params;
  const searchParams = props.searchParams?.then
    ? await props.searchParams
    : props.searchParams;
  const { countryOrSlug, unitSlug, categorySlug } = params;

  let parsedSearchParams: ParsedSearchParams;
  let pathInfo: PathGeneratorType;

  parsedSearchParams = queryString.parse(
    queryString.stringify(searchParams ?? {}),
    { arrayFormat: "comma", parseNumbers: true },
  ) as ParsedSearchParams;
  const { page: pageNumber, city, search } = parsedSearchParams;

  try {
    pathInfo = await pathGenerator(countryOrSlug, unitSlug, categorySlug);
  } catch (e: any) {
    throw Error(e);
  }

  if (pathInfo.type) {
    return (
      <CategoryList
        {...pathInfo.props}
        pageNumber={pageNumber}
        city={city}
        search={search}
      />
    );
  } else {
    notFound();
  }
}
