"use client";
import React from "react";
import {
  ArrowFatDown,
  ArrowFatUp,
  ChatCircleDots,
  Tag,
} from "@phosphor-icons/react";

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
export default function QuestionCard({
  params,
}: {
  params: { countryOrSlug: string };
}) {
  const countryOrSlug: string = params.countryOrSlug;
  console.log(countryOrSlug);

  return (
    <div className="QuestionCard w-full max-w-[72rem] bg-white flex flex-col items-center">
      {/* Question Card */}
      <div className="w-full bg-blue-50 rounded-xl p-4">
        <div className="qCard-header flex py-2 border-b-2 border-dotted border-gray-300 justify-between items-center">
          {/* Avatar and Name */}
          <div className="flex items-center">
            <div className="flex items-center">
              <div className="avatar">
                <div className="ring-primary ring-offset-base-100 w-10 rounded-full ring ring-offset-2">
                  <img src="https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg" />
                </div>
              </div>
              <div className="flex mr-3 gap-1 flex-col">
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
            <span className="flex font-bold ">
              <Tag size={18} color="#262526" weight="duotone" />
              <h3 className="text-[.7rem]">{topic}</h3>
            </span>
          </div>
          <div className="flex items-center gap-1">
            <div>
              <div className="font-bold w-auto py-1 mr-1 h-auto items-center justify-center flex rounded-xl text-[.7rem] bg-blue-200">
                <Link
                  className="flex"
                  href={`/${countryOrSlug}/community/answer`}
                >
                  <button className="btn btn-ghost rounded-xl btn-xs font-medium">
                    <ChatCircleDots
                      size={16}
                      color="#787678"
                      weight="duotone"
                    />

                    <p className="text-[.65rem] font-medium">{countOfAnswer}</p>
                  </button>
                </Link>
              </div>
            </div>
            <div className="font-bold w-auto py-1 text-gray-700 items-center flex rounded-xl text-xs bg-gray-200">
              <button className="btn btn-ghost btn-square btn-xs bg-transparent border-none font-medium">
                <span className="">
                  <ArrowFatDown size={15} color="#da3316" weight="duotone" />
                </span>
              </button>
              |
              <button className="btn btn-ghost w-auto btn-xs bg-transparent border-none font-medium">
                <span className="text-[.7rem]">باهات موافقم</span>
                <span>
                  <ArrowFatUp size={15} color="#2ed90c" weight="duotone" />
                </span>
                <span className="font-bold text-[.7rem]">{countOfUpvote}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
