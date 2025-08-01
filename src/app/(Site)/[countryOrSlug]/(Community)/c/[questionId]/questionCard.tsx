"use client";
import React, { useEffect, useState } from "react";
import {
  ArrowFatDown,
  ArrowFatUp,
  ChatCircleDots,
  Tag,
} from "@phosphor-icons/react";
import AnswerToQuestion from "./answerToQuestion";
import { timeAgo } from "../components/changeDate";
import usePostUpVote from "../apiForum/usePostUpVote";
import usePostDownVote from "../apiForum/usePostDownVote";
import useGetQuestion from "../apiForum/useGetQuestion";
import useCheckUser from "../apiForum/useCheckUser";
import SkeletonQuestionCard from "../components/skeletonQuestionCard";
import toast from "react-hot-toast";

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

  // vote
  const { vote } = usePostUpVote(mutateQuestion);

  // down vote
  const downVote = usePostDownVote(mutateQuestion);
  // get checkUser
  const { checkUser } = useCheckUser();

  useEffect(() => {
    if (!questionError) return;
    toast.error("خطایی در گرفتن لیست سوالات");
  }, [questionError]);

  if (questionIsLoading) {
    return (
      <div className="_QuestionCard flex min-h-[20rem] w-full max-w-[72rem] flex-col items-center justify-between bg-white">
        {Array.from({ length: 1 }).map((_, index) => (
          <SkeletonQuestionCard key={index} />
        ))}
      </div>
    );
  }
  return (
    <div className="QuestionCard flex min-h-[15rem] w-full max-w-[72rem] flex-col items-center bg-white py-2">
      {/* Question Card */}
      {question ? (
        <div className="_container mb-4 w-full rounded-xl bg-blue-50 px-4 py-2">
          <div className="_ QuestionCard-header flex items-center justify-between border-b-2 border-dotted border-gray-300 py-2">
            {/* Avatar and Name */}
            <div className="QuestionCard-header flex items-center">
              <div className="flex items-center">
                <div className="avatar">
                  <div className="w-10 rounded-full ring ring-primary ring-offset-2 ring-offset-base-100">
                    <img src="https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg" />
                  </div>
                </div>
                <div className="mr-3 flex flex-col gap-1">
                  <h2 className="ml-2 font-bold xl:text-xl">
                    {question?.botUser?.firstname}
                    {question?.botUser?.lastname}
                  </h2>
                  <span className="sm:text-md flex text-sm">{`ساکن ${question?.country?.name}`}</span>
                </div>
              </div>
            </div>
            {/* Date */}
            <span className="xl:text-md text-sm text-gray-500">
              {timeAgo(question?.createdDate)}
            </span>
          </div>
          {/* question and Description */}
          <div className="_questionCard-body mb-2 mt-3">
            <h2 className="text-lg font-bold xl:text-xl">{question?.title}</h2>
            <p className="mt-1 text-sm text-gray-700 xl:text-lg">
              {question?.text}
            </p>
          </div>
          {/* Topic and Up Vote */}
          <div className="_QuestionCard-footer mt-5 flex items-center justify-between">
            <div className="text-sm text-gray-600">
              <span className="flex gap-1 font-bold">
                <Tag size={22} color="#262526" weight="duotone" />
                <h3 className="text-[.7rem] xl:text-base">
                  {question?.topic?.title}
                </h3>
              </span>
            </div>
            <div className="mb-2 flex items-center gap-2">
              <div className="_Answer-btn mr-1 flex h-auto w-auto items-center justify-center rounded-xl bg-blue-200 py-1 text-[.7rem] font-bold">
                <button
                  onClick={async () => {
                    const isUserAuthenticated = await checkUser();
                    if (!isUserAuthenticated) {
                      (
                        document.getElementById(
                          "questionModal",
                        ) as HTMLFormElement
                      ).showModal();
                    } else {
                      setOpenAnswer(!openAnswer);
                    }
                  }}
                  className="btn btn-ghost btn-xs rounded-xl bg-transparent font-medium xl:btn-sm"
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

                  <p className="text-[.65rem] font-medium xl:text-base">
                    {`پاسخ`}
                  </p>
                </button>
              </div>
              <div className="flex w-auto items-center rounded-xl bg-blue-200 py-1 text-xs font-bold text-gray-700">
                <button
                  onClick={async () => {
                    const isUserAuthenticated = await checkUser();
                    if (!isUserAuthenticated) {
                      (
                        document.getElementById(
                          "questionModal",
                        ) as HTMLFormElement
                      ).showModal();
                    } else {
                      downVote(question?.id);
                      checkUser();
                    }
                  }}
                  className="btn btn-ghost btn-xs rounded-xl font-medium xl:btn-sm"
                >
                  <span className="flex gap-1">
                    <ArrowFatDown size={15} color="#da3316" weight="duotone" />
                    {question?.votes?.filter((v) => v.type === "down").length}
                  </span>
                </button>
                |
                <button
                  onClick={async () => {
                    const isUserAuthenticated = await checkUser();
                    if (!isUserAuthenticated) {
                      (
                        document.getElementById(
                          "questionModal",
                        ) as HTMLFormElement
                      ).showModal();
                    } else {
                      vote(question.id);
                      checkUser();
                    }
                  }}
                  className="btn btn-ghost btn-xs w-auto border-none bg-transparent font-medium"
                >
                  <span className="text-[.7rem] xl:text-base">
                    باهات موافقم
                  </span>
                  <span>
                    <ArrowFatUp size={15} color="#2ed90c" weight="duotone" />
                  </span>
                  <span className="text-[.7rem] font-bold xl:text-base">
                    {question?.votes?.filter((v) => v.type === "up").length}
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
        <div className="my-auto text-center">
          <h2 className="text-lg font-bold">سؤالی یافت نشد</h2>
          <p className="text-gray-600">سؤال مورد نظر شما در دسترس نیست.</p>
        </div>
      )}
    </div>
  );
}
