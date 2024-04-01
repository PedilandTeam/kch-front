"use client";
import { GENERAL } from "@/app/text/general";
import { UnitType } from "@/types/unit";
import Link from "next/link";

type ItemBreadCrumbType = {
  category: {
    name: string;
    slug: string;
  };
  country: {
    name: string;
    code: string;
  };
  unit: UnitType;
};
export const ItemBreadCrumb = ({
  category,
  country,
  unit,
}: ItemBreadCrumbType) => {
  return (
    <div className="w-full px-4 py-3 text-sm sm:w-auto breadcrumbs bg-blue-50 sm:bg-transparent">
      <ul>
        <li>
          <Link href="/">{GENERAL.HOME}</Link>
        </li>
        <li>
          <Link href={`/${country.code}`}>{country.name}</Link>
        </li>
        <li>
          <Link href={`/${country.code}/${unit.slug}`}>
            {unit.name} {GENERAL.PERSIAN}
          </Link>
        </li>
        <li>{category.name}</li>
      </ul>
    </div>
  );
};
