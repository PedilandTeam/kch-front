import { MENU } from "@/components/allTexts";
import { CountryNamespace } from "@/types/country";
import Image from "next/image";
import Link from "next/link";


type UnitsBannerProps = {
  currentCountry: CountryNamespace.GET
}
export const UnitsBanner = ({currentCountry}:UnitsBannerProps) => {
  return (
    <div className="mod-units4 my-8 mx-3 sm:my-16 sm:mx-0">
      <div className="mod-header pr-3 pl-3 sm:pr-4 sm:pl-0 border-r-[4px] sm:border-r-[5px] border-pink-600">
        <h2 className="text-[20px] sm:text-[24px] font-bold mb-2">کـوچـا چـه کـار مـی‌کـنـه؟</h2>
        <p className="mb-6 sm:w-1/2 sm:text-justify sm:pl-5 leading-7 font-medium text-gray-500">
          کـوچـا، به تمامی مهاجرانی که فعالیت قانونی‌شـون رو به زبـان فارسـی هم ارائه می‌کنن؛ امکان این رو میده که با ایجاد یک پروفایل حرفه‌ای <span className="font-semibold text-gray-600">رایـگـان</span> خدمات یا محصولات خودشون
          رو به سایر فارسی زبانان حاضر در بازار هدف شون معرفی کنن. می‌تونید لیست خدماتی که تا این لحظه ثبت شدن رو در اینجا مشاهده کنید:</p>
      </div>

      <div className="wrap grid grid-cols-1 sm:grid-cols-4 gap-0 sm:gap-8 ">
        <div className="item group flex mb-4 sm:mb-0">
          <Link href={`/${currentCountry.code}/businesses`}>
            <div className="image relative h-min overflow-hidden rounded-md">
              <Image
                src={"/img/modules/mod-business-min.jpg"}
                width={400}
                height={560}
                alt="test"
                className="rounded-md group-hover:scale-110 transition-all duration-500 cursor-pointer h-[220px] sm:h-auto object-cover"
              />
              <div className="info absolute bottom-0 w-full px-4 py-10 group-hover:py-12 sm:py-5 sm:group-hover:py-8 transition-all duration-500 cursor-pointer rounded-b-md text-[20px] bg-gradient-to-t from-black text-white">
                {MENU.BUSINESSES}
              </div>
            </div>
          </Link>
        </div>
        <div className="item group flex mb-4 sm:mb-0">
          <Link href={`/${currentCountry.code}/doctors`}>
            <div className="image relative h-min overflow-hidden rounded-md">
              <Image
                src={"/img/modules/mod-doctors-min.jpg"}
                width={400}
                height={560}
                alt="test"
                className="rounded-md group-hover:scale-110 transition-all duration-500 cursor-pointer h-[220px] sm:h-auto object-cover"
              />
              <div className="info absolute bottom-0 w-full px-4 py-10 group-hover:py-12 sm:py-5 sm:group-hover:py-8 transition-all duration-500 cursor-pointer rounded-b-md text-[20px] bg-gradient-to-t from-black text-white">
                {MENU.DOCTORS}
              </div>
            </div>
          </Link>
        </div>
        <div className="item group flex mb-4 sm:mb-0">
          <Link href={`/${currentCountry.code}/freelancers`}>
            <div className="image relative h-min overflow-hidden rounded-md">
              <Image
                src={"/img/modules/mod-freelancer-min.jpg"}
                width={400}
                height={560}
                alt="test"
                className="rounded-md group-hover:scale-110 transition-all duration-500 cursor-pointer h-[220px] sm:h-auto object-cover"
              />
              <div className="info absolute bottom-0 w-full px-4 py-10 group-hover:py-12 sm:py-5 sm:group-hover:py-8 transition-all duration-500 cursor-pointer rounded-b-md text-[20px] bg-gradient-to-t from-black text-white">
                {MENU.FREELANCERS}
              </div>
            </div>
          </Link>
        </div>
        <div className="item group flex mb-4 sm:mb-0">
          <Link href={`/${currentCountry.code}/associations`}>
            <div className="image relative h-min overflow-hidden rounded-md">
              <Image
                src={"/img/modules/mod-associations-min.jpg"}
                width={400}
                height={560}
                alt="test"
                className="rounded-md group-hover:scale-110 transition-all duration-500 cursor-pointer h-[220px] sm:h-auto object-cover"
              />
              <div className="info absolute bottom-0 w-full px-4 py-10 group-hover:py-12 sm:py-5 sm:group-hover:py-8 transition-all duration-500 cursor-pointer rounded-b-md text-[20px] bg-gradient-to-t from-black text-white">
                {MENU.COMMUNITIES}
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};
