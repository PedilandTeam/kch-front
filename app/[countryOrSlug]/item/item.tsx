import { ItemBreadCrumb } from "./breadcrumb";
import { ItemSideInfo } from "./sideInfo";
import { ItemTopInfo } from "./topInfo";
import { PageNamespace } from "@/types/page";
import CountryUpdater from "./countryUpdater";
import { ITEM } from "@/app/text/directory";
import Image from "next/image";
import SimilarCat from "./tools/similarCat";
import { Suspense } from "react";
export type PageItemProps = {
  pageData: PageNamespace.Page;
};

export default function PageItem({ pageData }: PageItemProps) {
  return (
    <div className="component page-item">
      <CountryUpdater pageData={pageData} />

      <div className="bg-[#fbf7ed] bg-[url('/images/pattern-03.png')] bg-center  mb-4">
        <ItemTopInfo pageData={pageData} />
      </div>

      <div className="container mx-auto max-w-[1144px]">
        <div className="grid grid-cols-1 sm:grid-cols-12 sm:gap-5">
          <ItemSideInfo pageData={pageData} />

          <div className="mt-2 sm:mt-0 item-main sm:col-span-8 sm:col-start-1 sm:row-start-1">
            <ItemBreadCrumb pageData={pageData} />

            <div className="px-3 sm:px-0">
              {/* Description Section */}
              <div className="py-6 border-b border-gray-200 sm:py-8">
                <h3 className="mb-4 font-bold sm:mb-5">{ITEM.DESCRIPTION}</h3>
                <p
                  className={`leading-8 ${
                    pageData.description ? "text-black" : "text-gray-500"
                  }`}
                >
                  {pageData.description
                    ? pageData.description
                    : ITEM.DESCRIPTION_PLACEHOLDER}
                </p>
              </div>

              {/* Facilities Section */}
              <div className="py-6 border-b border-gray-200 sm:py-8">
                <h3 className="mb-4 font-bold sm:mb-5">{ITEM.FACILITIES}</h3>
                <p className="text-gray-500">{ITEM.FACILITIES_NO}</p>
              </div>

              {/* Images Section */}
              <div className="py-6 border-b border-gray-200 sm:py-8">
                <h3 className="mb-4 font-bold sm:mb-5">{ITEM.IMAGES}</h3>
                <p className="text-gray-500">{ITEM.IMAGES_NO}</p>
              </div>

              {/* Comment Section */}
              <div className="py-6 sm:py-8">
                <h3 className="mb-4 font-bold sm:mb-5">
                  {ITEM.USERS_COMMENTS}
                </h3>
                <p className="text-gray-500">{ITEM.USERS_COMMENTS_DISABLE}</p>
              </div>

              {/* Advertise Section */}
              <div className="py-6 sm:py-8"></div>
            </div>
          </div>
        </div>

        <Suspense>
          <SimilarCat
            countryCode={pageData.country.code}
            categoryId={pageData.category.id}
          />
        </Suspense>
      </div>
    </div>
  );
}
