// app/(Site)/[countryOrSlug]/(Community)/layout.tsx

import MobileMenu from "@/app/(Site)/layout/appMenu";
import { ModalCountry } from "@/layout/modalcountry";
import { CountryNamespace } from "@/types/country";

export default async function CommunityLayout(_props: any) {
  const props = _props?.then ? await _props : _props;
  const params = props.params?.then ? await props.params : props.params;
  const { countryOrSlug } = params;

  let country: CountryNamespace.GET[];
  try {
    country = await fetch(
      `${process.env.API_URL}/countries?code=${countryOrSlug}`,
    ).then(async (res) => await res.json());
  } catch (e) {
    console.log(e);
    throw new Error("error in get country");
  }

  return (
    <>
      {props.children}
      <MobileMenu countries={country} />
      <ModalCountry countries={country} />
    </>
  );
}
