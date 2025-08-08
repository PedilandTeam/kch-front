import { CampaignNamespace } from "@/types/campaign";
import { CountryNamespace } from "@/types/country";

type SeoTextProps = {
  currentCountry: CountryNamespace.GET;
  customers: CampaignNamespace.ICampaignCustomer[];
};

export const SeoText = async ({ currentCountry, customers }: SeoTextProps) => {
  return (
    <div className="_seo-text my-9">
      <div className="container">
        <h1 className="inline-block w-full text-center text-[16px] font-semibold text-gray-600">
          {`کـوچـا، جامعه ایرانیان مهاجر مقیم ${currentCountry.name}!`}
        </h1>
      </div>
    </div>
  );
};
