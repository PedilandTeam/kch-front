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
import { ItemTopInfo } from "./topInfo";

export default function Item() {
  return (
    <div className="component page-item">
      <div className="bg-slate-100 h-[300px]">
        <ItemTopInfo />
      </div>

      <div className="container mx-auto max-w-screen-2xl px-0">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-y-4 sm:gap-4">
          
          {/* Contact Section */}
          <div className="item-contact sm:col-span-2 rounded-md border border-gray-200 p-4">
            <h3 className="font-semibold mb-5">{GENERAL.CONTACT_INFO}</h3>
            <div className="ct-mobile flex items-center justify-between mb-3 hover:cursor-pointer">
              <div className="group inline-flex">
                <DevicePhoneMobileIcon className="w-5 h-5 ml-2 text-gray-500" />
                <span className="text-sm">{GENERAL.MOBILE}</span>
              </div>
              <div className="ct-app flex">
                <Image
                  alt="whatsapp"
                  src={"/img/icon/whatsapp-outline.svg"}
                  width={18}
                  height={18}
                  className="ml-1"
                />
                <Image
                  alt="telegram"
                  src={"/img/icon/telegram-outline.svg"}
                  width={18}
                  height={18}
                />
              </div>
            </div>
            <div className="ct-phone flex mb-3">
              <div className="group inline-flex">
                <PhoneIcon className="w-5 h-5 ml-2 text-gray-300" />
                <span className="text-sm text-gray-300">{GENERAL.PHONE}</span>
              </div>
            </div>
            <div className="ct-email flex mb-3 hover:cursor-pointer">
              <div className="group inline-flex">
                <AtSymbolIcon className="w-5 h-5 ml-2 text-gray-500" />
                <span className="text-sm">{GENERAL.EMAIL}</span>
              </div>
            </div>
            <div className="ct-email flex hover:cursor-pointer">
              <div className="group inline-flex">
                <GlobeAltIcon className="w-5 h-5 ml-2 text-gray-500" />
                <span className="text-sm">{GENERAL.WEBSITE}</span>
              </div>
            </div>
          </div>
          {/* Social Media Section */}
          <div className="item-social sm:col-span-2 rounded-md border border-gray-200 p-4">
            <h3 className="font-semibold mb-5">{GENERAL.SOCIAL_MEDIA}</h3>
            <div className="sc-instagram flex mb-3 hover:cursor-pointer">
              <div className="group inline-flex">
                <svg
                  className="w-5 h-5 ml-2 text-gray-400 group-hover:text-pink-700 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                <span className="text-sm">{SOCIAL.INSTAGRAM}</span>
              </div>
            </div>
            <div className="sc-facebook flex mb-3 hover:cursor-pointer">
              <div className="group inline-flex">
                <svg
                  className="w-5 h-5 ml-2 text-gray-400 group-hover:text-blue-500 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                <span className="text-sm">{SOCIAL.FACEBOOK}</span>
              </div>
            </div>
            <div className="sc-linkedin flex mb-3 hover:cursor-pointer">
              <div className="group inline-flex">
                <svg
                  className="w-5 h-5 ml-2 text-gray-400 group-hover:text-sky-700 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                >
                  <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"></path>
                </svg>
                <span className="text-sm">{SOCIAL.LINKEDIN}</span>
              </div>
            </div>
            <div className="sc-youtube flex hover:cursor-pointer">
              <div className="group inline-flex">
                <svg
                  className="w-5 h-5 ml-3 text-gray-400 group-hover:text-red-600 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                </svg>
                <span className="text-sm">{SOCIAL.YOUTUBE}</span>
              </div>
            </div>
          </div>
          {/* Tools Section */}
          <div className="item-tools sm:col-span-2 rounded-md border border-gray-200 p-4">
            <h3 className="font-semibold mb-5">{GENERAL.TOOLS}</h3>
            <div className="tl-share flex mb-3 hover:cursor-pointer">
              <div className="group inline-flex">
                <ShareIcon className="w-5 h-5 ml-2 text-gray-500" />
                <span className="text-sm">{GENERAL.SHARING}</span>
              </div>
            </div>
            <div className="tl-report flex mb-3 hover:cursor-pointer">
              <div className="group inline-flex">
                <FlagIcon className="w-5 h-5 ml-2 text-gray-500" />
                <span className="text-sm">{GENERAL.REPORT_PAGE}</span>
              </div>
            </div>
            <div className="tl-view flex items-center justify-between mb-3">
              <div className="group inline-flex">
                <EyeIcon className="w-5 h-5 ml-2 text-gray-500" />
                <span className="text-sm">{GENERAL.VIEW}</span>
              </div>
              <span className="text-xs">235</span>
            </div>
            <div className="tl-comment flex items-center justify-between">
              <div className="group inline-flex">
                <ChatBubbleBottomCenterTextIcon className="w-5 h-5 ml-2 text-gray-300" />
                <span className="text-sm text-gray-300">
                  {GENERAL.COMMENT_SUBMIT}
                </span>
              </div>
              <span className="text-xs text-gray-300">304</span>
            </div>
          </div>

          {/* Description Section */}
          <div className="item-description sm:col-span-6 rounded-md border border-gray-200 p-4">
            <h3 className="font-semibold mb-5">{GENERAL.DESCRIPTION}</h3>
            <div>
              <p className="text-sm text-gray-500">
                توضیحات بیشتری در مورد این واحد ثبت نشده است.
              </p>
            </div>
          </div>
          {/* Facilities Section */}
          <div className="item-description sm:col-span-3 rounded-md border border-gray-200 p-4">
            <h3 className="font-semibold mb-5">{GENERAL.FACILITIES}</h3>
          </div>
          {/* Working Hours Section */}
          <div className="relative item-description sm:col-span-3">
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
          </div>
          {/* Comment Section */}
          <div className="item-description sm:col-span-6 rounded-md border border-gray-200 p-4">
            <h3 className="font-semibold mb-5">{GENERAL.COMMENT_USERS}</h3>
          </div>
          {/* Images Section */}
          <div className="item-description sm:col-span-6 rounded-md border border-gray-200 p-4">
            <h3 className="font-semibold mb-5">{GENERAL.IMAGES}</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
