"use client";

import { PageNamespace } from "@/types/page";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import upperCaseFirst from "@/utils/upperCaseFirst";
import ItemTime from "./tools/time";
import ItemClaim from "./tools/claim";
import {
  Phone,
  DeviceMobile,
  GlobeSimple,
  TelegramLogo,
  WhatsappLogo,
} from "@phosphor-icons/react/dist/ssr";
import { SOCIAL } from "@/text/social";
import { GENERAL } from "@/text/general";
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
    <div className="_item-address text-left">
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
      <span className="font-latin">{text}</span>
    </div>
  );
}

export function ItemSideInfo({ pageData }: ItemSideInfoType) {
  const number = pageData.contact?.telephone
    ? `00${pageData.country.areaCode ? pageData.country.areaCode : ""}${pageData
        .contact.telephone!}`
    : pageData.contact?.phone &&
      `00${pageData.country.areaCode ? pageData.country.areaCode : ""}${pageData
        .contact.phone!}`;

  const linkHandler = useLinkHandler({ pageData });

  return (
    <div className="item-side mx-3">
      <div className="item-contact mb-4 grid grid-cols-4">
        {/* WEBSITE */}
        <div className="group grid grid-rows-1 gap-2 border-l text-center hover:cursor-pointer">
          {pageData?.socials?.website ? (
            <button
              onClick={linkHandler}
              data-type="website"
              className="grid grid-rows-2 gap-[10px] text-center"
            >
              <GlobeSimple
                className="mx-auto h-[26px] w-[26px] transition duration-300 ease-in-out group-hover:text-blue-900"
                weight="duotone"
              />
              <span className="font-medium transition duration-300 ease-in-out group-hover:text-blue-900">
                {GENERAL.WEBSITE}
              </span>
            </button>
          ) : (
            <button className="grid cursor-default grid-rows-2 gap-[10px] text-center">
              <GlobeSimple
                className="mx-auto h-[26px] w-[26px] text-gray-300"
                weight="duotone"
              />
              <span className="text-gray-300">{GENERAL.WEBSITE}</span>
            </button>
          )}
        </div>
        {/* PHONE/MOBILE */}
        <div className="group grid grid-rows-1 gap-2 border-l text-center hover:cursor-pointer">
          {pageData.contact?.telephone ? (
            <button
              onClick={linkHandler}
              data-type="telephone"
              data-tip={GENERAL.CLICK_IT}
              className="font-PinarLT tooltip grid grid-rows-2 gap-[10px] text-center"
            >
              <Phone
                className="mx-auto h-[26px] w-[26px] transition duration-300 ease-in-out group-hover:text-blue-900"
                weight="duotone"
              />
              <span className="font-medium transition duration-300 ease-in-out group-hover:text-blue-900">
                تلفن
              </span>
            </button>
          ) : pageData.contact?.phone ? (
            <button
              onClick={linkHandler}
              data-type="phone"
              data-tip={GENERAL.CLICK_IT}
              className="font-PinarLT tooltip grid grid-rows-2 gap-[10px] text-center"
            >
              <DeviceMobile
                className="mx-auto h-[26px] w-[26px] transition duration-300 ease-in-out group-hover:text-blue-900"
                weight="duotone"
              />
              <span className="font-medium transition duration-300 ease-in-out group-hover:text-blue-900">
                همراه
              </span>
            </button>
          ) : (
            <button className="grid cursor-default grid-rows-2 gap-[10px] text-center">
              <Phone
                className="mx-auto h-[26px] w-[26px] text-gray-300"
                weight="duotone"
              />
              <span className="text-gray-300">تلفن</span>
            </button>
          )}
        </div>
        {/* TELEGRAM */}
        <div className="group grid grid-rows-1 gap-2 border-l text-center hover:cursor-pointer">
          {pageData?.contact?.telegram ? (
            <button
              onClick={linkHandler}
              data-type="telegram"
              className="grid grid-rows-2 gap-[10px] text-center"
            >
              <TelegramLogo
                className="mx-auto h-[26px] w-[26px] transition duration-300 ease-in-out group-hover:text-sky-600"
                weight="duotone"
              />
              <span className="font-medium transition duration-300 ease-in-out group-hover:text-sky-700">
                {SOCIAL.TELEGRAM}
              </span>
            </button>
          ) : (
            <button className="grid cursor-default grid-rows-2 gap-[10px] text-center">
              <TelegramLogo
                className="mx-auto h-[26px] w-[26px] text-gray-300"
                weight="duotone"
              />
              <span className="text-gray-300">{SOCIAL.TELEGRAM}</span>
            </button>
          )}
        </div>
        {/* WHATSAPP */}
        <div className="group grid grid-rows-1 gap-2 text-center hover:cursor-pointer">
          {pageData?.contact?.whatsapp ? (
            <button
              onClick={linkHandler}
              data-type="whatsapp"
              className="grid grid-rows-2 gap-[10px] text-center"
            >
              <WhatsappLogo
                className="mx-auto h-[26px] w-[26px] transition duration-300 ease-in-out group-hover:text-green-600"
                weight="duotone"
              />
              <span className="font-medium transition duration-300 ease-in-out group-hover:text-green-700">
                {SOCIAL.WHATSAPP}
              </span>
            </button>
          ) : (
            <button className="grid cursor-default grid-rows-2 gap-[10px] text-center">
              <WhatsappLogo
                className="mx-auto h-[26px] w-[26px] text-gray-300"
                weight="duotone"
              />
              <span className="text-gray-300">{SOCIAL.WHATSAPP}</span>
            </button>
          )}
        </div>
      </div>

      <ItemTime />

      <div className="mb-3 rounded-md border border-gray-200 p-4">
        <ItemSideInfoItem
          text={`${
            pageData?.address?.address ? `${pageData?.address?.address},` : ""
          } ${
            pageData?.address?.postalCode
              ? `${pageData.address.postalCode}`
              : ""
          } ${
            pageData?.city?.englishName
              ? upperCaseFirst(pageData.city.englishName)
              : upperCaseFirst(pageData?.city?.name)
          }`}
        />
      </div>

      <ItemClaim slug={pageData.slug} enable={!pageData.business} />

      {/* Advertising Section */}
      {/* <div className="mb-3">
        <Image
          src={"/images/banner/bnr-06.gif"}
          width={368}
          height={280}
          alt="banner"
        />
      </div> */}

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
