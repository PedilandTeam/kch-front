// Refactored
import fetchWrapper, { FetchWrapperError } from "@/api/fetchWrapper";
import type { Country } from "@/schemas";
import type { GetCategoryResponse } from "@/types/category";
import type { PathGeneratorType } from "@/types/pathGenerator";
import type { UnitType } from "@/types/unit";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import queryString from "query-string";

import { CategoryListPage } from "@components";

interface CategoryPageProps {
  params: Promise<{
    countryOrSlug: string;
    unitSlug: string;
    categorySlug: string;
  }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

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
  try {
    // Fetch unit data
    const units = await fetchWrapper<UnitType[]>("units", {
      filters: {
        slug: unitSlug,
      },
      tags: ["country", "page"],
      revalidate:
        +process.env.DEFAULT_REVALIDATE_TIME_FOR_PAGE_HANDLERS || 2000,
    });
    const currentUnit = units[0];

    // Fetch country data
    const countryList = await fetchWrapper<Country[]>("countries", {
      filters: {
        code: countryOrSlug,
      },
      tags: ["country", "page"],
      revalidate:
        +process.env.DEFAULT_REVALIDATE_TIME_FOR_PAGE_HANDLERS || 2000,
    });
    const currentCountry = countryList[0];

    // Fetch category data
    const categories = await fetchWrapper<GetCategoryResponse>("categories", {
      filters: {
        page: 1,
        limit: 1,
        slug: categorySlug,
      },
      tags: ["country", "page"],
      revalidate:
        +process.env.DEFAULT_REVALIDATE_TIME_FOR_PAGE_HANDLERS || 2000,
    });
    const currentCategory = categories.items[0];

    // Validate all required data exists
    if (!currentCategory || !currentCountry || !currentUnit) {
      return {
        type: null,
      };
    }

    // Validate category belongs to the unit
    if (currentCategory.unit?.id !== currentUnit.id) {
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
  } catch (err) {
    console.error("Error in pathGenerator:", err);
    if (err instanceof FetchWrapperError && err.isNotFound) {
      return {
        type: null,
      };
    }
    throw err;
  }
};

type ParsedSearchParams = {
  page?: number | number[];
  city?: any;
  search: string;
};

type GenerateMetadataProps = {
  params: Promise<{
    countryOrSlug: string;
    unitSlug: string;
    categorySlug: string;
  }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export const generateMetadata = async ({
  params,
  searchParams,
}: GenerateMetadataProps): Promise<Metadata> => {
  const { countryOrSlug, unitSlug, categorySlug } = await params;
  const resolvedSearchParams = await searchParams;

  let pathInfo: PathGeneratorType;

  try {
    pathInfo = await pathGenerator(countryOrSlug, unitSlug, categorySlug);
  } catch (err) {
    console.error("Error generating metadata:", err);
    return {
      title: "صفحه مورد نظر وجود ندارد | کوچا",
      description:
        "متاسفانه چنین صفحه‌ای وجود نداره و یا ممکنه بخاطر تغییرات وب‌سایت جدید کـوچـا آدرسش تغییر کرده باشه.",
    };
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
    filters: {
      code: countryOrSlug,
    },
    tags: ["country", "page"],
    revalidate: +process.env.DEFAULT_REVALIDATE_TIME_FOR_PAGE_HANDLERS || 2000,
  });
  const currentCountry: Country | undefined = countries.find(
    (country: Country) => country.code == countryOrSlug,
  );

  const pageSearchParams = resolvedSearchParams?.page;

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

export default async function CategoryPage({
  params,
  searchParams,
}: CategoryPageProps) {
  const { countryOrSlug, unitSlug, categorySlug } = await params;
  const resolvedSearchParams = await searchParams;

  let parsedSearchParams: ParsedSearchParams;
  let pathInfo: PathGeneratorType;

  parsedSearchParams = queryString.parse(
    queryString.stringify(resolvedSearchParams ?? {}),
    { arrayFormat: "comma", parseNumbers: true },
  ) as ParsedSearchParams;
  const { page, city, search } = parsedSearchParams;

  // Ensure pageNumber is always a single number
  const pageNumber = Array.isArray(page) ? page[0] : page || 1;

  try {
    pathInfo = await pathGenerator(countryOrSlug, unitSlug, categorySlug);
  } catch (err) {
    console.error("Error in CategoryPage:", err);
    notFound();
  }

  if (pathInfo.type && pathInfo.props) {
    return (
      <CategoryListPage
        category={pathInfo.props.category}
        country={pathInfo.props.country}
        unit={pathInfo.props.unit}
        pageNumber={pageNumber}
        city={city}
        search={search}
      />
    );
  } else {
    notFound();
  }
}
