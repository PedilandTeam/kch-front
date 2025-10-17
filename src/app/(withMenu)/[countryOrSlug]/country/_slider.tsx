import { API_ROUTES, UNITS_LIST_ARRAY } from "@/routes";
import { CategoryNamespace } from "@/types/category";
import { Country } from "@/types/country";
import Image from "next/image";
import Link from "next/link";
import PagesSearch from "./pages.search";

type SliderHomeProps = {
  currentCountry: Country;
};

async function getMostUsedCategories(countryCode: string) {
  let result: CategoryNamespace.MOST_USED;
  try {
    result = await (
      await API_ROUTES.CATEGOREIS.MOST_USED(countryCode, 2, 120)
    ).json();
    return result;
  } catch (err) {
    console.error("Error in getMostUsedCategories", err);
    throw new Error("error in getMostUsedCategories");
  }
}

export const SliderHome = async ({ currentCountry }: SliderHomeProps) => {
  const mostUsedCategories: CategoryNamespace.MOST_USED =
    await getMostUsedCategories(currentCountry.code);
  const units = UNITS_LIST_ARRAY;

  return (
    <div className="slider relative flex h-[520px] content-center justify-center rounded-xl px-3 sm:mx-auto sm:max-w-[95%] md:max-w-full">
      <Image
        className="hidden rounded-xl object-fill brightness-[.70] sm:block"
        src={`/images/slide/home/${currentCountry.code}.webp`}
        width={1700}
        height={520}
        loading="lazy"
        alt={`یک تصویر از کشور ${currentCountry.name}`}
      />
      <Image
        className="rounded-xl object-cover brightness-[.70] sm:hidden"
        src={`/images/slide/home/${currentCountry.code}-m.webp`}
        width={430}
        height={600}
        alt={`یک تصویر از کشور ${currentCountry.name}`}
      />

      <div className="absolute bottom-[10%] w-auto max-w-[1144px] sm:right-0 sm:bottom-[15%] sm:left-0 sm:m-auto sm:w-full">
        <div className="wrap text-center">
          <h3 className="bg-opacity-70 mx-3 bg-blue-900 p-3 px-3 text-[18px] leading-[30px] text-gray-300 sm:mx-0 sm:inline-block sm:rounded-xl sm:px-[44px] sm:pt-1 sm:pb-[40px] sm:text-[21px] sm:leading-[36px]">
            اگر در
            <span className="mx-1 inline-block font-semibold text-white">
              {currentCountry.name}
            </span>
            زندگی می‌کنی و دلت میخواد
            <br />
            لیست کامل و بروزی از خدمات
            <span className="mx-1 inline-block font-semibold text-white">
              فـارسـی زبـان
            </span>
            اطرافت داشته باشی
          </h3>
          <h2 className="mx-3 mt-3 text-[30px] font-bold text-white drop-shadow sm:mx-0 sm:-mt-[36px] sm:text-[40px]">
            راهنمای مشاغل کـوچـا رو جستجو کن!
          </h2>

          <PagesSearch countryCode={currentCountry.code} />

          <Link href={"#select-unit"} scroll>
            <button className="btn btn-accent">و یا از اینجا شروع کن</button>
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
    </div>
  );
};
