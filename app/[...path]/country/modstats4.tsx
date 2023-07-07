import { GENERAL } from "@/components/allTexts";
import {
  EyeIcon,
  FolderIcon,
  MapIcon,
  RectangleStackIcon,
} from "@heroicons/react/24/outline";
import { CategoryNamespace } from "@/types/category";

type Mod4StatsProps ={
  categories: CategoryNamespace.GET
}
export const Mod4Stats = ({categories}: Mod4StatsProps) => {
  return (
    <div className="mod-stats4 sm:my-20 mx-3 sm:mx-0">
      <div className="wrap border border-gray-200 p-5 rounded-md flex flex-wrap sm:justify-around shadow-sm">
        <div className="item w-full sm:w-auto flex mb-4 sm:mb-0">
          <div className="image bg-pink-100 p-5 ml-4 rounded-full">
            <RectangleStackIcon className="w-9 h-9 text-pink-700" />
          </div>
          <div className="info flex flex-wrap content-center text-pink-700 text-[18px]">
            <div className="ml-2 font-bold ">234</div>
            <div className="font-medium">{GENERAL.ITEM}</div>
          </div>
        </div>
        <div className="item w-full sm:w-auto flex mb-4 sm:mb-0">
          <div className="image bg-lime-100 p-5 ml-4 rounded-full">
            <MapIcon className="w-9 h-9 text-lime-700" />
          </div>
          <div className="info flex flex-wrap content-center text-lime-700 text-[18px]">
            <div className="ml-2 font-bold ">8</div>
            <div className="font-medium">{GENERAL.CITY}</div>
          </div>
        </div>
        <div className="item w-full sm:w-auto flex mb-4 sm:mb-0">
          <div className="image bg-rose-100 p-5 ml-4 rounded-full">
            <FolderIcon className="w-9 h-9 text-rose-700" />
          </div>
          <div className="info flex flex-wrap content-center text-rose-700 text-[18px]">
            <div className="ml-2 font-bold ">{categories?.meta?.totalItems}</div>
            <div className="font-medium">{GENERAL.CATEGORY}</div>
          </div>
        </div>
        <div className="item w-full sm:w-auto flex">
          <div className="image bg-sky-100 p-5 ml-4 rounded-full">
            <EyeIcon className="w-9 h-9 text-sky-700" />
          </div>
          <div className="info flex flex-wrap content-center text-sky-700 text-[18px]">
            <div className="ml-2 font-bold ">23,549</div>
            <div className="font-medium">{GENERAL.VIEW}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
