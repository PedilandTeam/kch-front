import { _TXT } from "@/app/text";
import { API_ROUTES } from "@/routes";
import { CountryNamespace } from "@/types/country";
import Image from "next/image";
import Link from "next/link";
import CountryModalBtn from "./countryModalBtn";

async function fetchCountries() {
  let countries: CountryNamespace.GET[];
  try {
    countries = await (await API_ROUTES.COUNTRIES.GET_ALL()).json();
  } catch (e) {
    throw new Error("error in get countries");
  }
  return countries;
}

export const HomeCountries = async () => {

  const countries: CountryNamespace.GET[] = await fetchCountries()

  const getCount = (countryCode: string) => {
    return countries.find(
      (country: CountryNamespace.GET) => country.code == countryCode
    )?.pageCount;
  };

  return (
    <div className="container mx-auto max-w-[1144px] my-12 sm:mt-18 sm:mb-24">
      <div className="mod-home-countries mx-3 sm:mx-0 pt-4" id="select-country">
        <div className="mod-header pr-3 pl-3 sm:pr-4 sm:pl-0 mb-5 sm:mb-7 border-r-[4px] sm:border-r-[5px] border-pink-600">
          <h2 className="text-[20px] sm:text-[22px] font-semibold">
            {_TXT.COUNTRY.POPULAR}
          </h2>
        </div>
        <div className="wrap grid grid-cols-1 sm:grid-cols-3 gap-1">
          <div className="group relative h-min overflow-hidden">
            <Link href={"/at"}>
              <Image
                src="/images/modules/mod-austria-min.jpg"
                width="400"
                height="250"
                alt="یک تصویر از کشور اتریش"
                className="group-hover:scale-110 transition-all duration-500 cursor-pointer h-[220px] sm:h-auto object-cover"
              />
              <div className="info absolute bottom-0 w-full px-5 py-10 group-hover:py-12 sm:py-5 sm:group-hover:py-8 transition-all duration-500 cursor-pointer rounded-b-md bg-gradient-to-t from-black text-white">
                <h3 className="text-[20px] font-semibold">
                  {_TXT.COUNTRY.AUSTRIA}
                  <span className="font-normal mr-1">({getCount("at")})</span>
                </h3>
              </div>
            </Link>
          </div>
          <div className="group relative h-min overflow-hidden">
            <Link href={"/fr"}>
              <Image
                src="/images/modules/mod-france-min.jpg"
                width="400"
                height="250"
                alt="یک تصویر از کشور فرانسه"
                className="group-hover:scale-110 transition-all duration-500 cursor-pointer h-[220px] sm:h-auto object-cover"
              />
              <div className="info absolute bottom-0 w-full px-5 py-10 group-hover:py-12 sm:py-5 sm:group-hover:py-8 transition-all duration-500 cursor-pointer rounded-b-md bg-gradient-to-t from-black text-white">
                <h3 className="text-[20px] font-semibold">
                  {_TXT.COUNTRY.FRANCE}
                  <span className="font-normal mr-1">({getCount("fr")})</span>
                </h3>
              </div>
            </Link>
          </div>
          <div className="group relative h-min overflow-hidden">
            <Link href={"/de"}>
              <Image
                src="/images/modules/mod-germany-min.jpg"
                width="400"
                height="250"
                alt="یک تصویر از کشور آلمان"
                className="group-hover:scale-110 transition-all duration-500 cursor-pointer h-[220px] sm:h-auto object-cover"
              />
              <div className="info absolute bottom-0 w-full px-5 py-10 group-hover:py-12 sm:py-5 sm:group-hover:py-8 transition-all duration-500 cursor-pointer rounded-b-md bg-gradient-to-t from-black text-white">
                <h3 className="text-[20px] font-semibold">
                  {_TXT.COUNTRY.GERMANY}
                  <span className="font-normal mr-1">({getCount("de")})</span>
                </h3>
              </div>
            </Link>
          </div>
          <div className="group relative h-min overflow-hidden">
            <Link href={"/tr"}>
              <Image
                src="/images/modules/mod-turkey-min.jpg"
                width="400"
                height="250"
                alt="یک تصویر از کشور ترکیه"
                className="group-hover:scale-110 transition-all duration-500 cursor-pointer h-[220px] sm:h-auto object-cover"
              />
              <div className="info absolute bottom-0 w-full px-5 py-10 group-hover:py-12 sm:py-5 sm:group-hover:py-8 transition-all duration-500 cursor-pointer rounded-b-md bg-gradient-to-t from-black text-white">
                <h3 className="text-[20px] font-semibold">
                  {_TXT.COUNTRY.TURKEY}
                  <span className="font-normal mr-1">({getCount("tr")})</span>
                </h3>
              </div>
            </Link>
          </div>
          <div className="group relative h-min overflow-hidden">
            <Link href={"/uk"}>
              <Image
                src="/images/modules/mod-england-min.jpg"
                width="400"
                height="250"
                alt="یک تصویر از کشور انگلستان"
                className="group-hover:scale-110 transition-all duration-500 cursor-pointer h-[220px] sm:h-auto object-cover"
              />
              <div className="info absolute bottom-0 w-full px-5 py-10 group-hover:py-12 sm:py-5 sm:group-hover:py-8 transition-all duration-500 cursor-pointer rounded-b-md bg-gradient-to-t from-black text-white">
                <h3 className="text-[20px] font-semibold">
                  {_TXT.COUNTRY.ENGLAND}
                  <span className="font-normal mr-1">({getCount("uk")})</span>
                </h3>
              </div>
            </Link>
          </div>
          <div className="group relative h-min overflow-hidden">
            <Link href={"/dk"}>
              <Image
                src="/images/modules/mod-denmark-min.jpg"
                width="400"
                height="250"
                alt="یک تصویر از کشور دانمارک"
                className="group-hover:scale-110 transition-all duration-500 cursor-pointer h-[220px] sm:h-auto object-cover"
              />
              <div className="info absolute bottom-0 w-full px-5 py-10 group-hover:py-12 sm:py-5 sm:group-hover:py-8 transition-all duration-500 cursor-pointer rounded-b-md bg-gradient-to-t from-black text-white">
                <h3 className="text-[20px] font-semibold">
                  {_TXT.COUNTRY.DENMARK}
                  <span className="font-normal mr-1">({getCount("dk")})</span>
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
