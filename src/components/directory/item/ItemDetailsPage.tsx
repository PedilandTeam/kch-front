import type { Page } from "@/types/page";
import { Suspense } from "react";

import {
  ItemBreadcrumb,
  ItemClaim,
  ItemDescription,
  ItemInfo,
  ItemSuggestion,
  PageSimple,
} from "@components";

interface ItemDetailsPageProps {
  pageData: Page;
}

export async function ItemDetailsPage({ pageData }: ItemDetailsPageProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: pageData.title,
    image: `${process.env.NEXT_PUBLIC_DL_URL}/pages/${pageData.id}/${pageData.profile}`,
    url: pageData.socials?.website,
    telephone: pageData.contact.telephone || pageData.contact.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: pageData.city.englishName,
      addressCountry: pageData.country.code?.toUpperCase(),
    },
  };

  return (
    <PageSimple className="_item-details-page pt-0">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <ItemInfo pageData={pageData} />

      <ItemDescription pageData={pageData} />

      <ItemBreadcrumb pageData={pageData} />

      <Suspense>
        <ItemSuggestion
          unit={pageData.unit}
          pageId={pageData.id}
          countryCode={pageData.country.code}
          category={pageData.category}
          city={pageData.city}
          basedOn="category"
        />
      </Suspense>

      <Suspense>
        <ItemSuggestion
          unit={pageData.unit}
          pageId={pageData.id}
          countryCode={pageData.country.code}
          city={pageData.city}
          basedOn="city"
        />
      </Suspense>

      <ItemClaim slug={pageData.slug} enable={!pageData.business} />
    </PageSimple>
  );
}
