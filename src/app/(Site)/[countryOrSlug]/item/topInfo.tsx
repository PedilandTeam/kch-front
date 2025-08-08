"use client";

import { PageNamespace } from "@/types/page";
import ItemProfilePicture from "./itemProfilePicture";
import Link from "next/link";
import { ITEM } from "@/text/directory";
import {
  FacebookLogo,
  InstagramLogo,
  ShareNetwork,
  Star,
  TelegramLogo,
  YoutubeLogo,
  Confetti,
  LinkedinLogo,
  XLogo,
} from "@phosphor-icons/react/dist/ssr";
import useLinkHandler from "@/hooks/useLinkHandler";
import { GENERAL } from "@/text/general";
import isPageNew from "@/utils/isPageNew";
import BlueBadge from "@/components/badges/blue.badge";
import OrangeBadge from "@/components/badges/orange.badge";
import OrangeModal from "@/components/badges/modals/orange.modal";
import BlueModal from "@/components/badges/modals/blue.modal";
import Rating from "react-rating";

export type ItemTopInfoType = { pageData: PageNamespace.Page };
export const ItemTopInfo = ({ pageData }: ItemTopInfoType) => {
  const socials = { ...pageData.socials };
  delete socials.website;
  const haveSocial = pageData.socials && Object.keys(socials).length > 0;

  const isNew = isPageNew(pageData.createdDate);

  const linkHandler = useLinkHandler({ pageData });
  return (
    <div className="_top-section h-full">
      <div className="container mx-auto h-full max-w-[1144px]">
        <div className="relative flex h-full flex-col items-center pt-8">
          <div className="top-[40px] left-3 hidden items-center">
            {/* <div className="px-2 py-[6px] bg-emerald-500 text-white text-[15px] rounded-md flex items-center">
              <Plant size={20} className="ml-1 text-white" weight="duotone" />
              {GENERAL.HOME_JOB}
            </div> */}

            {isNew && (
              <div className="mr-2 flex items-center rounded-md bg-blue-400 px-2 py-[6px] text-[15px] text-white">
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
            className="mb-5 h-[170px] w-[170px] rounded-full drop-shadow-sm"
            pageData={pageData}
          />
          <div className="_item-details flex-1 px-3">
            <h1 className="font-enc flex flex-col-reverse items-center justify-center text-[28px] font-bold text-slate-700">
              {pageData?.title}
              <div className="mb-2 flex items-center gap-2">
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
                    className="text-blue-600 transition duration-300 hover:cursor-pointer hover:text-slate-800"
                    weight="duotone"
                  />
                )}
              </div>
            </h1>
            {pageData.subtitle && (
              <h2 className="text-primary mt-2 text-center text-xl font-medium">
                {pageData.subtitle}
              </h2>
            )}
            <div className="_card-rating mt-4 mb-8 flex items-center justify-center">
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

          <div className="w-full bg-white">
            <div className="mx-3 flex justify-center border-b border-gray-200">
              {!haveSocial ? (
                <p className="ml-3 py-5 text-slate-400">
                  {ITEM.NO_SOCIAL_MEDIA}
                </p>
              ) : (
                <div
                  className={`item-top-socials flex justify-center py-5 [&>a]:ml-5`}
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
                        className="text-sky-700 transition duration-300 hover:text-black"
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
                        className="text-sky-600 transition duration-300 hover:text-black"
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
                        className="text-sky-700 transition duration-300 hover:text-black"
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
