import Link from "next/link";
import { FC } from "react";
import Image from "next/image";
import { AdvertiseProps } from "./type";
import dynamic from "next/dynamic";

const Desktop = dynamic(
  () => import("../responsive").then((mod) => mod.Desktop),
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
const AdvertiseLg: FC<AdvertiseProps> = ({
  customers,
  campaignId,
  from,
}: AdvertiseProps): JSX.Element | null => {
  customers = customers.filter(Boolean);
  if (!campaignId || customers.length < 2) return null;
  return (
    <Desktop>
      <div className="flex flex-wrap gap-3 px-3 sm:gap-5 sm:px-0">
        <Link
          href={`${
            process.env.NEXT_PUBLIC_API_URL
          }/click/${campaignId}?customer=${
            customers[0].type
          }&from=${from}&size=${"lg"}`}
          target="_blank"
        >
          <Image
            src={`${process.env.NEXT_PUBLIC_DL_URL}/campaigns/${campaignId}/${customers[0]?.lg}`}
            width={562}
            height={72}
            alt="banner"
          />
        </Link>
        <Link
          href={`${
            process.env.NEXT_PUBLIC_API_URL
          }/click/${campaignId}?customer=${
            customers[1].type
          }&from=${from}&size=${"lg"}`}
          target="_blank"
        >
          <Image
            src={`${process.env.NEXT_PUBLIC_DL_URL}/campaigns/${campaignId}/${customers[1]?.lg}`}
            width={562}
            height={72}
            alt="banner"
          />
        </Link>
      </div>
    </Desktop>
  );
};

export default AdvertiseLg;
