"use client";
import React from "react";
import { ArrowFatDown, ArrowFatUp } from "@phosphor-icons/react";

const userName: string = "سینا پیرانی";
const timeOfQuestion: string = "22 دقیقه پیش";
const questionDescription: string =
  "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده ";
const userBio: string = "ساکن المان از سال 2014";
const countOfUpvote: string = "10";

export default function AnswerCard() {
  return (
    <div className="px-4 w-[92%] max-w-[72rem] bg-white flex  flex-col items-center">
      {/* Vertical Timeline Container */}
      <div className="relative">
        {/* Vertical Line */}
        <div className="absolute h-full w-px bg-gray-300 bottom-6 right-9"></div>

        {/* Timeline Content */}
        <div className="w-full">
          {/* Timeline Item */}
          <div className="flex flex-row items-center space-x-4">
            {/* Time */}
            {/* <div className="text-gray-500 m-3"></div> */}

            {/* Question Card */}
            <div className="w-full z-0 bg-blue-100 rounded-xl px-4 py-2 mb-6">
              {/* Question Header */}
              <div className="qCard-header flex py-2 border-b-2 border-dotted border-gray-400 justify-between items-center">
                {/* Avatar and Name */}
                {/* Avatar and Name */}
                <div className="flex items-center">
                  <div className="flex items-center">
                    <div className="avatar">
                      <div className="ring-primary ring-offset-base-100 w-10 rounded-full ring ring-offset-2">
                        <img src="https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg" />
                      </div>
                    </div>
                    <div className="flex mr-3 gap-1 flex-col">
                      <h2 className="ml-2 font-bold xl:text-xl">{userName} </h2>
                      <span className="flex text-sm md:text-md">{userBio}</span>
                    </div>
                  </div>
                </div>
                {/* Date */}
                <span className="text-sm xl:text-md text-gray-500">
                  {timeOfQuestion}
                </span>
              </div>
              {/* Question and Description */}
              <div className="mt-3 mb-3">
                <p className="mt-1 text-sm xl:text-lg text-gray-700">
                  {questionDescription}
                </p>
              </div>
              {/* Topic and Up Vote */}
              <div className="flex items-center  pb-2 justify-end mt-5">
                <div className="flex items-center">
                  <div className="flex items-center py-1 font-bold w-auto text-gray-700 rounded-xl text-xs bg-blue-300">
                    <button className="btn btn-ghost btn-square btn-xs xl:btn-sm  bg-transparent border-none font-medium">
                      <span className="">
                        <ArrowFatDown
                          size={15}
                          color="#da3316"
                          weight="duotone"
                        />
                      </span>
                    </button>
                    |
                    <button className="btn btn-ghost w-auto btn-xs bg-transparent border-none font-medium">
                      <span className="text-[.7rem] xl:text-base">
                        باهات موافقم
                      </span>
                      <span>
                        <ArrowFatUp
                          size={15}
                          color="#2ed90c"
                          weight="duotone"
                        />
                      </span>
                      <span className="font-bold text-[.7rem] xl:text-base">
                        {countOfUpvote}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
