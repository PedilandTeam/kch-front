"use client"
import React from "react";
import {
  ArrowFatDown,
  ArrowFatUp,
} from "@phosphor-icons/react";

import { User, Button } from "@nextui-org/react";

const userName: string = "سینا پیرانی";
const timeOfQuestion: string = "22 دقیقه پیش";
const questionDescription: string =
  "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده ";
const userBio: string = "ساکن المان از سال 2014";
const countOfUpvote: string = "10";

export default function AnswerCard() {
  return (
    <div className="w-[92%] max-w-[72rem] p-4 bg-white flex  flex-col items-center">
      {/* Vertical Timeline Container */}
      <div className="relative">
        {/* Vertical Line */}
        <div className="absolute h-full w-px bg-gray-300 bottom-12 right-9"></div>
        
        {/* Timeline Content */}
        <div className="w-full ">
          {/* Timeline Item */}
          <div className="flex flex-row items-center space-x-4">
            {/* Time */}
            {/* <div className="text-gray-500 m-3"></div> */}
            
            {/* Question Card */}
            <div className="w-full z-0 bg-[#E8EAFF] rounded-xl p-4 mb-4">
              {/* Question Header */}
              <div className="qCard-header flex h-[4rem] border-b-2 border-dotted border-gray-300 justify-between items-center">
                {/* Avatar and Name */}
                <div className="flex flex-col items-center bg--400">
                  <div className="flex items-center bg--900">
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
                <p className="mt-1 text-sm text-gray-700">{questionDescription}</p>
              </div>
              {/* Topic and Up Vote */}
              <div className="flex items-center justify-end mt-5 text-sm">
                <div className="flex items-center gap-2">
                  <div className="font-bold w-auto text-gray-700 gap-2 h-[1.9rem] items-center flex rounded-xl text-xs bg-[#C0C6FF]">
                    <Button isIconOnly size="sm" className="ml-[-.5rem]" variant="light">
                      <span>
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
        </div>
      </div>
    </div>
  );
}
