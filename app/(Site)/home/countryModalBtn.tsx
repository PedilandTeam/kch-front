"use client";

import { COUNTRY } from "@/app/text/location";
import { FC } from "react";

const CountryModalBtn: FC = () => {
  return (
    <div className="mt-12 text-center">
      <button
        className="btn btn-secondary"
        onClick={() => {
          if (document) {
            (
              document.getElementById("modal_country") as HTMLFormElement
            ).showModal();
          }
        }}
      >
        {COUNTRY.ALL_VIEW}
      </button>
    </div>
  );
};

export default CountryModalBtn