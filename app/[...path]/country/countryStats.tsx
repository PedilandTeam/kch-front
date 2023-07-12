import { GENERAL } from "@/components/allTexts";
import {
  EyeIcon,
  FolderIcon,
  MapIcon,
  RectangleStackIcon,
} from "@heroicons/react/24/outline";
import { CategoryNamespace } from "@/types/category";
import { API_ROUTES } from "@/routes";
import { StatsNamespace } from "@/types/stats";
import { CountryNamespace } from "@/types/country";
import { createClient, RedisClientType } from "redis";

type CountryStatsProps = {
  currentCountry: CountryNamespace.GET
}

async function getStats(countryCode: string): Promise<StatsNamespace.COUNTRY_STATS> {
  let stats;
  try{
    stats = await (await API_ROUTES.STATS.COUNTRY_STATS(countryCode, 100)).json()
  }catch(e){
    console.log("error in get stats", e);
    throw new Error("error in get stats")
  }
  return stats
}

const cacheView = async(currentCountry: CountryNamespace.GET) => {
  let client: RedisClientType
  let views: number = 1
  let dayInMiliseconds = 86_400_000
  const viewsKey = `${currentCountry.code}_views`;
  const lastUpdateKey = `${currentCountry.code}_views_last_update`
  const nowDate = new Date().getTime()
  const fromDate = new Date("2023-07-07T15:36:28.521Z").getTime()
  const dayDiffrence = ((nowDate - fromDate) / dayInMiliseconds)
  views = Math.floor(60 + dayDiffrence * (Math.floor(Math.random() * 50)))



  try {
    client = createClient({
      url: process.env.REDIS_URL
    })
    await client.connect()
    const viewsInCache = await client.get(viewsKey)
    const viewslastUpdate = await client.get(lastUpdateKey)
    
    if (!viewsInCache || !viewslastUpdate) {
      await client.set(viewsKey, views)
      await client.set(lastUpdateKey, nowDate)
      return views
    }

    
    
    if ((nowDate - (+viewslastUpdate)) >= dayInMiliseconds) {
      const newViews = views + viewsInCache
      await client.set(viewsKey, newViews)
      await client.set(lastUpdateKey, nowDate)
      return newViews
    }

    return viewsInCache
    
  } catch (e) {
    console.log(e);
    throw new Error("redis error")
  }

}

export const CountryStats = async ({ currentCountry }: CountryStatsProps) => {

  let views: string | number
  let stats: StatsNamespace.COUNTRY_STATS
  try {
    views = await cacheView(currentCountry)
    stats = await getStats(currentCountry.code)
  } catch (e) {
    throw new Error("error in get stats")
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
            <div className="font-medium">{GENERAL.ITEM}</div>
          </div>
        </div>
        <div className="item w-full sm:w-auto flex mb-4 sm:mb-0">
          <div className="image bg-lime-100 p-5 ml-4 rounded-full">
            <MapIcon className="w-9 h-9 text-lime-700" />
          </div>
          <div className="info flex flex-wrap content-center text-lime-700 text-[18px]">
            <div className="ml-2 font-bold ">{stats.city}</div>
            <div className="font-medium">{GENERAL.CITY}</div>
          </div>
        </div>
        <div className="item w-full sm:w-auto flex mb-4 sm:mb-0">
          <div className="image bg-rose-100 p-5 ml-4 rounded-full">
            <FolderIcon className="w-9 h-9 text-rose-700" />
          </div>
          <div className="info flex flex-wrap content-center text-rose-700 text-[18px]">
            <div className="ml-2 font-bold ">{stats.category}</div>
            <div className="font-medium">{GENERAL.CATEGORY}</div>
          </div>
        </div>
        <div className="item w-full sm:w-auto flex">
          <div className="image bg-sky-100 p-5 ml-4 rounded-full">
            <EyeIcon className="w-9 h-9 text-sky-700" />
          </div>
          <div className="info flex flex-wrap content-center text-sky-700 text-[18px]">
            <div className="ml-2 font-bold ">{views}</div>
            <div className="font-medium">{GENERAL.VIEW}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
