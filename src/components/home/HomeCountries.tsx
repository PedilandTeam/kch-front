"use client";
import { COUNTRY } from "@/text/location";
import Image from "next/image";
import Link from "next/link";
import { useCountries } from "@/hooks/swr/useCountries";
import { e2p } from "@/utils/e2p";

import atImage from "@/assets/images/bd/hp-austria.webp";
import caImage from "@/assets/images/bd/hp-canada.webp";
import dkImage from "@/assets/images/bd/hp-denmark.webp";
import ukImage from "@/assets/images/bd/hp-england.webp";
import frImage from "@/assets/images/bd/hp-france.webp";
import deImage from "@/assets/images/bd/hp-germany.webp";
import nlImage from "@/assets/images/bd/hp-netherland.webp";
import seImage from "@/assets/images/bd/hp-sweden.webp";
import trImage from "@/assets/images/bd/hp-turkey.webp";
import { WrapContainer } from "../layout/WrapContainer";

const FEATURED_COUNTRIES = [
  {
    code: "uk",
    name: COUNTRY.ENGLAND,
    image: ukImage,
  },
  {
    code: "de",
    name: COUNTRY.GERMANY,
    image: deImage,
  },
  {
    code: "ca",
    name: COUNTRY.CANADA,
    image: caImage,
  },
  {
    code: "at",
    name: COUNTRY.AUSTRIA,
    image: atImage,
  },
  {
    code: "fr",
    name: COUNTRY.FRANCE,
    image: frImage,
  },
  {
    code: "se",
    name: COUNTRY.SWEDEN,
    image: seImage,
  },
  {
    code: "dk",
    name: COUNTRY.DENMARK,
    image: dkImage,
  },
  {
    code: "tr",
    name: COUNTRY.TURKEY,
    image: trImage,
  },
  {
    code: "nl",
    name: COUNTRY.NETHERLAND,
    image: nlImage,
  },
];

export const HomeCountries = () => {
  const { countries } = useCountries({ status: 1 });
  const mergedCountries = FEATURED_COUNTRIES.map((item) => {
    const apiCountry = countries?.find((c) => c.code === item.code);

    return {
      ...item,
      pageCount: apiCountry ? Number(apiCountry.pageCount) : 0,
      alt: `تصویری از کشور ${apiCountry?.name}`,
      href: `/${item.code}`,
    };
  });

  return (
    <div className="_home-countries">
      <WrapContainer className="space-y-4">
        <h2 className="text-primary text-center font-semibold">
          کشور محل اقامت خودتون رو انتخاب کنید:
        </h2>

        <div className="wrap grid grid-cols-1 gap-3">
          {mergedCountries.map((country) => (
            <Link key={country.code} href={country.href} className="relative">
              <div>
                <Image
                  src={country.image}
                  alt={country.alt}
                  width={400}
                  height={250}
                  className="rounded-xl"
                  priority
                />
              </div>

              <div className="absolute bottom-0 w-full cursor-pointer rounded-xl bg-linear-to-t from-black px-5 py-10 text-white transition-all duration-500">
                <h3 className="text-center text-xl font-semibold">
                  {country.name}
                  {countries && (
                    <span className="mr-1 font-normal">
                      ({e2p(country.pageCount)})
                    </span>
                  )}
                </h3>
              </div>
            </Link>
          ))}
        </div>

        <p className="text-muted-foreground text-center text-sm">
          جهت مشاهده لیست تمام کشورها از منو استفاده کنید.
        </p>
      </WrapContainer>
    </div>
  );
};
