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
    <div className="_breadcrumbs border-y border-gray-100 bg-gray-50 px-4 py-3 text-[15px] mb-3">
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
            <BreadcrumbPage>
              {unit.name} {GENERAL.PERSIAN}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};
