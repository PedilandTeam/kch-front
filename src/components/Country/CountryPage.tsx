// app/(Site)/[countryOrSlug]/country/country.tsx

import { Category } from "@/types/category";
import { Country } from "@/schemas/country";
import fetchCampaigns from "@/utils/fetchCampaigns";
import { CountryPageForum } from "../../app/[countryOrSlug]/country/countryPageForum";
import { CountryPageHeader } from "../../app/[countryOrSlug]/country/countryPageHeader";

type CountryPageProps = {
  currentCountry: Country;
  categories: Category;
};

export const CountryPage = async ({
  currentCountry,
  categories,
}: CountryPageProps) => {
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
};
