import type { Country } from "@/schemas";

interface CountrySeoTextProps {
  currentCountry: Country;
}

export const CountrySeoText = async ({
  currentCountry,
}: CountrySeoTextProps) => {
  return (
    <div className="_country-seo-text my-9">
      <h1 className="inline-block w-full text-center text-[16px] font-semibold text-gray-600">
        {`کـوچـا، جامعه ایرانیان مهاجر مقیم ${currentCountry.name}!`}
      </h1>
    </div>
  );
};
