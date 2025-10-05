import { API_ROUTES } from "@/routes";
import { StatsNamespace } from "@/types/stats";
import { Country } from "@/types/country";
import { CATEGORY, ITEM } from "@/text/directory";
import { CITY } from "@/text/location";
import {
  MapPin,
  Eye,
  FolderStar,
  CardsThree,
} from "@phosphor-icons/react";
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
    <div className="_country-stats bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900">
      <div className="container">
        <div className="_wrap wrap flex flex-wrap gap-6 px-9 py-12 text-gray-100 shadow-sm">
          <div className="_item flex w-full gap-6">
            <div className="_image rounded-full border border-dashed border-white p-4">
              <CardsThree size={36} weight="duotone" />
            </div>
            <div className="_info flex flex-wrap content-center gap-3 text-[22px]">
              <div className="font-bold">{stats.page}</div>
              <div className="font-medium">{ITEM._}</div>
            </div>
          </div>

          <div className="_item flex w-full gap-6">
            <div className="_image rounded-full border border-dashed border-white p-4">
              <MapPin size={36} weight="duotone" />
            </div>
            <div className="_info flex flex-wrap content-center gap-3 text-[22px]">
              <div className="font-bold">{stats.city}</div>
              <div className="font-medium">{CITY._}</div>
            </div>
          </div>

          <div className="_item flex w-full gap-6">
            <div className="_image rounded-full border border-dashed border-white p-4">
              <FolderStar size={36} weight="duotone" />
            </div>
            <div className="_info flex flex-wrap content-center gap-3 text-[22px]">
              <div className="font-bold">{stats.category}</div>
              <div className="font-medium">{CATEGORY._}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
