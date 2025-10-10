import { HomeCountries, HomeSeo } from "@components";

export const metadata = {
  title: "جامعه ایرانیان مهاجر",
};

export default function Page() {
  return (
    <main className="_home-page page">
      <HomeCountries />

      <HomeSeo />
    </main>
  );
}
