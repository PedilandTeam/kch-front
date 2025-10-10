"use client";

import { type Page } from "@/types/page";
import upperCaseFirst from "@/utils/upperCaseFirst";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type ImageItem = {
  src: string;
  href?: string | undefined | null;
};

type IconItem = {
  Component: React.ReactNode;
  href?: string | undefined | null;
};

interface AddressGeneratorType {
  Icons?: IconItem[];
  Images?: ImageItem[];
  text: string | undefined;
}

function AddressGenerator({ Icons, Images, text }: AddressGeneratorType) {
  if (!text) {
    return null;
  }

  return (
    <div className="_item-address text-left">
      {Array.isArray(Images) &&
        Images.map((image, index) => {
          return (
            <Link
              key={`side-info-${index}`}
              href={image.href || "#"}
              target="_blank"
              rel="nofollow noopener"
            >
              <Image
                key={image.href}
                alt="social icon"
                src={image.src}
                width={20}
                height={20}
                className="ml-2"
              />
            </Link>
          );
        })}
      {Array.isArray(Icons) &&
        Icons.map((Icon, index) => {
          return (
            <Link
              key={`side-info-icons-${index}`}
              href={Icon.href || "#"}
              target="_blank"
              rel="nofollow noopener"
            >
              {Icon.Component}
            </Link>
          );
        })}
      <span className="font-latin">{text}</span>
    </div>
  );
}

interface ItemLocationProps {
  pageData: Page;
}

export const ItemLocation = ({ pageData }: ItemLocationProps) => {
  return (
    <div className="_item-location mx-3">
      <div className="mb-3 rounded-md border border-gray-200 p-4">
        <AddressGenerator
          text={`${
            pageData?.address?.address ? `${pageData?.address?.address},` : ""
          } ${
            pageData?.address?.postalCode
              ? `${pageData.address.postalCode}`
              : ""
          } ${
            pageData?.city?.englishName
              ? upperCaseFirst(pageData.city.englishName)
              : upperCaseFirst(pageData?.city?.name)
          }`}
        />
      </div>
    </div>
  );
};
