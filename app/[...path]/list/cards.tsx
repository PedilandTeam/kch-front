import { Card, CardBody } from "@chakra-ui/react";

import { StarIcon } from "@heroicons/react/24/solid";
import { CircleFlag } from "react-circle-flags";
import Rating from "react-rating";
import Image from "next/image";
import Link from "next/link";
import { CATEGORY, COUNTRY } from "../../../components/allTexts";
import { BookOpenIcon } from "@heroicons/react/24/solid";
import { OpenHours } from "../../../components/elements/openhours";

export const ListCards = () => {
  return (
    <>
      <Card overflow="hidden" variant={"outline"} className="border-gray-200">
        <div className="flex">
          <Link href="/de/item">
            <Image
              alt="لیست"
              src={"/img/list/list-demo.webp"}
              width={110}
              height={110}
              className="rounded-full m-3 ml-0 w-[110px] h-[110px]"
            />
          </Link>
          <CardBody padding={3}>
            <div className="flex card-header items-center">
              <OpenHours />
              <Link href="/de/item" className="mr-2">
                <h2 className="text-[20px] font-semibold">رستوران البرز کلن</h2>
              </Link>
            </div>

            <div className="flex mt-3 mb-2 card-rating">
              {/* @ts-ignore */}
              <Rating
                initialRating={2}
                emptySymbol={<StarIcon className="h-6 w-6 text-gray-300" />}
                fullSymbol={<StarIcon className="h-6 w-6 text-yellow-400" />}
              />
              <span className="flex flex-wrap content-center mr-2 text-sm text-gray-500">
                (304 نظر)
              </span>
            </div>

            <div className="flex w-full card-tools text-sm text-gray-700">
              <div className="flex ml-5">
                <CircleFlag
                  countryCode="de"
                  className="w-4 ml-1"
                  title={COUNTRY.GERMANY}
                />
                کلن
              </div>
              <div className="flex justify-center content-center">
                <BookOpenIcon className="w-4 ml-1 text-gray-400" />
                <span>{CATEGORY.RESTAURANT}</span>
              </div>
            </div>
          </CardBody>
        </div>
        {/* <div>
          <BadgeNew variant={"new"} />
          <BadgeNew variant={"featured"} />
        </div> */}
      </Card>
      <Card overflow="hidden" variant={"outline"} className="border-gray-200">
        <div className="flex">
          <Link href="/de/item">
            <Image
              alt="لیست"
              src={"/img/list/list-demo.webp"}
              width={110}
              height={110}
              className="rounded-full m-3 ml-0 w-[110px] h-[110px]"
            />
          </Link>
          <CardBody padding={3}>
            <div className="flex card-header items-center">
              <OpenHours />
              <Link href="/de/item" className="mr-2">
                <h2 className="text-[20px] font-semibold">رستوران البرز کلن</h2>
              </Link>
            </div>

            <div className="flex mt-3 mb-2 card-rating">
              {/* @ts-ignore */}
              <Rating
                initialRating={2}
                emptySymbol={<StarIcon className="h-6 w-6 text-gray-300" />}
                fullSymbol={<StarIcon className="h-6 w-6 text-yellow-400" />}
              />
              <span className="flex flex-wrap content-center mr-2 text-sm text-gray-500">
                (304 نظر)
              </span>
            </div>

            <div className="flex w-full card-tools text-sm text-gray-700">
              <div className="flex ml-5">
                <CircleFlag
                  countryCode="de"
                  className="w-4 ml-1"
                  title={COUNTRY.GERMANY}
                />
                کلن
              </div>
              <div className="flex justify-center content-center">
                <BookOpenIcon className="w-4 ml-1 text-gray-400" />
                <span>{CATEGORY.RESTAURANT}</span>
              </div>
            </div>
          </CardBody>
        </div>
        {/* <div>
          <BadgeNew variant={"new"} />
          <BadgeNew variant={"featured"} />
        </div> */}
      </Card>
      <Card overflow="hidden" variant={"outline"} className="border-gray-200">
        <div className="flex">
          <Link href="/de/item">
            <Image
              alt="لیست"
              src={"/img/list/list-demo.webp"}
              width={110}
              height={110}
              className="rounded-full m-3 ml-0 w-[110px] h-[110px]"
            />
          </Link>
          <CardBody padding={3}>
            <div className="flex card-header items-center">
              <OpenHours />
              <Link href="/de/item" className="mr-2">
                <h2 className="text-[20px] font-semibold">رستوران البرز کلن</h2>
              </Link>
            </div>

            <div className="flex mt-3 mb-2 card-rating">
              {/* @ts-ignore */}
              <Rating
                initialRating={2}
                emptySymbol={<StarIcon className="h-6 w-6 text-gray-300" />}
                fullSymbol={<StarIcon className="h-6 w-6 text-yellow-400" />}
              />
              <span className="flex flex-wrap content-center mr-2 text-sm text-gray-500">
                (304 نظر)
              </span>
            </div>

            <div className="flex w-full card-tools text-sm text-gray-700">
              <div className="flex ml-5">
                <CircleFlag
                  countryCode="de"
                  className="w-4 ml-1"
                  title={COUNTRY.GERMANY}
                />
                کلن
              </div>
              <div className="flex justify-center content-center">
                <BookOpenIcon className="w-4 ml-1 text-gray-400" />
                <span>{CATEGORY.RESTAURANT}</span>
              </div>
            </div>
          </CardBody>
        </div>
        {/* <div>
          <BadgeNew variant={"new"} />
          <BadgeNew variant={"featured"} />
        </div> */}
      </Card>
    </>
  );
};
