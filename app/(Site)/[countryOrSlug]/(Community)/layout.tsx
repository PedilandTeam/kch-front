import { API_ROUTES } from "@/routes";
import { CountryNamespace } from "@/types/country";
import { ModalCountry } from "../../layout/modalcountry";
import CommunityHeader from "./community/communityHeader";
import BottomMenu from "./community/bottomMenu";
import CommunityHeaderMobile from "./community/communityHeaderMobile";

export default async function CommunityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let countries: CountryNamespace.GET[];
  try {
    countries = await (await API_ROUTES.COUNTRIES.GET_ALL(1, 20)).json();
  } catch (e) {
    console.log(e);
    throw new Error("error in get country");
  }

  return (
    <>
      <div className="hidden xl:flex xl:flex-col xl:items-center xl:justify-center">
        <CommunityHeader />
      </div>
      <div className="xl:hidden">
        <CommunityHeaderMobile />
      </div>

      <ModalCountry countries={countries} />
      {children}
      <BottomMenu countries={countries} />
    </>
  );
}
