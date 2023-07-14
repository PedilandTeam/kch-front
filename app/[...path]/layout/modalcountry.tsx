"use client"
import { COUNTRY, GENERAL, MODAL } from "../../../components/allTexts";
import { CircleFlag } from "react-circle-flags";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CountryNamespace } from "@/types/country";
import { useEffect, useRef } from "react";


type ModalCountryProps = {
  countries: CountryNamespace.GET[]
}
export const ModalCountry = ({ countries }: ModalCountryProps) => {

  const buttonRef = useRef<HTMLButtonElement>(null)

  return (
    <dialog id="modal_country" className="modal">
      <form method="dialog" className="modal-box sm:max-w-[50%]">
        <h3 className="mb-5 text-pink-800 font-medium">
          {MODAL.COUNTRY_TITLE}:
        </h3>

        <div className="grid grid-cols-4 gap-5 md:grid-cols-7 md:gap-6 place-content-center mb-4 country-list">
          <button className="group">
            <Link href={"/"} onClick={() => buttonRef.current?.click()}>
              <CircleFlag
                countryCode="un"
                className="grayscale group-hover:grayscale-0 opacity-50 group-hover:opacity-100 group-hover:cursor-pointer transition duration-200"
                title={GENERAL.ALL_COUNTRIES}
              />
              <p className="text-[13px]	center text-center mt-3">{GENERAL.ALL_COUNTRIES}</p>
            </Link>
          </button>
          {
            countries?.map(country => {
              return (
                <button key={`country-modal-country-code${country.id}`} className="group">
                  <Link href={`/${country.code}`} onClick={() => buttonRef.current?.click()} >
                    <CircleFlag
                      countryCode={country.code}
                      className="grayscale group-hover:grayscale-0 opacity-50 group-hover:opacity-100 group-hover:cursor-pointer transition duration-200"
                      title={country.name}
                    />
                    <p className="text-[13px] text-center mt-3 group-hover:font-semibold transition duration-200">{country.name}</p>
                  </Link>
                </button>
              )
            })
          }
        </div>
      </form>
      <form method="dialog" className="modal-backdrop">
        <button ref={buttonRef}>close</button>
      </form>
    </dialog>
  );
};
