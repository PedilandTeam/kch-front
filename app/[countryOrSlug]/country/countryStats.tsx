import { _TXT } from "@/app/text";
import {
  EyeIcon,
  FolderIcon,
  MapIcon,
  RectangleStackIcon,
} from "@heroicons/react/24/outline";
import { API_ROUTES } from "@/routes";
import { StatsNamespace } from "@/types/stats";
import { CountryNamespace } from "@/types/country";
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
    <div className="mod-stats4 my-14 sm:my-28 mx-3 sm:mx-0 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900">
      <div className="container mx-auto max-w-[1144px]">
        <div className="wrap p-12 flex flex-wrap sm:justify-around shadow-sm text-gray-100">
          <div className="item w-full sm:w-auto flex mb-6 sm:mb-0">
            <div className="image border border-dashed border-white p-5 ml-4 rounded-full">
              <RectangleStackIcon className="w-9 h-9" />
            </div>
            <div className="info flex flex-wrap content-center text-[20px]">
              <div className="ml-2 font-bold ">{stats.page}</div>
              <div className="font-medium">{_TXT.ITEM._}</div>
            </div>
          </div>
          <div className="item w-full sm:w-auto flex mb-6 sm:mb-0">
            <div className="image border border-dashed border-white p-5 ml-4 rounded-full">
              <MapIcon className="w-9 h-9" />
            </div>
            <div className="info flex flex-wrap content-center text-[20px]">
              <div className="ml-2 font-bold ">{stats.city}</div>
              <div className="font-medium">{_TXT.CITY._}</div>
            </div>
          </div>
          <div className="item w-full sm:w-auto flex">
            <div className="image border border-dashed border-white p-5 ml-4 rounded-full">
              <FolderIcon className="w-9 h-9" />
            </div>
            <div className="info flex flex-wrap content-center text-[20px]">
              <div className="ml-2 font-bold ">{stats.category}</div>
              <div className="font-medium">{_TXT.CATEGORY._}</div>
            </div>
          </div>
          {/* <div className="item w-full sm:w-auto flex">
            <div className="image border border-dashed border-white p-5 ml-4 rounded-full">
              <EyeIcon className="w-9 h-9" />
            </div>
            <div className="info flex flex-wrap content-center text-[20px]">
              <div className="ml-2 font-bold ">
                {views ?? _TXT.GENERAL.LOADING}
              </div>
              <div className="font-medium">{_TXT.GENERAL.VIEW}</div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};
