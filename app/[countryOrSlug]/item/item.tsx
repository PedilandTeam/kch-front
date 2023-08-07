import { _TXT } from "@app/text/index";
import { ItemBreadCrumb } from "./breadcrumb";
import { ItemSideInfo } from "./sideInfo";
import { ItemTopInfo } from "./topInfo";
import React, { useEffect } from "react";
import { PageNamespace } from "@/types/page";
import { Metadata } from "next";
export type PageItemProps = {
  pageData: PageNamespace.GET;
};

// export function generateMetadata({params, searchParams}: GenerateMetadataProps): Metadata{

//   console.log(params);
//   console.log(searchParams);
//   return {
//     title: `changed ${JSON.stringify(searchParams)}`
//   }
// }

// export const metadata: Metadata = {
//   title: "hello"
// }

export default function PageItem({ pageData }: PageItemProps) {
  return (
    <div className="component page-item">
      <div className="bg-slate-100 sm:h-[300px] mb-3 sm:mb-4">
        <ItemTopInfo pageData={pageData} />
      </div>

      <div className="container mx-auto max-w-[1144px]">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-y-4 sm:gap-4">
          <ItemSideInfo pageData={pageData} />

          <div className="item-main sm:col-span-8 sm:col-start-1 sm:row-start-1 px-3 sm:pl-3 sm:pr-0">
            <ItemBreadCrumb pageData={pageData} />

            {/* Description Section */}
            <div className="item-description py-8 border-b border-gray-200">
              <h3 className="font-bold mb-5">{_TXT.ITEM.DESCRIPTION}</h3>
              <p className="text-[15px] text-gray-500">
                توضیحاتی در مورد این واحد ثبت نشده است.
              </p>
            </div>

            {/* Facilities Section */}
            <div className="item-description py-8 border-b border-gray-200">
              <h3 className="font-bold mb-5">{_TXT.ITEM.FACILITIES}</h3>
              <p className="text-[15px] text-gray-500">
                امکانات این واحد لیست نشده است.
              </p>
            </div>

            {/* Working Hours Section */}
            {/* <div className="relative item-description sm:col-span-3">
                <div className=" select-none absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 font-bold text-sm">
                  ساعت‌کاری در دسترس نیست
                </div>
                <div className=" blur-[5px] select-none rounded-md border border-gray-200 p-4">
                  <h3 className="font-semibold mb-5">{GENERAL.WORKING_HOURS}</h3>
                  <div>
                    <div className="flex items-center justify-between py-1 px-2 border-b border-t border-dashed text-sm text-teal-500 bg-teal-50 border-teal-200 font-semibold">
                      <span>{DAYS.MONDAY}</span>
                      <div>
                        <span>
                          8:00<span className="mx-1 text-teal-300">-</span>14:00
                        </span>
                        <span className="mx-3">,</span>
                        <span>
                          16:00<span className="mx-1 text-teal-300">-</span>22:00
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between py-1 px-2 border-b border-dashed text-sm">
                      <span>{DAYS.TUESDAY}</span>
                      <div>
                        <span>
                          8:00<span className="mx-1 text-gray-400">-</span>22:00
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between py-1 px-2 border-dashed text-sm">
                      <span>{DAYS.WEDNESDAY}</span>
                      <div>
                        <span>
                          8:00<span className="mx-1 text-gray-400">-</span>14:00
                        </span>
                        <span className="mx-3">,</span>
                        <span>
                          16:00<span className="mx-1 text-gray-400">-</span>22:00
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between py-1 px-2 border-b border-t border-dashed text-sm text-red-500 bg-red-50 border-red-200 font-semibold">
                      <span>{DAYS.TURSDAY}</span>
                      <div>
                        <span>
                          8:00<span className="mx-1 text-red-300">-</span>22:00
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between py-1 px-2 border-b  border-dashed text-sm">
                      <span>{DAYS.FRIDAY}</span>
                      <div>
                        <span>
                          8:00<span className="mx-1 text-gray-400">-</span>14:00
                        </span>
                        <span className="mx-3">,</span>
                        <span>
                          16:00<span className="mx-1 text-gray-400">-</span>22:00
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between py-1 px-2 border-b  border-dashed text-sm text-red-400">
                      <span>{DAYS.SATURDAY}</span>
                      <div>
                        <span>{GENERAL.CLOSED}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between py-1 px-2 border-b  border-dashed text-sm text-red-400 mb-1">
                      <span>{DAYS.SUNDAY}</span>
                      <div>
                        <span>{GENERAL.CLOSED}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}

            {/* Images Section */}
            <div className="item-description py-8 border-b border-gray-200">
              <h3 className="font-bold mb-5">{_TXT.ITEM.IMAGES}</h3>
              <p className="text-[15px] text-gray-500">
                تصویری برای این واحد وجود ندارد.
              </p>
            </div>

            {/* Comment Section */}
            <div className="item-description py-8">
              <h3 className="font-bold mb-5">{_TXT.ITEM.USERS_COMMENTS}</h3>
              <p className="text-[15px] text-gray-500">
                امکان ثبت نظرات برای این واحد فعال نشده است.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
