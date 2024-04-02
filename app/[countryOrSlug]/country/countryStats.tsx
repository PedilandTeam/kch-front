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
    <div className="mx-3 mod-stats4 my-14 sm:mb-28 sm:mt-14 sm:mx-0 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900">
      <div className="container mx-auto max-w-[1144px]">
        <div className="flex flex-wrap p-12 text-gray-100 shadow-sm wrap sm:justify-around">
          <div className="flex w-full mb-6 item sm:w-auto sm:mb-0">
            <div className="p-5 ml-4 border border-white border-dashed rounded-full image">
              <CardsThree size={32} weight="duotone" />
            </div>
            <div className="info flex flex-wrap content-center text-[20px]">
              <div className="ml-2 font-bold ">{stats.page}</div>
              <div className="font-medium">{ITEM._}</div>
            </div>
          </div>
          <div className="flex w-full mb-6 item sm:w-auto sm:mb-0">
            <div className="p-5 ml-4 border border-white border-dashed rounded-full image">
              <MapPin size={32} weight="duotone" />
            </div>
            <div className="info flex flex-wrap content-center text-[20px]">
              <div className="ml-2 font-bold ">{stats.city}</div>
              <div className="font-medium">{CITY._}</div>
            </div>
          </div>
          <div className="flex w-full item sm:w-auto">
            <div className="p-5 ml-4 border border-white border-dashed rounded-full image">
              <FolderStar size={32} weight="duotone" />
            </div>
            <div className="info flex flex-wrap content-center text-[20px]">
              <div className="ml-2 font-bold ">{stats.category}</div>
              <div className="font-medium">{CATEGORY._}</div>
            </div>
          </div>

          {/* <div className="flex w-full item sm:w-auto">
            <div className="p-5 ml-4 border border-white border-dashed rounded-full image">
              <Eye size={32} weight="duotone" />
            </div>
            <div className="info flex flex-wrap content-center text-[20px]">
              <div className="ml-2 font-bold ">
                {views ?? GENERAL.LOADING}
              </div>
              <div className="font-medium">{GENERAL.VIEW}</div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};
