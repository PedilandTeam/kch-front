import { CampaignNamespace } from "@/types/campaign";
import { CountryNamespace } from "@/types/country";

type SeoTextProps = {
  currentCountry: CountryNamespace.GET;
  customers: CampaignNamespace.ICampaignCustomer[];
};

export const SeoText = async ({ currentCountry, customers }: SeoTextProps) => {
  return (
    <div className="_seo-text my-9 sm:my-20">
      <div className="container mx-auto max-w-[1144px] px-3 sm:px-0">
        <h1 className="text-gray-600 text-[16px] inline-block sm:text-[20px] font-semibold text-center w-full">
          {`کـوچـا، جامعه ایرانیان مهاجر مقیم ${currentCountry.name}!`}
        </h1>
      </div>
    </div>
  );
};
