import React from "react";
import {
  ArrowFatDown,
  ArrowFatUp,
  ChatCircleDots,
  Tag,
} from "@phosphor-icons/react";
import { User, Button } from "@nextui-org/react";
const userName: string = "سینا پیرانی";
const timeOfQuestion: string = "22 دقیقه قبل";
const UserQuestion: string = " آیا وبفلو مناسب برای ساخت وبسایت است؟";
const questionDescription: string =
  "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده ";
const topic = "مهاجرت";
const countOfAnswer: string = "3 پاسخ";
const userBio: string = "ساکن المان از سال 2014";

export default function QuestionBox() {
  return (
    <div className="w-full max-w-[72rem] p-4 bg-white flex flex-col items-center mt-[8rem]">
      {/* Question Card */}
      <div className="w-full  bg-[#F6F7FF] rounded-xl p-4 mb-4">
        <div className="flex h-[4rem]   border-b-2 border-dotted border-gray-300   justify-between items-center ">
          {/* Avatar and Name */}
          <div className="flex  flex-col bg--400  items-center">
            <div className="flex items-center bg--900 ">
              <User
                avatarProps={{
                  size: "sm",
                  src: "https://avatars.githubusercontent.com/u/30373425?v=4",
                }}
              />
              <div className="flex flex-col">
                <span className="ml-2 font-bold">{userName} </span>
                <span className=" flex text-sm ">{userBio}</span>
              </div>
            </div>
          </div>
          {/* Date */}
          <div className="text-sm text-gray-500">{timeOfQuestion}</div>
        </div>
        {/* Question and Description */}
        <div className="mb-2 mt-3">
          <div className="font-bold text-lg">{UserQuestion}</div>
          <div className="text-sm text-gray-700 mt-1">
            {questionDescription}
          </div>
        </div>
        {/* Topic and Up Vote */}
        <div className="mt-5 flex text-sm justify-between items-center">
          <div className="text-sm text-gray-600">
            <span className="flex gap-1 font-bold ">
              <Tag size={22} color="#262526" weight="duotone" />
              <span className="text-[.7rem]"> {topic}</span>
            </span>
          </div>
          <div className="flex gap-2 items-center">
            <div>
              <div className="flex gap-1 text-[.8rem]">
                <Button variant="light" size="sm">
                  <span>
                    <ChatCircleDots
                      size={25}
                      color="#787678"
                      weight="duotone"
                    />
                  </span>
                  {countOfAnswer}
                </Button>
              </div>
            </div>
            <div className="font-bold  w-auto   text-gray-700  gap-2 h-[1.9rem] items-center flex rounded-xl text-xs bg-[#D9D9D9]">
              <Button isIconOnly size="sm" variant="light">
                <span className="">
                  <ArrowFatDown size={18} color="#da3316" weight="duotone" />
                </span>
              </Button>
              |
              <Button size="sm" variant="light">
                <span> باهات موافقم</span>
                <span>
                  <ArrowFatUp size={18} color="#2ed90c" weight="duotone" />
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/**/}
    </div>
  );
}
