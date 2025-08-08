// src/app/(Site)/page.tsx

import { HomeCountries } from "@/components/home/homeCountries";
import { HomeSEO } from "@/components/home/homeSeo";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "کوچا | جامعه ایرانیان مهاجر مقیم همه جا",
  description:
    "هر جای دنیا که زندگی می کنید، کوچا همراه شماست تا بتوانید نیازهای خود را به زبان مادری و به سادگی رفع کنید. از معرفی مشاغل محلی گرفته تا پزشکانی که به زبان فارسی صحبت می کنند.",
  alternates: {
    canonical: process.env.FRONT_URL,
  },
};

export default function HomePage() {
  return (
    <main className="_home-page page">
      <HomeCountries />

      <HomeSEO />
    </main>
  );
}
