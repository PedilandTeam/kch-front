import { API_ROUTES } from "@/routes";
import { CountryNamespace } from "@/types/country";
import { ModalCountry } from "../../layout/modalcountry";
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
  console.log(params);

  let countries: CountryNamespace.GET[];
  try {
    countries = await (await API_ROUTES.COUNTRIES.GET_ALL(1, 20)).json();
  } catch (e) {
    console.log(e);
    throw new Error("error in get country");
  }
  return (
    <>
      <div className=" xl:flex xl:flex-col xl:items-center xl:justify-center">
        <CommunityHeader params={params} />
      </div>
      <ModalCountry countries={countries} />
      {children}
      <BottomMenu countries={countries} />
    </>
  );
}
