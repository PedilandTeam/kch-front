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
          <div className="item-top-buttons flex-1 flex justify-end">
            <Button variant="outline" color="gray.600">
              {GENERAL.ALL_IMAGES_VIEW}
            </Button>
            <Button variant="outline" color="gray.600" mr="2">
              <ShareIcon className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
