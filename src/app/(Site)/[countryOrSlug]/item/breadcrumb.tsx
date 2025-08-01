import { GENERAL } from "@/text/general";
import { PageNamespace } from "@/types/page";
import Link from "next/link";

type ItemBreadCrumbProps = {
  pageData: PageNamespace.Page;
};
export const ItemBreadCrumb = ({ pageData }: ItemBreadCrumbProps) => {
  return (
    <div className="p-3 text-[15px] border-y sm:border border-slate-100 sm:rounded-md breadcrumbs bg-slate-50">
      <ul>
        <li>
          <Link href={"/"} className="text-blue-900">
            {GENERAL.HOME}
          </Link>
        </li>
        <li>
          <Link href={`/${pageData?.country?.code}`} className="text-blue-900">
            {pageData?.country.name}
          </Link>
        </li>
        <li>
          <Link
            href={`/${pageData?.country?.code}/${pageData?.unit?.slug}`}
            className="text-blue-900"
          >
            {pageData?.unit?.name}
          </Link>
        </li>
        <li>
          <Link
            href={`/${pageData?.country?.code}/${pageData?.unit?.slug}/${pageData?.category.slug}`}
            className="text-blue-900"
          >
            {pageData?.category?.name}
          </Link>
        </li>
      </ul>
    </div>
  );
};
