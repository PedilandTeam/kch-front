// app/(Site)/page.tsx
import { Metadata } from "next";
// UI Imports
import HomeBottom from "./home/bottom";
import { HomeCountries } from "./home/countries";
import { SliderMainHome } from "./home/slider";

export const metadata: Metadata = {
  title: "کوچا | جامعه ایرانیان مهاجر مقیم همه جا",
  description:
    "هر جای دنیا که زندگی می کنید، کوچا همراه شماست تا بتوانید نیازهای خود را به زبان مادری و به سادگی رفع کنید. از معرفی مشاغل محلی گرفته تا پزشکانی که به زبان فارسی صحبت می کنند.",
  alternates: {
    canonical: process.env.FRONT_URL,
  },
};
export default function Page() {
  return (
    <main className="_page-home p-4">
      <SliderMainHome />

      <HomeCountries />

      <HomeBottom />
    </main>
  );
}
