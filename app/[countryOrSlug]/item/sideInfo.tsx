"use client";

import { PageNamespace } from "@/types/page";
import {
  ArrowTopRightOnSquareIcon,
  PhoneArrowUpRightIcon,
  HomeModernIcon,
  ShareIcon,
  GlobeAltIcon,
  PhoneIcon,
  ArrowUturnRightIcon,
  HandRaisedIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import React from "react";

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
    <div className="item-address text-left">
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
  const websiteWithoutProtocol = pageData?.socials?.website?.match(
    /^(https?:\/\/)?(?:www\d?\.)?([^/]+)/i
  )?.[2];

  return (
    <div className="item-side sm:col-span-4 sm:col-end-13 mx-3 sm:mr-3 sm:ml-0">
      <div className="item-contact grid grid-cols-3 gap-3 mb-4">
        <div className="group border-l">
          <Link
            href={"httpd://www.koochaa.com"}
            rel="nofollow noopener"
            className="grid grid-rows-2 gap-2 text-center"
          >
            <GlobeAltIcon className="w-[26px] h-[26px] mx-auto group-hover:text-pink-800 transition duration-300 ease-in-out" />
            <span className="group-hover:text-pink-800 transition duration-300 ease-in-out font-medium">
              وب سایت
            </span>
          </Link>
          {/* 
          IF THERE IS NO WEBSITE
          <div className="grid grid-rows-2 gap-2 text-center">
            <GlobeAltIcon className="text-gray-300 w-[26px] h-[26px] mx-auto" />
            <span className="text-gray-300">وب سایت</span>
          </div> */}
        </div>
        <div className="group grid grid-rows-2 gap-2 text-center border-l hover:cursor-pointer">
          <PhoneIcon className="w-[26px] h-[26px] mx-auto group-hover:text-pink-800 transition duration-300 ease-in-out" />
          <span className="group-hover:text-pink-800 transition duration-300 ease-in-out font-medium">
            تماس
          </span>
        </div>
        <div
          className="group grid grid-rows-2 gap-2 text-center"
          // onClick={() => {
          //   if (document) {
          //     (
          //       document.getElementById("modal_share") as HTMLFormElement
          //     ).showModal();
          //   }
          // }}
        >
          <ShareIcon className="text-gray-300 w-[26px] h-[26px] mx-auto transition duration-300 ease-in-out" />
          <span className="text-gray-300 transition duration-300 ease-in-out font-medium">
            اشتراک
          </span>
        </div>
      </div>
      <div className="rounded-md border border-gray-200 p-4 mb-3">
        <ItemSideInfoItem
          text={`${
            pageData?.address?.address ? pageData?.address?.address : ""
          } ${
            pageData?.city?.englishName
              ? pageData.city.englishName
              : pageData?.city?.name
          }`}
        />
        <div>
          {/* {pageData?.socials?.website ? (
            <ItemSideInfoItem
              text={websiteWithoutProtocol}
              Icons={[
                {
                  Component: (
                    <ArrowTopRightOnSquareIcon className="w-[22px] h-[22px] text-gray-500 hover:text-pink-900" />
                  ),
                  href: `https://${websiteWithoutProtocol}`,
                },
              ]}
            />
          ) : (
            <ItemSideInfoItem
              text={pageData?.contact?.email}
              Icons={[
                {
                  Component: (
                    <ArrowTopRightOnSquareIcon className="w-[22px] h-[22px] text-gray-500" />
                  ),
                  href: pageData?.socials?.website,
                },
              ]}
            />
          )}

          <ItemSideInfoItem
            text={pageData?.contact?.telephone}
            Icons={[
              {
                Component: (
                  <PhoneArrowUpRightIcon className="w-[22px] h-[22px] text-gray-500 hover:text-green-600" />
                ),
                href: `tel:${pageData.contact?.telephone}`,
              },
            ]}
          />

          <ItemSideInfoItem
            text={pageData?.contact?.phone}
            Icons={[
              {
                Component: (
                  <PhoneArrowUpRightIcon className="w-[22px] h-[22px] text-gray-500 hover:text-green-600" />
                ),
                href: `tel:${pageData.contact?.phone}`,
              },
            ]}
          /> */}

          {/* <button className="btn">درخواست تغییر در این صفحه</button> */}
        </div>
      </div>
      <div className="rounded-md border border-gray-200 p-5 mb-3 bg-blue-50 border-l-[4px] border-l-yellow-500 rounded-tl-none rounded-bl-none">
        <div className="flex content-center items-center mb-3">
          <Image
            alt="telegram"
            src={"/images/icon/verified-badge-100.png"}
            width={36}
            height={36}
            className="ml-1"
          />
          <h6 className="text-[18px] font-semibold">
            اگر شما مالک این صفحه هستید!
          </h6>
        </div>
        <p className="text-[15px] leading-7 text-justify text-gray-700 mb-4">
          با احراز هویت می‌تونید تیک آبی دریافت کنید، مدیریت اطلاعات این صفحه رو
          به عهده بگیرید و از امکانات کوچا برای راهبری و توسعه کسب‌و‌کارتون
          استفاده کنید.
        </p>
        <button
          className="btn btn-active btn-secondary w-full"
          onClick={() => {
            if (document) {
              (
                document.getElementById("modal_claim") as HTMLFormElement
              ).showModal();
            }
          }}
        >
          دریافت مالکیت صفحه
        </button>
      </div>

      <div className="rounded-md border border-gray-200 px-5 py-4 mb-3 text-[15px]">
        <p>این صفحه توسط ادمین کوچا مدیریت می‌شود.</p>
      </div>

      {/* Share Modal */}
      <dialog id="modal_share" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg flex items-center">
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

      {/* Claim Modal */}
      <dialog id="modal_claim" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">Press ESC key or click outside to close</p>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
}
