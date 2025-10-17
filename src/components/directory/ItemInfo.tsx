import { GENERAL } from "@/text/general";
import type { Page } from "@/types/page";
import { BlueBadge, Button, ItemAvatar, ItemSocials } from "@components";
import {
  ConfettiIcon,
  PlantIcon,
  StarIcon,
} from "@phosphor-icons/react/dist/ssr";
import OrangeBadge from "../badges/orange.badge";
import {
  BriefcaseBusiness,
  CakeIcon,
  CrownIcon,
  UserRoundIcon,
} from "lucide-react";
import { ITEM } from "@/text/directory";
import isPageNew from "@/utils/isPageNew";
import useLinkHandler from "@/hooks/useLinkHandler";

interface ItemInfoProps {
  pageData: Page;
}

export const ItemInfo = ({ pageData }: ItemInfoProps) => {
  const haveSocial =
    pageData.socials && Object.keys(pageData.socials).length > 0;

  const socials = { ...pageData.socials };
  delete socials.website;

  const isNew = isPageNew(pageData.createdDate);

  const linkHandler = useLinkHandler({ pageData });

  return (
    <div className="_item-info px-4 pt-6">
      <div className="flex items-center justify-center gap-3">
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
            <StarIcon size={22} weight="duotone" className="text-gray-400/90" />
            <StarIcon size={22} weight="duotone" className="text-gray-400/90" />
            <StarIcon size={22} weight="duotone" className="text-gray-400/90" />
            <StarIcon size={22} weight="duotone" className="text-gray-400/90" />
            <StarIcon size={22} weight="duotone" className="text-gray-400/90" />
          </div>
        </div>
      </div>

      <div className="my-5 flex items-center justify-center gap-1.5">
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

      {!haveSocial ? (
        <p className="ml-3 py-5 text-slate-400">{ITEM.NO_SOCIAL_MEDIA}</p>
      ) : (
        <ItemSocials pageData={pageData} />
      )}
    </div>
  );
};
