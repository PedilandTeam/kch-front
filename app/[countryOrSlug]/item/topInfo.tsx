import { StarIcon } from "@heroicons/react/24/solid";
import CircleFlag from "@/app/client-packages/circleflag";
import Rating from "@client-packages/react-rating";
import { PageNamespace } from "@/types/page";
import ItemProfilePicture from "./itemProfilePicture";
import Link from "next/link";
import InstagramIcon from "./socials/instagram";
import FacebookIcon from "./socials/facebook";
import YoutubeIcon from "./socials/youtube";
import TelegramIcon from "./socials/telegram";
import { ITEM } from "@/app/text/directory";
import { COUNTRY } from "@/app/text/location";

export type ItemTopInfoType = { pageData: PageNamespace.Page };
export const ItemTopInfo = ({ pageData }: ItemTopInfoType) => {
  const socials = { ...pageData.socials };
  delete socials.website;
  const haveSocial = pageData.socials && Object.keys(socials).length > 0;

  return (
    <div className="h-full top-section">
      <div className="container mx-auto max-w-[1144px] h-full">
        <div className="flex flex-col items-center h-full pt-8 sm:flex-row sm:items-end sm:pb-10">
          <ItemProfilePicture
            className="rounded-full w-[200px] h-[200px] sm:w-40 sm:h-40 drop-shadow-sm mb-5 sm:mb-0"
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
            <div className="flex justify-start mb-6 item-location sm:mb-3">
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
            <div className="py-4 mx-3 border-b border-gray-200 sm:border-b-0 sm:mx-0 sm:py-3">
              {!haveSocial ? (
                <p className="text-[15px] text-slate-400 sm:text-black  w-full text-center">
                  {ITEM.NO_SOCIAL_MEDIA}
                </p>
              ) : (
                <div
                  className={`item-top-socials flex justify-center [&>a]:ml-4 [&>a:last-child]:ml-0`}
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
      </div>
    </div>
  );
};
