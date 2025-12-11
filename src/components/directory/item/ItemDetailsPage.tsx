"use client";

import { useCountryCodeStore } from "@/store/UseCountryCodeStore";
import type { Page } from "@/types/page";
import { Suspense, useEffect } from "react";

import { AdsClubBanner } from "@/components/banners/AdsClubBanner";
import { TelegramBanner } from "@/components/banners/TelegramBanner";
import { ItemBreadcrumb } from "@/components/directory/item/ItemBreadcrumb";
import { ItemDescription } from "@/components/directory/item/ItemDescription";
import { ItemDetailsCountrySync } from "@/components/directory/item/ItemDetailsCountrySync";
import { ItemInfo } from "@/components/directory/item/ItemInfo";
import { ItemSuggestion } from "@/components/directory/item/ItemSuggestion";
import { WrapPageSimple } from "@/components/layout/WrapPageSimple";

interface ItemDetailsPageProps {
  pageData: Page;
}

export function ItemDetailsPage({ pageData }: ItemDetailsPageProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: pageData.title,
    image: `${process.env.NEXT_PUBLIC_DL_URL}/pages/${pageData.id}/${pageData.profile}`,
    url: pageData.socials?.website,
    telephone: pageData.contact?.telephone || pageData.contact?.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: pageData.city.englishName,
      addressCountry: pageData.country?.code?.toUpperCase(),
    },
  };

  const setCountryCode = useCountryCodeStore((state) => state.setCountryCode);

  useEffect(() => {
    setCountryCode(pageData.country.code);
  }, [pageData.country?.code]);

  return (
    <WrapPageSimple className="_item-details-page pt-0">
      <ItemDetailsCountrySync code={pageData.country?.code} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <ItemInfo pageData={pageData} />

      <ItemDescription pageData={pageData} />

      <ItemBreadcrumb pageData={pageData} />

      <AdsClubBanner />

      <Suspense>
        <ItemSuggestion
          unit={pageData.unit}
          pageId={pageData.id}
          countryCode={pageData.country?.code}
          category={pageData.category}
          city={pageData.city}
          basedOn="category"
        />
      </Suspense>

      <Suspense>
        <ItemSuggestion
          unit={pageData.unit}
          pageId={pageData.id}
          countryCode={pageData.country?.code}
          city={pageData.city}
          basedOn="city"
        />
      </Suspense>

      <TelegramBanner />
    </WrapPageSimple>
  );
}
