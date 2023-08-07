import { _TXT } from "@/app/text";
import { CountryNamespace } from "@/types/country";
import Image from "next/image";
import Link from "next/link";

type UnitsBannerProps = {
  currentCountry: CountryNamespace.GET;
};
export const UnitsBanner = ({ currentCountry }: UnitsBannerProps) => {
  return (
    <div className="container mx-auto max-w-[1144px]">
      <div
        className="mod-units4 grid sm:grid-cols-7 gap-10 mb-8 mt-6 pt-6 mx-3 sm:mb-28 sm:mt-14 sm:pt-14 sm:mx-0"
        id="select-unit"
      >
        <div className="mod-header sm:col-span-4 flex flex-wrap items-center">
          <div className="border-r-[4px] sm:border-r-[5px] border-pink-600 pr-3 sm:pr-5 pl-3 sm:pl-0">
            <h2 className="text-[20px] sm:text-[24px] font-bold mb-1">
              بیزینس دایرکتوری کـوچـا
            </h2>
            <p className="mb-4 text-[17px] text-slate-600 font-medium">
              یک ابزار ساده اما کاربردی
            </p>
            <div className="sm:text-justify sm:pl-5 leading-7 font-medium text-gray-500 mb-2">
              <p className="mb-2">
                اگه خارج از ایران زندگی میکنی و تابحال به پیدا کردن یه سرویس
                مشخص به زبـان فارسـی نیاز پیدا کرده باشی، حتما با مشکل نبود
                اطلاعات منسجم و معتبر در این زمینه مواجه شدی.
              </p>
              <p className="mb-2">
                بیزینس دایرکتوری کـوچـا که در دو دسته مشاغل و پزشکان فـارسـی
                زبـان طبقه‌بندی شده، تصمیم داره این مشکل بزرگ رو حل کنه. در همین
                راستا به تمام مشاغلی که خارج از ایران فعالیت قانونی خودشون رو به
                زبـان فارسـی هم ارائه می‌کنن؛ این امکان رو میده تا با ایجاد یک
                پروفایل حرفه‌ای، به‌سادگی خدمات و محصولات‌شون رو در دسترس سایر
                فارسی‌زبانان دنیا قرار بدن.
              </p>
            </div>
          </div>
        </div>

        <div className="mod-items sm:col-span-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 sm:gap-6 ">
            <div className="item group flex mb-4 sm:mb-0">
              <Link href={`/${currentCountry.code}/businesses`}>
                <div className="image relative h-min overflow-hidden rounded-md">
                  <Image
                    src={"/images/modules/mod-business-01.webp"}
                    width={400}
                    height={560}
                    alt="test"
                    className="rounded-md group-hover:scale-110 transition-all duration-500 cursor-pointer h-[300px] sm:h-auto object-cover"
                  />
                  <div className="info absolute bottom-0 w-full px-4 py-10 group-hover:py-12 sm:py-5 sm:group-hover:py-8 transition-all duration-500 cursor-pointer rounded-b-md text-[20px] bg-gradient-to-t from-black text-white font-medium">
                    {_TXT.MENU.BUSINESSES}
                  </div>
                </div>
              </Link>
            </div>
            <div className="item group flex mb-4 sm:mb-0">
              <Link href={`/${currentCountry.code}/doctors`}>
                <div className="image relative h-min overflow-hidden rounded-md">
                  <Image
                    src={"/images/modules/mod-doctors-01.webp"}
                    width={400}
                    height={560}
                    alt="test"
                    className="rounded-md group-hover:scale-110 transition-all duration-500 cursor-pointer h-[300px] sm:h-auto object-cover"
                  />
                  <div className="info absolute bottom-0 w-full px-4 py-10 group-hover:py-12 sm:py-5 sm:group-hover:py-8 transition-all duration-500 cursor-pointer rounded-b-md text-[20px] bg-gradient-to-t from-black text-white font-medium">
                    {_TXT.MENU.DOCTORS}
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
