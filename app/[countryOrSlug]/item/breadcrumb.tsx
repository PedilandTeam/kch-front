import { PageNamespace } from "@/types/page";
import Link from "next/link";

type ItemBreadCrumbProps = {
  pageData: PageNamespace.GET
}
export const ItemBreadCrumb = ({pageData}: ItemBreadCrumbProps) => {

  return (
    <div className=" text-sm breadcrumbs">
      <ul>
        <li><Link href={"/"}>خانه</Link></li>
        <li><Link href={`/${pageData?.country?.code}`}>{pageData?.country.name}</Link></li>
        <li><Link href={`/${pageData?.country?.code}/${pageData?.unit?.slug}`}>{pageData?.unit?.name}</Link></li>
        <li><Link href={`/${pageData?.country?.code}/${pageData?.unit?.slug}/${pageData?.category.slug}`}>{pageData?.category?.name}</Link></li>
      </ul>
    </div>
  );
};
