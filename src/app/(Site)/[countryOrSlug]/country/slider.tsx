// src/app/(Site)/[countryOrSlug]/country/slider.tsx

import { API_ROUTES, UNITS_LIST_ARRAY } from "@/routes";
import { CategoryNamespace } from "@/types/category";
import { CountryNamespace } from "@/types/country";
import Link from "next/link";

type SliderHomeProps = {
  currentCountry: CountryNamespace.GET;
};

async function getMostUsedCategories(countryCode: string) {
  let result: CategoryNamespace.MOST_USED;
  try {
    result = await (
      await API_ROUTES.CATEGOREIS.MOST_USED(countryCode, 2, 120)
    ).json();
    return result;
  } catch (e) {
    console.log(e);
    throw new Error("error in getMostUsedCategories");
  }
}

export const SliderHome = async ({ currentCountry }: SliderHomeProps) => {
  const mostUsedCategories: CategoryNamespace.MOST_USED =
    await getMostUsedCategories(currentCountry.code);
  const units = UNITS_LIST_ARRAY;

  return (
    <div className="_slider bg-yellow-50">
      <div className="container">
        <div className="flex w-full flex-col py-10">
          <div className="_text">
            <div className="_wrap">
              <h2 className="text-4xl font-extrabold">
                هم‌رسانی تجربه ایرانیان مقیم {currentCountry.name}
              </h2>
              <h3 className="my-5 text-2xl leading-10 font-medium text-gray-500">
                در هر مرحله از فرآیند مهاجرت که هستید،
                <br className="hidden" />
                می‌تونید سوالاتتون رو بپرسید و تجربیات ارزشمندتون رو با دیگران
                به اشتراک بذارید.
              </h3>
              <Link href={`/${currentCountry.code}/community`} scroll>
                <button className="btn btn-accent rounded-full">
                  از اینجا شروع کن
                </button>
              </Link>
              {/* <h3 className="text-white mx-3 sm:mx-0 text-[17px] tracking-wide mb-3">
            و یا دسته‌بندی‌های پربازدید رو ببین:
          </h3>
          <div className="flex flex-wrap justify-center gap-1 mx-3 sm:gap-2 sm:mx-0">
            {UNITS_LIST_ARRAY.map((unit) => {
              return mostUsedCategories[unit.id].map((category) => {
                return (
                  <Link
                    href={`/${currentCountry.code}/${unit.slug}/${category.slug}`}
                  >
                    <button className="px-2 font-normal btn btn-sm btn-neutral text-gray-50">
                      {category.name}
                    </button>
                  </Link>
                );
              });
            })}
          </div> */}
            </div>
          </div>
          <div className="flex-1">Image</div>
        </div>
      </div>
    </div>
  );
};
