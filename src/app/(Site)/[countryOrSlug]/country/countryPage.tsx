// app/(Site)/[countryOrSlug]/country/country.tsx

import AdvertiseLg from "@/components/advertise/lg";
import AdvertiseSm from "@/components/advertise/sm";
import { Category } from "@/types/category";
import fetchCampaigns from "@/utils/fetchCampaigns";
import AdsSection from "./ads-section";
import { CountryCategories } from "./countryCategories";
import { CountryStats } from "./countryStats";
import { SeoText } from "./seoText";
import { CountryPageForum } from "./countryPageForum";
import { UnitsBanner } from "./unitsBanner";
import { Country } from "@/types/country";
import { CountryPageHeader } from "./countryPageHeader";

type CountryPageProps = {
  currentCountry: Country;
  categories: Category;
};

export default async function CountryPage({
  currentCountry,
  categories,
}: CountryPageProps) {
  const { customers, campaign } = await fetchCampaigns(currentCountry.code);

  return (
    <div className="_country-page flex flex-col gap-3 pt-3">
      <CountryPageHeader currentCountry={currentCountry} />

      <CountryPageForum currentCountry={currentCountry} />

      {/* <UnitsBanner currentCountry={currentCountry} /> */}

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

      {/* <CountryStats currentCountry={currentCountry} /> */}

      {/* <CountryCategories currentCountry={currentCountry} /> */}

      {/* <AdsSection customers={customers} /> */}

      {/* <SeoText customers={customers} currentCountry={currentCountry} /> */}
    </div>
  );
}
