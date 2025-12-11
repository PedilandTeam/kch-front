"use client";

import { useCountries } from "@/hooks/swr/useCountries";
import Link from "next/link";

import { Card, CardContent, CardHeader } from "@/components/ui";
import FallbackImage from "@/components/ui-custom/FallbackImage";
import { CircleFlag } from "next-circle-flags";
import { Loader } from "../ui-custom/Loader";

const COUNTRIES_FILTERS = { status: 1 };

export const CountriesContent = () => {
  const { countries, loading } = useCountries(COUNTRIES_FILTERS);

  if (loading) return <Loader />;

  return (
    <section className="_countries w-full">
      <div className="grid grid-cols-2 gap-3">
        {countries?.map((country) => (
          <Link href={`/${country.code}`} key={country.code}>
            <Card>
              <CardHeader className="p-0">
                <FallbackImage
                  src={`/images/countries/${country.code}-medium.webp`}
                  alt={country.name}
                  width={200}
                  height={125}
                  className="h-auto w-full rounded-t-lg object-cover"
                />
              </CardHeader>
              <CardContent className="flex items-center gap-2 p-3">
                <CircleFlag
                  countryCode={country.code}
                  width={18}
                  height={18}
                  alt={country.name}
                />
                <h2 className="text-primary font-medium">{country.name}</h2>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
};
