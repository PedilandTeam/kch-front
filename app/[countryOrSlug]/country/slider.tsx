import { API_ROUTES, UNITS_LIST_ARRAY } from "@/routes";
import { CategoryNamespace } from "@/types/category";
import { CountryNamespace } from "@/types/country";
import { CursorArrowRippleIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
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
    <div className="slider h-[520px] flex justify-center content-center mx-3 sm:mx-auto sm:max-w-[95%] relative">
      <Image
        className="rounded-xl brightness-[.50] object-cover"
        src={`/images/slide/home/${currentCountry.code}.webp`}
        width={1700}
        height={520}
        alt={`یک تصویر از کشور ${currentCountry.name}`}
      />
      {/* <Typewriter
            options={{
              strings: ["Hello", "World"],
              autoStart: true,
              loop: true,
            }}
      /> */}
      <div className="max-w-[1144px] sm:m-auto absolute w-auto bottom-[10%] sm:bottom-[15%] sm:left-0 sm:right-0 sm:w-full">
        <div className="wrap text-center">
          <h3 className="sm:inline-block text-gray-300 bg-pink-700 bg-opacity-70 p-3 sm:pb-[40px] px-3 sm:px-[45px] text-[18px] sm:text-[21px] leading-[30px] sm:leading-[36px] sm:rounded-lg">
            اگر در
            <span className="text-white font-semibold mx-1 inline-block">
              {currentCountry.name}
            </span>
            زندگی می‌کنی و دلت میخواد
            <br />
            لیست کامل و بروزی از خدمات
            <span className="text-white font-semibold inline-block mx-1">
              فـارسـی زبـان
            </span>
            اطرافت داشته باشی
          </h3>
          <h2 className="text-white font-bold text-[30px] sm:text-[40px] mt-3 mx-3 sm:mx-0 sm:-mt-[36px] drop-shadow">
            بیزینس دایرکتوری کـوچـا رو مـرور کن!
          </h2>

          <Link href={"#select-unit"} scroll>
            <button className="btn mx-auto my-3 sm:my-5 px-3  sm:mx-0 bg-lime-300 border-lime-300 text-lime-900 hover:bg-lime-400 hover:border-lime-400 hover:text-lime-950">
              از اینجا شروع کن
              <CursorArrowRippleIcon className="w-7 h-7" />
            </button>
          </Link>

          <h3 className="text-white mx-3 sm:mx-0 text-[17px] tracking-wide mb-3">
            و یا دسته‌بندی‌های پربازدید رو ببین:
          </h3>
          <div className="flex flex-wrap justify-center gap-1 sm:gap-2 mx-3 sm:mx-0">
            {UNITS_LIST_ARRAY.map((unit) => {
              return mostUsedCategories[unit.id].map((category) => {
                return (
                  <Link
                    href={`/${currentCountry.code}/${unit.slug}/${category.slug}`}
                  >
                    <button className="btn btn-sm btn-neutral font-normal text-gray-50 px-2">
                      {category.name}
                    </button>
                  </Link>
                );
              });
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
