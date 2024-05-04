"use client";

import Rating from "@client-packages/react-rating";
import { PageNamespace } from "@/types/page";
import ItemProfilePicture from "./itemProfilePicture";
import Link from "next/link";
import { ITEM } from "@/app/text/directory";
import {
  ArrowsClockwise,
  FacebookLogo,
  InstagramLogo,
  ShareNetwork,
  ShieldCheck,
  ShieldWarning,
  Star,
  TelegramLogo,
  YoutubeLogo,
  Plant,
  Confetti,
  LinkedinLogo,
  XLogo,
} from "app/client-packages/phosphor-icons/react";
import useLinkHandler from "@/hooks/useLinkHandler";
import { GENERAL } from "@/app/text/general";
import isPageNew from "@/utils/isPageNew";
import BlueBadge from "../../../components/badges/blue.badge";
import OrangeBadge from "@/components/badges/orange.badge";
import OrangeModal from "@/components/badges/modals/orange.modal";
import BlueModal from "@/components/badges/modals/blue.modal";
import GoldModal from "@/components/badges/modals/gold.modal";

export type ItemTopInfoType = { pageData: PageNamespace.Page };
export const ItemTopInfo = ({ pageData }: ItemTopInfoType) => {
  const socials = { ...pageData.socials };
  delete socials.website;
  const haveSocial = pageData.socials && Object.keys(socials).length > 0;

  const isNew = isPageNew(pageData.createdDate);

  const linkHandler = useLinkHandler({ pageData });
  return (
    <div className="h-full _top-section">
      <div className="container mx-auto max-w-[1144px] h-full">
        <div className="relative flex flex-col items-center h-full pt-8 sm:flex-row sm:items-end sm:py-10">
          <div className="sm:absolute left-3 sm:left-0 top-[40px] sm:flex items-center hidden">
            {/* <div className="px-2 py-[6px] bg-emerald-500 text-white text-[15px] rounded-md flex items-center">
              <Plant size={20} className="ml-1 text-white" weight="duotone" />
              {GENERAL.HOME_JOB}
            </div> */}

            {isNew && (
              <div className="px-2 py-[6px] bg-blue-400 text-white text-[15px] rounded-md flex items-center mr-2">
                <Confetti
                  size={20}
                  className="ml-1 text-white"
                  weight="duotone"
                />
                {GENERAL.NEW}
              </div>
            )}
          </div>

          <ItemProfilePicture
            className="mb-5 rounded-full w-[170px] h-[170px] drop-shadow-sm sm:mb-0"
            pageData={pageData}
          />
          <div className="flex-1 px-3 _item-details sm:mr-5">
            <h1 className="text-[28px] font-bold text-slate-700 flex items-center justify-center sm:justify-start flex-col-reverse sm:flex-row font-enc">
              {pageData?.title}
              <div className="flex items-center gap-2 mb-2 sm:mr-3 sm:mb-0">
                {/* TODO: golden badge */}

                <BlueBadge enable={!!pageData.business} />
                <OrangeBadge enable={!pageData.business} />

                {/* <Plant
                  size={30}
                  className="text-green-600 transition duration-300 hover:cursor-pointer hover:text-slate-800"
                  weight="duotone"
                /> */}

                {isNew && (
                  <Confetti
                    size={30}
                    className="text-blue-600 transition duration-300 hover:cursor-pointer hover:text-slate-800 sm:hidden"
                    weight="duotone"
                  />
                )}
              </div>
            </h1>
            {pageData.subtitle && (
              <h2 className="mt-2 text-xl font-medium text-center text-primary sm:text-right">
                {pageData.subtitle}
              </h2>
            )}
            <div className="flex items-center justify-center mt-4 mb-8 sm:justify-start sm:mb-4 _card-rating">
              {/* @ts-ignore */}
              <Rating
                initialRating={0}
                direction={"rtl"}
                readonly={true}
                className="flex"
                emptySymbol={
                  <Star size={30} weight="duotone" className="text-stone-300" />
                }
                fullSymbol={
                  <Star size={30} weight="fill" className="text-yellow-400" />
                }
              />
              <span className="mr-2">
                (<span>{ITEM.WHITOUT}</span> {ITEM.COMMENT})
              </span>
            </div>
          </div>

          <div className="w-full bg-white sm:bg-transparent sm:w-auto">
            <div className="flex justify-center mx-3 border-b border-gray-200 sm:border-b-0 sm:mx-0">
              {!haveSocial ? (
                <p className="py-5 ml-3 text-slate-400 sm:text-black sm:py-4">
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

                  {pageData?.socials?.x && (
                    <Link
                      href={`https://twitter.com/${pageData?.socials?.x}`}
                      target="_blank"
                      rel="nofollow noopener"
                    >
                      <XLogo
                        size={32}
                        weight="light"
                        className="text-black transition duration-300"
                      />
                    </Link>
                  )}

                  {pageData.socials?.linkedin && (
                    <Link
                      href={`https://www.linkedin.com/in/${pageData?.socials?.linkedin}`}
                      target="_blank"
                      rel="nofollow noopener"
                    >
                      <LinkedinLogo
                        size={32}
                        weight="light"
                        className="transition duration-300 text-sky-700 hover:text-black"
                      />
                    </Link>
                  )}
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

      <OrangeModal slug={pageData.slug} />
      <BlueModal
        verifyDate={pageData.verifyDate}
        updateDate={pageData.updateDate}
        createdDate={pageData.createdDate}
      />

      {/* TODO: golden badge modal*/}
      {/* <GoldModal/> */}
    </div>
  );
};
