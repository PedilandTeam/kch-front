import { CountryStats } from "@/components/country/CountryStats";
import type { Country } from "@/schemas/country";
import Image from "next/image";

interface CountryPageHeadProps {
  currentCountry: Country;
}

export const CountryPageHead = ({ currentCountry }: CountryPageHeadProps) => {
  return (
    <div className="_country-page-head relative p-3">
      <Image
        className="aspect-square rounded-xl object-cover brightness-[.70]"
        src={`/images/slide/home/${currentCountry.code}-m.webp`}
        width={430}
        height={600}
        alt={`یک تصویر از کشور ${currentCountry.name}`}
        priority
      />

      <div className="absolute right-0 bottom-0 left-0 flex h-full w-full flex-col items-center justify-center gap-3 p-6">
        <div className="flex w-full flex-1 items-center justify-center">
          <h1 className="text-3xl leading-snug font-semibold text-white drop-shadow-md drop-shadow-black">
            جـامـعـه
            <br />
            ایرانیان مهاجر
            <br />
            مقیم {currentCountry.name}
          </h1>
        </div>

        <CountryStats currentCountry={currentCountry} />
      </div>
    </div>
  );
};
