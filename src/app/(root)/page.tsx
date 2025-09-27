import { HomeCountries, HomeSEO } from "@/components/index";

export const metadata = {
  title: "جامعه ایرانیان مهاجر",
};

export default function Page() {
  return (
    <main className="_home-page page">
      <HomeCountries />

      <HomeSEO />
    </main>
  );
}
