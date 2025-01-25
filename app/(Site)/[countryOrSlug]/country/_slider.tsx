import { API_ROUTES, UNITS_LIST_ARRAY } from "@/routes";
import { CategoryNamespace } from "@/types/category";
import { CountryNamespace } from "@/types/country";
import Image from "next/image";
import Link from "next/link";
import PagesSearch from "./pages.search";

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
    <div className="slider  h-[520px] flex justify-center content-center px-3 sm:mx-auto sm:max-w-[95%] md:max-w-full relative rounded-xl">
      <Image
        className="rounded-xl brightness-[.70] object-fill hidden sm:block"
        src={`/images/slide/home/${currentCountry.code}.webp`}
        width={1700}
        height={520}
        loading="lazy"
        alt={`یک تصویر از کشور ${currentCountry.name}`}
      />
      <Image
        className="rounded-xl brightness-[.70] object-cover sm:hidden"
        src={`/images/slide/home/${currentCountry.code}-m.webp`}
        width={430}
        height={600}
        alt={`یک تصویر از کشور ${currentCountry.name}`}
      />

      <div className="max-w-[1144px] sm:m-auto absolute w-auto bottom-[10%] sm:bottom-[15%] sm:left-0 sm:right-0 sm:w-full">
        <div className="text-center wrap">
          <h3 className="sm:inline-block text-gray-300 bg-blue-900 bg-opacity-70 mx-3 p-3 sm:pt-1 sm:mx-0 sm:pb-[40px] px-3 sm:px-[44px] text-[18px] sm:text-[21px] leading-[30px] sm:leading-[36px] sm:rounded-xl">
            اگر در
            <span className="inline-block mx-1 font-semibold text-white">
              {currentCountry.name}
            </span>
            زندگی می‌کنی و دلت میخواد
            <br />
            لیست کامل و بروزی از خدمات
            <span className="inline-block mx-1 font-semibold text-white">
              فـارسـی زبـان
            </span>
            اطرافت داشته باشی
          </h3>
          <h2 className="text-white font-bold text-[30px] sm:text-[40px] mt-3 mx-3 sm:mx-0 sm:-mt-[36px] drop-shadow">
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
