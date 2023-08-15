import { PageNamespace } from "@/types/page";
import {
  ArrowTopRightOnSquareIcon,
  PhoneArrowUpRightIcon,
  HomeModernIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface ItemSideInfoType {
  pageData: PageNamespace.GET;
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
    <div className="flex justify-between items-center py-3 border-b last:border-b-0 border-gray-200">
      {Array.isArray(Images) &&
        Images.map((image, index) => {
          return (
            <Link
              key={`side-info-${index}`}
              href={image.href || "#"}
              target="_blank"
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
            >
              {Icon.Component}
            </Link>
          );
        })}
      <span className="text-left font-PinarLT">{text}</span>
    </div>
  );
}

export function ItemSideInfo({ pageData }: ItemSideInfoType) {


  const websiteWithoutProtocol = pageData?.socials?.website?.match(/^(https?:\/\/)?(?:www\d?\.)?([^/]+)/i)?.[2]


  return (
    <div className="item-side sm:col-span-4 sm:col-end-13 mx-3 sm:mr-3 sm:ml-0">
      <div className="rounded-md border border-gray-200 px-5 py-3 mb-3">
        <div className="item-contact">

          {pageData?.socials?.website ? (
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
          />

          <ItemSideInfoItem
            text={`${pageData?.address?.address ? pageData?.address?.address : ""} ${
              pageData?.city?.englishName
                ? pageData.city.englishName
                : pageData?.city?.name
            }`}
          />

          {/* <div className="ct-address flex justify-between pt-3 pb-5">
            <ArrowUturnRightIcon className="w-[22px] h-[22px] text-gray-500" />
            <p className="whitespace-pre font-PinarLT text-left" dir="ltr">
              <span>Rathenauerplatz 1</span>
              <br />
              <span>50674</span>, <span>Frankfurt</span>
            </p>
          </div>

          <Button
            variant="solid"
            colorScheme="gray"
            width="100%"
            rightIcon={<HandRaisedIcon className="w-[22px] h-[22px]" />}
          >
            درخواست تغییر در این صفحه
          </Button> */}
        </div>
      </div>
      {/* <div className="rounded-md border border-gray-200 p-4">
        <div className="mb-7 flex justify-between">
          <Image
            alt="telegram"
            src={"/images/icon/verified-badge-100.png"}
            width={40}
            height={40}
            className="ml-2"
          />
          <XMarkIcon className="w-[22px] h-[22px] text-gray-500 mt-1 hover:cursor-pointer hover:text-gray-800" />
        </div>
        <h6 className="font-semibold mb-2">آیا شما مالک این صفحه هستید؟</h6>
        <p className="text-[14px] leading-6 text-gray-700 mb-5">
          با احراز هویت تیک آبی دریافت کنید. مدیریت اطلاعات صفحه خود را به عهده
          بگیرید، با مخاطبان خود در تماس باشید و از سایر امکانات کوچا برای دیده
          شدن صفحه خود استفاده کنید.
        </p>
        <Button variant="outline" colorScheme="gray">
          دریافت مالکیت صفحه
        </Button>
      </div> */}
    </div>
  );
}
