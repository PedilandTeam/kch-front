import { COUNTRY, GENERAL } from "@/components/allTexts";
import { NewButton } from "@/components/ui/button";
import { Button } from "@chakra-ui/react";
import { ShareIcon } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { CircleFlag } from "react-circle-flags";
import Rating from "react-rating";

export const ItemTopInfo = () => {
  return (
    <div className="top-section h-full">
      <div className="container mx-auto max-w-[1144px] h-full">
        <div className="flex h-full items-end pb-10">
          <div className="item-image">
            <Image
              alt="logo"
              src={"/img/list/logo/logo-demo.jpg"}
              width={112}
              height={112}
              className="rounded-full w-full sm:w-40 h-full sm:h-40 mb-4 sm:mb-0 drop-shadow-sm"
            />
          </div>
          <div className="item-details mr-5">
            <h1 className="text-[34px] font-semibold text-slate-700">
              رستوران البرز کلن
            </h1>
            <div className="flex items-center mt-3 card-rating">
              {/* @ts-ignore */}
              <Rating
                initialRating={2}
                direction={"rtl"}
                emptySymbol={<StarIcon className="h-8 w-8 text-gray-300" />}
                fullSymbol={<StarIcon className="h-8 w-8 text-yellow-400" />}
              />
              <span className="mr-2 text-gray-500">(304 نظر)</span>
            </div>
            <div className="item-location flex mb-5 my-3 text-gray-600">
              <CircleFlag
                countryCode="de"
                className="w-5 ml-2"
                title={COUNTRY.GERMANY}
              />
              <span>آلمان</span>
              <span className="ml-1">،</span>
              <span>فرانکفورت</span>
            </div>
          </div>
          <div className="item-top-buttons flex-1 flex justify-end content-end">
            <div className="sc-instagram group inline-flex ml-4">
              <svg
                className="w-6 h-6 text-gray-400 group-hover:text-pink-700 group-hover:cursor-pointer fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </div>
            <div className="sc-facebook group inline-flex ml-4">
              <svg
                className="w-6 h-6 text-gray-400 group-hover:text-blue-500 group-hover:cursor-pointer fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </div>
            <div className="sc-linkedin group inline-flex ml-4">
              <svg
                className="w-6 h-6 text-gray-400 group-hover:text-sky-700 group-hover:cursor-pointer fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
              >
                <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"></path>
              </svg>
            </div>
            <div className="sc-youtube group inline-flex ml-7">
              <svg
                className="w-6 h-6 text-gray-400 group-hover:text-red-600 group-hover:cursor-pointer fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
              </svg>
            </div>
            <div className="sc-share group inline-flex">
              <ShareIcon className="w-5 h-5 text-gray-400 group-hover:text-pink-600 group-hover:cursor-pointer" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
