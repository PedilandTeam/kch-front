import StaticAdvertise from "@/components/advertise/static";
import { CampaignNamespace } from "@/types/campaign";
type SeoTextProps = {
  customers: CampaignNamespace.ICampaignCustomer[];
};
export default async function AdsSection({ customers }: SeoTextProps) {
  return (
    <div className="_ads-section pt-5 sm:pt-10">
      <div className="container mx-auto max-w-[1144px] px-3 sm:px-0">
        <div className="_wrapper items-center xl:flex-row flex flex-col gap-5">
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
      </div>
    </div>
  );
}
