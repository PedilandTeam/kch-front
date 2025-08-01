"use client";
import React, { useEffect, useState } from "react";
import { ArrowFatDown, ArrowFatUp } from "@phosphor-icons/react";
import useGetAnswer from "../apiForum/useGetAnswer";
import { timeAgo } from "../components/changeDate";
import Pagination from "../components/pagination";
import { useSearchParams } from "next/navigation";
import usePostUpVoteAnswer from "../apiForum/usePostUpVoteAnswer";
import usePostDownVoteAnswer from "../apiForum/usePostDownVoteAnswer";
import useCheckUser from "../apiForum/useCheckUser";
import CheckUserModal from "../components/checkUserModal";
import SkeletonAnswerCard from "../components/skeletonAnswerCard";

export default function AnswerCard({
  params,
}: {
  params: { questionId: string; countryOrSlug: string };
}) {
  const questionIidParam: string = params.questionId;
  const countryOrSlug: string = params.countryOrSlug;
  const { checkUser } = useCheckUser();

  // pagination state
  const [currentPage, setCurrentPage] = useState<number | string | null>(1);
  const searchParams = useSearchParams();
  useEffect(() => {
    setCurrentPage(searchParams.get("page"));
  }, [searchParams]);
  // get answer
  const {
    data: answerData,
    isLoading,
    error,
    mutate: answerMutate,
  } = useGetAnswer(countryOrSlug, questionIidParam, currentPage);

  // vote
  const { vote } = usePostUpVoteAnswer(answerMutate);
  const downVote = usePostDownVoteAnswer(answerMutate);

  if (isLoading) {
    return (
      <div className="flex w-[92%] max-w-[72rem] flex-col items-end bg-white">
        <div className="flex w-full max-w-[60rem] flex-col items-end justify-end">
          {Array.from({ length: 2 }).map((_, index) => (
            <div className="flex w-full justify-end" key={index}>
              <SkeletonAnswerCard />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-[92%] max-w-[72rem] flex-col items-end bg-white">
      {/* Vertical Timeline Container */}
      {answerData?.items.map((answer) => (
        <div key={answer.id} className="relative w-full xl:w-[90%]">
          {/* Vertical Line */}
          <div className="absolute bottom-6 right-9 h-full w-px bg-gray-300"></div>
          <div className="flex space-x-4">
            {/* Question Card */}
            <div className="_answer-card z-0 mb-6 w-full rounded-xl bg-blue-100 px-4 py-2">
              {/* Question Header */}
              <div className="AnswerCard-header flex items-center justify-between border-b-2 border-dotted border-gray-400 py-2">
                {/* Avatar and Name */}

                <div className="flex items-center">
                  <div className="flex items-center">
                    <div className="avatar">
                      <div className="w-10 rounded-full ring ring-primary ring-offset-2 ring-offset-base-100">
                        <img src="https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg" />
                      </div>
                    </div>
                    <div className="mr-3 flex flex-col gap-1">
                      <h2 className="ml-2 font-bold xl:text-xl">
                        {answer.botUser.firstname}
                        {answer.botUser.lastname}
                      </h2>
                      <span className="md:text-md flex text-sm">{}</span>
                    </div>
                  </div>
                </div>
                {/* Date */}
                <span className="xl:text-md text-sm text-gray-500">
                  {timeAgo(answer?.createdDate)}
                </span>
              </div>
              {/* Question and Description */}
              <div className="AnswerCard-body mb-3 mt-3">
                <p className="mt-1 text-sm text-gray-700 xl:text-lg">
                  {answer.text}
                </p>
              </div>
              {/* Topic and Up Vote */}
              <div className="AnswerCard-footer mt-5 flex items-center justify-end pb-2">
                <div className="flex items-center">
                  <div className="flex w-auto items-center rounded-xl bg-blue-300 py-1 text-xs font-bold text-gray-700">
                    <button
                      onClick={async () => {
                        const isUserAuthenticated = await checkUser();
                        if (!isUserAuthenticated) {
                          (
                            document.getElementById(
                              "my_modal_3",
                            ) as HTMLFormElement
                          ).showModal();
                        } else {
                          downVote(answer.id);
                          checkUser();
                        }
                      }}
                      className="btn btn-square btn-ghost btn-xs border-none bg-transparent font-medium xl:btn-sm"
                    >
                      <span className="">
                        <ArrowFatDown
                          size={15}
                          color="#da3316"
                          weight="duotone"
                        />
                      </span>
                    </button>

                    <button
                      onClick={async () => {
                        const isUserAuthenticated = await checkUser();
                        if (!isUserAuthenticated) {
                          (
                            document.getElementById(
                              "my_modal_3",
                            ) as HTMLFormElement
                          ).showModal();
                        } else {
                          vote(answer.id);
                          checkUser();
                        }
                      }}
                      className="btn btn-ghost btn-xs w-auto border-none bg-transparent font-medium"
                    >
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
                      <span className="text-[.7rem] font-bold xl:text-base">
                        {answer.votes.filter((v) => v.type === "up").length}
                      </span>
                    </button>
                    <CheckUserModal />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      <div className="ml-5 flex w-full justify-center xl:ml-0">
        {answerData && <Pagination pages={{ meta: answerData.meta }} />}
      </div>
    </div>
  );
}
