import { API_ROUTES } from "@/routes";
import type { StatsNamespace } from "@/types/stats";
import type { Country } from "@/schemas";
import { CATEGORY, ITEM } from "@/text/directory";
import { CITY } from "@/text/location";
import {
  MapPinIcon,
  EyeIcon,
  FolderStarIcon,
  CardsThreeIcon,
} from "@phosphor-icons/react/ssr";
import { GENERAL } from "@/text/general";
type CountryStatsProps = {
  currentCountry: Country;
};

async function getStats(
  countryCode: string,
): Promise<StatsNamespace.COUNTRY_STATS> {
  let stats;
  try {
    stats = await (
      await API_ROUTES.STATS.COUNTRY_STATS(countryCode, 100)
    ).json();
  } catch (e) {
    console.log("error in get stats", e);
    throw new Error("error in get stats");
  }
  return stats;
}

export const CountryStats = async ({ currentCountry }: CountryStatsProps) => {
  let stats: StatsNamespace.COUNTRY_STATS;

  try {
    stats = await getStats(currentCountry.code);
  } catch (e) {
    getStats;
    throw new Error("Error in get stats");
  }

  return (
    <div className="_country-stats flex gap-6 rounded-lg bg-black/30 px-5 py-2.5 text-white w-full">
      <div className="_item flex w-full gap-1">
        <CardsThreeIcon size={20} weight="duotone" />

        <div className="_info flex items-center gap-1">
          <div className="font-semibold">{stats.page}</div>
          <div className="font-medium">{ITEM._}</div>
        </div>
      </div>

      <div className="_item flex w-full gap-1">
        <MapPinIcon size={20} weight="duotone" />
        <div className="_info flex items-center gap-1">
          <div className="font-semibold">{stats.city}</div>
          <div className="font-medium">{CITY._}</div>
        </div>
      </div>

      <div className="_item flex w-full gap-1">
        <FolderStarIcon size={20} weight="duotone" />
        <div className="_info flex items-center gap-1">
          <div className="font-semibold">{stats.category}</div>
          <div className="font-medium">{CATEGORY._}</div>
        </div>
      </div>
    </div>
  );
};
