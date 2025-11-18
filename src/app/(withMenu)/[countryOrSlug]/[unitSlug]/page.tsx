import fetchWrapper from "@/api/fetchWrapper";
import type { UnitType } from "@/types/unit";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import queryString from "query-string";
import type { PathGeneratorType } from "@/types/pathGenerator";
import type { Country } from "@/schemas";
import { UnitsListPage } from "@/components/directory/UnitsListPage";

// ---------------- Path Generator ----------------
const pathGenerator = async (
  countryOrSlug: string,
  unitSlug: string,
): Promise<PathGeneratorType> => {
  const currentUnit = (
    await fetchWrapper<UnitType[]>("units", {
      filters: { slug: unitSlug },
      tags: ["country", "page"],
      revalidate:
        +process.env.DEFAULT_REVALIDATE_TIME_FOR_PAGE_HANDLERS || 2000,
    })
  )?.[0];

  const countryList = await fetchWrapper<Country[]>("countries", {
    filters: { code: countryOrSlug },
    tags: ["country", "page"],
    revalidate: +process.env.DEFAULT_REVALIDATE_TIME_FOR_PAGE_HANDLERS || 2000,
  });

  const currentCountry = countryList?.[0];

  if (!currentUnit || !currentCountry) {
    return { type: null };
  }

  return {
    type: "unit",
    props: {
      unit: currentUnit,
      country: currentCountry,
      category: undefined,
    },
  };
};

// ---------------- Metadata ----------------
export const generateMetadata = async ({
  params,
  searchParams,
}: {
  params: Promise<{ countryOrSlug: string; unitSlug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}): Promise<Metadata> => {
  const { countryOrSlug, unitSlug } = await params;
  const search = await searchParams;

  let pathInfo: PathGeneratorType;
  try {
    pathInfo = await pathGenerator(countryOrSlug, unitSlug);
  } catch (err: any) {
    throw Error("Error in generateMetadata: " + err);
  }

  const unit = pathInfo.props?.unit;
  if (!unit) {
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

// ---------------- Page ----------------
type ParsedSearchParams = {
  page?: number | number[];
  category?: number | number[];
  city?: any;
  search: string;
};

export default async function UnitPage({
  params,
  searchParams,
}: {
  params: Promise<{ countryOrSlug: string; unitSlug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { countryOrSlug, unitSlug } = await params;
  const rawSearchParams = await searchParams;

  const parsedSearchParams = queryString.parse(
    queryString.stringify(rawSearchParams ?? {}),
    { arrayFormat: "comma", parseNumbers: true },
  ) as ParsedSearchParams;

  const { page: rawPageNumber, category, city, search } = parsedSearchParams;

  // Ensure pageNumber is always a single number
  const pageNumber = Array.isArray(rawPageNumber)
    ? rawPageNumber[0]
    : rawPageNumber;

  let pathInfo: PathGeneratorType;

  try {
    pathInfo = await pathGenerator(countryOrSlug, unitSlug);
  } catch (err: any) {
    throw Error("Error in UnitPage: " + err);
  }

  if (pathInfo.type) {
    return (
      <UnitsListPage
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
