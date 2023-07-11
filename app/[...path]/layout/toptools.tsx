"use client"


import { API_ROUTES } from "@/routes";
import { storeType } from "@/store/store";
import { countryCodeList } from "@/utils/countryCodeList";
import { useParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { CircleFlag } from "react-circle-flags";
import { useSelector } from "react-redux";

export const TopTools = () => {

  const params = useParams()
  const country = useSelector((state: storeType) => state.stateSlice.country)
  const countryCodeFromParams = params?.path?.split("/")?.[0]
  const isMainPage = !params?.path?.split("/")?.[0]
  const isPathHaveCountry = countryCodeList.find(code => code == countryCodeFromParams)

  return (
    <div className="top-tools flex items-center">
      <div
        className="select-country"
        onClick={() => {
          if (document) {
            (
              document.getElementById("modal_country") as HTMLFormElement
            ).showModal();
          }
        }}
      >
        <CircleFlag
          // countryCode={isPathHaveCountry ? params?.path?.split("/")?.[0] : country ? country : "un"}
          countryCode={isMainPage ? "un" : isPathHaveCountry ? countryCodeFromParams : country ? country : "un"}
          className="opacity-75 hover:opacity-100 hover:cursor-pointer transition"
          width={42}
        />
      </div>

      {
        !isMainPage ?
          <div className="menu-icon mr-3">
            <label className="btn btn-circle swap swap-rotate" htmlFor="my-drawer">
              <input type="checkbox" />
              {/* Hamburger icon */}
              <svg
                className="swap-off fill-current"
                xmlns="http://www.w3.org/2000/svg"
                width="34"
                height="34"
                viewBox="0 0 512 512"
              >
                <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
              </svg>
              {/* close icon */}
              <svg
                className="swap-on fill-current"
                xmlns="http://www.w3.org/2000/svg"
                width="34"
                height="34"
                viewBox="0 0 512 512"
              >
                <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
              </svg>
            </label>
          </div>
          : null
      }
    </div>
  );
};
