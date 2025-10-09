import type { Country } from "@/schemas/country";
import Image from "next/image";

interface CountryPageHeadProps {
  currentCountry: Country;
}

export const CountryPageHead = ({ currentCountry }: CountryPageHeadProps) => {
  return (
    <div className="_country-header">
      <div className="container">
        <div className="rounded-xl border bg-sky-50 p-3">
          <h1 className="text-center font-semibold">
            جامعه ایرانیان مهاجر مقیم {currentCountry.name}
          </h1>

          <Image
            className="rounded-xl object-cover brightness-[.70] sm:hidden"
            src={`/images/slide/home/${currentCountry.code}-m.webp`}
            width={430}
            height={600}
            alt={`یک تصویر از کشور ${currentCountry.name}`}
          />
        </div>
      </div>
    </div>
  );
};
