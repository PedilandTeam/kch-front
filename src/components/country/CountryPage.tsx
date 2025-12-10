import type { Country } from "@/schemas/country";
import { WrapPageSimple } from "../layout/WrapPageSimple";
import { CountryPageHead } from "./CountryPageHead";
import { UnitsTopCat } from "../directory/UnitsTopCat.carousel";
import { AdsClubBanner } from "../banners/AdsClubBanner";
import { BannerTelegram } from "../global/BannerTelegram";

type CountryPageProps = {
  currentCountry: Country;
};

export const CountryPage = async ({ currentCountry }: CountryPageProps) => {
  return (
    <WrapPageSimple className="_country-page">
      <CountryPageHead currentCountry={currentCountry} />

      <AdsClubBanner />

      <UnitsTopCat currentCountry={currentCountry} />

      <BannerTelegram />
    </WrapPageSimple>
  );
};
