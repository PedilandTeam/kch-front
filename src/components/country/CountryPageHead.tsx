import type { Country } from "@/schemas/country";

import { CountryStats } from "@components";
import { CountryImage } from "./CountryImage";

interface CountryPageHeadProps {
  currentCountry: Country;
}

export const CountryPageHead = async ({
  currentCountry,
}: CountryPageHeadProps) => {
  return (
    <div className="_country-page-head relative mx-4">
      <CountryImage
        countryCode={currentCountry.code}
        countryName={currentCountry.name}
      />

      <div className="absolute top-0 right-0 flex h-full w-full flex-col items-center justify-center gap-4 p-3">
        <div className="flex w-full flex-1 items-center justify-center">
          <h1 className="text-3xl leading-normal font-semibold text-white drop-shadow-md drop-shadow-black">
            جـامـعـه
            <br />
            ایـرانـیـان مـهـاجـر
            <br />
            مـقـیـم {currentCountry.name}
          </h1>
        </div>

        <CountryStats currentCountry={currentCountry} />
      </div>
    </div>
  );
};
