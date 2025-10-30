import { GENERAL } from "@/text/general";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@components";

interface CategoryBreadcrumbProps {
  category: {
    name: string;
    slug: string;
  };
  country: {
    name: string;
    code: string;
  };
  unit: {
    name: string;
    slug: string;
  };
}

export const CategoryBreadcrumb = ({
  category,
  country,
  unit,
}: CategoryBreadcrumbProps) => {
  return (
    <div className="_breadcrumbs rounded-full border-2 border-black/15 bg-black/25 px-5 py-2 text-[15px] text-white">
      <Breadcrumb className="flex justify-center">
        <BreadcrumbList>
          <BreadcrumbItem className="font-light text-white/90">
            <BreadcrumbLink href="/">{GENERAL.HOME}</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className="text-white/60" />
          <BreadcrumbItem className="font-light text-white/90">
            <BreadcrumbLink href={`/${country.code}`}>
              {country.name}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className="text-white/60" />
          <BreadcrumbItem className="font-light text-white/90">
            <BreadcrumbLink href={`/${country.code}/${unit.slug}`}>
              {unit.name} {GENERAL.PERSIAN}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className="text-white/60" />
          <BreadcrumbItem>
            <BreadcrumbPage className="text-white/65">
              {category.name}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};
