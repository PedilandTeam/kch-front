"use client";
import { GENERAL } from "@/app/text/general";
import Link from "next/link";

type CommunityBreadcrumbType = {
  country: {
    name: string;
    code: string;
  };
};
export const CommunityBreadcrumb = ({country }: CommunityBreadcrumbType) => {
  return (
    <div className="breadcrumbs w-full px-4 py-3  text-sm sm:px-0 sm:w-auto sm:bg-transparent">
      <ul>
        <li>
          <Link href="/">{GENERAL.HOME}</Link>
        </li>
        <li>
          <Link href={`/${country.code}`}>{country.name}</Link>
        </li>
        <li>
          <p> سوالات مهاجرت</p>
        </li>
      </ul>
    </div>
  );
};
