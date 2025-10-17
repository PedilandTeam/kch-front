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
} from "@components";
import { StarIcon } from "@phosphor-icons/react/dist/ssr";
import { CakeIcon, CrownIcon, UserRoundIcon } from "lucide-react";

interface ItemInfoProps {
  pageData: Page;
}

export const ItemInfo = ({ pageData }: ItemInfoProps) => {
  const socials = { ...pageData.socials };
  delete socials.website;
  const isNew = isPageNew(pageData.createdDate);
  const linkHandler = useLinkHandler({ pageData });

  return (
    <div className="_top bg-[#fbf7ed] bg-[url('/images/pattern-03.png')] bg-center">
      <div className="_item-info pt-6">
        <div className="flex items-center justify-center gap-3 px-4">
          <ItemAvatar
            className="size-[90px] drop-shadow-sm"
            pageData={pageData}
          />

          <div className="flex flex-col">
            <h1 className="text-primary flex flex-col-reverse text-lg font-bold">
              {pageData.title}
            </h1>
            {pageData.subtitle && (
              <h2 className="text-primary text-sm font-medium">
                {pageData.subtitle}
              </h2>
            )}

            <div className="mt-2 flex items-center gap-1">
              <StarIcon
                size={22}
                weight="duotone"
                className="text-gray-400/90"
              />
              <StarIcon
                size={22}
                weight="duotone"
                className="text-gray-400/90"
              />
              <StarIcon
                size={22}
                weight="duotone"
                className="text-gray-400/90"
              />
              <StarIcon
                size={22}
                weight="duotone"
                className="text-gray-400/90"
              />
              <StarIcon
                size={22}
                weight="duotone"
                className="text-gray-400/90"
              />
            </div>
          </div>
        </div>

        <div className="my-6 flex items-center justify-center gap-1.5 px-4">
          <Button
            className="gap-1 bg-amber-300/70 text-xs text-amber-900"
            size="sm"
          >
            <CakeIcon />
            {GENERAL.NEW}
          </Button>

          <BlueBadge pageData={pageData} enable={!!pageData.business} />

          {/* <OrangeBadge enable={!pageData.business} /> */}

          {/* <OrangeModal slug={pageData.slug} /> */}

          <Button
            className="gap-1 bg-zinc-500/90 text-xs font-normal"
            size="sm"
          >
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
      </div>

      <div className="_bg-gradient" />
    </div>
  );
};
