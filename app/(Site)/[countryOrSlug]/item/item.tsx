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
import Image from "next/image";
import { CampaignNamespace } from "@/types/campaign";
import { Desktop, MobileOrTablet } from "@/components/responsive";
import Link from "next/link";
export type PageItemProps = {
  pageData: PageNamespace.Page;
};

async function fetchCampaigns(
  countryCode: string
): Promise<CampaignNamespace.GET> {
  try {
    const response = await fetch(
      `${process.env.API_URL}/campaign?countryCode=${countryCode}&page=1&limit=1`,
      {
        next: {
          revalidate: 30,
        },
      }
    );
    const campaignsJson = await response.json();

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Failed to fetch campaigns: ${errorText}`);
      throw new Error(errorText);
    }

    return campaignsJson;
  } catch (error) {
    console.error("Error while fetching campaigns:", error);
    throw error;
  }
}

export default async function PageItem({ pageData }: PageItemProps) {
  let campaign: CampaignNamespace.ICampaign | undefined;
  let customers: CampaignNamespace.ICampaignCustomer[] = [];
  try {
    const campaignsList = await fetchCampaigns(pageData.country.code);
    if (campaignsList.items.length > 0) {
      campaign = campaignsList.items[0];
      if (!campaign) return;
      customers = Object.keys(campaign)
        .map((key) => (key.includes("Customer") ? campaign![key] : null))
        .map((value) => ({ value, sort: Math.random() * 100 }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value)
        .filter(Boolean);
    }
  } catch (e) {
    console.log(e);
  }

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

        <div className="flex flex-wrap gap-3 px-3 mt-12 mb-5 sm:mt-20 sm:gap-5 sm:px-0">
          {/* {customers.length >= 2 ? (
            <Desktop>
              <>
                <Link href={customers[0]?.link || '#'} target="_blank">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_DL_URL}/campaigns/${campaign?.id}/${customers[0]?.md}`}
                    width={562}
                    height={72}
                    alt="banner"
                  />
                </Link>
                <Link href={customers[1]?.link || '#'} target="_blank">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_DL_URL}/campaigns/${campaign?.id}/${customers[1]?.md}`}
                    width={562}
                    height={72}
                    alt="banner"
                  />
                </Link>
              </>
            </Desktop>
          ) : null}

          {customers.length > 0 ? (
            <MobileOrTablet>
              <>
                <Link href={customers[0]?.link || '#'} target="_blank">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_DL_URL}/campaigns/${campaign?.id}/${customers[0]?.sm}`}
                    width={562}
                    height={72}
                    alt="banner"
                  />
                </Link>
                {customers.length > 1 ? (
                  <Link href={customers[1]?.link!} target="_blank">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_DL_URL}/campaigns/${campaign?.id}/${customers[1]?.sm}`}
                      width={562}
                      height={72}
                      alt="banner"
                    />
                  </Link>
                ) : null}
              </>
            </MobileOrTablet>
          ) : null} */}
        </div>

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
        <div className="flex flex-wrap gap-3 px-3 sm:gap-5 sm:px-0">
          {customers.length >= 4 ? (
            <Desktop>
              <>
                <Link href={customers[2]?.link || '#'} target="_blank">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_DL_URL}/campaigns/${campaign?.id}/${customers[2]?.md}`}
                    width={562}
                    height={72}
                    alt="banner"
                  />
                </Link>
                <Link href={customers[3]?.link || '#'} target="_blank">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_DL_URL}/campaigns/${campaign?.id}/${customers[3]?.md}`}
                    width={562}
                    height={72}
                    alt="banner"
                  />
                </Link>
              </>
            </Desktop>
          ) : null}

          {customers.length > 2 ? (
            <MobileOrTablet>
              <>
                <Link href={customers[2]?.link || '#'} target="_blank">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_DL_URL}/campaigns/${campaign?.id}/${customers[2]?.sm}`}
                    width={562}
                    height={72}
                    alt="banner"
                  />
                </Link>
                {customers.length > 3 ? (
                  <Link href={customers[3]?.link || '#'} target="_blank">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_DL_URL}/campaigns/${campaign?.id}/${customers[3]?.sm}`}
                      width={562}
                      height={72}
                      alt="banner"
                    />
                  </Link>
                ) : null}
              </>
            </MobileOrTablet>
          ) : null}
        </div>
      </div>
    </div>
  );
}
