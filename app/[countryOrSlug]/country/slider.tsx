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
      await API_ROUTES.CATEGOREIS.MOST_USED(countryCode, 1, 120)
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
        className="rounded-xl brightness-[.60] object-cover"
        src={"/img/slide/home-slider-01-min.jpg"}
        width={1700}
        height={600}
        alt=""
      />
      {/* <Typewriter
            options={{
              strings: ["Hello", "World"],
              autoStart: true,
              loop: true,
            }}
      /> */}
      <div className="max-w-[1144px] sm:m-auto absolute w-auto bottom-[10%] sm:bottom-[15%] sm:left-0 sm:right-0 sm:w-full">
        <div>
          <h3 className="text-gray-300 bg-pink-700 bg-opacity-60 whitespace-normal p-3 sm:pt-2 sm:pb-[45px] px-3 sm:px-2 inline-flex flex-wrap text-[18px] sm:text-[21px] sm:rounded-md">
            اگر در
            <span className="text-white font-semibold mx-1">
              {currentCountry.name}
            </span>
            فعالیت می‌کنید و خدمات خود را به
            <span className="text-white font-semibold mx-1">زبـان فـارسـی</span>
            هم ارائه می‌دهید؛
          </h3>
          <h2 className="text-white font-bold text-[30px] sm:text-[40px] mt-3 mx-3 sm:mx-0 sm:-mt-[36px] drop-shadow">
            به راحتی <span className="">پـروفایل حـرفـه‌ای</span> خـودتون رو
            بـسـازیـد!
          </h2>
          <Link target={"_blank"} href={"https://t.me/koochaa_support"}>
            <button className="btn my-3 sm:my-5 px-3 mx-3 sm:mx-0 bg-sky-500 border-sky-500 text-white hover:bg-sky-600 hover:border-sky-600">
              همین الان پـیـام بده
              <CursorArrowRippleIcon className="w-7 h-7" />
            </button>
          </Link>
          <h3 className="text-white mx-3 sm:mx-0 text-[17px] tracking-wide mb-3">
            و یا دسته‌بندی‌های پربازدید رو مرور کنید:
          </h3>
          <div className="flex flex-wrap gap-1 sm:gap-2 mx-3 sm:mx-0">
            {UNITS_LIST_ARRAY.map((unit) => {
              return mostUsedCategories[unit.id].map((category) => {
                return (
                  <Link href={`/${currentCountry.code}/${unit.slug}/${category.slug}`}>
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
