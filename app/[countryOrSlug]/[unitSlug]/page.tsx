import { API_ROUTES } from "@/routes";
import { CountryNamespace } from "@/types/country";
import { UnitType } from "@/types/unit";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { PathGeneratorType } from "../page";
import UnitList from "./unitList";

const pathGenerator = async (
  countryOrSlug: string,
  unitSlug: string
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
      currentCountry,
    },
  };
};

export const generateMetadata = async ({
  params: { countryOrSlug, unitSlug },
}: {
  params: { countryOrSlug: string; unitSlug: string };
}): Promise<Metadata> => {
  let pathInfo: PathGeneratorType;

  try {
    pathInfo = await pathGenerator(countryOrSlug, unitSlug);
  } catch (e: any) {
    throw Error(e);
  }

  const countries = await (await (API_ROUTES.COUNTRIES.GET_ALL(false, 120))).json()
  const currentCountry: CountryNamespace.GET | undefined = countries.find((country: CountryNamespace.GET) => country.code == countryOrSlug)
  return {
    title: `لیست ${pathInfo?.props?.unit?.name} فارسی زبان در ${countryOrSlug && currentCountry && currentCountry.name} | کوچا`,
    description: ""
  };
};

export default async function UnitPage({
  params: { countryOrSlug, unitSlug }
}: {
  params: { countryOrSlug: string; unitSlug: string };
}) {
  let pathInfo: PathGeneratorType;

  try {
    pathInfo = await pathGenerator(countryOrSlug, unitSlug);
  } catch (e: any) {
    throw Error(e);
  }

  if (pathInfo.type) {
    //@ts-expect-error
    return <UnitList {...pathInfo.props} />;
  } else {
    notFound();
  }
}
