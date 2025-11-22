"use client";

import { GENERAL } from "@/text";
import type { Page } from "@/types/page";
import isPageNew from "@/utils/isPageNew";

import { CakeIcon, StarIcon } from "@phosphor-icons/react/dist/ssr";
import { ItemBadge } from "../badges";
import { ItemAvatar } from "./ItemAvatar";
import { ItemContacts } from "./ItemContacts";
import { ItemLocation } from "./ItemLocation";
import { ItemSocials } from "./ItemSocials";
import { ItemTopMenu } from "./ItemTopMenu";

interface ItemInfoProps {
  pageData: Page;
}

export const ItemInfo = ({ pageData }: ItemInfoProps) => {
  const socials = { ...pageData.socials };
  delete socials.website;
  const isNew = isPageNew(pageData.createdDate);

  return (
    <div className="_item-info relative bg-[#fbf7ed] bg-[url('/images/pattern-03.png')] bg-center pt-8">
      <div className="absolute top-4 right-0 left-0 flex items-center justify-between px-4">
        <div className="text-primary flex items-center gap-1">
          {isNew && (
            <>
              <CakeIcon size={26} weight="duotone" />
              <span className="text-sm font-medium">{GENERAL.NEW}</span>
            </>
          )}
        </div>

        <ItemTopMenu pageData={pageData} />
      </div>
      <div className="flex flex-col items-center justify-center gap-3 px-4">
        <ItemAvatar
          className="border-secondary size-[146px] border-[3px] drop-shadow-sm"
          pageData={pageData}
        />

        <div className="flex flex-col items-center">
          <h1 className="text-primary flex items-center gap-1.5 text-xl font-bold">
            <ItemBadge pageData={pageData} />
            {pageData.title}
          </h1>
          {pageData.subtitle && (
            <h2 className="text-primary mt-1 font-medium">
              {pageData.subtitle}
            </h2>
          )}

          <div className="mt-2.5 flex items-center gap-1">
            <StarIcon size={24} weight="duotone" className="text-gray-400/50" />
            <StarIcon size={24} weight="duotone" className="text-gray-400/50" />
            <StarIcon size={24} weight="duotone" className="text-gray-400/50" />
            <StarIcon size={24} weight="duotone" className="text-gray-400/50" />
            <StarIcon size={24} weight="duotone" className="text-gray-400/50" />
          </div>
        </div>
      </div>

      <div className="_item-contact mt-6 flex flex-col gap-3 border-y border-black/10 bg-white/60 py-3">
        <ItemSocials pageData={pageData} />

        <ItemContacts pageData={pageData} />

        <ItemLocation pageData={pageData} />
      </div>

      <div className="_bg-gradient" />
    </div>
  );
};
