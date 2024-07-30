"use client";
import React, { useState } from "react";
import {
  ArrowFatDown,
  ArrowFatUp,
  ChatCircleDots,
  Tag,
} from "@phosphor-icons/react";
import AnswerToQuestion from "./answerToQuestion";
import { timeAgo } from "../changeDate";
import usePostUpVote from "../apiForum/usePostUpVote";
import usePostDownVote from "../apiForum/usePostDownVote";
import useGetQuestion from "../apiForum/useGetQuestion";
import useCheckUser from "../apiForum/useCheckUser";
import SkeletonQuestionCard from "../component/skeletonQuestionCard";

export default function QuestionCard({
  params,
}: {
  params: { countryOrSlug: string; questionId: string };
}) {
  const questionIdParams: string = params.questionId;
  const countryOrSlug: string = params.countryOrSlug;

  const [openAnswer, setOpenAnswer] = useState<boolean>(false);

  // get question
  const { question, questionError, questionIsLoading, mutateQuestion } =
    useGetQuestion(questionIdParams);

  const thisPageQuestion =
    question?.country.code === countryOrSlug ? question : null;

  // vote
  const { vote } = usePostUpVote(mutateQuestion);

  // down vote
  const downVote = usePostDownVote(mutateQuestion);
  // get checkUser
  const { checkUser } = useCheckUser();

  if (questionIsLoading) {
    return (
      <div className="_QuestionCard min-h-[20rem] w-full max-w-[72rem] bg-white flex flex-col justify-between items-center">
        {Array.from({ length: 1 }).map((_, index) => (
          <SkeletonQuestionCard key={index} />
        ))}
      </div>
    );
  }
  return (
    <div className="QuestionCard w-full max-w-[72rem] min-h-[15rem] py-2 bg-white flex flex-col items-center">
      {/* Question Card */}
      {thisPageQuestion ? (
        <div className="_container w-full bg-blue-50 rounded-xl px-4 py-2 mb-4">
          <div className="_ QuestionCard-header flex py-2 border-b-2 border-dotted border-gray-300 justify-between items-center">
            {/* Avatar and Name */}
            <div className="QuestionCard-header flex items-center">
              <div className="flex items-center">
                <div className="avatar">
                  <div className="ring-primary ring-offset-base-100 w-10 rounded-full ring ring-offset-2">
                    <img src="https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg" />
                  </div>
                </div>
                <div className="flex mr-3 gap-1 flex-col">
                  <h2 className="ml-2 font-bold xl:text-xl">
                    {thisPageQuestion?.botUser?.firstname}
                    {thisPageQuestion?.botUser?.lastname}
                  </h2>
                  <span className="flex text-sm sm:text-md">{`ساکن ${thisPageQuestion?.country?.name}`}</span>
                </div>
              </div>
            </div>
            {/* Date */}
            <span className="text-sm xl:text-md text-gray-500">
              {timeAgo(thisPageQuestion?.createdDate)}
            </span>
          </div>
          {/* thisPageQuestion and Description */}
          <div className="_thisPageQuestionCard-body mt-3 mb-2">
            <h2 className="text-lg font-bold xl:text-xl">
              {thisPageQuestion?.title}
            </h2>
            <p className="mt-1 text-sm xl:text-lg text-gray-700">
              {thisPageQuestion?.text}
            </p>
          </div>
          {/* Topic and Up Vote */}
          <div className="_QuestionCard-footer flex items-center justify-between mt-5">
            <div className="text-sm  text-gray-600">
              <span className="flex gap-1 font-bold ">
                <Tag size={22} color="#262526" weight="duotone" />
                <h3 className="text-[.7rem] xl:text-base">
                  {thisPageQuestion?.topic?.title}
                </h3>
              </span>
            </div>
            <div className="flex items-center mb-2 gap-2">
              <div className="_Answer-btn font-bold w-auto py-1 mr-1 h-auto items-center justify-center flex rounded-xl text-[.7rem] bg-blue-200">
                <button
                  onClick={async () => {
                    const isUserAuthenticated = await checkUser();
                    if (!isUserAuthenticated) {
                      (
                        document.getElementById("my_modal_3") as HTMLFormElement
                      ).showModal();
                    } else {
                      setOpenAnswer(!openAnswer);
                    }
                  }}
                  className="btn btn-ghost rounded-xl btn-xs xl:btn-sm bg-transparent font-medium"
                >
                  <ChatCircleDots
                    size={16}
                    color="#787678"
                    weight="duotone"
                    className="xl:hidden"
                  />
                  <ChatCircleDots
                    size={28}
                    color="#787678"
                    weight="duotone"
                    className="hidden xl:block"
                  />

                  <p className="text-[.65rem] xl:text-base font-medium">
                    {`پاسخ`}
                  </p>
                </button>
              </div>
              <div className="font-bold py-1 w-auto text-gray-700 items-center flex rounded-xl text-xs bg-blue-200">
                <button
                  onClick={async () => {
                    const isUserAuthenticated = await checkUser();
                    if (!isUserAuthenticated) {
                      (
                        document.getElementById("my_modal_3") as HTMLFormElement
                      ).showModal();
                    } else {
                      downVote(thisPageQuestion?.id);
                      checkUser();
                    }
                  }}
                  className="btn btn-ghost rounded-xl btn-xs xl:btn-sm font-medium"
                >
                  <span className="flex gap-1 ">
                    <ArrowFatDown size={15} color="#da3316" weight="duotone" />
                    {
                      thisPageQuestion?.votes?.filter((v) => v.type === "down")
                        .length
                    }
                  </span>
                </button>
                |
                <button
                  onClick={async () => {
                    const isUserAuthenticated = await checkUser();
                    if (!isUserAuthenticated) {
                      (
                        document.getElementById("my_modal_3") as HTMLFormElement
                      ).showModal();
                    } else {
                      vote(thisPageQuestion.id);
                      checkUser();
                    }
                  }}
                  className="btn btn-ghost w-auto btn-xs bg-transparent border-none font-medium"
                >
                  <span className="text-[.7rem] xl:text-base">
                    باهات موافقم
                  </span>
                  <span>
                    <ArrowFatUp size={15} color="#2ed90c" weight="duotone" />
                  </span>
                  <span className="font-bold text-[.7rem] xl:text-base">
                    {
                      thisPageQuestion?.votes?.filter((v) => v.type === "up")
                        .length
                    }
                  </span>
                </button>
              </div>
            </div>
          </div>
          <AnswerToQuestion
            openAnswer={openAnswer}
            questionId={questionIdParams}
          />
        </div>
      ) : (
        <div className="text-center my-auto">
          <h2 className="text-lg font-bold">سؤالی یافت نشد</h2>
          <p className="text-gray-600">سؤال مورد نظر شما در دسترس نیست.</p>
        </div>
      )}
    </div>
  );
}
