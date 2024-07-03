import React from "react";
import {
  ArrowFatDown,
  ArrowFatUp,
  ChatCircleDots,
  Tag,
} from "@phosphor-icons/react";

import { User, Button } from "@nextui-org/react";
import Link from "next/link";

const userName: string = "سینا پیرانی";
const timeOfQuestion: string = "22 دقیقه پیش";
const UserQuestion: string = " آیا وبفلو مناسب برای ساخت وبسایت است؟";
const questionDescription: string =
  "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده ";
const topic = "مهاجرت";
const countOfAnswer: string = "3 پاسخ";
const userBio: string = "ساکن المان از سال 2014";
const countOfUpvote: string = "10";
export default function QuestionBox({ params }: { params: { slug: string } }) {
  return (
    <div className="QuestionCard w-full max-w-[72rem] p-4 bg-white flex flex-col items-center ">
      {/* Question Card */}
      <div className="w-full  bg-[#F6F7FF] rounded-xl p-4 ">
        <div className="qCard-header flex h-[4rem]   border-b-2 border-dotted border-gray-300   justify-between items-center ">
          {/* Avatar and Name */}
          <div className="flex flex-col items-center bg--400">
            <div className="flex items-center bg--900 ">
              <User
                avatarProps={{
                  size: "md",
                  src: "",
                }}
              />
              <div className="flex flex-col">
                <h2 className="ml-2 font-bold">{userName} </h2>
                <span className="flex text-sm ">{userBio}</span>
              </div>
            </div>
          </div>
          {/* Date */}
          <span className="text-sm text-gray-500">{timeOfQuestion}</span>
        </div>
        {/* Question and Description */}
        <div className="mt-3 mb-2">
          <h2 className="text-lg font-bold">{UserQuestion}</h2>
          <p className="mt-1 text-sm text-gray-700">{questionDescription}</p>
        </div>
        {/* Topic and Up Vote */}
        <div className="flex items-center justify-between mt-5 text-sm">
          <div className="text-sm text-gray-600">
            <span className="flex gap-1 font-bold ">
              <Tag size={22} color="#262526" weight="duotone" />
              <h3 className="text-[.7rem]">{topic}</h3>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div>
              <div className="flex gap-1 text-[.8rem]">
                <Link href={`/${params}/community/answer`}>
                  <Button variant="flat" color="primary" size="sm">
                    <span>
                      <ChatCircleDots
                        size={25}
                        color="#787678"
                        weight="duotone"
                      />
                    </span>
                    <span>{countOfAnswer}</span>
                  </Button>{" "}
                </Link>
              </div>
            </div>
            <div className="font-bold  w-auto   text-gray-700  gap-2 h-[1.9rem] items-center flex rounded-xl text-xs bg-[#D9D9D9]">
              <Button
                isIconOnly
                size="sm"
                className="ml-[-.5rem]"
                variant="light"
              >
                <span className="">
                  <ArrowFatDown size={18} color="#da3316" weight="duotone" />
                </span>
              </Button>
              |
              <Button size="sm" variant="light">
                <span>باهات موافقم</span>
                <span>
                  <ArrowFatUp size={18} color="#2ed90c" weight="duotone" />
                </span>
                <span className="font-bold">{countOfUpvote}</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
