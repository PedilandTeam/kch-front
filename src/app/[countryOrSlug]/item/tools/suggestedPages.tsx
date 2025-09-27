import { PageNamespace } from "@/types/page";
import { CategoryNamespace } from "@/types/category";
import { CityNamespace } from "@/types/city";
import axios, { AxiosError } from "axios";
import { UnitType } from "@/types/unit";
import CardListItem from "../../[unitSlug]/cardListItem";
import fetchWrapper from "@/api/fetchWrapper";

type SuggestedPages = {
  pageId: string;
  countryCode: string;
  unit: UnitType;
  category?: CategoryNamespace.category;
  city: CityNamespace.city;
  basedOn: "category" | "city";
};
const SuggestedPages = async ({
  category,
  city,
  countryCode,
  basedOn,
  pageId,
  unit,
}: SuggestedPages) => {
  let pages: PageNamespace.Page[] | undefined = undefined;

  try {
    if (basedOn === "category") {
      
      pages = await fetchWrapper(`pages/random?categoryId=${category?.id}&cityId=${city.id}&excludeId=${pageId}`, {
        revalidate: +process.env.DEFAULT_REVALIDATE_TIME_FOR_PAGE_HANDLERS || 2000,
        tags: ["country", "page"],
      })
    }

    if (basedOn === "city") {
      pages = await fetchWrapper(`pages/random?cityId=${city?.id}&countryCode=${countryCode}&excludeId=${pageId}`, {
        revalidate: +process.env.DEFAULT_REVALIDATE_TIME_FOR_PAGE_HANDLERS || 2000,
        tags: ["country", "page"],
      })
    }
  } catch (e: AxiosError | any) {
    console.log(e?.response?.data);
    console.log(e);

    return null;
  }

  if (!pages) {
    return null;
  }

  if (pages.length >= 4)
    return (
      <div className="my-12 sm:my-20">
        <h3 className="px-3 mb-2 text-xl font-extrabold text-center sm:mb-6 sm:px-0 sm:text-right">
          {basedOn === "category"
            ? category?.seoTitle
              ? `سایر ${category.seoTitle} در`
              : category?.name
            : "آیتم‌های تصادفی در"}{" "}
          {basedOn === "category"
            ? city?.name
            : city?.name || city?.englishName}
        </h3>

        <div className="hidden grid-cols-1 sm:grid sm:grid-cols-4 gap-y-4 sm:gap-5">
          {pages?.map((page) => (
            <CardListItem
              variant="unit"
              key={page.id}
              country={page.country}
              page={page}
            />
          ))}
        </div>

        <div className="max-w-full gap-5 p-5 rounded-none carousel carousel-center sm:hidden">
          {pages?.map((page) => (
            <CardListItem
              variant="unit"
              key={page.id}
              country={page.country}
              page={page}
            />
          ))}
        </div>
      </div>
    );
};
export default SuggestedPages;
