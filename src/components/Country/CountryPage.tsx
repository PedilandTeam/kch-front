import type { Country } from "@/schemas/country";

import { CountryPageHead, CountryUnitCategories } from "@components/index";

type CountryPageProps = {
  currentCountry: Country;
};

export const CountryPage = async ({ currentCountry }: CountryPageProps) => {
  return (
    <div className="_country-page flex flex-col gap-3 py-3">
      <CountryPageHead currentCountry={currentCountry} />

      {/* <CountryPageForum currentCountry={currentCountry} /> */}

      {/* <CountryStats currentCountry={currentCountry} /> */}

      <CountryUnitCategories currentCountry={currentCountry} />

      {/* <CountrySeoText currentCountry={currentCountry} /> */}
    </div>
  );
};
