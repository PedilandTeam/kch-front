"use client"
import { COUNTRY } from "@/components/allTexts";
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

export type ItemTopInfoType = { pageData: PageNamespace.GET };
export const ItemTopInfo = ({ pageData }: ItemTopInfoType) => {

  const dis = useDispatch()
  dis(setCountry(pageData?.country?.code))

  return (
    <div className="top-section h-full">
      <div className="container mx-auto max-w-[1144px] h-full">
        <div className="flex flex-col sm:flex-row items-center sm:items-end py-10 sm:pb-10 h-full">
          <div className="item-image mb-5 sm:mb-0">
            <Image
              alt="logo"
              src={"/img/list/logo/logo-placeholder.webp"}
              width={160}
              height={160}
              className="rounded-full w-full sm:w-40 h-full sm:h-40 drop-shadow-sm"
            />
          </div>
          <div className="item-details sm:mr-5">
            <h1 className="text-[28px] font-semibold text-center sm:text-right text-slate-700">
              {pageData?.title}
            </h1>
            <div className="flex items-center my-4 card-rating">
              {/* @ts-ignore */}
              <Rating
                initialRating={0}
                direction={"rtl"}
                emptySymbol={<StarIcon className="h-8 w-8 text-gray-300" />}
                fullSymbol={<StarIcon className="h-8 w-8 text-yellow-400" />}
              />
              <span className="mr-2 text-gray-500">
                (<span>بدون</span> نظر)
              </span>
            </div>
            <div className="item-location flex justify-center sm:justify-start mb-6 sm:mb-3 text-gray-600">
              <CircleFlag
                countryCode={pageData?.country?.code}
                className="w-5 ml-2"
                title={COUNTRY.GERMANY}
              />
              <span>{pageData?.country?.name}</span>
              <span className="ml-1">،</span>
              <span>{pageData?.city?.name}</span>
            </div>
          </div>
          <div className="ittem-top-buttons flex-1 flex justify-end content-end">
            {pageData?.socials &&
              Object.keys(pageData.socials).map(
                (social: string, index: number) => {
                  return (
                    <SocialLink
                      key={`social-link-${index}`}
                      name={social as socialsType}
                      link={
                        pageData?.socials?.[social]?.replace(
                          /^https?:\/\//,
                          ""
                        ) || null
                      }
                    />
                  );
                }
              )}

            <div className="sc-share group inline-flex">
              <ShareIcon className="w-5 h-5 text-gray-400 group-hover:text-blue-800 group-hover:cursor-pointer mt-[2px]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
