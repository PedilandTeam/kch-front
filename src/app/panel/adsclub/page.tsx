"use client";

import { CreditStats } from "@/components/panel/CreditStats";
import { HomeHeader } from "@/components/panel/HomeHeader";
import { CardsMenu } from "@/components/panel/CardsMenu";
import { Card } from "@/components/ui";

export default function AdsClubPage() {
  return (
    <>
      <HomeHeader />

      <CreditStats />

      <Card className="text-primary flex flex-col gap-2.5 border-blue-200 bg-blue-50/50 p-3 shadow-none">
        <p>
          شما عضو AdsClub هستید و آگهی‌هایی که با اطلاعات و علاقه‌مندی‌های شما
          مطابقت دارند، از طریق ربات به صورت هفتگی برایتان ارسال می‌شوند. در
          اینجا خبری از الگوریتم‌های آزاردهنده نیست و همه‌چیز برای آرامش، امنیت
          و حفظ حریم شخصی شما طراحی شده است. با مشاهده‌ی آگهی‌ها، هیچ‌گونه
          اطلاعاتی از شما در اختیار آگهی‌دهنده قرار نمی‌گیرد.
        </p>
      </Card>

      <CardsMenu />
    </>
  );
}
