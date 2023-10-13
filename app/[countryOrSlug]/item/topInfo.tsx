import { _TXT } from "@/app/text";
import { ShareIcon } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import CircleFlag from "@/app/client-packages/circleflag";
import Rating from "@client-packages/react-rating";
import { PageNamespace } from "@/types/page";
import SocialLink from "./socials/socialLink";
import { socials as socialsType } from "@/types/socials.";
import { useDispatch } from "react-redux";
import { setCountry } from "@/store/stateSlice";
import ItemProfilePicture from "./itemProfilePicture";
import Link from "next/link";
import InstagramIcon from "./socials/instagram";
import FacebookIcon from "./socials/facebook";
import YoutubeIcon from "./socials/youtube";
import TelegramIcon from "./socials/telegram";

export type ItemTopInfoType = { pageData: PageNamespace.Page };
export const ItemTopInfo = ({ pageData }: ItemTopInfoType) => {
  const socials = { ...pageData.socials };
  delete socials.website;
  const haveSocial = pageData.socials && Object.keys(socials).length > 0;

  return (
    <div className="top-section h-full">
      <div className="container mx-auto max-w-[1144px] h-full">
        <div className="flex flex-col sm:flex-row items-center sm:items-end pt-8 sm:pb-10 h-full">
          <ItemProfilePicture
            className="rounded-full w-[240px] h-[240px] sm:w-40 sm:h-40 drop-shadow-sm mb-5 sm:mb-0"
            pageData={pageData}
          />

          <div className="item-details flex-1 sm:mr-5">
            <h1 className="text-[28px] font-semibold text-center sm:text-right text-slate-700">
              {pageData?.title}
            </h1>
            <div className="flex items-center my-4 card-rating">
              {/* @ts-ignore */}
              <Rating
                initialRating={0}
                direction={"rtl"}
                readonly={true}
                emptySymbol={<StarIcon className="h-8 w-8 text-gray-300" />}
                fullSymbol={<StarIcon className="h-8 w-8 text-yellow-400" />}
              />
              <span className="mr-2 text-gray-500">
                (<span>بدون</span> نظر)
                <span className="text-gray-400 mx-2">|</span>بزودی
              </span>
            </div>
            <div className="item-location flex justify-center sm:justify-start mb-6 sm:mb-3 text-gray-600">
              <CircleFlag
                width={1}
                height={1}
                countryCode={pageData?.country?.code}
                className="w-5 ml-2"
                title={_TXT.COUNTRY.GERMANY}
              />
              <span>{pageData?.country?.name}</span>
              <span className="ml-1">،</span>
              <span>{pageData?.city?.name}</span>
            </div>
          </div>

          {!haveSocial ? (
            <p className="text-[14px] text-slate-600">هیچ رسانه اجتماعی ثبت نشده است.</p>
          ) : (
            <div
              className={`item-top-socials flex justify-center bg-slate-200 sm:bg-transparent py-4 sm:py-0 w-full sm:w-auto [&>a]:ml-4 [&>a:last-child]:ml-0 sm:rounded-lg`}
            >
              {pageData?.socials?.telegram ? (
                <Link
                  href={`https://t.me/${pageData?.socials?.telegram}`}
                  target="_blank"
                  rel="nofollow noopener"
                >
                  <TelegramIcon />
                </Link>
              ) : null}
              {pageData.socials?.instagram ? (
                <Link
                  href={`https://www.instagram.com/${pageData.socials?.instagram}`}
                  target="_blank"
                  rel="nofollow noopener"
                >
                  <InstagramIcon />
                </Link>
              ) : null}
              {pageData.socials?.facebook ? (
                <Link
                  href={`https://www.facebook.com/${pageData.socials?.facebook}`}
                  target="_blank"
                  rel="nofollow noopener"
                >
                  <FacebookIcon />
                </Link>
              ) : null}

              {pageData.socials?.youtube ? (
                <Link
                  href={`https://www.youtube.com/${pageData.socials?.youtube}`}
                  target="_blank"
                  rel="nofollow noopener"
                >
                  <YoutubeIcon />
                </Link>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
