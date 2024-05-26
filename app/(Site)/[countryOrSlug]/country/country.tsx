import { CountryStats } from "./countryStats";
import { CountryCategories } from "./countryCategories";
import { SliderHome } from "./slider";
import { CountryNamespace } from "@/types/country";
import { CategoryNamespace } from "@/types/category";
import { UnitsBanner } from "./unitsBanner";
import { SeoText } from "./seoText";
import Image from "next/image";
import AdvertiseLg from "@/components/advertise/lg";
import AdvertiseSm from "@/components/advertise/sm";
import fetchCampaigns from "@/utils/fetchCampaigns";

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
      <div className="w-full flex justify-center items-center">
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
      </div>

      <CountryStats currentCountry={currentCountry} />

      <CountryCategories currentCountry={currentCountry} />

      <SeoText customers={customers} currentCountry={currentCountry} />
    </div>
  );
}
