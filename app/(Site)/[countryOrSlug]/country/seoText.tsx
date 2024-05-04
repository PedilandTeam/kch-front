import { CountryNamespace } from "@/types/country";

type SeoTextProps = {
  currentCountry: CountryNamespace.GET;
};

export const SeoText = async ({ currentCountry }: SeoTextProps) => {
  return (
    <div className="container mx-auto max-w-[1144px]">
      <div className="mx-3 my-10 sm:my-20 _seo-text sm:mx-0">
        <h1 className="text-gray-600 text-[16px] inline-block sm:text-[20px] font-semibold text-center w-full">
          {`کـوچـا، جامعه ایرانیان مهاجر مقیم ${currentCountry.name}!`}
        </h1>
        <p className="mt-3 font-normal text-justify text-gray-500"></p>
      </div>
    </div>
  );
};
