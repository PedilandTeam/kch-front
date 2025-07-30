import { API_ROUTES } from "@/routes";
import { CategoryNamespace } from "@/types/category";
import { CountryNamespace } from "@/types/country";
import CountryCategoriesItems from "./countryCategoriesItems";
import { CATEGORY } from "@/text/directory";

async function getMostUsedCategories(countryCode: string) {
  let result: CategoryNamespace.MOST_USED;
  try {
    result = await (
      await API_ROUTES.CATEGOREIS.MOST_USED(countryCode, 10, 120)
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
    <div className="_mod-categories my-9 sm:my-20">
      <div className="container mx-auto max-w-[1144px] px-3 sm:px-0">
        <div className="_wrap">
          <div className="_mod-header text-center">
            <h2 className="text-[20px] inline-block sm:text-[24px] font-semibold mb-3 sm:mb-5">
              {CATEGORY.POPULAR}
            </h2>
          </div>
          <CountryCategoriesItems
            currentCountry={currentCountry}
            recentlyUpdatedCategories={mostUsedCategories}
          />
        </div>
      </div>
    </div>
  );
};
