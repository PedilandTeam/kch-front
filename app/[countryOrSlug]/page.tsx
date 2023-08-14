import { API_ROUTES } from "@/routes";
import { CountryNamespace } from "@/types/country";
import PageItem from "./item/item";
import { notFound } from "next/navigation";
import Country from "./country/country";

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
    const countries = await (await API_ROUTES.COUNTRIES.GET_ALL(20)).json();
    currentCountry = countries.find(
      (country: CountryNamespace.GET) => country.code == countryOrSlug
    );
    
    const categories = await (
      await API_ROUTES.CATEGOREIS.GET_ALL(1, 300, undefined, undefined, 20)
    ).json();

    if (currentCountry && countryOrSlug) {
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
        const pageData = await (
          await API_ROUTES.PAGES.GET_ALL(1, 1, countryOrSlug, 20)
        ).json();
        if (!pageData?.items) {
          return NOT_FOUND;
        }
        return {
          type: "item",
          props: {
            pageData: pageData.items,
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
        title: `کوچا | جامعه ایرانیان مهاجر مقیم ${pathInfo?.props?.currentCountry?.name}`,
      };

    case "item":
      return {
        title: `${pathInfo?.props?.pageData?.title} | کوچا`,
      };

    default:
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

  let availability: boolean = true
  switch (pathInfo.type) {
    case "country":
      availability = pathInfo.props?.currentCountry.availability
      if(!availability){
        return notFound()
      }
      return <Country {...pathInfo.props} />;

    case "item":
      availability = pathInfo.props?.pageData?.availability
      if(!availability){
        return notFound()
      }
      return <PageItem {...pathInfo.props} />;

    default:
      notFound();

    // }
  }
}
