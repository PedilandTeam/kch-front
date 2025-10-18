"use client";

import { type Page } from "@/types/page";
import upperCaseFirst from "@/utils/upperCaseFirst";
import { MapPinAreaIcon } from "@phosphor-icons/react";

interface ItemLocationProps {
  pageData: Page;
}

export const ItemLocation = ({ pageData }: ItemLocationProps) => {
  if (!pageData) {
    return null;
  }

  const text = `${
    pageData?.address?.address ? `${pageData?.address?.address},` : ""
  } ${pageData?.address?.postalCode ? `${pageData.address.postalCode}` : ""} ${
    pageData?.city?.englishName
      ? upperCaseFirst(pageData.city.englishName)
      : upperCaseFirst(pageData?.city?.name)
  }`;

  return (
    <div className="_item-location mx-5 flex justify-center border-t border-dashed pt-3">
      <div className="text-primary item-center inline-flex flex-row-reverse gap-3 text-[15px]">
        <MapPinAreaIcon size={22} weight="duotone" className="shrink-0" />
        <span className="font-roboto text-left">{text}</span>
      </div>
    </div>
  );
};
