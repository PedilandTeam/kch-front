import type { Country } from "@/schemas/country";

import { CountryPageHead, CountryUnitCategories } from "@components/index";

type CountryPageProps = {
  currentCountry: Country;
};

export const CountryPage = async ({ currentCountry }: CountryPageProps) => {
  return (
    <div className="_country-page flex flex-col">
      <CountryPageHead currentCountry={currentCountry} />

      <CountryUnitCategories currentCountry={currentCountry} />

      {/* <CountryPageForum currentCountry={currentCountry} /> */}

      {/* <CountrySeoText currentCountry={currentCountry} /> */}
    </div>
  );
};
