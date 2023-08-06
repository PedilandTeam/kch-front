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
import { createClient, RedisClientType } from "redis";

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

const cacheView = async (currentCountry: CountryNamespace.GET) => {
  let client: RedisClientType;
  let views: number = 1;

  const viewsKey = `${currentCountry.code}_views`;

  try {
    client = createClient({
      url: process.env.REDIS_URL,
    });
    await client.connect();
    views = Number(await client.get(viewsKey)) ?? 1;
    return views;
  } catch (e) {
    console.log(e);
    throw new Error("redis error");
  }
};

export const CountryStats = async ({ currentCountry }: CountryStatsProps) => {
  let views: string | number | null = null;
  let stats: StatsNamespace.COUNTRY_STATS;

  try {
    views = await cacheView(currentCountry);
  } catch (e) {
    console.error(e);
  }

  try {
    stats = await getStats(currentCountry.code);
  } catch (e) {
    getStats;
    throw new Error("Error in get stats");
  }

  return (
    <div className="mod-stats4 sm:my-20 mx-3 sm:mx-0">
      <div className="wrap border border-gray-200 p-5 rounded-md flex flex-wrap sm:justify-around shadow-sm">
        <div className="item w-full sm:w-auto flex mb-4 sm:mb-0">
          <div className="image bg-pink-100 p-5 ml-4 rounded-full">
            <RectangleStackIcon className="w-9 h-9 text-pink-700" />
          </div>
          <div className="info flex flex-wrap content-center text-pink-700 text-[18px]">
            <div className="ml-2 font-bold ">{stats.page}</div>
            <div className="font-medium">{_TXT.ITEM._}</div>
          </div>
        </div>
        <div className="item w-full sm:w-auto flex mb-4 sm:mb-0">
          <div className="image bg-lime-100 p-5 ml-4 rounded-full">
            <MapIcon className="w-9 h-9 text-lime-700" />
          </div>
          <div className="info flex flex-wrap content-center text-lime-700 text-[18px]">
            <div className="ml-2 font-bold ">{stats.city}</div>
            <div className="font-medium">{_TXT.CITY._}</div>
          </div>
        </div>
        <div className="item w-full sm:w-auto flex mb-4 sm:mb-0">
          <div className="image bg-rose-100 p-5 ml-4 rounded-full">
            <FolderIcon className="w-9 h-9 text-rose-700" />
          </div>
          <div className="info flex flex-wrap content-center text-rose-700 text-[18px]">
            <div className="ml-2 font-bold ">{stats.category}</div>
            <div className="font-medium">{_TXT.CATEGORY._}</div>
          </div>
        </div>
        <div className="item w-full sm:w-auto flex">
          <div className="image bg-sky-100 p-5 ml-4 rounded-full">
            <EyeIcon className="w-9 h-9 text-sky-700" />
          </div>
          <div className="info flex flex-wrap content-center text-sky-700 text-[18px]">
            <div className="ml-2 font-bold ">
              {views ?? _TXT.GENERAL.LOADING}
            </div>
            <div className="font-medium">{_TXT.GENERAL.VIEW}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
