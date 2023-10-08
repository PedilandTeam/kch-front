"use client";

import { _TXT } from "../text";

export default () => {
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
        {_TXT.COUNTRY.ALL_VIEW}
      </button>
    </div>
  );
};
