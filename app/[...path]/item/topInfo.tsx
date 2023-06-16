import { COUNTRY } from "@/components/allTexts";
import { StarIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { CircleFlag } from "react-circle-flags";
import Rating from "react-rating";

export const ItemTopInfo = () => {
  return (
    <div className="top-section">
      <div className="container mx-auto px-16">
        <div className="item-header flex flex-col sm:flex-row p-4 sm:p-5 rounded-md">
          <div className="item-image">
            <Image
              alt="logo"
              src={"/img/list/logo/logo-demo.jpg"}
              width={112}
              height={112}
              className="rounded-full sm:rounded-md w-full sm:w-40 h-full sm:h-40 mb-4 sm:mb-0"
            />
          </div>
          <div className="item-details mr-4">
            <h1 className="text-2xl mt-2 text-slate-600 font-semibold">
              رستوران البرز کلن
            </h1>
            <div className="flex items-center mt-3 card-rating">
              {/* @ts-ignore */}
              <Rating
                initialRating={2}
                direction={"rtl"}
                emptySymbol={<StarIcon className="h-6 w-6 text-gray-300" />}
                fullSymbol={<StarIcon className="h-6 w-6 text-yellow-400" />}
              />
              <span className="mr-2 text-sm text-gray-500">(304 نظر)</span>
            </div>
            <div className="item-location flex my-3 text-gray-600 text-sm">
              <CircleFlag
                countryCode="de"
                className="w-5 ml-2"
                title={COUNTRY.GERMANY}
              />
              <span>آلمان</span>، <span>فرانکفورت</span>
            </div>
            <div className="item-address text-gray-600 text-sm font-PinarLT">
              <span>Rathenauerplatz 1</span>, <span>Cologne</span>,{" "}
              <span>50674 </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
