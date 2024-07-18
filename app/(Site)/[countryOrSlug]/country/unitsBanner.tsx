import { MENU } from "@/app/text/menu";
import { CountryNamespace } from "@/types/country";
import Image from "next/image";
import Link from "next/link";
import PagesSearch from "./pages.search";

type UnitsBannerProps = {
  currentCountry: CountryNamespace.GET;
};
export const UnitsBanner = ({ currentCountry }: UnitsBannerProps) => {
  return (
    <div className="_unit-banner">
      <div className="container mx-auto max-w-[1144px] px-3 sm:px-0">
        <div
          className="_wrap grid gap-6 my-9 sm:grid-cols-7 sm:gap-10 sm:my-20"
          id="select-unit"
        >
          <div className="_mod-header flex flex-wrap items-center sm:col-span-4">
            <div className="border-r-[4px] sm:border-r-[5px] border-secondary pr-3 sm:pr-5 pl-3 sm:pl-0">
              <h2 className="text-[20px] sm:text-[24px] font-bold mb-1">
                راهنمای مشاغل کـوچـا
              </h2>
              <p className="mb-4 text-[17px] text-slate-600 font-medium">
                ابزاری ساده و موثر برای جستجوی مشاغل فارسی
              </p>
              <PagesSearch countryCode={currentCountry.code} />

              <div className="mb-2 font-medium leading-7 text-gray-500 sm:text-justify sm:pl-5">
                <p className="mb-2">
                  ااگر خارج از ایران زندگی می‌کنید و به دنبال یافتن خدماتی به
                  زبان فارسی هستید، احتمالاً با چالش نبود اطلاعات یکپارچه و قابل
                  اعتماد مواجه شده‌اید.
                </p>
                <p className="mb-2">
                  راهنمای مشاغل کـوچـا که در دو دسته مشاغل و پزشکان فـارسـی
                  زبـان طبقه‌بندی شده، تصمیم داره این مشکل بزرگ رو حل کنه. در
                  همین راستا به تمام مشاغلی که خارج از ایران فعالیت قانونی
                  خودشون رو به زبـان فارسـی هم ارائه می‌کنن؛ این امکان رو میده
                  تا با ایجاد یک پروفایل حرفه‌ای، به‌سادگی خدمات و محصولات‌شون
                  رو در دسترس سایر فارسی‌زبانان دنیا قرار بدن.
                </p>
              </div>
            </div>
          </div>

          <div className="_mod-items sm:col-span-3">
            <div className="_wrap grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-6 ">
              <div className="_item flex group">
                <Link href={`/${currentCountry.code}/businesses`}>
                  <div className="relative overflow-hidden image h-min rounded-xl">
                    <Image
                      src={"/images/modules/mod-business-01.webp"}
                      width={400}
                      height={560}
                      alt="Some Business People"
                      className="rounded-xl group-hover:scale-110 transition-all duration-500 cursor-pointer h-[240px] sm:h-[360px] object-cover hidden sm:block"
                    />
                    <Image
                      src={"/images/modules/mod-business-01-m.webp"}
                      width={430}
                      height={300}
                      alt="Some Business People"
                      className="rounded-xl group-hover:scale-110 transition-all duration-500 cursor-pointer h-[240px] sm:h-auto object-cover sm:hidden"
                    />
                    <div className="info absolute bottom-0 w-full px-4 py-10 group-hover:py-12 sm:py-8 sm:group-hover:py-10 transition-all duration-500 cursor-pointer rounded-b-md text-center text-[24px] sm:text-[20px] bg-gradient-to-t from-black text-white font-medium">
                      {MENU.BUSINESSES}
                    </div>
                  </div>
                </Link>
              </div>
              <div className="_item flex group">
                <Link href={`/${currentCountry.code}/doctors`}>
                  <div className="relative overflow-hidden image h-min rounded-xl">
                    <Image
                      src={"/images/modules/mod-doctor-01.webp"}
                      width={400}
                      height={560}
                      alt="a doctor"
                      className="rounded-xl group-hover:scale-110 transition-all duration-500 cursor-pointer h-[240px] sm:h-[360px] object-cover hidden sm:block"
                    />
                    <Image
                      src={"/images/modules/mod-doctor-01-m.webp"}
                      width={430}
                      height={300}
                      alt="a doctor"
                      className="rounded-xl group-hover:scale-110 transition-all duration-500 cursor-pointer h-[240px] sm:h-auto object-cover sm:hidden"
                    />
                    <div className="info absolute bottom-0 w-full px-4 py-10 group-hover:py-12 sm:py-8 sm:group-hover:py-10 transition-all duration-500 cursor-pointer rounded-b-md text-center text-[24px] sm:text-[20px] bg-gradient-to-t from-black text-white font-medium">
                      {MENU.DOCTORS}
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
