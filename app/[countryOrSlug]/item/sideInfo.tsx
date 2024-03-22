"use client";

import { PageNamespace } from "@/types/page";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import upperCaseFirst from "@/utils/upperCaseFirst";
import ItemTime from "./tools/time";
import ItemClaim from "./tools/claim";
import {
  DeviceMobile,
  GlobeSimple, TelegramLogo,
  WhatsappLogo
} from "@phosphor-icons/react";
import { SOCIAL } from "@/app/text/social";
import { GENERAL } from "@/app/text/general";
import useLinkHandler from "@/hooks/useLinkHandler";

interface ItemSideInfoType {
  pageData: PageNamespace.Page;
}

type ImageItem = {
  src: string;
  href?: string | undefined | null;
};

type IconItem = {
  Component: React.ReactNode;
  href?: string | undefined | null;
};

interface ItemSideInfoItemType {
  Icons?: IconItem[];
  Images?: ImageItem[];
  text: string | undefined;
}

function ItemSideInfoItem({ Icons, Images, text }: ItemSideInfoItemType) {
  if (!text) {
    return null;
  }
  return (
    <div className="text-left item-address">
      {Array.isArray(Images) &&
        Images.map((image, index) => {
          return (
            <Link
              key={`side-info-${index}`}
              href={image.href || "#"}
              target="_blank"
              rel="nofollow noopener"
            >
              <Image
                key={image.href}
                alt="social icon"
                src={image.src}
                width={20}
                height={20}
                className="ml-2"
              />
            </Link>
          );
        })}
      {Array.isArray(Icons) &&
        Icons.map((Icon, index) => {
          return (
            <Link
              key={`side-info-icons-${index}`}
              href={Icon.href || "#"}
              target="_blank"
              rel="nofollow noopener"
            >
              {Icon.Component}
            </Link>
          );
        })}
      <span className="font-PinarLT">{text}</span>
    </div>
  );
}

export function ItemSideInfo({ pageData }: ItemSideInfoType) {

  const linkHandler = useLinkHandler({pageData})


  return (
    <div className="mx-3 sm:mx-0 item-side sm:col-span-4 sm:col-end-13">
      <div className="grid grid-cols-4 mb-4 item-contact">
        {/* WEBSITE */}
        <div className="grid grid-rows-1 gap-2 text-center border-l group hover:cursor-pointer">
          {pageData?.socials?.website ? (
            <button
              onClick={linkHandler}
              data-type="website"
              className="grid grid-rows-2 gap-[10px] text-center"
            >
              <GlobeSimple
                className="w-[26px] h-[26px] mx-auto group-hover:text-blue-900 transition duration-300 ease-in-out"
                weight="duotone"
              />

              <span className="text-[15px] font-medium transition duration-300 ease-in-out group-hover:text-blue-900">
                {GENERAL.WEBSITE}
              </span>
            </button>
          ) : (
            <button className="grid grid-rows-2 gap-[10px] text-center">
              <GlobeSimple
                className="text-gray-300 w-[26px] h-[26px] mx-auto"
                weight="duotone"
              />
              <span className="text-gray-300">{GENERAL.WEBSITE}</span>
            </button>
          )}
        </div>
        {/* PHONE/MOBILE */}
        <div className="grid grid-rows-1 gap-2 text-center border-l group hover:cursor-pointer">
          {pageData?.contact?.phone ? (
            <button
              onClick={linkHandler}
              data-type="phone"
              data-tip={GENERAL.CLICK_IT}
              className="grid grid-rows-2 gap-[10px] text-center tooltip font-PinarLT"
            >
              <DeviceMobile
                className="w-[26px] h-[26px] mx-auto group-hover:text-blue-900 transition duration-300 ease-in-out"
                weight="duotone"
              />
              <span className="text-[15px] font-medium transition duration-300 ease-in-out group-hover:text-blue-900">
                {GENERAL.MOBILE}
              </span>
            </button>
          ) : (
            <button className="grid grid-rows-2 gap-[10px] text-center">
              <DeviceMobile
                className="text-gray-300 w-[26px] h-[26px] mx-auto"
                weight="duotone"
              />
              <span className="text-gray-300 text-[15px]">
                {GENERAL.MOBILE}
              </span>
            </button>
          )}
        </div>
        {/* TELEGRAM */}
        <div className="grid grid-rows-1 gap-2 text-center border-l group hover:cursor-pointer">
          {pageData?.socials?.telegram ? (
            <button
              onClick={linkHandler}
              data-type="telegram"
              className="grid grid-rows-2 gap-[10px] text-center"
            >
              <TelegramLogo
                className="w-[26px] h-[26px] mx-auto group-hover:text-sky-600 transition duration-300 ease-in-out"
                weight="duotone"
              />
              <span className="text-[15px] font-medium transition duration-300 ease-in-out group-hover:text-sky-700">
                {SOCIAL.TELEGRAM}
              </span>
            </button>
          ) : (
            <button className="grid grid-rows-2 gap-[10px] text-center">
              <TelegramLogo
                className="text-gray-300 w-[26px] h-[26px] mx-auto"
                weight="duotone"
              />
              <span className="text-[15px] text-gray-300">
                {SOCIAL.TELEGRAM}
              </span>
            </button>
          )}
        </div>
        {/* WHATSAPP */}
        <div className="grid grid-rows-1 gap-2 text-center group hover:cursor-pointer">
          {pageData?.contact?.whatsapp ? (
            <button
              onClick={linkHandler}
              data-type="whatsapp"
              className="grid grid-rows-2 gap-[10px] text-center"
            >
              <WhatsappLogo
                className="w-[26px] h-[26px] mx-auto group-hover:text-green-600 transition duration-300 ease-in-out"
                weight="duotone"
              />
              <span className="text-[15px] font-medium transition duration-300 ease-in-out group-hover:text-green-700">
                {SOCIAL.WHATSAPP}
              </span>
            </button>
          ) : (
            <button className="grid grid-rows-2 gap-[10px] text-center">
              <WhatsappLogo
                className="text-gray-300 w-[26px] h-[26px] mx-auto"
                weight="duotone"
              />
              <span className="text-[15px] text-gray-300">
                {SOCIAL.WHATSAPP}
              </span>
            </button>
          )}
        </div>
      </div>
      <div className="p-4 mb-3 border border-gray-200 rounded-md">
        <ItemSideInfoItem
          text={`${
            pageData?.address?.address ? `${pageData?.address?.address},` : ""
          } ${
            pageData?.city?.englishName
              ? upperCaseFirst(pageData.city.englishName)
              : upperCaseFirst(pageData?.city?.name)
          }`}
        />
      </div>

      <ItemClaim />

      <ItemTime />

      {/* Share Modal */}
      {/* <dialog id="modal_share" className="modal">
        <div className="modal-box">
          <h3 className="flex items-center text-lg font-bold">
            <ShareIcon className="w-[22px] h-[22px] ml-2" />
            اشتراک گذاری
          </h3>
          <p className="pt-2">
            با اشتراک گذاری این صفحه در صفحات اجتماعی به دیده شدنش کمک کنید.
          </p>
          <div className="share-links"></div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog> */}
    </div>
  );
}
