import { GENERAL } from "@/text/general";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@components";

interface UnitBreadcrumbProps {
  unit: {
    name: string;
    slug: string;
  };
  country: {
    name: string;
    code: string;
  };
}

export const UnitBreadcrumb = ({ unit, country }: UnitBreadcrumbProps) => {
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
          <BreadcrumbItem>
            <BreadcrumbPage className="text-white/65">
              {unit.name} {GENERAL.PERSIAN}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};
