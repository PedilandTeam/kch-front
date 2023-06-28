"use client"
import { ChevronLeftIcon } from "@chakra-ui/icons";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";

export const ItemBreadCrumb = () => {
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
        <BreadcrumbLink href="de">آلمان</BreadcrumbLink>
      </BreadcrumbItem>

      <BreadcrumbItem isCurrentPage>
        <BreadcrumbLink href="de/list">مشاغل فارسی زبان</BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
  );
};
