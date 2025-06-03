import { API_ROUTES } from "@/routes";
import { CategoryNamespace } from "@/types/category";
import { CountryNamespace } from "@/types/country";
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

const pathGenerator = async (
  countryOrSlug: string,
  unitSlug: string,
  categorySlug: string
): Promise<PathGeneratorType> => {
  const currentUnit = (
    await fetchWrapper<UnitType[]>("units", {
      filters: { slug: unitSlug },
      tags: ["country", "page"],
      revalidate: +process.env.DEFAULT_REVALIDATE_TIME_FOR_PAGE_HANDLERS || 2000,
    })
  )[0];

  const countryList = await fetchWrapper<CountryNamespace.GET[]>("countries", {
    filters: { code: countryOrSlug },
    tags: ["country", "page"],
    revalidate: +process.env.DEFAULT_REVALIDATE_TIME_FOR_PAGE_HANDLERS || 2000,
  });
  const currentCountry = countryList[0];

  const categories = await fetchWrapper<CategoryNamespace.GET>("categories", {
    filters: { page: 1, limit: 1, slug: categorySlug },
    tags: ["country", "page"],
    revalidate: +process.env.DEFAULT_REVALIDATE_TIME_FOR_PAGE_HANDLERS || 2000,
  });
  const currentCategory = categories?.items[0];

  if (currentCategory?.unit?.id != currentUnit?.id) {
    return { type: null };
  }

  return {
    type: "category",
    props: {
      category: currentCategory,
      country: currentCountry,
      unit: currentUnit,
    },
  };
};

// Next.js 15 باید params و searchParams رو جدا جدا await کنه و تایپ‌ها هم any گذاشته شدن برای سازگاری کامل
export const generateMetadata = async (props: any): Promise<Metadata> => {
  const params = await props.params;
  const searchParams = await props.searchParams;
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

  const countries = await (await API_ROUTES.COUNTRIES.GET_ALL(false, 120)).json();
  const currentCountry: CountryNamespace.GET | undefined = countries.find(
    (country: CountryNamespace.GET) => country.code == countryOrSlug
  );

  const pageSearchParams = searchParams?.page;

  return {
    title: `لیست ${category?.seoTitle ? category.seoTitle : `${category.name} فارسی زبان`} در ${pathInfo?.props?.country?.name} | کوچا`,
    description: `به جامعه مجازی ایرانیان مهاجر مقیم ${countryOrSlug && currentCountry && currentCountry.name} خوش آمدید. در این صفحه لیست کاملی از ${pathInfo?.props?.category?.name} فارسی زبان این کشور وجود دارد که می توانید صفحه اختصاصی شان را نیز مشاهده نمایید.`,
    alternates: {
      canonical: `${process.env.FRONT_URL}/${currentCountry?.code}/${unitSlug}/${pathInfo?.props?.category?.slug}${pageSearchParams ? `?page=${pageSearchParams}` : ""}`,
    },
  };
};

export default async function CategoryPage(props: any) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const { countryOrSlug, unitSlug, categorySlug } = params;

  let parsedSearchParams: ParsedSearchParams;
  let pathInfo: PathGeneratorType;

  parsedSearchParams = queryString.parse(
    queryString.stringify(searchParams ?? {}),
    { arrayFormat: "comma", parseNumbers: true }
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
