import Link from "next/link";
import { CircleFlag } from "next-circle-flags";
import Image from "next/image";
import { FolderSimpleStar } from "@app/client-packages/phosphor-icons/react";
import { PageNamespace } from "@/types/page";
import { API_ROUTES } from "@/routes";
import SuggestedListItem from "../suggestedListItem";

type SimilarCat = {
  countryCode: string;
  categoryId: number;
};
const SimilarCat = async ({ categoryId, countryCode }: SimilarCat) => {
  let pages: PageNamespace.GET | undefined = undefined;
  try {
    pages = await (
      await API_ROUTES.PAGES.GET_ALL(1, 4, {
        countryCode: countryCode,
        categoryIds: categoryId,
      })
    ).json();
  } catch (e: any) {
    console.log(e);
    throw new Error("خطا در بارگیری صفحات این دسته بندی");
  }

  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (pages?.meta.totalItems! >= 4)
    return (
      <div className="px-3 my-12 sm:my-20 sm:px-0">
        <h3 className="mb-6 text-xl font-bold">مشاغل مشابه در دسته‌بندی ساخت و ساز</h3>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-y-4 sm:gap-5">
          {pages?.items.map((page) => {
            return <SuggestedListItem page={page} key={page.id} />;
          })}
        </div>
      </div>
    );
};
export default SimilarCat;
