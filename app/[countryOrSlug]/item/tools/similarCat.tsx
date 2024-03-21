"use client";

import Link from "next/link";
import ItemProfilePicture from "../itemProfilePicture";
import { CircleFlag } from "next-circle-flags";
import { FolderIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { FolderSimpleStar, ForkKnife } from "@phosphor-icons/react";

const SimilarCat = () => {
  return (
    <div className="my-14">
      <h3 className="pb-3 text-lg font-semibold text-center border-b-2 mb-7">
        از این دسته بندی
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-y-4 sm:gap-5">
        <div className="border border-gray-100 shadow-lg card hover:border-gray-300">
          <figure className="pt-5">
            <Link href={"#"}>
              <Image
                src={"/images/list/logo/logo-placeholder-03.webp"}
                width={125}
                height={125}
                alt=""
                className="rounded-full"
              />
            </Link>
          </figure>
          <div className="px-4 py-5 card-body">
            <Link href={"#"}>
              <h2 className="block text-lg text-center truncate card-title font-PinarLT text-slate-700 hover:text-pink-800 hover:overflow-visible">
                آرایشگاه مرجان
              </h2>
            </Link>

            <div className="flex justify-center card-rating">
              {/* @ts-ignore */}
              <div className="rating">
                <input
                  type="radio"
                  name="rating-1"
                  className="mask w-[24px] h-[24px] mask-star-2 bg-gray-200"
                />
                <input
                  type="radio"
                  name="rating-2"
                  className="mask w-[24px] h-[24px] mask-star-2 bg-gray-200"
                />
                <input
                  type="radio"
                  name="rating-2"
                  className="mask w-[24px] h-[24px] mask-star-2 bg-gray-200"
                />
                <input
                  type="radio"
                  name="rating-2"
                  className="mask w-[24px] h-[24px] mask-star-2 bg-gray-200"
                />
                <input
                  type="radio"
                  name="rating-2"
                  className="mask w-[24px] h-[24px] mask-star-2 bg-gray-200"
                />
              </div>
            </div>

            <div className="flex items-center justify-center w-full gap-3 my-1 text-sm text-gray-600 card-tools">
              <div className="flex items-center">
                <CircleFlag
                  alt={"#"}
                  width={5}
                  height={5}
                  countryCode={"de"}
                  className="w-[18px] ml-[6px]"
                  title={"آلمان"}
                />
                <span className="truncate">دوسلدورف</span>
              </div>
              <div className="flex items-center">
                <FolderSimpleStar
                  size={20}
                  weight="light"
                  className="ml-1 text-primary"
                />
                <Link href={"#"}>
                  <span className="truncate">رستوران</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="border border-gray-100 shadow-lg card hover:border-gray-300">
          <figure className="pt-5">
            <Link href={"#"}>
              <Image
                src={"/images/list/logo/logo-placeholder-03.webp"}
                width={125}
                height={125}
                alt=""
                className="rounded-full"
              />
            </Link>
          </figure>
          <div className="px-4 py-5 card-body">
            <Link href={"#"}>
              <h2 className="block text-lg text-center truncate card-title font-PinarLT text-slate-700 hover:text-pink-800 hover:overflow-visible">
                آرایشگاه مرجان
              </h2>
            </Link>

            <div className="flex justify-center card-rating">
              {/* @ts-ignore */}
              <div className="rating">
                <input
                  type="radio"
                  name="rating-1"
                  className="mask w-[24px] h-[24px] mask-star-2 bg-gray-200"
                />
                <input
                  type="radio"
                  name="rating-2"
                  className="mask w-[24px] h-[24px] mask-star-2 bg-gray-200"
                />
                <input
                  type="radio"
                  name="rating-2"
                  className="mask w-[24px] h-[24px] mask-star-2 bg-gray-200"
                />
                <input
                  type="radio"
                  name="rating-2"
                  className="mask w-[24px] h-[24px] mask-star-2 bg-gray-200"
                />
                <input
                  type="radio"
                  name="rating-2"
                  className="mask w-[24px] h-[24px] mask-star-2 bg-gray-200"
                />
              </div>
            </div>

            <div className="flex items-center justify-center w-full gap-3 my-1 text-sm text-gray-600 card-tools">
              <div className="flex items-center">
                <CircleFlag
                  alt={"#"}
                  width={5}
                  height={5}
                  countryCode={"de"}
                  className="w-[18px] ml-[6px]"
                  title={"آلمان"}
                />
                <span className="truncate">دوسلدورف</span>
              </div>
              <div className="flex items-center">
                <FolderSimpleStar
                  size={20}
                  weight="light"
                  className="ml-1 text-primary"
                />
                <Link href={"#"}>
                  <span className="truncate">رستوران</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="border border-gray-100 shadow-lg card hover:border-gray-300">
          <figure className="pt-5">
            <Link href={"#"}>
              <Image
                src={"/images/list/logo/logo-placeholder-03.webp"}
                width={125}
                height={125}
                alt=""
                className="rounded-full"
              />
            </Link>
          </figure>
          <div className="px-4 py-5 card-body">
            <Link href={"#"}>
              <h2 className="block text-lg text-center truncate card-title font-PinarLT text-slate-700 hover:text-pink-800 hover:overflow-visible">
                آرایشگاه مرجان
              </h2>
            </Link>

            <div className="flex justify-center card-rating">
              {/* @ts-ignore */}
              <div className="rating">
                <input
                  type="radio"
                  name="rating-1"
                  className="mask w-[24px] h-[24px] mask-star-2 bg-gray-200"
                />
                <input
                  type="radio"
                  name="rating-2"
                  className="mask w-[24px] h-[24px] mask-star-2 bg-gray-200"
                />
                <input
                  type="radio"
                  name="rating-2"
                  className="mask w-[24px] h-[24px] mask-star-2 bg-gray-200"
                />
                <input
                  type="radio"
                  name="rating-2"
                  className="mask w-[24px] h-[24px] mask-star-2 bg-gray-200"
                />
                <input
                  type="radio"
                  name="rating-2"
                  className="mask w-[24px] h-[24px] mask-star-2 bg-gray-200"
                />
              </div>
            </div>

            <div className="flex items-center justify-center w-full gap-3 my-1 text-sm text-gray-600 card-tools">
              <div className="flex items-center">
                <CircleFlag
                  alt={"#"}
                  width={5}
                  height={5}
                  countryCode={"de"}
                  className="w-[18px] ml-[6px]"
                  title={"آلمان"}
                />
                <span className="truncate">دوسلدورف</span>
              </div>
              <div className="flex items-center">
                <FolderSimpleStar
                  size={20}
                  weight="light"
                  className="ml-1 text-primary"
                />
                <Link href={"#"}>
                  <span className="truncate">رستوران</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="border border-gray-100 shadow-lg card hover:border-gray-300">
          <figure className="pt-5">
            <Link href={"#"}>
              <Image
                src={"/images/list/logo/logo-placeholder-03.webp"}
                width={125}
                height={125}
                alt=""
                className="rounded-full"
              />
            </Link>
          </figure>
          <div className="px-4 py-5 card-body">
            <Link href={"#"}>
              <h2 className="block text-lg text-center truncate card-title font-PinarLT text-slate-700 hover:text-pink-800 hover:overflow-visible">
                آرایشگاه مرجان
              </h2>
            </Link>

            <div className="flex justify-center card-rating">
              {/* @ts-ignore */}
              <div className="rating">
                <input
                  type="radio"
                  name="rating-1"
                  className="mask w-[24px] h-[24px] mask-star-2 bg-gray-200"
                />
                <input
                  type="radio"
                  name="rating-2"
                  className="mask w-[24px] h-[24px] mask-star-2 bg-gray-200"
                />
                <input
                  type="radio"
                  name="rating-2"
                  className="mask w-[24px] h-[24px] mask-star-2 bg-gray-200"
                />
                <input
                  type="radio"
                  name="rating-2"
                  className="mask w-[24px] h-[24px] mask-star-2 bg-gray-200"
                />
                <input
                  type="radio"
                  name="rating-2"
                  className="mask w-[24px] h-[24px] mask-star-2 bg-gray-200"
                />
              </div>
            </div>

            <div className="flex items-center justify-center w-full gap-3 my-1 text-sm text-gray-600 card-tools">
              <div className="flex items-center">
                <CircleFlag
                  alt={"#"}
                  width={5}
                  height={5}
                  countryCode={"de"}
                  className="w-[18px] ml-[6px]"
                  title={"آلمان"}
                />
                <span className="truncate">دوسلدورف</span>
              </div>
              <div className="flex items-center">
                <FolderSimpleStar
                  size={20}
                  weight="light"
                  className="ml-1 text-primary"
                />
                <Link href={"#"}>
                  <span className="truncate">رستوران</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SimilarCat;
