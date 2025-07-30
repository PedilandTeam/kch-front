import { CountryNamespace } from "@/types/country";
import { ModalCountry } from "@/layout/modalcountry";
import CommunityHeader from "./community/communityHeader";
import BottomMenu from "./community/bottomMenu";

export default async function CommunityLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    countryOrSlug: string;
  };
}) {
  // console.log(params);

  let country: CountryNamespace.GET[];
  try {
    country = await fetch(
      `${process.env.API_URL}/countries?code=${params.countryOrSlug}`
    ).then(async (res) => await res.json());
  } catch (e) {
    console.log(e);
    throw new Error("error in get country");
  }

  console.log(country);

  return (
    <>
      <div className=" xl:flex xl:flex-col xl:items-center xl:justify-center">
        <CommunityHeader
          country={country[0]}
          countryOrSlug={params.countryOrSlug}
        />
      </div>
      <ModalCountry countries={country} />
      {children}
      <BottomMenu countries={country} />
    </>
  );
}
