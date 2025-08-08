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
    <div className="_mod-categories my-9">
      <div className="container">
        <div className="_wrap">
          <div className="_mod-header text-center">
            <h2 className="mb-3 inline-block text-[20px] font-semibold">
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
