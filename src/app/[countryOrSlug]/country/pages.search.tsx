"use client";

import { usePages } from "@/hooks/usePages";
import Image from "next/image";
import Link from "next/link";
import { ChangeEvent, useEffect, useState } from "react";
import ItemProfilePicture from "../../../components/directory/ItemAvatar";

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
    <div className="dropdown mt-4 mb-5 w-full  sm:pl-5 xl:pl-0  mx-auto block">
      <input
        onChange={inputChangeHandler}
        type="text"
        placeholder="برای جستجو مشاغل اینجا تایپ کن"
        className="input bg-gray-100 rounded-xl text-center h-[54px] text-[18px] font-medium w-full opacity-80 hover:opacity-100 focus:opacity-100"
      />
      {search && pages && (
        <ul
          tabIndex={0}
          className="w-11/12 sm:w-full dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-xl"
        >
          {pages?.meta?.itemCount > 0 ? (
            pages.items?.map((page) => {
              return (
                <li
                  key={page.id}
                  className="border-b border-dashed last:border-none text-[15px]"
                >
                  <Link
                    className="flex justify-start px-0 rounded-none sm:px-2 hover:bg-blue-50"
                    href={`/${page.slug}`}
                  >
                    <ItemProfilePicture
                      pageData={page}
                      height={30}
                      width={30}
                      className="rounded-full"
                    />
                    <p>{page.title} {page.subtitle && <span className="text-gray-500">- {page.subtitle}</span>}</p>
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
