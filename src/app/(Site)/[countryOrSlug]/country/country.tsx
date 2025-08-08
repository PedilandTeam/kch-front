// app/(Site)/[countryOrSlug]/country/country.tsx

import AdvertiseLg from "@/components/advertise/lg";
import AdvertiseSm from "@/components/advertise/sm";
import { CategoryNamespace } from "@/types/category";
import { CountryNamespace } from "@/types/country";
import fetchCampaigns from "@/utils/fetchCampaigns";
import AdsSection from "./ads-section";
import { CountryCategories } from "./countryCategories";
import { CountryStats } from "./countryStats";
import { SeoText } from "./seoText";
import { SliderHome } from "./slider";
import { UnitsBanner } from "./unitsBanner";

type CountryProps = {
  currentCountry: CountryNamespace.GET;
  categories: CategoryNamespace.GET;
};
export default async function Country({
  currentCountry,
  categories,
}: CountryProps) {
  const { customers, campaign } = await fetchCampaigns(currentCountry.code);

  return (
    <div className="component _country-page">
      <SliderHome currentCountry={currentCountry} />

      <UnitsBanner currentCountry={currentCountry} />

      {/* Advertising Section P05 */}
      {/* <div className="flex w-full items-center justify-center">
        <AdvertiseLg
          from="country"
          customers={[customers?.[0], customers?.[1]]}
          campaignId={campaign?.id}
        />
        <AdvertiseSm
          from="country"
          customers={[customers?.[0], customers?.[1]]}
          campaignId={campaign?.id}
        />
      </div> */}

      <CountryStats currentCountry={currentCountry} />

      <CountryCategories currentCountry={currentCountry} />

      <AdsSection customers={customers} />

      <SeoText customers={customers} currentCountry={currentCountry} />
    </div>
  );
}
