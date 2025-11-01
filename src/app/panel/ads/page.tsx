"use client";

import useSWR from "swr";
import Ad from "./components/ad";
import AdSkeleton from "./components/ad.skeleton";
import { useUser } from "@/store/useUser";
import NoAds from "../../../components/panel/tmp/noAds";
import type { AdNamespace } from "@/types/ad";

export default function Ads() {
  const {
    data: ads,
    isLoading: isAdsLoading,
    error: adsError,
  } = useSWR<AdNamespace.GET>(
    `${process.env.NEXT_PUBLIC_API_URL}/ads?limit=100&page=1`
  );

  const { user } = useUser();

  if (isAdsLoading) {
    return (
      <div className="flex flex-col items-center justify-center gap-y-2">
        <AdSkeleton />
      </div>
    );
  }

  if (user)
    return (
      <div className="flex w-full flex-col items-center justify-center gap-y-2">
        {user.ads?.length > 0 ? (
          ads?.items?.map((ad) => {
            return <Ad key={ad.id} data={ad} />;
          })
        ) : (
          <NoAds />
        )}
      </div>
    );
}
