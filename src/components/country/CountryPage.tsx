import { AdsClubBanner } from "@/components/banners/AdsClubBanner";
import { SurveyBanner } from "@/components/banners/SurveyBanner";
import { TelegramBanner } from "@/components/banners/TelegramBanner";
import { UnitsTopCat } from "@/components/directory/UnitsTopCat.carousel";
import { WrapPageSimple } from "@/components/layout/WrapPageSimple";
import type { Country } from "@/schemas/country";
import { CountryPageHead } from "./CountryPageHead";

type CountryPageProps = {
  currentCountry: Country;
};

export const CountryPage = async ({ currentCountry }: CountryPageProps) => {
  return (
    <WrapPageSimple className="_country-page">
      <CountryPageHead currentCountry={currentCountry} />

      <AdsClubBanner />

      <UnitsTopCat currentCountry={currentCountry} />

      <SurveyBanner />

      <TelegramBanner />
    </WrapPageSimple>
  );
};
