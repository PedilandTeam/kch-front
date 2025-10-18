import type { Country } from "@/schemas/country";

import { CountryPageHead, UnitsTopCat, WrapPageSimple } from "@components";

type CountryPageProps = {
  currentCountry: Country;
};

export const CountryPage = async ({ currentCountry }: CountryPageProps) => {
  return (
    <WrapPageSimple className="_country-page">
      <CountryPageHead currentCountry={currentCountry} />

      <UnitsTopCat currentCountry={currentCountry} />
    </WrapPageSimple>
  );
};
