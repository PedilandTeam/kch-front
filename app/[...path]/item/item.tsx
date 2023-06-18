"use client";

import {
  AtSymbolIcon,
  ChatBubbleBottomCenterTextIcon,
  DevicePhoneMobileIcon,
  EyeIcon,
  FlagIcon,
  GlobeAltIcon,
  PhoneIcon,
  ShareIcon,
} from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { CircleFlag } from "react-circle-flags";
import Rating from "react-rating";
import { COUNTRY, DAYS, GENERAL, SOCIAL } from "../../../components/allTexts";
import { ItemBreadCrumb } from "./breadcrumb";
import { ItemButtons } from "./buttons";
import { ItemSideInfo } from "./sideInfo";
import { ItemTopInfo } from "./topInfo";

export default function Item() {
  return (
    <div className="component page-item">
      <div className="bg-slate-100 h-[300px] mb-5">
        <ItemTopInfo />
      </div>

      <div className="container mx-auto max-w-[1144px]">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-y-4 sm:gap-4">
          <div className="item-main sm:col-span-8 pl-3">
            <ItemBreadCrumb />

            {/* Description Section */}
            <div className="item-description py-8 border-b-[1px] border-gray-200">
              <h3 className="font-bold mb-5">{GENERAL.DESCRIPTION}</h3>
              <p className="text-sm text-gray-500">
                توضیحاتی در مورد این واحد ثبت نشده است.
              </p>
            </div>

            {/* Facilities Section */}
            <div className="item-description py-8 border-b-[1px] border-gray-200">
              <h3 className="font-semibold mb-5">{GENERAL.FACILITIES}</h3>
              <p className="text-sm text-gray-500">
                امکانات این واحد لیست نشده است.
              </p>
            </div>

            {/* Working Hours Section */}
            {/* <div className="relative item-description sm:col-span-3">
              <div className=" select-none absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 font-bold text-sm">
                ساعت‌کاری در دسترس نیست
              </div>
              <div className=" blur-[5px] select-none rounded-md border border-gray-200 p-4">
                <h3 className="font-semibold mb-5">{GENERAL.WORKING_HOURS}</h3>
                <div>
                  <div className="flex items-center justify-between py-1 px-2 border-b border-t border-dashed text-sm text-teal-500 bg-teal-50 border-teal-200 font-semibold">
                    <span>{DAYS.MONDAY}</span>
                    <div>
                      <span>
                        8:00<span className="mx-1 text-teal-300">-</span>14:00
                      </span>
                      <span className="mx-3">,</span>
                      <span>
                        16:00<span className="mx-1 text-teal-300">-</span>22:00
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between py-1 px-2 border-b border-dashed text-sm">
                    <span>{DAYS.TUESDAY}</span>
                    <div>
                      <span>
                        8:00<span className="mx-1 text-gray-400">-</span>22:00
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between py-1 px-2 border-dashed text-sm">
                    <span>{DAYS.WEDNESDAY}</span>
                    <div>
                      <span>
                        8:00<span className="mx-1 text-gray-400">-</span>14:00
                      </span>
                      <span className="mx-3">,</span>
                      <span>
                        16:00<span className="mx-1 text-gray-400">-</span>22:00
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between py-1 px-2 border-b border-t border-dashed text-sm text-red-500 bg-red-50 border-red-200 font-semibold">
                    <span>{DAYS.TURSDAY}</span>
                    <div>
                      <span>
                        8:00<span className="mx-1 text-red-300">-</span>22:00
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between py-1 px-2 border-b  border-dashed text-sm">
                    <span>{DAYS.FRIDAY}</span>
                    <div>
                      <span>
                        8:00<span className="mx-1 text-gray-400">-</span>14:00
                      </span>
                      <span className="mx-3">,</span>
                      <span>
                        16:00<span className="mx-1 text-gray-400">-</span>22:00
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between py-1 px-2 border-b  border-dashed text-sm text-red-400">
                    <span>{DAYS.SATURDAY}</span>
                    <div>
                      <span>{GENERAL.CLOSED}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between py-1 px-2 border-b  border-dashed text-sm text-red-400 mb-1">
                    <span>{DAYS.SUNDAY}</span>
                    <div>
                      <span>{GENERAL.CLOSED}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}

            {/* Images Section */}
            <div className="item-description py-8 border-b-[1px] border-gray-200">
              <h3 className="font-semibold mb-5">{GENERAL.IMAGES}</h3>
              <p className="text-sm text-gray-500">
                تصویری برای این واحد وجود ندارد.
              </p>
            </div>

            {/* Comment Section */}
            <div className="item-description py-8 border-b-[1px] border-gray-200">
              <h3 className="font-semibold mb-5">{GENERAL.USERS_COMMENTS}</h3>
              <p className="text-sm text-gray-500">
                امکان ثبت نظرات برای این واحد فعال نشده است.
              </p>
            </div>
          </div>

          <div className="item-side sm:col-span-4 mr-3">
            <ItemSideInfo />
          </div>
        </div>
      </div>
    </div>
  );
}
