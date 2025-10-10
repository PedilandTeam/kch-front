import { API_ROUTES, UNITS_LIST_ARRAY } from "@/routes";
import type { Country } from "@/schemas";
import type { MostUsedCategory } from "@/types/category";
import Link from "next/link";

import {
  Button,
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@components";
import { FolderSimpleStarIcon } from "@phosphor-icons/react/dist/ssr";
import { ArrowLeftIcon } from "lucide-react";

async function getMostUsedCategories(countryCode: string) {
  let result: MostUsedCategory;

  try {
    result = await (
      await API_ROUTES.CATEGOREIS.MOST_USED(countryCode, 7, 120)
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

type CountryUnitCategoriesProps = {
  currentCountry: Country;
};

export const CountryUnitCategories = async ({
  currentCountry,
}: CountryUnitCategoriesProps) => {
  const mostUsedCategories: MostUsedCategory = await getMostUsedCategories(
    currentCountry.code,
  );
  // const units = await getUnits()

  const units = UNITS_LIST_ARRAY;

  const unitFinder = (unitId: number) => {
    const unit = UNITS_LIST_ARRAY.find((unit) => unit.id == unitId);
    if (unit?.categories) {
      unit.categories = [];
    }
    return unit;
  };

  return (
    <div className="_country-unit-categories p-3 pb-6">
      <div className="space-y-6">
        {units.map((unit) => {
          if (mostUsedCategories[`${unit.id}`]?.length == 0) {
            return;
          }

          return (
            <div
              key={`unit-${unit.id}`}
              className="flex flex-col rounded-xl bg-gradient-to-b from-blue-900 to-blue-700 pb-5"
            >
              <div className="flex items-center justify-between rounded-t-xl px-4 py-4">
                <h2 className="font-semibold text-white">
                  {unit.name} ایرانی در {currentCountry.name}
                </h2>
                <Button
                  variant="link"
                  size="sm"
                  className="!p-0 font-normal text-white/80"
                  asChild
                >
                  <Link href={`/${currentCountry.code}/${unit.slug}`}>
                    لیست کامل <ArrowLeftIcon />
                  </Link>
                </Button>
              </div>

              <Carousel
                opts={{
                  direction: "rtl",
                  loop: true,
                  align: "center",
                }}
              >
                <CarouselContent>
                  {mostUsedCategories[unit.id]?.map((category, index) => {
                    return (
                      <Link
                        key={"country-category" + category.id}
                        href={`/${currentCountry.code}/${
                          unitFinder(category.unitId)?.slug
                        }/${category.slug}`}
                      >
                        <CarouselItem className="mx-auto w-[200px]">
                          <div
                            key={`country-category-list-${category.id}${index}`}
                            className="flex flex-col items-center justify-center gap-2 rounded-md border border-gray-200/70 bg-white/95 p-4"
                          >
                            <div>
                              <FolderSimpleStarIcon
                                weight="duotone"
                                className="text-secondary"
                                size={30}
                              />
                            </div>
                            <div className="text-primary line-clamp-1 text-[15px] font-semibold">
                              {category.name}
                            </div>
                            <div className="text-muted-foreground text-[15px]">
                              {category.pageCount} <span>مـورد</span>
                            </div>
                          </div>
                        </CarouselItem>
                      </Link>
                    );
                  })}
                </CarouselContent>
              </Carousel>
            </div>
          );
        })}
      </div>
    </div>
  );
};
