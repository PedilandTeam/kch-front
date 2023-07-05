import { COUNTRY, MODAL } from "../../../components/allTexts";
import { CircleFlag } from "react-circle-flags";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const ModalCountry = () => {
  const router = useRouter();

  return (
    <dialog id="modal_country" className="modal">
      <form method="dialog" className="modal-box">
        <h3 className="mb-5 text-pink-800 font-medium">
          {MODAL.COUNTRY_TITLE}:
        </h3>

        <div className="grid grid-cols-4 gap-5 md:grid-cols-6 md:gap-5 place-content-center mb-4 country-list">
          <button onClick={() => router.push("/")}>
            <CircleFlag
              countryCode="un"
              className="grayscale hover:grayscale-0 opacity-50 hover:opacity-100 hover:cursor-pointer transition duration-200"
              title={COUNTRY.ALL_COUNTRIES}
            />
            <p className="text-[13px]	center text-center mt-3">{COUNTRY.ALL}</p>
          </button>
          <button onClick={() => router.push("/de")}>
            <CircleFlag
              countryCode="de"
              className="grayscale hover:grayscale-0 opacity-50 hover:opacity-100 hover:cursor-pointer transition duration-200"
              title={COUNTRY.GERMANY}
            />
            <p className="text-[13px]	center text-center mt-3">
              {COUNTRY.GERMANY}
            </p>
          </button>
          <button onClick={() => router.push("/gb")}>
            <CircleFlag
              countryCode="gb-eng"
              className="grayscale hover:grayscale-0 opacity-50 hover:opacity-100 hover:cursor-pointer transition duration-200"
              title={COUNTRY.ENGLAND}
            />
            <p className="text-[13px]	center text-center mt-3">
              {COUNTRY.ENGLAND}
            </p>
          </button>
        </div>
      </form>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};
