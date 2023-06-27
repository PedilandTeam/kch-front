import { GENERAL, MENU } from "@/components/allTexts";
import {
  EyeIcon,
  FolderIcon,
  MapIcon,
  RectangleStackIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";

export const Mod02 = () => {
  return (
    <div className="mode-01 mt-12 sm:my-24 mx-3 sm:mx-0">
      <h2 className="text-[24px] font-black mb-6 pr-3 border-r-[5px] border-pink-600">دنبال چی میگردی؟</h2>
      <div className="wrap grid grid-cols-1 sm:grid-cols-4 gap-0 sm:gap-6">
        <div className="item group flex mb-4 sm:mb-0 ">
          <Link href={"/de/list"}>
            <div className="image relative h-min overflow-hidden rounded-md">
              <Image
                src={"/img/modules/mod-business.jpg"}
                width={400}
                height={560}
                alt="test"
                className="rounded-md group-hover:scale-110 transition-all duration-500 cursor-pointer"
              />
              <div className="info absolute bottom-0 w-full px-4 py-5 group-hover:py-8 transition-all duration-500 cursor-pointer rounded-b-md text-[20px] bg-gradient-to-t from-black text-white">
                {MENU.BUSINESSES}
              </div>
            </div>
          </Link>
        </div>
        <div className="item group flex mb-4 sm:mb-0 ">
          <Link href={"/de/list"}>
            <div className="image relative h-min overflow-hidden rounded-md">
              <Image
                src={"/img/modules/mod-doctors.jpg"}
                width={400}
                height={560}
                alt="test"
                className="rounded-md group-hover:scale-110 transition-all duration-500 cursor-pointer"
              />
              <div className="info absolute bottom-0 w-full px-4 py-5 group-hover:py-8 transition-all duration-500 cursor-pointer rounded-b-md text-[20px] bg-gradient-to-t from-black text-white">
                {MENU.DOCTORS}
              </div>
            </div>
          </Link>
        </div>
        <div className="item group flex mb-4 sm:mb-0 ">
          <Link href={"/de/list"}>
            <div className="image relative h-min overflow-hidden rounded-md">
              <Image
                src={"/img/modules/mod-freelancer.jpg"}
                width={400}
                height={560}
                alt="test"
                className="rounded-md group-hover:scale-110 transition-all duration-500 cursor-pointer"
              />
              <div className="info absolute bottom-0 w-full px-4 py-5 group-hover:py-8 transition-all duration-500 cursor-pointer rounded-b-md text-[20px] bg-gradient-to-t from-black text-white">
                {MENU.FREELANCERS}
              </div>
            </div>
          </Link>
        </div>
        <div className="item group flex mb-4 sm:mb-0 ">
          <Link href={"/de/list"}>
            <div className="image relative h-min overflow-hidden rounded-md">
              <Image
                src={"/img/modules/mod-associations.jpg"}
                width={400}
                height={560}
                alt="test"
                className="rounded-md group-hover:scale-110 transition-all duration-500 cursor-pointer"
              />
              <div className="info absolute bottom-0 w-full px-4 py-5 group-hover:py-8 transition-all duration-500 cursor-pointer rounded-b-md text-[20px] bg-gradient-to-t from-black text-white">
                {MENU.COMMUNITIES}
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};
