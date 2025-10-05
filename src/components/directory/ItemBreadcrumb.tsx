import { GENERAL } from "@/text/general";
import type { Page } from "@/types/page";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/index";

interface ItemBreadcrumbProps {
  pageData: Page;
}

export const ItemBreadcrumb = ({ pageData }: ItemBreadcrumbProps) => {
  return (
    <div className="_breadcrumbs border-y border-gray-100 bg-gray-50 px-4 py-3 text-[15px]">
      <Breadcrumb>
        <BreadcrumbList className="justify-center">
          <BreadcrumbItem>
            <BreadcrumbLink href="/">{GENERAL.HOME}</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`/${pageData?.country?.code}`}>
              {pageData?.country.name}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink
              href={`/${pageData?.country?.code}/${pageData?.unit?.slug}`}
            >
              {pageData?.unit?.name}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink
              href={`/${pageData?.country?.code}/${pageData?.unit?.slug}/${pageData?.category.slug}`}
            >
              {pageData?.category?.name}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};
