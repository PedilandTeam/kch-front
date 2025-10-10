import { RichText } from "@/components/global/RichText";
import { cn } from "@/lib/utils";
import { ITEM } from "@/text/directory";
import type { Page } from "@/types/page";
import { PageProvider } from "@providers";
import { Suspense } from "react";

import {
  ItemBreadcrumb,
  ItemClaim,
  ItemContacts,
  ItemInfo,
  ItemLocation,
  ItemSuggestion,
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
    <PageProvider topBanner>
      <div className="_item-details-page">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <div className="_top bg-[#fbf7ed] bg-[url('/images/pattern-03.png')] bg-center">
          <ItemInfo pageData={pageData} />

          <ItemContacts pageData={pageData} />

          <ItemLocation pageData={pageData} />

          <div className="_bg-gradient" />
        </div>

        <div className="_description mx-3 my-6 space-y-2 rounded-lg border border-gray-200 p-4">
          <RichText
            className={cn("text-[15px] leading-8", {
              "text-black": pageData.description,
              "text-center text-gray-500": !pageData.description,
            })}
            html={
              pageData.description
                ? pageData.description
                : ITEM.DESCRIPTION_PLACEHOLDER
            }
          />
        </div>

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
      </div>
    </PageProvider>
  );
}
