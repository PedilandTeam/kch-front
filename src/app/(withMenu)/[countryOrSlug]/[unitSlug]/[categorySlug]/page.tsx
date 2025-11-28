import fetchWrapper from "@/api/fetchWrapper";
import { CategoryListPage } from "@/components/directory/CategoryListPage";
import type { Country } from "@/schemas";
import type { GetCategoryResponse } from "@/types/category";
import type { PathGeneratorType } from "@/types/pathGenerator";
import type { UnitType } from "@/types/unit";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import queryString from "query-string";

// =========================
// Util — Is Country Code ?
// =========================
function isCountryCode(slug: string) {
  return /^[a-zA-Z]{2,8}$/.test(slug);
}

// =========================
// Fetch Helpers
// =========================
async function fetchUnit(unitSlug: string) {
  return (
    await fetchWrapper<UnitType[]>("units", {
      filters: { slug: unitSlug },
      tags: ["unit"],
      revalidate:
        +process.env.DEFAULT_REVALIDATE_TIME_FOR_PAGE_HANDLERS || 2000,
    })
  )?.[0];
}

async function fetchCountry(countryOrSlug: string) {
  if (!isCountryCode(countryOrSlug)) return null;
  return (
    await fetchWrapper<Country[]>("countries", {
      filters: { code: countryOrSlug },
      tags: ["country"],
      revalidate:
        +process.env.DEFAULT_REVALIDATE_TIME_FOR_PAGE_HANDLERS || 2000,
    })
  )?.[0];
}

async function fetchCategory(categorySlug: string) {
  const res = await fetchWrapper<GetCategoryResponse>("categories", {
    filters: { page: 1, limit: 1, slug: categorySlug },
    tags: ["category"],
    revalidate: +process.env.DEFAULT_REVALIDATE_TIME_FOR_PAGE_HANDLERS || 2000,
  });

  return res?.items?.[0] ?? null;
}

// =========================
// Path Generator
// =========================
const pathGenerator = async (
  countryOrSlug: string,
  unitSlug: string,
  categorySlug: string,
): Promise<PathGeneratorType> => {
  const [currentUnit, currentCountry, currentCategory] = await Promise.all([
    fetchUnit(unitSlug),
    fetchCountry(countryOrSlug),
    fetchCategory(categorySlug),
  ]);

  if (!currentUnit || !currentCountry || !currentCategory) {
    return { type: null };
  }

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

// =========================
// Metadata
// =========================
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

  let pathInfo: PathGeneratorType = { type: null };

  try {
    pathInfo = await pathGenerator(countryOrSlug, unitSlug, categorySlug);
  } catch (err) {
    console.error("❌ Error in generateMetadata:", err);
  }

  const category = pathInfo.props?.category;
  const country = pathInfo.props?.country;
  const pageSearchParams = search?.page;

  if (!category || !country) {
    return {
      title: "صفحه مورد نظر وجود ندارد | کوچا",
      description:
        "متاسفانه چنین صفحه‌ای وجود نداره و یا ممکنه بخاطر تغییرات وب‌سایت جدید کوچا آدرسش تغییر کرده باشه.",
    };
  }

  return {
    title: `لیست ${
      category.seoTitle ?? `${category.name}`
    } ایرانی در ${country.name}`,
    description: `به جامعه ایرانیان مهاجر مقیم ${
      country.name
    } خوش آمدید. در این صفحه لیست کامل ${
      category.name
    } ایرانی این کشور قابل مشاهده است.`,
    alternates: {
      canonical: `${process.env.FRONT_URL}/${country.code}/${unitSlug}/${category.slug}${
        pageSearchParams ? `?page=${pageSearchParams}` : ""
      }`,
    },
  };
};

// =========================
// Page Component
// =========================
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

  const parsed = queryString.parse(
    queryString.stringify(rawSearchParams ?? {}),
    { arrayFormat: "comma", parseNumbers: true },
  ) as ParsedSearchParams;

  const pageNumber = Array.isArray(parsed.page) ? parsed.page[0] : parsed.page;
  const { city, search } = parsed;

  const pathInfo = await pathGenerator(countryOrSlug, unitSlug, categorySlug);

  if (!pathInfo.type) return notFound();

  return (
    <CategoryListPage
      {...pathInfo.props}
      city={city}
      pageNumber={pageNumber}
      search={search}
    />
  );
}
