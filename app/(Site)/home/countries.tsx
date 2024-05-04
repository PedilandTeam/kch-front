import { API_ROUTES } from "@/routes";
import { CountryNamespace } from "@/types/country";
import Image from "next/image";
import Link from "next/link";
import CountryModalBtn from "./countryModalBtn";
import atImage from "@/public/images/modules/mod-austria-min.webp";
import frImage from "@/public/images/modules/mod-france-min.webp";
import deImage from "@/public/images/modules/mod-germany-min.webp";
import trImage from "@/public/images/modules/mod-turkey-min.webp";
import ukImage from "@/public/images/modules/mod-england-min.webp";
import dkImage from "@/public/images/modules/mod-denmark-min.webp";
import seImage from "@/public/images/modules/mod-sweden-min.webp";
import caImage from "@/public/images/modules/mod-canada-min.webp";
import nlImage from "@/public/images/modules/mod-netherland-min.webp";
import { COUNTRY } from "@/app/text/location";

async function fetchCountries() {
  let countries: CountryNamespace.GET[];
  try {
    countries = await (await API_ROUTES.COUNTRIES.GET_ALL()).json();
  } catch (e) {
    console.log(e);
    throw new Error("error in get countries");
  }
  return countries;
}

export const HomeCountries = async () => {
  const countries: CountryNamespace.GET[] = await fetchCountries();

  const getCount = (countryCode: string) => {
    return countries.find(
      (country: CountryNamespace.GET) => country.code == countryCode
    )?.pageCount;
  };

  return (
    <div className="container mx-auto max-w-[1144px] my-10 sm:mt-18 sm:mb-20">
      <div className="pt-4 mx-3 mod-home-countries sm:mx-0" id="select-country">
        <div className="mod-header pr-3 pl-3 sm:pr-4 sm:pl-0 mb-5 sm:mb-7 border-r-[4px] sm:border-r-[5px] border-secondary">
          <h2 className="text-[20px] sm:text-[22px] font-semibold">
            {COUNTRY.POPULAR}
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-2 wrap sm:grid-cols-3 sm:gap-3">
          <div className="relative overflow-hidden group h-min rounded-xl">
            <Link href={"/uk"}>
              <Image
                src={ukImage}
                placeholder="blur"
                width="400"
                height="250"
                alt="یک تصویر از کشور انگلستان"
                className="group-hover:scale-110 transition-all duration-500 cursor-pointer h-[220px] sm:h-auto object-cover"
                priority
              />
              <div className="absolute bottom-0 w-full px-5 py-8 text-white transition-all duration-500 cursor-pointer info group-hover:py-10 sm:py-5 sm:group-hover:py-8 bg-gradient-to-t from-black">
                <h3 className="text-[20px] font-semibold text-center">
                  {COUNTRY.ENGLAND}
                  <span className="mr-1 font-normal">({getCount("uk")})</span>
                </h3>
              </div>
            </Link>
          </div>
          <div className="relative overflow-hidden group h-min rounded-xl">
            <Link href={"/de"}>
              <Image
                src={deImage}
                placeholder="blur"
                width="400"
                height="250"
                alt="یک تصویر از کشور آلمان"
                className="group-hover:scale-110 transition-all duration-500 cursor-pointer h-[220px] sm:h-auto object-cover"
                priority
              />
              <div className="absolute bottom-0 w-full px-5 py-8 text-white transition-all duration-500 cursor-pointer info group-hover:py-10 sm:py-5 sm:group-hover:py-8 bg-gradient-to-t from-black">
                <h3 className="text-[20px] font-semibold text-center">
                  {COUNTRY.GERMANY}
                  <span className="mr-1 font-normal">({getCount("de")})</span>
                </h3>
              </div>
            </Link>
          </div>

          <div className="relative overflow-hidden group h-min rounded-xl">
            <Link href={"/ca"}>
              <Image
                src={caImage}
                placeholder="blur"
                width="400"
                height="250"
                alt="یک تصویر از کشور کانادا"
                className="group-hover:scale-110 transition-all duration-500 cursor-pointer h-[220px] sm:h-auto object-cover"
                priority
              />
              <div className="absolute bottom-0 w-full px-5 py-8 text-white transition-all duration-500 cursor-pointer info group-hover:py-10 sm:py-5 sm:group-hover:py-8 bg-gradient-to-t from-black">
                <h3 className="text-[20px] font-semibold text-center">
                  {COUNTRY.CANADA}
                  <span className="mr-1 font-normal">({getCount("ca")})</span>
                </h3>
              </div>
            </Link>
          </div>

          <div className="relative overflow-hidden group h-min rounded-xl">
            <Link href={"/at"}>
              <Image
                src={atImage}
                placeholder="blur"
                width="400"
                height="250"
                alt="یک تصویر از کشور اتریش"
                className="group-hover:scale-110 transition-all duration-500 cursor-pointer h-[220px] sm:h-auto object-cover"
                priority
              />
              <div className="absolute bottom-0 w-full px-5 py-8 text-white transition-all duration-500 cursor-pointer info group-hover:py-10 sm:py-5 sm:group-hover:py-8 bg-gradient-to-t from-black">
                <h3 className="text-[20px] font-semibold text-center">
                  {COUNTRY.AUSTRIA}
                  <span className="mr-1 font-normal">({getCount("at")})</span>
                </h3>
              </div>
            </Link>
          </div>

          <div className="relative overflow-hidden group h-min rounded-xl">
            <Link href={"/fr"}>
              <Image
                src={frImage}
                placeholder="blur"
                width="400"
                height="250"
                alt="یک تصویر از کشور فرانسه"
                className="group-hover:scale-110 transition-all duration-500 cursor-pointer h-[220px] sm:h-auto object-cover"
                priority
              />
              <div className="absolute bottom-0 w-full px-5 py-8 text-white transition-all duration-500 cursor-pointer info group-hover:py-10 sm:py-5 sm:group-hover:py-8 bg-gradient-to-t from-black">
                <h3 className="text-[20px] font-semibold text-center">
                  {COUNTRY.FRANCE}
                  <span className="mr-1 font-normal">({getCount("fr")})</span>
                </h3>
              </div>
            </Link>
          </div>
          <div className="relative overflow-hidden group h-min rounded-xl">
            <Link href={"/se"}>
              <Image
                src={seImage}
                placeholder="blur"
                width="400"
                height="250"
                alt="یک تصویر از کشور سوئد"
                className="group-hover:scale-110 transition-all duration-500 cursor-pointer h-[220px] sm:h-auto object-cover"
                priority
              />
              <div className="absolute bottom-0 w-full px-5 py-8 text-white transition-all duration-500 cursor-pointer info group-hover:py-10 sm:py-5 sm:group-hover:py-8 bg-gradient-to-t from-black">
                <h3 className="text-[20px] font-semibold text-center">
                  {COUNTRY.SWEDEN}
                  <span className="mr-1 font-normal">({getCount("se")})</span>
                </h3>
              </div>
            </Link>
          </div>

          <div className="relative overflow-hidden group h-min rounded-xl">
            <Link href={"/dk"}>
              <Image
                src={dkImage}
                placeholder="blur"
                width="400"
                height="250"
                alt="یک تصویر از کشور دانمارک"
                className="group-hover:scale-110 transition-all duration-500 cursor-pointer h-[220px] sm:h-auto object-cover"
                priority
              />
              <div className="absolute bottom-0 w-full px-5 py-8 text-white transition-all duration-500 cursor-pointer info group-hover:py-10 sm:py-5 sm:group-hover:py-8 bg-gradient-to-t from-black">
                <h3 className="text-[20px] font-semibold text-center">
                  {COUNTRY.DENMARK}
                  <span className="mr-1 font-normal">({getCount("dk")})</span>
                </h3>
              </div>
            </Link>
          </div>

          <div className="relative overflow-hidden group h-min rounded-xl">
            <Link href={"/tr"}>
              <Image
                src={trImage}
                placeholder="blur"
                width="400"
                height="250"
                alt="یک تصویر از کشور ترکیه"
                className="group-hover:scale-110 transition-all duration-500 cursor-pointer h-[220px] sm:h-auto object-cover"
                priority
              />
              <div className="absolute bottom-0 w-full px-5 py-8 text-white transition-all duration-500 cursor-pointer info group-hover:py-10 sm:py-5 sm:group-hover:py-8 bg-gradient-to-t from-black">
                <h3 className="text-[20px] font-semibold text-center">
                  {COUNTRY.TURKEY}
                  <span className="mr-1 font-normal">({getCount("tr")})</span>
                </h3>
              </div>
            </Link>
          </div>

          <div className="relative overflow-hidden group h-min rounded-xl">
            <Link href={"/nl"}>
              <Image
                src={nlImage}
                placeholder="blur"
                width="400"
                height="250"
                alt="یک تصویر از کشور هلند"
                className="group-hover:scale-110 transition-all duration-500 cursor-pointer h-[220px] sm:h-auto object-cover"
                priority
              />
              <div className="absolute bottom-0 w-full px-5 py-8 text-white transition-all duration-500 cursor-pointer info group-hover:py-10 sm:py-5 sm:group-hover:py-8 bg-gradient-to-t from-black">
                <h3 className="text-[20px] font-semibold text-center">
                  {COUNTRY.NETHERLAND}
                  <span className="mr-1 font-normal">({getCount("nl")})</span>
                </h3>
              </div>
            </Link>
          </div>
        </div>
        <CountryModalBtn />
      </div>
    </div>
  );
};
