"use client";
import { COUNTRY } from "@/text/location";

import Link from "next/link";
import { useCountries } from "@/hooks/swr/useCountries";

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
import {
  Button,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui";
import { MapTrifoldIcon } from "@phosphor-icons/react/dist/ssr";

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

const COUNTRIES_FILTERS = { status: 1 };

export const HomeCountries = () => {
  const { countries } = useCountries(COUNTRIES_FILTERS);
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
      <WrapContainer className="space-y-6">
        <h2 className="flex items-center justify-center gap-1.5 text-center font-semibold">
          <MapTrifoldIcon weight="duotone" size={24} />
          کشور محل اقامت خود را انتخاب کنید:
        </h2>

        <Carousel
          opts={{
            direction: "rtl",
            loop: true,
            align: "center",
          }}
        >
          <CarouselContent className="-ml-3">
            {mergedCountries.map((country) => (
              <CarouselItem className="basis-1/3 pl-3" key={country.code}>
                <Link href={country.href}>
                  <div
                    className="aspect-square h-auto w-full rounded-xl bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url(${country.image.src})` }}
                  >
                    <div className="flex h-full flex-col items-center justify-center gap-1.5 rounded-xl bg-black/20 text-white">
                      <h3 className="text-lg leading-none font-medium drop-shadow-lg drop-shadow-black">
                        {country.name}
                      </h3>
                      {/* {countries && (
                        <span className="leading-none font-normal">
                          {e2p(country.pageCount)}
                        </span>
                      )} */}
                    </div>
                  </div>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="text-primary bottom-0 -left-4 -translate-y-1/2 border-0 bg-white p-0! [&_svg]:size-6" />
          <CarouselNext className="text-primary -right-4 bottom-0 -translate-y-1/2 border-0 bg-white p-0! [&_svg]:size-6" />
        </Carousel>

        <Button className="w-full" asChild>
          <Link href="/countries">لیست تمام کشورها</Link>
        </Button>
      </WrapContainer>
    </div>
  );
};
