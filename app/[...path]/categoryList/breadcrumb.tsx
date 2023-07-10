"use client"
import { ChevronLeftIcon } from "@chakra-ui/icons";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";


type ItemBreadCrumbType = {
  unit:{
    name: string,
    slug: string
  },
  country: {
    name: string,
    code: string
  }
}
export const ItemBreadCrumb = ({unit, country}: ItemBreadCrumbType) => {
  return (
    <Breadcrumb
      spacing="4px"
      fontSize="small"
      color="gray.500"
      separator={<ChevronLeftIcon color="gray.500" />}
    >
      <BreadcrumbItem>
        <BreadcrumbLink href="/">خانه</BreadcrumbLink>
      </BreadcrumbItem>

      <BreadcrumbItem>
        <BreadcrumbLink href={`/${country.code}`}>{country.name}</BreadcrumbLink>
      </BreadcrumbItem>

      <BreadcrumbItem isCurrentPage>
        <BreadcrumbLink href={`/${country.code}/${unit.slug}`}>{unit.name} فارسی زبان</BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
  );
};
