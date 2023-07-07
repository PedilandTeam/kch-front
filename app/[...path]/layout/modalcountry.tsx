import { COUNTRY, MODAL } from "../../../components/allTexts";
import { CircleFlag } from "react-circle-flags";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CountryNamespace } from "@/types/country";


type ModalCountryProps = {
  countries: CountryNamespace.GET[]
}
export const ModalCountry = ({countries}: ModalCountryProps) => {
  
  return (
    <dialog id="modal_country" className="modal">
      <form method="dialog" className="modal-box">
        <h3 className="mb-5 text-pink-800 font-medium">
          {MODAL.COUNTRY_TITLE}:
        </h3>

        <div className="grid grid-cols-4 gap-5 md:grid-cols-6 md:gap-5 place-content-center mb-4 country-list">
          <button>
            <Link href={"/"}>
              <CircleFlag
                countryCode="un"
                className="grayscale hover:grayscale-0 opacity-50 hover:opacity-100 hover:cursor-pointer transition duration-200"
                title={COUNTRY.ALL_COUNTRIES}
              />
              <p className="text-[13px]	center text-center mt-3">{COUNTRY.ALL_COUNTRIES}</p>
            </Link>
          </button>
          {
            countries?.map(country => {
              return (
                <button key={country.id}>
                <Link href={`/${country.code}`}>
                  <CircleFlag
                    countryCode={country.code}
                    className="grayscale hover:grayscale-0 opacity-50 hover:opacity-100 hover:cursor-pointer transition duration-200"
                    title={country.name}
                  />
                  <p className="text-[13px]	center text-center mt-3">{country.name}</p>
                </Link>
              </button>
              )
            })
          }
        </div>
      </form>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};
