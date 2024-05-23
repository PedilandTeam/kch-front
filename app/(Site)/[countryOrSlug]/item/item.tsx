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
import { CampaignNamespace } from "@/types/campaign";
import AdvertiseMd from "@/components/advertise/md";
import AdvertiseSm from "@/components/advertise/sm";
import fetchCampaigns from "@/utils/fetchCampaigns";
export type PageItemProps = {
  pageData: PageNamespace.Page;
};

export default async function PageItem({ pageData }: PageItemProps) {
  const { campaign, customers } = await fetchCampaigns(pageData.country.code);

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

        <AdvertiseSm
          customers={[customers?.[0], customers?.[1]]}
          campaignId={campaign?.id}
        />
        <AdvertiseMd
          customers={[customers?.[0], customers?.[1]]}
          campaignId={campaign?.id}
        />

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

        {/* Advertising Section P02 */}
        <AdvertiseSm
          customers={[customers[2], customers[3]]}
          campaignId={campaign?.id}
        />

        <AdvertiseMd
          customers={[customers[2], customers[3]]}
          campaignId={campaign?.id}
        />
      </div>
    </div>
  );
}
