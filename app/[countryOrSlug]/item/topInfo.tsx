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
  HouseSimple,
  Tipi,
  Plant,
  Confetti,
} from "app/client-packages/phosphor-icons/react";
import useLinkHandler from "@/hooks/useLinkHandler";
import { useState } from "react";
import { GENERAL } from "@/app/text/general";

export type ItemTopInfoType = { pageData: PageNamespace.Page };
export const ItemTopInfo = ({ pageData }: ItemTopInfoType) => {
  const socials = { ...pageData.socials };
  delete socials.website;
  const haveSocial = pageData.socials && Object.keys(socials).length > 0;

  const linkHandler = useLinkHandler({ pageData });

  // Modal Consts
  const [isModalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <div className="h-full _top-section">
      <div className="container mx-auto max-w-[1144px] h-full">
        <div className="relative flex flex-col items-center h-full pt-8 sm:flex-row sm:items-end sm:py-10">
          <div className="sm:absolute left-3 sm:left-0 top-[40px] sm:flex items-center hidden">
            {/* <div className="px-2 py-[6px] bg-emerald-500 text-white text-[15px] rounded-md flex items-center">
              <Plant size={20} className="ml-1 text-white" weight="duotone" />
              {GENERAL.HOME_JOB}
            </div> */}
            <div className="px-2 py-[6px] bg-blue-400 text-white text-[15px] rounded-md flex items-center mr-2">
              <Confetti
                size={20}
                className="ml-1 text-white"
                weight="duotone"
              />
              {GENERAL.NEW}
            </div>
          </div>

          <ItemProfilePicture
            className="mb-5 rounded-full w-[170px] h-[170px] drop-shadow-sm sm:mb-0"
            pageData={pageData}
          />
          <div className="flex-1 px-3 _item-details sm:mr-5">
            <h1 className="text-[28px] font-bold text-slate-700 flex items-center justify-center sm:justify-start flex-col-reverse sm:flex-row font-enc">
              {pageData?.title}
              <div className="flex items-center gap-2 mb-2 sm:mr-3 sm:mb-0">
                {/* <ShieldCheck
                  size={30}
                  weight="duotone"
                  className="text-yellow-600 transition duration-300 hover:cursor-pointer hover:text-slate-800"
                  onClick={() => {
                    if (document) {
                      (
                        document.getElementById(
                          "modal_badge_3"
                        ) as HTMLFormElement
                      ).showModal();
                    }
                  }}
                /> */}
                {/* <ShieldCheck
                  size={30}
                  weight="duotone"
                  className="transition duration-300 text-sky-600 hover:cursor-pointer hover:text-slate-800"
                  onClick={() => {
                    if (document) {
                      (
                        document.getElementById(
                          "modal_badge_2"
                        ) as HTMLFormElement
                      ).showModal();
                    }
                  }}
                /> */}
                <ShieldWarning
                  size={30}
                  className="text-orange-400 transition duration-300 hover:cursor-pointer hover:text-slate-800"
                  weight="duotone"
                  onClick={() => {
                    if (document) {
                      (
                        document.getElementById(
                          "modal_badge_1"
                        ) as HTMLFormElement
                      ).showModal();
                    }
                  }}
                />
                <Plant
                  size={30}
                  className="text-green-600 transition duration-300 hover:cursor-pointer hover:text-slate-800"
                  weight="duotone"
                />
                <Confetti
                  size={30}
                  className="text-blue-600 transition duration-300 hover:cursor-pointer hover:text-slate-800 sm:hidden"
                  weight="duotone"
                />
              </div>
            </h1>
            <h2 className="mt-2 text-xl font-medium text-center text-primary sm:text-right">
              زیرعنوان واحد
            </h2>
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
      {/* Modal Orange Badge */}
      <dialog id="modal_badge_1" className="modal">
        <div className="modal-box">
          <h3 className="flex items-center text-lg font-bold text-center text-orange-500">
            <ShieldWarning
              size={32}
              className="ml-2 text-orange-400"
              weight="duotone"
            />
            تـوجـه
          </h3>
          <p className="py-4">
            اطلاعات این واحد از اینترنت جمع‌آوری شده و توسط ادمین کـوچـا مدیریت
            می‌شود. اگر شما مالک این صفحه هستید، با احراز هویت می‌توانید تیک آبی
            دریافت کنید، مدیریت اطلاعات این صفحه رو به عهده بگیرید و از امکانات{" "}
            <Link
              href={"#"}
              className="border-b border-black border-dashed hover:text-primary hover:border-primary"
              target="_blank"
            >
              بیزینس سنتر
            </Link>{" "}
            برای راهبری و توسعه کسب‌و‌کارتون استفاده کنید.
          </p>
          <div className="flex items-center p-[10px] font-medium border border-yellow-300 rounded-md bg-yellow-50 text-[15px]">
            <p className="text-center text-yellow-800">
              کوچا، هیچ مسئولیتی در قبال خدمات این واحد صنفی ندارد.
            </p>
          </div>

          <div className="grid w-full grid-cols-1 gap-2 sm:grid-cols-2 modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="w-full btn">متوجه شدم</button>
            </form>
            <div className="ml-0">
              <button className="w-full btn btn-primary">
                مالک این صفحه هستم
              </button>
            </div>
          </div>
        </div>
      </dialog>
      {/* Modal Blue Badge */}
      <dialog id="modal_badge_2" className="modal">
        <div className="modal-box">
          <h3 className="flex items-center text-lg font-bold text-center text-sky-700">
            <ShieldCheck
              size={32}
              className="ml-2 text-sky-600"
              weight="duotone"
            />
            تـیـک آبـی
          </h3>
          <p className="pt-4">
            این واحد صنفی از تاریخ 1403/05/22 در راهنمای مشاغل کـوچـا حضور دارد
            و محتوای این صفحه توسط مالک آن مدیریت می‌شود.
          </p>
          <p className="flex items-center pt-2 pb-4 text-gray-500">
            <ArrowsClockwise size={14} className="ml-1" />
            بروزرسانی شده در 1403/05/29
          </p>
          <div className="flex items-center p-[10px] font-medium border border-yellow-300 rounded-md bg-yellow-50 text-[15px]">
            <p className="text-center text-yellow-800">
              کـوچـا، هیچگونه مسئولیتی در قبال خدمات این واحد صنفی ندارد.
            </p>
          </div>

          <div className="w-full modal-action">
            <form method="dialog" className="w-full">
              {/* if there is a button in form, it will close the modal */}
              <button className="w-full btn">متوجه شدم</button>
            </form>
          </div>
        </div>
      </dialog>
      {/* Modal Gold Badge */}
      <dialog id="modal_badge_3" className="modal">
        <div className="modal-box">
          <h3 className="flex items-center text-lg font-bold text-center text-yellow-600">
            <ShieldCheck
              size={32}
              className="ml-2 text-yellow-600"
              weight="duotone"
            />
            تـیـک طـلایـی
          </h3>
          <p className="pt-4">
            این واحد صنفی از تاریخ 1403/05/22 در راهنمای مشاغل کـوچـا حضور دارد
            و محتوای این صفحه توسط مالک آن مدیریت می‌شود.
          </p>
          <p className="flex items-center pt-2 pb-4 text-gray-500">
            <ArrowsClockwise size={14} className="ml-1" />
            بروزرسانی شده در 1403/05/29
          </p>
          <div className="flex items-center p-[10px] font-medium border border-yellow-300 rounded-md bg-yellow-50 text-[15px]">
            <p className="text-center text-yellow-800">
              کـوچـا، هیچگونه مسئولیتی در قبال خدمات این واحد صنفی ندارد.
            </p>
          </div>

          <div className="w-full modal-action">
            <form method="dialog" className="w-full">
              {/* if there is a button in form, it will close the modal */}
              <button className="w-full btn">متوجه شدم</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};
