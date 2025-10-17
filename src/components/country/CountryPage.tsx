import type { Country } from "@/schemas/country";

import { CountryPageHead, PageSimple, UnitsTopCat } from "@components";

type CountryPageProps = {
  currentCountry: Country;
};

export const CountryPage = async ({ currentCountry }: CountryPageProps) => {
  return (
    <PageSimple className="_country-page">
      <CountryPageHead currentCountry={currentCountry} />

      <UnitsTopCat currentCountry={currentCountry} />
    </PageSimple>
  );
};
