import { HomeCountries } from "@/components/home/HomeCountries";
import { HomeSeo } from "@/components/home/HomeSeo";
import { HomeSlider } from "@/components/home/HomeSlider";
import { WrapPageSimple } from "@/components/layout/WrapPageSimple";

export const metadata = {
  title: "پلتفرم رشد و تبلیغات کسب و کارهای ایرانیان مهاجر مقیم خارج",
};

export default function Page() {
  return (
    <WrapPageSimple className="_home-page">
      <HomeSlider />

      <HomeCountries />

      <HomeSeo />
    </WrapPageSimple>
  );
}
