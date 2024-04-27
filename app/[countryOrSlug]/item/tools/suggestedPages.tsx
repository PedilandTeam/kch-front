import { PageNamespace } from "@/types/page";
import { API_ROUTES } from "@/routes";
import SuggestedListItem from "../suggestedListItem";
import { CategoryNamespace } from "@/types/category";
import { CityNamespace } from "@/types/city";
import axios, { AxiosError } from "axios";
import { UnitType } from "@/types/unit";

type SuggestedPages = {
  pageId: string;
  countryCode: string;
  unit: UnitType;
  category?: CategoryNamespace.category;
  city: CityNamespace.city
  basedOn: 'category' | 'city'
};
const SuggestedPages = async ({ category, city, countryCode, basedOn, pageId, unit }: SuggestedPages) => {
  let pages: PageNamespace.Page[] | undefined = undefined;

  try {
    if (basedOn === 'category') {
      pages = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/pages/random?categoryId=${category?.id}&cityId=${city.id}&excludeId=${pageId}`).then((res) => res.data);
    }
  
    if (basedOn === 'city') {
      pages = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/pages/random?cityId=${city?.id}&countryCode=${countryCode}&excludeId=${pageId}`).then((res) => res.data);
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
        <h3 className="px-3 mb-2 text-xl font-extrabold sm:mb-6 sm:px-0">
          سایر {basedOn === 'category' ? category?.seoTitle ? category.seoTitle : category?.name : 'کسب و کارهای'} {basedOn === 'category' ? city?.name : city?.name || city?.englishName}
        </h3>

        <div className="hidden grid-cols-1 sm:grid sm:grid-cols-4 gap-y-4 sm:gap-5">
          {pages?.map((page) => {
            return <SuggestedListItem page={page} key={page.id} />;
          })}
        </div>

        <div className="max-w-full gap-5 p-5 rounded-none carousel carousel-center sm:hidden">
          {pages?.map((page) => {
            return <SuggestedListItem page={page} key={page.id} />;
          })}
        </div>
      </div>
    );
};
export default SuggestedPages;
