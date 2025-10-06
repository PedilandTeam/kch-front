import StaticAdvertise from "@/components/advertise/StaticAdvertise";
import { CampaignNamespace } from "@/types/campaign";
type SeoTextProps = {
  customers: CampaignNamespace.ICampaignCustomer[];
};
export default async function AdsSection({ customers }: SeoTextProps) {
  return (
    <div className="_ads-section pt-5">
      <div className="container">
        <div className="_wrapper flex flex-col items-center gap-5 xl:flex-row">
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
