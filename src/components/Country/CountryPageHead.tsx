import type { Country } from "@/schemas/country";

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
        </div>
      </div>
    </div>
  );
};
