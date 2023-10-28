"use client";
import { _TXT } from "@/app/text";
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
    <div className="text-sm breadcrumbs bg-blue-50 sm:bg-transparent px-4 py-3">
      <ul>
        <li>
          <Link href="/">{_TXT.GENERAL.HOME}</Link>
        </li>
        <li>
          <Link href={`/${country.code}`}>{country.name}</Link>
        </li>
        <li>
          {unit.name} {_TXT.GENERAL.PERSIAN}
        </li>
      </ul>
    </div>
  );
};
