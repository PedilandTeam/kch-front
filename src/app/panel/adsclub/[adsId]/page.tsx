import { adsData } from "@/constants/ads-data";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Card,
  CardContent,
  CardHeader,
  PageHeader,
} from "@components/index";
import Image from "next/image";
import {
  DeviceMobileIcon,
  GlobeSimpleIcon,
  InstagramLogoIcon,
  PhoneIcon,
  TelegramLogoIcon,
  WhatsappLogoIcon,
} from "@phosphor-icons/react";

interface AdsDetailsProps {
  params: Promise<{ adsId: string }>;
}

export default async function AdsDetailsPage({ params }: AdsDetailsProps) {
  const { adsId } = await params;
  const adId = parseInt(adsId, 10);
  const ad = adsData.find((ad) => ad.id === adId);

  return (
    <div className="space-y-5 p-4">
      <PageHeader icon="NewspaperClippingIcon" title="جزئیات آگهی" />

      <div>
        <div className="flex flex-row items-center gap-3 space-y-0 pb-2.5">
          <Avatar className="size-11">
            <AvatarImage src={ad?.image} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-[15px] font-medium">{ad?.title}</h2>
            <p className="text-muted-foreground text-[13px]">
              {ad?.date} در دسته {ad?.category}
            </p>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <div>نوع آگهی: {ad?.vendorType}</div>
            <div>کشور: {ad?.country}</div>
            <div>شهر: {ad?.city}</div>
          </div>

          <div>
            <Image
              src={`/images/ads/ads-${ad?.id}.jpg`}
              width={500}
              height={500}
              alt={ad?.title}
              className="rounded-lg"
            />
          </div>

          <p className="text-sm text-gray-600">{ad?.description}</p>

          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center gap-1 rounded-md border bg-gray-50 p-1.5 pl-3">
              <DeviceMobileIcon size={24} />
              <span>تماس</span>
            </div>

            <div className="flex items-center gap-1 rounded-md border bg-gray-50 p-1.5 pl-3">
              <PhoneIcon size={24} />
              <span>تماس</span>
            </div>
            <div className="flex items-center gap-1 rounded-md border bg-gray-50 p-1.5 pl-3">
              <InstagramLogoIcon size={24} />
              <span>اینستاگرام</span>
            </div>
            <div className="flex items-center gap-1 rounded-md border bg-gray-50 p-1.5 pl-3">
              <GlobeSimpleIcon size={24} />
              <span>وبسایت</span>
            </div>
            <div className="flex items-center gap-1 rounded-md border bg-gray-50 p-1.5 pl-3">
              <TelegramLogoIcon size={24} />
              <span>تلگرام</span>
            </div>
            <div className="flex items-center gap-1 rounded-md border bg-gray-50 p-1.5 pl-3">
              <WhatsappLogoIcon size={24} />
              <span>واتس اپ</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
