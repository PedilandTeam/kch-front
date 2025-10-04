import { AdsItem } from "@/components/panel/AdsItem";
import type { AdsData } from "@/constants/ads-data";
import { adsData } from "@/constants/ads-data";
import { PageHeader } from "@/components/panel/PageHeader";

export default function ExplorePage() {
  return (
    <div className="space-y-5 p-4">
      <PageHeader icon="ListMagnifyingGlassIcon" title="لیست آگهی‌ها">
        این لیست براساس تنظیمات شما شخصی سازی شده است.
      </PageHeader>

      <div className="space-y-3">
        {adsData.length > 0 ? (
          <>
            {adsData.map((ad: AdsData) => (
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
