"use client";

import { StarIcon } from "@heroicons/react/24/solid";
import CircleFlag from "@/app/client-packages/circleflag";
import Rating from "@client-packages/react-rating";
import { PageNamespace } from "@/types/page";
import ItemProfilePicture from "./itemProfilePicture";
import Link from "next/link";
import { ITEM } from "@/app/text/directory";
import { COUNTRY } from "@/app/text/location";
import {
  FacebookLogo,
  InstagramLogo,
  ShareNetwork,
  TelegramLogo,
  YoutubeLogo,
} from "@phosphor-icons/react";
import useLinkHandler from "@/hooks/useLinkHandler";

export type ItemTopInfoType = { pageData: PageNamespace.Page };
export const ItemTopInfo = ({ pageData }: ItemTopInfoType) => {
  const socials = { ...pageData.socials };
  delete socials.website;
  const haveSocial = pageData.socials && Object.keys(socials).length > 0;

  const linkHandler = useLinkHandler({pageData})

  return (
    <div className="h-full top-section">
      <div className="container mx-auto max-w-[1144px] h-full">
        <div className="flex flex-col items-center h-full pt-8 sm:flex-row sm:items-end sm:pb-10">
          <ItemProfilePicture
            className="w-40 h-40 mb-5 rounded-full drop-shadow-sm sm:mb-0"
            pageData={pageData}
          />

          <div className="flex-1 px-3 item-details sm:mr-5">
            <h1 className="text-[26px] font-semibold text-right text-slate-700">
              {pageData?.title}
            </h1>
            <div className="flex items-center my-3 card-rating">
              {/* @ts-ignore */}
              <Rating
                initialRating={0}
                direction={"rtl"}
                readonly={true}
                emptySymbol={<StarIcon className="w-8 h-8 text-stone-300" />}
                fullSymbol={<StarIcon className="w-8 h-8 text-yellow-400" />}
              />
              <span className="mr-2">
                (<span>{ITEM.WHITOUT}</span> {ITEM.COMMENT})
              </span>
            </div>
            <div className="flex justify-center mb-6 sm:justify-start item-location sm:mb-3">
              <CircleFlag
                width={1}
                height={1}
                countryCode={pageData?.country?.code}
                className="w-5 ml-3"
                title={COUNTRY.GERMANY}
              />
              <span>{pageData?.country?.name}</span>
              <span className="ml-1">،</span>
              <span>{pageData?.city?.name}</span>
            </div>
          </div>

          <div className="w-full bg-white sm:bg-transparent sm:w-auto">
            <div className="flex justify-center mx-3 border-b border-gray-200 sm:border-b-0 sm:mx-0">
              {!haveSocial ? (
                <p className="text-[15px] text-slate-400 sm:text-black ml-3 py-5 sm:py-3">
                  {ITEM.NO_SOCIAL_MEDIA}
                </p>
              ) : (
                <div
                  className={`item-top-socials flex justify-center [&>a]:ml-5 py-5 sm:py-0`}
                >
                  {pageData.socials?.instagram ? (
                    <Link
                      href={`https://www.instagram.com/${pageData.socials?.instagram}`}
                      target="_blank"
                      rel="nofollow noopener"
                    >
                      <InstagramLogo
                        size={32}
                        weight="light"
                        className="text-pink-600 transition duration-300 hover:text-black"
                      />
                    </Link>
                  ) : null}
                  {pageData.socials?.facebook ? (
                    <Link
                      href={`https://www.facebook.com/${pageData.socials?.facebook}`}
                      target="_blank"
                      rel="nofollow noopener"
                    >
                      <FacebookLogo
                        size={32}
                        weight="light"
                        className="transition duration-300 text-sky-700 hover:text-black"
                      />
                    </Link>
                  ) : null}
                  {pageData.socials?.youtube ? (
                    <Link
                      href={`https://www.youtube.com/${pageData.socials?.youtube}`}
                      target="_blank"
                      rel="nofollow noopener"
                    >
                      <YoutubeLogo
                        size={32}
                        weight="light"
                        className="text-red-600 transition duration-300 hover:text-black"
                      />
                    </Link>
                  ) : null}
                  {pageData?.socials?.telegram ? (
                    <Link
                      href={`https://t.me/${pageData?.socials?.telegram}`}
                      target="_blank"
                      rel="nofollow noopener"
                    >
                      <TelegramLogo
                        size={32}
                        weight="light"
                        className="transition duration-300 text-sky-600 hover:text-black"
                      />
                    </Link>
                  ) : null}
                </div>
              )}
              <button onClick={linkHandler} data-type="share">
                <ShareNetwork
                  size={30}
                  weight="light"
                  className="text-yellow-800 transition duration-300 hover:text-black"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
