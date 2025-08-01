"use client";
import { GENERAL } from "@/text/general";
import Link from "next/link";

type CommunityBreadcrumbType = {
  country: {
    name: string;
    code: string;
  };
};
export const CommunityBreadcrumb = ({ country }: CommunityBreadcrumbType) => {
  return (
    <div className="breadcrumbs w-full py-2 text-sm sm:w-auto sm:bg-transparent sm:px-0">
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
