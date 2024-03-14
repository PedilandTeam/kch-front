"use client";

import { PageNamespace } from "@/types/page";
import DeviceDetector from "device-detector-js";
import {
  ShareIcon,
  GlobeAltIcon,
  PhoneIcon,
  DevicePhoneMobileIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { MouseEvent } from "react";
import { toast } from "react-hot-toast";
import upperCaseFirst from "@/utils/upperCaseFirst";
import { _TXT } from "@/app/text";
import { DAYS } from "@/app/text/calendar";
import { GENERAL } from "@/app/text/general";
import ItemTime from "./tools/time";
import ItemClaim from "./tools/claim";

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
  const router = useRouter();
  const pathname = usePathname();

  const linkHandler = (e: MouseEvent<HTMLButtonElement>) => {
    const type = e.currentTarget.dataset.type;
    const regexp =
      /^(?:https?:\/\/)?(?:[^@\/\n]+@)?(?:www\.)?([^:\/?\n]+)/gim.exec(
        pageData?.socials?.website!
      );
    if (!regexp || !Array.isArray(regexp) || !regexp[1]) {
      return;
    }
    const detector = new DeviceDetector();
    const agent = detector.parse(navigator.userAgent);

    if (type == "website") {
      window.open(`https://${regexp[0]}`, "_blank", "noopener, noreferrer");
    } else if (type == "telephone") {
      if (agent.device?.type == "desktop") {
        const number = `00${
          pageData.country.areaCode ? pageData.country.areaCode : ""
        }${pageData.contact.telephone!}`;
        navigator.clipboard.writeText(number);
        e.currentTarget.dataset.tip = number;
        toast.success("شماره تلفن کپی شد.");
      } else {
        window.open(
          `tel:${pageData.contact.telephone}`,

          "_blank",
          "noopener, noreferrer"
        );
      }
    } else if (type == "share") {
      if (agent.device?.type == "desktop") {
        navigator.clipboard.writeText(
          `${process.env.NEXT_PUBLIC_FRONT_URL}/${pageData.slug}`
        );
        toast.success("آدرس این صفحه کپی شد.");
      } else {
        navigator.share({
          url: `${process.env.NEXT_PUBLIC_FRONT_URL}/${pageData.slug}`,
        });
      }
    } else if (type == "phone") {
      if (agent.device?.type == "desktop") {
        const number = `00${
          pageData.country.areaCode ? pageData.country.areaCode : ""
        }${pageData.contact.phone!}`;
        navigator.clipboard.writeText(number);
        e.currentTarget.dataset.tip = number;
        toast.success("شماره همراه کپی شد.");
      } else {
        window.open(
          `tel:${pageData.contact.phone}`,
          "_blank",
          "noopener, noreferrer"
        );
      }
    }
  };

  return (
    <div className="mx-3 item-side sm:col-span-4 sm:col-end-13 sm:mr-3 sm:ml-0">
      <div className="grid grid-cols-4 mb-4 item-contact">
        <div className="grid grid-rows-1 gap-2 text-center border-l group hover:cursor-pointer">
          {pageData?.socials?.website ? (
            <button
              onClick={linkHandler}
              data-type="website"
              className="grid grid-rows-2 gap-2 text-center"
            >
              <GlobeAltIcon className="w-[26px] h-[26px] mx-auto group-hover:text-yellow-900 transition duration-300 ease-in-out" />
              <span className="font-medium transition duration-300 ease-in-out group-hover:text-yellow-900">
                {_TXT.GENERAL.WEBSITE}
              </span>
            </button>
          ) : (
            <button className="grid grid-rows-2 gap-2 text-center">
              <GlobeAltIcon className="text-gray-300 w-[26px] h-[26px] mx-auto" />
              <span className="text-gray-300">{_TXT.GENERAL.WEBSITE}</span>
            </button>
          )}
        </div>

        <div className="grid grid-rows-1 gap-2 text-center border-l group hover:cursor-pointer">
          {
            pageData?.contact?.phone ? (
              <button
                onClick={linkHandler}
                data-type="phone"
                data-tip="کلیک کنید"
                className="grid grid-rows-2 gap-2 text-center tooltip"
              >
                <DevicePhoneMobileIcon className="w-[26px] h-[26px] mx-auto group-hover:text-yellow-900 transition duration-300 ease-in-out" />
                <span className="font-medium transition duration-300 ease-in-out group-hover:text-yellow-900">
                  {_TXT.GENERAL.MOBILE}
                </span>
              </button>
            ) : (
              <>
                <DevicePhoneMobileIcon className="text-gray-300 w-[26px] h-[26px] mx-auto" />
                <span className="text-gray-300">{_TXT.GENERAL.MOBILE}</span>
              </>
            )
            // </div>
          }
        </div>

        <div className="grid grid-rows-1 gap-2 text-center border-l group hover:cursor-pointer">
          {
            pageData?.contact?.telephone ? (
              <button
                onClick={linkHandler}
                data-type="telephone"
                data-tip="کلیک کنید"
                className="grid grid-rows-2 gap-2 text-center tooltip"
              >
                <PhoneIcon className="w-[26px] h-[26px] mx-auto group-hover:text-yellow-900 transition duration-300 ease-in-out" />
                <span className="font-medium transition duration-300 ease-in-out group-hover:text-yellow-900">
                  {_TXT.GENERAL.PHONE}
                </span>
              </button>
            ) : (
              <>
                <PhoneIcon className="text-gray-300 w-[26px] h-[26px] mx-auto" />
                <span className="text-gray-300">{_TXT.GENERAL.PHONE}</span>
              </>
            )
            // </div>
          }
        </div>

        <div className="grid grid-rows-1 gap-2 text-center group">
          <button
            onClick={linkHandler}
            data-type="share"
            className="grid grid-rows-2 gap-2 text-center"
          >
            <ShareIcon className="w-[26px] h-[26px] mx-auto group-hover:text-yellow-900 transition duration-300 ease-in-out" />
            <span className="font-medium transition duration-300 ease-in-out group-hover:text-yellow-900">
              اشتراک
            </span>
          </button>
        </div>
      </div>
      <div className="p-4 mb-3 border border-gray-200 rounded-md">
        <ItemSideInfoItem
          text={`${
            pageData?.address?.address ? pageData?.address?.address : ""
          }, ${
            pageData?.city?.englishName
              ? upperCaseFirst(pageData.city.englishName)
              : upperCaseFirst(pageData?.city?.name)
          }`}
        />
      </div>

      <ItemClaim />

      <ItemTime />

      {/* Share Modal */}
      <dialog id="modal_share" className="modal">
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
      </dialog>
    </div>
  );
}
