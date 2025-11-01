"use client";

import { AdsItem } from "@/components/panel/AdsItem";
import { PageHeader } from "@/components/panel/PageHeader";
import { adsData, type AdsData } from "@/constants/ads-data";

export default function BookmarksPage() {
  return (
    <div className="space-y-5 p-4">
      <PageHeader icon="ListHeartIcon" title="لیست علاقه‌مندی‌ها">
        این لیست شامل مواردی است که شما مشخص کردید.
      </PageHeader>

      <div className="space-y-3">
        {adsData.length > 0 ? (
          <>
            {adsData.slice(0, 2).map((ad: AdsData) => (
              <AdsItem
                key={ad.id}
                {...ad}
                className="border-blue-100 bg-blue-50/50"
              />
            ))}
          </>
        ) : (
          <p className="text-muted-foreground text-center">
            هیچ آگهی وجود ندارد.
          </p>
        )}
      </div>
    </div>
  );
}
