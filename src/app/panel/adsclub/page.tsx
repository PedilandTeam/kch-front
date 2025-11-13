"use client";

import { CreditStats } from "@/components/panel/CreditStats";
import { HomeHeader } from "@/components/panel/HomeHeader";
import { CardsMenu } from "@/components/panel/CardsMenu";

export default function AdsClubPage() {
  return (
    <>
      <HomeHeader />

      <CreditStats />

      <CardsMenu />
    </>
  );
}
