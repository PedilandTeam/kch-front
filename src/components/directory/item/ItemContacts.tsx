"use client";

import { useLinkHandler } from "@/hooks/useLinkHandler";
import { cn } from "@/lib/utils";
import { GENERAL } from "@/text/general";
import { SOCIAL } from "@/text/social";
import type { Page } from "@/types/page";

import {
  DeviceMobileIcon,
  GlobeSimpleIcon,
  PhoneIcon,
  TelegramLogoIcon,
  WhatsappLogoIcon,
} from "@phosphor-icons/react/dist/ssr";

interface ItemContactsProps {
  pageData: Page;
}

export const ItemContacts = ({ pageData }: ItemContactsProps) => {
  const { linkHandler } = useLinkHandler({ pageData });
  const number = pageData.contact?.telephone
    ? `00${pageData.country.areaCode ? pageData.country.areaCode : ""}${pageData
        .contact?.telephone!}`
    : pageData.contact?.phone &&
      `00${pageData.country.areaCode ? pageData.country.areaCode : ""}${pageData
        .contact.phone!}`;

  const contactItems = [
    {
      key: "phone",
      label: "همراه",
      icon: DeviceMobileIcon,
      active: !pageData?.contact?.telephone && !!pageData?.contact?.phone,
      color: "group-hover:text-foreground",
    },
    {
      key: "telephone",
      label: "تلفن",
      icon: PhoneIcon,
      active: !!pageData?.contact?.telephone,
      color: "group-hover:text-foreground",
    },

    {
      key: "website",
      label: GENERAL.WEBSITE,
      icon: GlobeSimpleIcon,
      active: !!pageData?.socials?.website,
      color: "group-hover:text-foreground",
    },
    {
      key: "telegram",
      label: SOCIAL.TELEGRAM,
      icon: TelegramLogoIcon,
      active: !!pageData?.contact?.telegram,
      color: "group-hover:text-sky-600",
    },
    {
      key: "whatsapp",
      label: SOCIAL.WHATSAPP,
      icon: WhatsappLogoIcon,
      active: !!pageData?.contact?.whatsapp,
      color: "group-hover:text-green-600",
    },
  ];

  return (
    <div className="_item-contacts grid grid-cols-5">
      {contactItems.map(({ key, label, icon: Icon, active, color }) => (
        <div key={key} className="group border-l border-dashed last:border-l-0">
          {active ? (
            <button
              onClick={(e) => linkHandler(e)}
              data-type={key}
              className="text-primary flex w-full cursor-pointer flex-col items-center justify-center gap-1.5"
            >
              <Icon
                className={cn("mx-auto", color)}
                size={26}
                weight="duotone"
              />
              <span className={cn("text-sm", color)}>{label}</span>
            </button>
          ) : (
            <button className="flex w-full flex-col items-center justify-center gap-1.5">
              <Icon
                className="mx-auto text-gray-300"
                weight="light"
                size={26}
              />
              <span className="text-sm font-light text-gray-300">{label}</span>
            </button>
          )}
        </div>
      ))}
    </div>
  );
};
