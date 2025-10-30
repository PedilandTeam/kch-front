import { HomeCountries, HomeSeo } from "@components";

export const metadata = {
  title: "جامعه ایرانیان مهاجر",
};

export default function Page() {
  return (
    <div className="_home-page">
      <HomeCountries />

      <HomeSeo />
    </div>
  );
}
