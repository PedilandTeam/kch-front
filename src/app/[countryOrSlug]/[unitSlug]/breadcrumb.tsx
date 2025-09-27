"use client";
import { GENERAL } from "@/text/general";
import Link from "next/link";

type ItemBreadCrumbType = {
  unit: {
    name: string;
    slug: string;
  };
  country: {
    name: string;
    code: string;
  };
};
export const ItemBreadCrumb = ({ unit, country }: ItemBreadCrumbType) => {
  return (
    <div className="w-full px-4 py-3 text-sm sm:px-0 sm:w-auto breadcrumbs bg-blue-50 sm:bg-transparent">
      <ul>
        <li>
          <Link href="/">{GENERAL.HOME}</Link>
        </li>
        <li>
          <Link href={`/${country.code}`}>{country.name}</Link>
        </li>
        <li>
          {unit.name} {GENERAL.PERSIAN}
        </li>
      </ul>
    </div>
  );
};
