import { API_ROUTES } from "@/routes";
import { StatsNamespace } from "@/types/stats";
import { CountryNamespace } from "@/types/country";
import { CATEGORY, ITEM } from "@/app/text/directory";
import { CITY } from "@/app/text/location";
import {
  MapPin,
  Eye,
  FolderStar,
  CardsThree,
} from "app/client-packages/phosphor-icons/react";
import { GENERAL } from "@/app/text/general";
type CountryStatsProps = {
  currentCountry: CountryNamespace.GET;
};

async function getStats(
  countryCode: string
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
      <div className="container mx-auto max-w-[1144px] px-3 sm:px-0">
        <div className="_wrap flex flex-wrap py-12 px-9 sm:px-0 text-gray-100 shadow-sm wrap sm:justify-around gap-6">
          <div className="_item flex w-full sm:w-auto gap-6">
            <div className="_image p-4 border border-white border-dashed rounded-full">
              <CardsThree size={36} weight="duotone" />
            </div>
            <div className="_info flex flex-wrap content-center text-[22px] gap-3">
              <div className="font-bold">{stats.page}</div>
              <div className="font-medium">{ITEM._}</div>
            </div>
          </div>

          <div className="_item flex w-full sm:w-auto gap-6">
            <div className="_image p-4 border border-white border-dashed rounded-full">
              <MapPin size={36} weight="duotone" />
            </div>
            <div className="_info flex flex-wrap content-center text-[22px] gap-3">
              <div className="font-bold">{stats.city}</div>
              <div className="font-medium">{CITY._}</div>
            </div>
          </div>

          <div className="_item flex w-full sm:w-auto gap-6">
            <div className="_image p-4 border border-white border-dashed rounded-full">
              <FolderStar size={36} weight="duotone" />
            </div>
            <div className="_info flex flex-wrap content-center text-[22px] gap-3">
              <div className="font-bold">{stats.category}</div>
              <div className="font-medium">{CATEGORY._}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
