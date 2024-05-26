import StaticAdvertise from "@/components/advertise/static";
import { CampaignNamespace } from "@/types/campaign";
import { CountryNamespace } from "@/types/country";

type SeoTextProps = {
  currentCountry: CountryNamespace.GET;
  customers: CampaignNamespace.ICampaignCustomer[]
};

export const SeoText = async ({ currentCountry, customers }: SeoTextProps) => {
  return (
    <div className="container mx-auto max-w-[1144px]">
      <div className="mx-3 my-10 sm:my-20 _seo-text sm:mx-0">
      <div className="flex flex-wrap gap-3 px-3 mt-12 mb-5 sm:mt-20 sm:gap-5 sm:px-0">
          <StaticAdvertise
            from="country"
            lgDisable={customers.length >= 4}
            imageUrlOrPath="/images/banner/ads-002-S1_V1.jpg"
            link="https://biz.koochaa.com/"
          />
          <StaticAdvertise
            from="country"
            lgDisable={customers.length >= 4}
            imageUrlOrPath="/images/banner/ads-001-S1_V6.jpg"
            link="https://tally.so/r/3XDljz"
          />
        </div>
        <h1 className="text-gray-600 text-[16px] inline-block sm:text-[20px] font-semibold text-center w-full">
          {`کـوچـا، جامعه ایرانیان مهاجر مقیم ${currentCountry.name}!`}
        </h1>
        <p className="mt-3 font-normal text-justify text-gray-500"></p>
      </div>
    </div>
  );
};
