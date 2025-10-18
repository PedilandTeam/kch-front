import useLinkHandler from "@/hooks/useLinkHandler";
import { GENERAL } from "@/text/general";
import type { Page } from "@/types/page";
import isPageNew from "@/utils/isPageNew";

import {
  BlueBadge,
  Button,
  ItemAvatar,
  ItemContacts,
  ItemLocation,
  ItemSocials,
  ItemTopMenu,
} from "@components";
import { CakeIcon, StarIcon } from "@phosphor-icons/react/dist/ssr";
import { CrownIcon, UserRoundIcon } from "lucide-react";

interface ItemInfoProps {
  pageData: Page;
}

export const ItemInfo = ({ pageData }: ItemInfoProps) => {
  const socials = { ...pageData.socials };
  delete socials.website;
  const isNew = isPageNew(pageData.createdDate);
  const linkHandler = useLinkHandler({ pageData });

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

        <ItemTopMenu />
      </div>
      <div className="flex flex-col items-center justify-center gap-3 px-4">
        <ItemAvatar
          className="border-secondary size-[146px] border-[3px] drop-shadow-sm"
          pageData={pageData}
        />

        <div className="flex flex-col items-center">
          <h1 className="text-primary flex flex-col-reverse text-xl font-bold">
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

      <div className="_badges my-6 flex items-center justify-center gap-2 px-4">
        <BlueBadge pageData={pageData} enable={!!pageData.business} />

        {/* <OrangeBadge enable={!pageData.business} /> */}

        {/* <OrangeModal slug={pageData.slug} /> */}

        <Button className="gap-1 bg-zinc-500/90 text-xs font-normal" size="sm">
          <UserRoundIcon />
          فریلنـسر
        </Button>

        <Button
          className="gap-1 bg-emerald-500/90 text-xs font-normal"
          size="sm"
        >
          <CrownIcon />
          ادز کـلاب
        </Button>
      </div>

      <div className="_item-contact mt-5 flex flex-col gap-3 border-y border-black/10 bg-white/60 py-3">
        <ItemSocials pageData={pageData} />

        <ItemContacts pageData={pageData} />

        <ItemLocation pageData={pageData} />
      </div>

      <div className="_bg-gradient" />
    </div>
  );
};
