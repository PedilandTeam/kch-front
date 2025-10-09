import { API_ROUTES } from "@/routes";
import { COUNTRY } from "@/text/location";
import { Country } from "@/schemas/country";
import Image from "next/image";
import Link from "next/link";

// UI Imports
import atImage from "@/assets/images/modules/mod-austria-min.webp";
import caImage from "@/assets/images/modules/mod-canada-min.webp";
import dkImage from "@/assets/images/modules/mod-denmark-min.webp";
import ukImage from "@/assets/images/modules/mod-england-min.webp";
import frImage from "@/assets/images/modules/mod-france-min.webp";
import deImage from "@/assets/images/modules/mod-germany-min.webp";
import nlImage from "@/assets/images/modules/mod-netherland-min.webp";
import seImage from "@/assets/images/modules/mod-sweden-min.webp";
import trImage from "@/assets/images/modules/mod-turkey-min.webp";

async function fetchCountries() {
  let countries: Country[];
  try {
    countries = await (await API_ROUTES.COUNTRIES.GET_ALL()).json();
  } catch (e) {
    console.log(e);
    throw new Error("error in get countries");
  }
  return countries;
}

export const HomeCountries = async () => {
  const countries: Country[] = await fetchCountries();

  const getCount = (countryCode: string) => {
    return countries.find((country: Country) => country.code == countryCode)
      ?.pageCount;
  };

  return (
    <div className="_home-countries">
      <div className="container">
        <div>
          <div className="border-secondary mb-5 border-r-[4px] pr-3 pl-3">
            <h2 className="text-[20px] font-semibold">{COUNTRY.POPULAR}</h2>
          </div>

          <div className="wrap grid grid-cols-1 gap-2">
            <div className="group relative h-min overflow-hidden rounded-xl">
              <Link href={"/uk"}>
                <Image
                  src={ukImage}
                  placeholder="blur"
                  width="400"
                  height="250"
                  alt="یک تصویر از کشور انگلستان"
                  className="h-[220px] cursor-pointer object-cover transition-all duration-500 group-hover:scale-110"
                  priority
                />
                <div className="info absolute bottom-0 w-full cursor-pointer bg-gradient-to-t from-black px-5 py-8 text-white transition-all duration-500 group-hover:py-10">
                  <h3 className="text-center text-[20px] font-semibold">
                    {COUNTRY.ENGLAND}
                    <span className="mr-1 font-normal">({getCount("uk")})</span>
                  </h3>
                </div>
              </Link>
            </div>
            <div className="group relative h-min overflow-hidden rounded-xl">
              <Link href={"/de"}>
                <Image
                  src={deImage}
                  placeholder="blur"
                  width="400"
                  height="250"
                  alt="یک تصویر از کشور آلمان"
                  className="h-[220px] cursor-pointer object-cover transition-all duration-500 group-hover:scale-110"
                  priority
                />
                <div className="info absolute bottom-0 w-full cursor-pointer bg-gradient-to-t from-black px-5 py-8 text-white transition-all duration-500 group-hover:py-10">
                  <h3 className="text-center text-[20px] font-semibold">
                    {COUNTRY.GERMANY}
                    <span className="mr-1 font-normal">({getCount("de")})</span>
                  </h3>
                </div>
              </Link>
            </div>

            <div className="group relative h-min overflow-hidden rounded-xl">
              <Link href={"/ca"}>
                <Image
                  src={caImage}
                  placeholder="blur"
                  width="400"
                  height="250"
                  alt="یک تصویر از کشور کانادا"
                  className="h-[220px] cursor-pointer object-cover transition-all duration-500 group-hover:scale-110"
                  priority
                />
                <div className="info absolute bottom-0 w-full cursor-pointer bg-gradient-to-t from-black px-5 py-8 text-white transition-all duration-500 group-hover:py-10">
                  <h3 className="text-center text-[20px] font-semibold">
                    {COUNTRY.CANADA}
                    <span className="mr-1 font-normal">({getCount("ca")})</span>
                  </h3>
                </div>
              </Link>
            </div>

            <div className="group relative h-min overflow-hidden rounded-xl">
              <Link href={"/at"}>
                <Image
                  src={atImage}
                  placeholder="blur"
                  width="400"
                  height="250"
                  alt="یک تصویر از کشور اتریش"
                  className="h-[220px] cursor-pointer object-cover transition-all duration-500 group-hover:scale-110"
                  priority
                />
                <div className="info absolute bottom-0 w-full cursor-pointer bg-gradient-to-t from-black px-5 py-8 text-white transition-all duration-500 group-hover:py-10">
                  <h3 className="text-center text-[20px] font-semibold">
                    {COUNTRY.AUSTRIA}
                    <span className="mr-1 font-normal">({getCount("at")})</span>
                  </h3>
                </div>
              </Link>
            </div>

            <div className="group relative h-min overflow-hidden rounded-xl">
              <Link href={"/fr"}>
                <Image
                  src={frImage}
                  placeholder="blur"
                  width="400"
                  height="250"
                  alt="یک تصویر از کشور فرانسه"
                  className="h-[220px] cursor-pointer object-cover transition-all duration-500 group-hover:scale-110"
                  priority
                />
                <div className="info absolute bottom-0 w-full cursor-pointer bg-gradient-to-t from-black px-5 py-8 text-white transition-all duration-500 group-hover:py-10">
                  <h3 className="text-center text-[20px] font-semibold">
                    {COUNTRY.FRANCE}
                    <span className="mr-1 font-normal">({getCount("fr")})</span>
                  </h3>
                </div>
              </Link>
            </div>
            <div className="group relative h-min overflow-hidden rounded-xl">
              <Link href={"/se"}>
                <Image
                  src={seImage}
                  placeholder="blur"
                  width="400"
                  height="250"
                  alt="یک تصویر از کشور سوئد"
                  className="h-[220px] cursor-pointer object-cover transition-all duration-500 group-hover:scale-110"
                  priority
                />
                <div className="info absolute bottom-0 w-full cursor-pointer bg-gradient-to-t from-black px-5 py-8 text-white transition-all duration-500 group-hover:py-10">
                  <h3 className="text-center text-[20px] font-semibold">
                    {COUNTRY.SWEDEN}
                    <span className="mr-1 font-normal">({getCount("se")})</span>
                  </h3>
                </div>
              </Link>
            </div>

            <div className="group relative h-min overflow-hidden rounded-xl">
              <Link href={"/dk"}>
                <Image
                  src={dkImage}
                  placeholder="blur"
                  width="400"
                  height="250"
                  alt="یک تصویر از کشور دانمارک"
                  className="h-[220px] cursor-pointer object-cover transition-all duration-500 group-hover:scale-110"
                  priority
                />
                <div className="info absolute bottom-0 w-full cursor-pointer bg-gradient-to-t from-black px-5 py-8 text-white transition-all duration-500 group-hover:py-10">
                  <h3 className="text-center text-[20px] font-semibold">
                    {COUNTRY.DENMARK}
                    <span className="mr-1 font-normal">({getCount("dk")})</span>
                  </h3>
                </div>
              </Link>
            </div>

            <div className="group relative h-min overflow-hidden rounded-xl">
              <Link href={"/tr"}>
                <Image
                  src={trImage}
                  placeholder="blur"
                  width="400"
                  height="250"
                  alt="یک تصویر از کشور ترکیه"
                  className="h-[220px] cursor-pointer object-cover transition-all duration-500 group-hover:scale-110"
                  priority
                />
                <div className="info absolute bottom-0 w-full cursor-pointer bg-gradient-to-t from-black px-5 py-8 text-white transition-all duration-500 group-hover:py-10">
                  <h3 className="text-center text-[20px] font-semibold">
                    {COUNTRY.TURKEY}
                    <span className="mr-1 font-normal">({getCount("tr")})</span>
                  </h3>
                </div>
              </Link>
            </div>

            <div className="group relative h-min overflow-hidden rounded-xl">
              <Link href={"/nl"}>
                <Image
                  src={nlImage}
                  placeholder="blur"
                  width="400"
                  height="250"
                  alt="یک تصویر از کشور هلند"
                  className="h-[220px] cursor-pointer object-cover transition-all duration-500 group-hover:scale-110"
                  priority
                />
                <div className="info absolute bottom-0 w-full cursor-pointer bg-gradient-to-t from-black px-5 py-8 text-white transition-all duration-500 group-hover:py-10">
                  <h3 className="text-center text-[20px] font-semibold">
                    {COUNTRY.NETHERLAND}
                    <span className="mr-1 font-normal">({getCount("nl")})</span>
                  </h3>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
