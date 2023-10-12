"use client";

import { usePages } from "@/hooks/swr/usePages";
import Image from "next/image";
import Link from "next/link";
import { ChangeEvent, useEffect, useState } from "react";
import ItemProfilePicture from "../item/itemProfilePicture";

type CountryPagesSearch = {
  countryCode: string;
};

const PagesSearch = ({ countryCode }: CountryPagesSearch) => {
  const [search, setSearch] = useState<string>();

  const {
    data: pages,
    isLoading,
    error,
  } = usePages(
    1,
    search ? 10 : 5,
    countryCode,
    undefined,
    undefined,
    undefined,
    search ? search : undefined
  );

  let timeoutPointer: NodeJS.Timeout;
  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    clearTimeout(timeoutPointer);
    timeoutPointer = setTimeout(() => {
      setSearch(e.target.value);
    }, 1000);
  };

  return (
    <div className="dropdown mt-4 mb-5 w-full px-4 sm:px-0 sm:w-[600px] mx-auto block">
      <input
        onChange={inputChangeHandler}
        type="text"
        placeholder="اینجا تایپ کن"
        className="input rounded-xl text-center h-[54px] text-[18px] font-medium w-full opacity-80 hover:opacity-100 focus:opacity-100"
      />
      {search && pages && (
        <ul
          tabIndex={0}
          className="w-11/12 sm:w-full mt-1 dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-xl"
        >
          {pages?.meta?.itemCount > 0 ? (
            pages.items?.map((page) => {
              return (
                <li key={page.id}>
                  <Link className="flex justify-start" href={`/${page.slug}`}>
                    <ItemProfilePicture
                      pageData={page}
                      height={30}
                      width={30}
                    />
                    <p>{page.title}</p>
                  </Link>
                </li>
              );
            })
          ) : (
            <li>
              <p className="justify-center">متاسفانه، موردی پیدا نشد.</p>
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

export default PagesSearch;
