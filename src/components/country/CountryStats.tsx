import { API_ROUTES } from "@/routes";
import type { Country } from "@/schemas";
import { CATEGORY, CITY, ITEM } from "@/text";
import type { StatsNamespace } from "@/types/stats";
import { e2p } from "@/utils/e2p";

import {
  CardsThreeIcon,
  FolderStarIcon,
  MapPinIcon,
} from "@phosphor-icons/react/ssr";

interface CountryStatsProps {
  currentCountry: Country;
}

export const getStats = async (
  countryCode: string,
): Promise<StatsNamespace.COUNTRY_STATS> => {
  let stats: StatsNamespace.COUNTRY_STATS;

  try {
    stats = await (
      await API_ROUTES.STATS.COUNTRY_STATS(countryCode, 100)
    ).json();
  } catch (err) {
    console.error("Error in get stats", err);
    throw new Error("Error in get stats");
  }
  return stats;
};

export const CountryStats = async ({ currentCountry }: CountryStatsProps) => {
  let stats: StatsNamespace.COUNTRY_STATS;

  try {
    stats = await getStats(currentCountry.code);
  } catch (err) {
    console.error("Error in get stats", err);
    throw new Error("Error in get stats");
  }

  return (
    <div className="_country-stats flex w-full justify-between gap-3 rounded-full border-2 border-black/15 bg-black/25 px-5 py-2.5 text-white">
      <div className="_item flex items-center gap-1">
        <CardsThreeIcon size={20} weight="duotone" />
        <div className="font-semibold">{e2p(stats.page)}</div>
        <div className="text-[13px] font-medium">{ITEM._}</div>
      </div>

      <div className="_item flex items-center gap-1">
        <MapPinIcon size={20} weight="duotone" />
        <div className="font-semibold">{e2p(stats.city)}</div>
        <div className="text-[13px] font-medium">{CITY._}</div>
      </div>

      <div className="_item flex items-center gap-1">
        <FolderStarIcon size={20} weight="duotone" />
        <div className="font-semibold">{e2p(stats.category)}</div>
        <div className="text-[13px] font-medium">{CATEGORY._}</div>
      </div>
    </div>
  );
};
