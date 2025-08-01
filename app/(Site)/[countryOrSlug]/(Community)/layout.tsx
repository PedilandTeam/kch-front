// app/(Site)/[countryOrSlug]/(Community)/layout.tsx

import CommunityHeader from "@/components/community/header";
import MobileMenu from "@/components/community/mobileMenu";
import { ModalCountry } from "@/layout/modalcountry";
import { CountryNamespace } from "@/types/country";

export default async function CommunityLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    countryOrSlug: string;
  };
}) {
  let country: CountryNamespace.GET[];
  try {
    country = await fetch(
      `${process.env.API_URL}/countries?code=${params.countryOrSlug}`,
    ).then(async (res) => await res.json());
  } catch (e) {
    console.log(e);
    throw new Error("error in get country");
  }

  console.log(country);

  return (
    <>
      <CommunityHeader
        country={country[0]}
        countryOrSlug={params.countryOrSlug}
      />

      {children}

      <MobileMenu countries={country} />

      <ModalCountry countries={country} />
    </>
  );
}
