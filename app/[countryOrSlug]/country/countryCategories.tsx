import { _TXT } from "@/app/text";
import { API_ROUTES } from "@/routes";
import { CategoryNamespace } from "@/types/category";
import { CountryNamespace } from "@/types/country";
import CountryCategoriesItems from "./countryCategoriesItems";

async function getMostUsedCategories(countryCode: string) {
  let result: CategoryNamespace.MOST_USED;
  try {
    result = await (
      await API_ROUTES.CATEGOREIS.MOST_USED(countryCode, 12, 120)
    ).json();
    return result;
  } catch (e) {
    console.log(e);
    throw new Error("error in getMostUsedCategories");
  }
}

// async function getUnits() {
//   let result: UnitType[]
//   try{
//     result = await (await API_ROUTES.UNITS.GET_ALL(120)).json()
//     return result
//   }catch(e){
//     console.log(e);
//     throw new Error("error in getUnits")
//   }
// }

type CountryCategoriesProps = {
  currentCountry: CountryNamespace.GET;
};
export const CountryCategories = async ({
  currentCountry,
}: CountryCategoriesProps) => {
  const mostUsedCategories: CategoryNamespace.MOST_USED =
    await getMostUsedCategories(currentCountry.code);
  // const units = await getUnits()

  return (
    <div className="mod-categories my-8 sm:my-16">
      <div className="mod-header pr-3 pl-3 mb-7 sm:pr-4 sm:pl-0 border-r-[4px] sm:border-r-[5px] border-pink-600">
        <h2 className="text-[20px] sm:text-[24px] font-bold">
          {_TXT.CATEGORY.UPDATED}:
        </h2>
      </div>
      <CountryCategoriesItems
        currentCountry={currentCountry}
        recentlyUpdatedCategories={mostUsedCategories}
      />
    </div>
  );
};
