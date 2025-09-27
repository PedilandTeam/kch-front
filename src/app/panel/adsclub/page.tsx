"use client";

import { CreditStats } from "@/components/panel/CreditStats";
import { HomeHeader } from "@/components/panel/HomeHeader";
import { CardsMenu } from "@/components/panel/CardsMenu";
import { AdsList } from "@/components/panel/AdsList";

export default function AdsClubPage() {
  return (
    <>
      <HomeHeader />

      <CreditStats />

      <CardsMenu />

      <AdsList />
    </>
  );
}
