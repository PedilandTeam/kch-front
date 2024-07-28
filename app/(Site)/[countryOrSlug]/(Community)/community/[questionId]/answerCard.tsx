"use client";
import React, { useEffect, useState } from "react";
import { ArrowFatDown, ArrowFatUp } from "@phosphor-icons/react";
import useGetAnswer from "../apiForum/useGetAnswer";
import { timeAgo } from "../changeDate";
import PaginationQ from "../component/paginationQ";
import { useSearchParams } from "next/navigation";
import usePostUpVoteAnswer from "../apiForum/usePostUpVoteAnswer";
import usePostDownVoteAnswer from "../apiForum/usePostDownVoteAnswer";
import useCheckUser from "../apiForum/useCheckUser";
import CheckUserModal from "../component/checkUserModal";

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

  return (
    <div className="px-4 w-[92%] max-w-[72rem] bg-white flex  flex-col items-end">
      {/* Vertical Timeline Container */}
      {answerData?.items.map((answer) => (
        <div key={answer.id} className="relative xl:w-[90%] w-full">
          {/* Vertical Line */}
          <div className="absolute h-full  w-px bg-gray-300 bottom-6 right-9"></div>
          <div className="flex  space-x-4">
            {/* Question Card */}
            <div className="_answer-card w-full z-0 bg-blue-100 rounded-xl px-4 py-2 mb-6">
              {/* Question Header */}
              <div className="AnswerCard-header flex py-2 border-b-2 border-dotted border-gray-400 justify-between items-center">
                {/* Avatar and Name */}

                <div className="flex items-center">
                  <div className="flex items-center">
                    <div className="avatar">
                      <div className="ring-primary ring-offset-base-100 w-10 rounded-full ring ring-offset-2">
                        <img src="https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg" />
                      </div>
                    </div>
                    <div className="flex mr-3 gap-1 flex-col">
                      <h2 className="ml-2 font-bold xl:text-xl">
                        {answer.botUser.firstname}
                        {answer.botUser.lastname}
                      </h2>
                      <span className="flex text-sm md:text-md">{}</span>
                    </div>
                  </div>
                </div>
                {/* Date */}
                <span className="text-sm xl:text-md text-gray-500">
                  {timeAgo(answer?.createdDate)}
                </span>
              </div>
              {/* Question and Description */}
              <div className="AnswerCard-body mt-3 mb-3">
                <p className="mt-1 text-sm xl:text-lg text-gray-700">
                  {answer.text}
                </p>
              </div>
              {/* Topic and Up Vote */}
              <div className="AnswerCard-footer flex items-center  pb-2 justify-end mt-5">
                <div className="flex items-center">
                  <div className="flex items-center py-1 font-bold w-auto text-gray-700 rounded-xl text-xs bg-blue-300">
                    <button
                      onClick={async () => {
                        const isUserAuthenticated = await checkUser();
                        if (!isUserAuthenticated) {
                          (
                            document.getElementById(
                              "my_modal_3"
                            ) as HTMLFormElement
                          ).showModal();
                        } else {
                          downVote(answer.id);
                          checkUser()
                        }
                      }}
                      className="btn btn-ghost btn-square btn-xs xl:btn-sm  bg-transparent border-none font-medium"
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
                              "my_modal_3"
                            ) as HTMLFormElement
                          ).showModal();
                        } else {
                          vote(answer.id);
                          checkUser();
                        }
                      }}
                      className="btn btn-ghost w-auto btn-xs bg-transparent border-none font-medium"
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
                      <span className="font-bold text-[.7rem] xl:text-base">
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
      <div className="flex justify-center w-full">
        {answerData && <PaginationQ pages={{ meta: answerData.meta }} />}
      </div>
    </div>
  );
}
