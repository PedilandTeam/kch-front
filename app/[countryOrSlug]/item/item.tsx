import { ItemBreadCrumb } from "./breadcrumb";
import { ItemSideInfo } from "./sideInfo";
import { ItemTopInfo } from "./topInfo";
import { PageNamespace } from "@/types/page";
import CountryUpdater from "./countryUpdater";
import { ITEM } from "@/app/text/directory";
import { Suspense } from "react";
import Description from "@/components/description";
import TagList from "./tools/tagList";
import SuggestedPages from "./tools/suggestedPages";
export type PageItemProps = {
  pageData: PageNamespace.Page;
};

export default function PageItem({ pageData }: PageItemProps) {
  return (
    <div className="component page-item">
      <CountryUpdater pageData={pageData} />

      <div className="bg-[#fbf7ed] bg-[url('/images/pattern-03.png')] bg-center mb-4">
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
                <Description
                  className={`leading-8 ${
                    pageData.description ? "text-black" : "text-gray-500"
                  }`}
                  html={
                    pageData.description
                      ? pageData.description
                      : ITEM.DESCRIPTION_PLACEHOLDER
                  }
                />
              </div>

              {/* Services Section */}
              <TagList tags={pageData.tags} />

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
            </div>
          </div>
        </div>

        {/* Advertising Section P01 */}
        {/* <div className="flex flex-wrap gap-3 px-3 mt-12 mb-5 sm:mt-20 sm:gap-5 sm:px-0">
          <div>
            <Image
              src={"/images/banner/bnr-03.gif"}
              width={562}
              height={72}
              alt="banner"
            />
          </div>
          <div>
            <Image
              src={"/images/banner/bnr-02.gif"}
              width={562}
              height={72}
              alt="banner"
            />
          </div>
        </div> */}

        {/* Same Items in the Category */}
        <Suspense>
          <SuggestedPages
            unit={pageData.unit}
            pageId={pageData.id}
            countryCode={pageData.country.code}
            category={pageData.category}
            city={pageData.city}
            basedOn="category"
          />
        </Suspense>

        <Suspense>
          <SuggestedPages
            unit={pageData.unit}
            pageId={pageData.id}
            countryCode={pageData.country.code}
            city={pageData.city}
            basedOn="city"
          />
        </Suspense>

        {/* Randomize Items in the Unit */}
        {/* <Suspense>
          <SimilarCat
            countryCode={pageData.country.code}
            categoryId={pageData.category.id}
          />
        </Suspense> */}

        {/* Advertising Section P02 */}
        {/* <div className="flex flex-wrap gap-3 px-3 sm:gap-5 sm:px-0">
          <div>
            <Image
              src={"/images/banner/bnr-04.gif"}
              width={562}
              height={72}
              alt="banner"
            />
          </div>
          <div>
            <Image
              src={"/images/banner/bnr-04.gif"}
              width={562}
              height={72}
              alt="banner"
            />
          </div>
        </div> */}
      </div>
    </div>
  );
}
