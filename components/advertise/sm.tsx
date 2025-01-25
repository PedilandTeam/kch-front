import Link from "next/link";
import { FC } from "react";
import Image from "next/image";
import { AdvertiseProps } from "./type";
import dynamic from "next/dynamic";
import { CampaignNamespace } from "@/types/campaign";
const MobileOrTablet = dynamic(
  () => import("../responsive").then((mod) => mod.MobileOrTablet),
  {
    ssr: false,
  }
);
/**
 * Renders a component that displays two advertisement images for a given campaign.
 *
 * @param {AdvertiseProps} props - The properties for the component.
 * @param {CampaignNamespace.ICampaignCustomer[]} props.customers - The list of customers for the campaign. Should be 2 customers
 * @param {string} props.campaignId - The ID of the campaign.
 * @return {JSX.Element | null} The rendered component or null if there are fewer than 2 customers.
 */
const AdvertiseSm: FC<AdvertiseProps> = ({
  customers,
  from,
  campaignId,
}: AdvertiseProps): JSX.Element | null => {
  customers = customers.filter(Boolean);
  if (!campaignId || customers.length < 1) return null;
  return (
    <MobileOrTablet>
      <div className="flex flex-wrap gap-3 px-3 mt-12 mb-5 sm:mt-20 sm:gap-5 sm:px-0">
        <Link
          href={`${
            process.env.NEXT_PUBLIC_API_URL
          }/click/${campaignId}?customer=${
            customers[0].type
          }&from=${from}&size=${"sm"}`}
          target="_blank"
        >
          <Image
            src={`${process.env.NEXT_PUBLIC_DL_URL}/campaigns/${campaignId}/${customers[0]?.sm}`}
            width={562}
            height={72}
            alt="banner"
          />
        </Link>
        {customers.length > 1 ? (
          <Link
            href={`${
              process.env.NEXT_PUBLIC_API_URL
            }/click/${campaignId}?customer=${
              customers[1].type
            }&from=${from}&size=${"sm"}`}
            target="_blank"
          >
            <Image
              src={`${process.env.NEXT_PUBLIC_DL_URL}/campaigns/${campaignId}/${customers[1]?.sm}`}
              width={562}
              height={72}
              alt="banner"
            />
          </Link>
        ) : null}
      </div>
    </MobileOrTablet>
  );
};

export default AdvertiseSm;
