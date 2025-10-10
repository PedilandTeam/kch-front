"use client";
import { GENERAL } from "@/text/general";
import type { UnitType } from "@/types/unit";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@components";

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
    <div className="_breadcrumbs mb-3 border-y border-gray-100 bg-gray-50 px-4 py-3 text-[15px]">
      <Breadcrumb>
        <BreadcrumbList className="justify-center">
          <BreadcrumbItem>
            <BreadcrumbLink href="/">{GENERAL.HOME}</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`/${country.code}`}>
              {country.name}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`/${country.code}/${unit.slug}`}>
              {unit.name} {GENERAL.PERSIAN}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{category.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};
