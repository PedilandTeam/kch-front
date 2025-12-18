import { TelegramBanner } from "@/components/banners/TelegramBanner";
import { HomeCountries } from "@/components/home/HomeCountries";
import { HomeSeo } from "@/components/home/HomeSeo";
import { HomeSlider } from "@/components/home/HomeSlider";
import { WrapPageSimple } from "@/components/layout/WrapPageSimple";

export const metadata = {
  title: "تبلیغات آنلاین و رشد کسب و کار ایرانیان مقیم خارج",
};

export default function Page() {
  return (
    <WrapPageSimple className="_home-page gap-6">
      <HomeSlider />

      <HomeCountries />

      <TelegramBanner className="mt-4" />

      <HomeSeo />
    </WrapPageSimple>
  );
}
