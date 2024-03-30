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
      <div className="my-12 sm:my-20">
        <h3 className="px-3 mb-2 text-xl font-extrabold sm:mb-6 sm:px-0">
          مشاغل مشابه در دسته‌بندی ساخت و ساز
        </h3>

        <div className="hidden grid-cols-1 sm:grid sm:grid-cols-4 gap-y-4 sm:gap-5">
          {pages?.items.map((page) => {
            return <SuggestedListItem page={page} key={page.id} />;
          })}
        </div>

        <div className="max-w-full gap-5 p-5 rounded-none carousel carousel-center sm:hidden">
          {pages?.items.map((page) => {
            return <SuggestedListItem page={page} key={page.id} />;
          })}
        </div>
      </div>
    );
};
export default SimilarCat;
