import type { Country } from "@/schemas";
import { MENU } from "@/text/menu";
import Image from "next/image";
import Link from "next/link";

type UnitsBannerProps = {
  currentCountry: Country;
};
export const UnitsBanner = ({ currentCountry }: UnitsBannerProps) => {
  return (
    <div className="_unit-banner">
      <div
        className="_wrap my-9 grid gap-6 sm:my-20 sm:grid-cols-7 sm:gap-10"
        id="select-unit"
      >
        <div className="_mod-header flex flex-wrap items-center sm:col-span-4">
          <div className="border-secondary border-r-[4px] pr-3 pl-3 sm:border-r-[5px] sm:pr-5 sm:pl-0">
            <h2 className="mb-1 text-[20px] font-bold sm:text-[24px]">
              راهنمای مشاغل کـوچـا
            </h2>
            <p className="mb-4 text-[17px] font-medium text-slate-600">
              یک ابزار ساده اما کاربردی
            </p>
            <div className="mb-2 leading-7 font-medium text-gray-500 sm:pl-5 sm:text-justify">
              <p className="mb-2">
                اگه خارج از ایران زندگی میکنی و تابحال به پیدا کردن یه سرویس
                مشخص به زبـان فارسـی نیاز پیدا کرده باشی، حتما با مشکل نبود
                اطلاعات منسجم و معتبر در این زمینه مواجه شدی.
              </p>
              <p className="mb-2">
                راهنمای مشاغل کـوچـا که در دو دسته مشاغل و پزشکان ایرانی
                طبقه‌بندی شده، تصمیم داره این مشکل بزرگ رو حل کنه. در همین راستا
                به تمام مشاغلی که خارج از ایران فعالیت قانونی خودشون رو به زبـان
                فارسـی هم ارائه می‌کنن؛ این امکان رو میده تا با ایجاد یک پروفایل
                حرفه‌ای، به‌سادگی خدمات و محصولات‌شون رو در دسترس سایر ایرانیان
                دنیا قرار بدن.
              </p>
            </div>
          </div>
        </div>

        <div className="_mod-items sm:col-span-3">
          <div className="_wrap grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-6">
            <div className="_item group flex">
              <Link href={`/${currentCountry.code}/businesses`}>
                <div className="image relative h-min overflow-hidden rounded-xl">
                  <Image
                    src={"/images/modules/mod-business-01.webp"}
                    width={400}
                    height={560}
                    alt="Some Business People"
                    className="hidden h-[240px] cursor-pointer rounded-xl object-cover transition-all duration-500 group-hover:scale-110 sm:block sm:h-auto"
                  />
                  <Image
                    src={"/images/modules/mod-business-01-m.webp"}
                    width={430}
                    height={300}
                    alt="Some Business People"
                    className="h-[240px] cursor-pointer rounded-xl object-cover transition-all duration-500 group-hover:scale-110 sm:hidden sm:h-auto"
                  />
                  <div className="info absolute bottom-0 w-full cursor-pointer rounded-b-md bg-gradient-to-t from-black px-4 py-10 text-center text-[24px] font-medium text-white transition-all duration-500 group-hover:py-12 sm:py-8 sm:text-[20px] sm:group-hover:py-10">
                    {MENU.BUSINESSES}
                  </div>
                </div>
              </Link>
            </div>
            <div className="_item group flex">
              <Link href={`/${currentCountry.code}/doctors`}>
                <div className="image relative h-min overflow-hidden rounded-xl">
                  <Image
                    src={"/images/modules/mod-doctor-01.webp"}
                    width={400}
                    height={560}
                    alt="a doctor"
                    className="hidden h-[240px] cursor-pointer rounded-xl object-cover transition-all duration-500 group-hover:scale-110 sm:block sm:h-auto"
                  />
                  <Image
                    src={"/images/modules/mod-doctor-01-m.webp"}
                    width={430}
                    height={300}
                    alt="a doctor"
                    className="h-[240px] cursor-pointer rounded-xl object-cover transition-all duration-500 group-hover:scale-110 sm:hidden sm:h-auto"
                  />
                  <div className="info absolute bottom-0 w-full cursor-pointer rounded-b-md bg-gradient-to-t from-black px-4 py-10 text-center text-[24px] font-medium text-white transition-all duration-500 group-hover:py-12 sm:py-8 sm:text-[20px] sm:group-hover:py-10">
                    {MENU.DOCTORS}
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
