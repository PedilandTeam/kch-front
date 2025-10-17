import type { Country } from "@/schemas/country";
import Image from "next/image";

import { CountryStats } from "@components";

interface CountryPageHeadProps {
  currentCountry: Country;
}

export const CountryPageHead = ({ currentCountry }: CountryPageHeadProps) => {
  return (
    <div className="_country-page-head relative mx-4">
      <Image
        className="aspect-square rounded-xl object-cover brightness-[.70]"
        src={`/images/slide/home/${currentCountry.code}-m.webp`}
        width={430}
        height={600}
        alt={`یک تصویر از کشور ${currentCountry.name}`}
        priority
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
