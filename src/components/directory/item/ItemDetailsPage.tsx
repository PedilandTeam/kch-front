"use client";

import type { Page } from "@/types/page";
import { Suspense, useEffect } from "react";

import { useCountryCodeStore } from "@/store/UseCountryCodeStore";
import { WrapPageSimple } from "@/components/layout/WrapPageSimple";
import { ItemDetailsCountrySync } from "./ItemDetailsCountrySync";
import { ItemInfo } from "./ItemInfo";
import { ItemDescription } from "./ItemDescription";
import { ItemBreadcrumb } from "./ItemBreadcrumb";
import { ItemSuggestion } from "./ItemSuggestion";
import { AdsClubBanner } from "@/components/banners/AdsClubBanner";

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

  const countryCode = useCountryCodeStore((state) => state.countryCode);
  const setCountryCode = useCountryCodeStore((state) => state.setCountryCode);

  useEffect(() => {
    console.log("BEFORE", countryCode);
    setCountryCode(pageData.country.code);
    console.log("AFTER", useCountryCodeStore.getState().countryCode);
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
    </WrapPageSimple>
  );
}
