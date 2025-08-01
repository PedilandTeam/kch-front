// app/(Site)/[countryOrSlug]/page.tsx

import fetchWrapper from "@/modules/fetchWrapper";
import { CategoryNamespace } from "@/types/category";
import { CountryNamespace } from "@/types/country";
import { PageNamespace } from "@/types/page";
import { notFound } from "next/navigation";
import { metadata } from "../page";
import Country from "./country/country";
import PageItem from "./item/item";

export type PathsType = "country" | "unit" | "category" | "item";
export type PathGeneratorType = {
  type: PathsType | null;
  props?: any;
};

type Props = {
  params: { countryOrSlug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

const pathGenerator = async (
  countryOrSlug: string
): Promise<PathGeneratorType> => {
  const NOT_FOUND = {
    type: null,
  };

  // const countryOrSlug = countryOrSlug as unknown as string
  let currentCountry: CountryNamespace.GET;
  try {
    const country = await fetchWrapper<CountryNamespace.GET[]>("countries", {
      filters: {
        code: countryOrSlug,
      },
      tags: ["country", "page"],
      revalidate:
        +process.env.DEFAULT_REVALIDATE_TIME_FOR_PAGE_HANDLERS || 2000,
    });
    if (country?.length > 0) {
      currentCountry = country[0];
    }

    const categories = await fetchWrapper<CategoryNamespace.GET>("categories", {
      filters: {
        page: 1,
        limit: 300,
      },
      tags: ["country", "page"],
      revalidate:
        +process.env.DEFAULT_REVALIDATE_TIME_FOR_PAGE_HANDLERS || 2000,
    });

    if (currentCountry! && countryOrSlug) {
      return {
        type: "country",
        props: {
          currentCountry,
          categories,
        },
      };
    }

    //show single page
    if (countryOrSlug) {
      try {
        const pageData = await fetchWrapper<PageNamespace.GET>("pages", {
          filters: {
            page: 1,
            limit: 1,
            slug: countryOrSlug,
          },
          tags: ["country", "page"],
          revalidate:
            +process.env.DEFAULT_REVALIDATE_TIME_FOR_PAGE_HANDLERS || 2000,
        });

        if (!pageData?.items || pageData?.items?.length == 0) {
          return NOT_FOUND;
        }
        return {
          type: "item",
          props: {
            pageData: pageData.items[0],
          },
        };
      } catch (e: any) {
        return NOT_FOUND;
      }
    }

    return NOT_FOUND;
    // notFound()
  } catch (e: any) {
    return NOT_FOUND;
  }
};

export async function generateMetadata({ params, searchParams }: Props) {
  let pathInfo: PathGeneratorType;

  try {
    pathInfo = await pathGenerator(params.countryOrSlug);
  } catch (e: any) {
    throw Error(e);
  }

  switch (pathInfo.type) {
    case "country":
      return {
        ...metadata,
        title: `کوچا | جامعه ایرانیان مهاجر مقیم ${pathInfo?.props?.currentCountry?.name}`,
        description: `به جامعه مجازی ایرانیان مهاجر مقیم ${pathInfo?.props?.currentCountry?.name} خوش آمدید. کوچا همراه شماست تا بتوانید نیازهای خود را به زبان مادری و به سادگی رفع کنید. اطلاعات بیشتر در این صفحه`,
        alternates: {
          canonical: `${process.env.FRONT_URL}/${pathInfo?.props.currentCountry?.code}`,
        },
      };

    case "item":
      return {
        ...metadata,
        title: `${pathInfo?.props?.pageData?.title} - ${pathInfo?.props?.pageData?.city?.name}، ${pathInfo?.props?.pageData?.country?.name} | کوچا`,
        description: `این صفحه پروفایل اختصاصی ${pathInfo?.props?.pageData?.title} در پلتفرم کوچاست که شامل بروزترین و کاملترین اطلاعات موجود در فضای اینترنت درباره ایشان می باشد.`,
        alternates: {
          canonical: `${process.env.FRONT_URL}/${pathInfo?.props.pageData?.slug}`,
        },
      };

    default:
      return {
        ...metadata,
        title: "صفحه مورد نظر وجود ندارد | کوچا",
        description:
          "متاسفانه چنین صفحه‌ای وجود نداره و یا ممکنه بخاطر تغییرات وب‌سایت جدید کـوچـا آدرسش تغییر کرده باشه.",
      };
      notFound();

    // }
  }
}

export default async function CenterPage({
  params,
}: {
  params: { countryOrSlug: string };
}) {
  let pathInfo: PathGeneratorType;

  try {
    pathInfo = await pathGenerator(params.countryOrSlug);
  } catch (e: any) {
    throw Error(e);
  }

  let availability: boolean = true;
  switch (pathInfo.type) {
    case "country":
      availability = pathInfo.props?.currentCountry.availability;
      if (!availability) {
        return notFound();
      }
      return <Country {...pathInfo.props} />;

    case "item":
      availability = pathInfo.props?.pageData?.availability;
      if (!availability) {
        return notFound();
      }
      return <PageItem {...pathInfo.props} />;

    default:
      notFound();

    // }
  }
}
