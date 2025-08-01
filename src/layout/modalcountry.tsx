"use client";
import { _TXT } from "@/text";
import { CircleFlag } from "next-circle-flags";
import Link from "next/link";
import { CountryNamespace } from "@/types/country";
import { useRef } from "react";

type ModalCountryProps = {
  countries: CountryNamespace.GET[];
};
export const ModalCountry = ({ countries }: ModalCountryProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <dialog id="modal_country" className="modal">
      <form method="dialog" className="modal-box sm:max-w-[50%] md:p-8">
        <h3 className="mb-6 font-medium">{_TXT.MODAL.COUNTRY_TITLE}</h3>
        <div className="country-list grid grid-cols-3 place-content-center gap-5 md:grid-cols-7 md:gap-5">
          {countries?.map((country) => {
            return (
              <button
                key={`country-modal-country-code${country.id}`}
                className="group"
              >
                <Link
                  href={`/${country.code}`}
                  onClick={() => buttonRef.current?.click()}
                >
                  <CircleFlag
                    width={80}
                    height={80}
                    countryCode={country.code}
                    className="mx-auto h-[54px] w-[54px] opacity-40 transition duration-200 group-hover:cursor-pointer group-hover:opacity-100 2xl:h-[74px] 2xl:w-[74px]"
                    alt={country.name}
                    title={country.name}
                  />
                  <p className="mt-3 text-center text-[15px] transition duration-200 group-hover:font-semibold">
                    {country.name}
                  </p>
                </Link>
              </button>
            );
          })}
        </div>
      </form>
      <form method="dialog" className="modal-backdrop">
        <button ref={buttonRef}>close</button>
      </form>
    </dialog>
  );
};
