import fetchWrapper from "@/api/fetchWrapper";
import type { Country } from "@/schemas";
import type { GetCategoryResponse } from "@/types/category";
import type { PathGeneratorType } from "@/types/pathGenerator";
import type { UnitType } from "@/types/unit";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import queryString from "query-string";

import { CategoryListPage } from "@components";

// ---------------- Path Generator ----------------
const pathGenerator = async (
  countryOrSlug: string,
  unitSlug: string,
  categorySlug: string,
): Promise<PathGeneratorType> => {
  const currentUnit = (
    await fetchWrapper<UnitType[]>("units", {
      filters: { slug: unitSlug },
      tags: ["country", "page"],
      revalidate:
        +process.env.DEFAULT_REVALIDATE_TIME_FOR_PAGE_HANDLERS || 2000,
    })
  )[0];

  const countryList = await fetchWrapper<Country[]>("countries", {
    filters: { code: countryOrSlug },
    tags: ["country", "page"],
    revalidate: +process.env.DEFAULT_REVALIDATE_TIME_FOR_PAGE_HANDLERS || 2000,
  });

  const currentCountry = countryList[0];

  const categories = await fetchWrapper<GetCategoryResponse>("categories", {
    filters: {
      page: 1,
      limit: 1,
      slug: categorySlug,
    },
    tags: ["country", "page"],
    revalidate: +process.env.DEFAULT_REVALIDATE_TIME_FOR_PAGE_HANDLERS || 2000,
  });

  const currentCategory = categories.items[0];

  if (!currentUnit || !currentCountry || !currentCategory) {
    return { type: null };
  }

  // Validate category belongs to the unit
  if (currentCategory.unit?.id !== currentUnit.id) {
    console.warn("⚠️ Category does not belong to unit");
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

// ---------------- Metadata ----------------
export const generateMetadata = async ({
  params,
  searchParams,
}: {
  params: Promise<{
    countryOrSlug: string;
    unitSlug: string;
    categorySlug: string;
  }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}): Promise<Metadata> => {
  const { countryOrSlug, unitSlug, categorySlug } = await params;
  const search = await searchParams;

  let pathInfo: PathGeneratorType;
  try {
    pathInfo = await pathGenerator(countryOrSlug, unitSlug, categorySlug);
  } catch (err: any) {
    throw Error("Error in generateMetadata: " + err);
  }

  const category = pathInfo.props?.category;
  if (!category) {
    return {
      title: "صفحه مورد نظر وجود ندارد | کوچا",
      description:
        "متاسفانه چنین صفحه‌ای وجود نداره و یا ممکنه بخاطر تغییرات وب‌سایت جدید کـوچـا آدرسش تغییر کرده باشه.",
    };
  }

  const countries = await fetchWrapper<Country[]>("countries", {
    filters: { code: countryOrSlug },
    tags: ["country", "page"],
    revalidate: +process.env.DEFAULT_REVALIDATE_TIME_FOR_PAGE_HANDLERS || 2000,
  });

  const currentCountry: Country | undefined = countries[0];
  const pageSearchParams = search?.page;

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
      canonical: `${process.env.FRONT_URL}/${currentCountry?.code}/${unitSlug}/${
        pathInfo?.props?.category?.slug
      }${pageSearchParams ? `?page=${pageSearchParams}` : ""}`,
    },
  };
};

// ---------------- Page ----------------
type ParsedSearchParams = {
  page?: number | number[];
  city?: any;
  search: string;
};

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{
    countryOrSlug: string;
    unitSlug: string;
    categorySlug: string;
  }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { countryOrSlug, unitSlug, categorySlug } = await params;
  const rawSearchParams = await searchParams;

  const parsedSearchParams = queryString.parse(
    queryString.stringify(rawSearchParams ?? {}),
    { arrayFormat: "comma", parseNumbers: true },
  ) as ParsedSearchParams;

  const { page: rawPageNumber, city, search } = parsedSearchParams;

  // Ensure pageNumber is always a single number
  const pageNumber = Array.isArray(rawPageNumber)
    ? rawPageNumber[0]
    : rawPageNumber;

  let pathInfo: PathGeneratorType;

  try {
    pathInfo = await pathGenerator(countryOrSlug, unitSlug, categorySlug);
  } catch (err: any) {
    throw Error("Error in CategoryPage: " + err);
  }

  if (pathInfo.type) {
    return (
      <CategoryListPage
        {...pathInfo.props}
        city={city}
        pageNumber={pageNumber}
        search={search}
      />
    );
  } else {
    notFound();
  }
}
