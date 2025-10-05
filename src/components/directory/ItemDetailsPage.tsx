import StaticAdvertise from "@/components/advertise/static";
import { RichText } from "@/components/global/RichText";
import { cn } from "@/lib/utils";
import { ITEM } from "@/text/directory";
import type { Page } from "@/types/page";
import fetchCampaigns from "@/utils/fetchCampaigns";
import { Suspense } from "react";
import { ItemSideInfo } from "../../app/[countryOrSlug]/item/sideInfo";
import { ItemTopInfo } from "../../app/[countryOrSlug]/item/topInfo";

import { ItemBreadcrumb, ItemClaim, ItemSuggestion } from "@/components/index";

interface ItemDetailsPageProps {
  pageData: Page;
}

export async function ItemDetailsPage({ pageData }: ItemDetailsPageProps) {
  const { campaign, customers } = await fetchCampaigns(pageData.country.code);

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
    <div className="_item-details-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* <CountryUpdater pageData={pageData} /> */}

      <div className="mb-4 bg-[#fbf7ed] bg-[url('/images/pattern-03.png')] bg-center">
        <ItemTopInfo pageData={pageData} />
      </div>

      <ItemSideInfo pageData={pageData} />

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

      <div className="px-3">
        <StaticAdvertise
          from="item"
          lgDisable={customers.length >= 4}
          imageUrlOrPath="/images/banner/ads-002-S1_V1.jpg"
          link="https://biz.koochaa.com/"
        />
      </div>

      <Suspense>
        <ItemSuggestion
          unit={pageData.unit}
          pageId={pageData.id}
          countryCode={pageData.country.code}
          city={pageData.city}
          basedOn="city"
        />
      </Suspense>

      <div className="px-3">
        <StaticAdvertise
          from="item"
          lgDisable={customers.length >= 4}
          imageUrlOrPath="/images/banner/ads-001-S1_V6.jpg"
          link="https://tally.so/r/3XDljz"
        />
      </div>

      <ItemClaim slug={pageData.slug} enable={!pageData.business} />
    </div>
  );
}
