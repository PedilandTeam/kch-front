import { CountryNamespace } from "@/types/country";

type SeoTextProps = {
  currentCountry: CountryNamespace.GET;
};

export const SeoText = async ({ currentCountry }: SeoTextProps) => {
  return (
    <div className="container mx-auto max-w-[1144px]">
      <div className="seo-text my-8 sm:my-20 text-center">
        <h1 className="text-gray-600 text-[16px] inline-block sm:text-[20px] font-semibold">
          {`کـوچـا، جامعه ایرانیان مهاجر مقیم ${currentCountry.name}!`}
        </h1>
        <p></p>
      </div>
    </div>
  );
};
