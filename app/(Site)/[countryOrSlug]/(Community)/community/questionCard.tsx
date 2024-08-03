"use client";
import React, { useEffect, useState } from "react";
import {
  ArrowFatDown,
  ArrowFatUp,
  ChatCircleDots,
  Tag,
} from "@phosphor-icons/react";
import Link from "next/link";
import { timeAgo } from "./changeDate";
import Spinner from "./component/spinner";
import { QuestionNamespace } from "@/types/questions";
import usePostUpVote from "./apiForum/usePostUpVote";
import { useQuestions } from "./apiForum/useGetQuestions";
import usePostDownVote from "./apiForum/usePostDownVote";
import useCheckUser from "./apiForum/useCheckUser";
import CheckUserModal from "./component/checkUserModal";
import { useRouter, useSearchParams } from "next/navigation";
import PaginationQ from "./component/paginationQ";
import SkeletonQuestionCard from "./component/skeletonQuestionCard";
import { CountryNamespace } from "@/types/country";
// import PaginationQ from "./PaginationQ";

export default function QuestionCard({
  countryOrSlug,
}: {
  countryOrSlug: string;
  country: CountryNamespace.GET
}) {
  const [currentPage, setCurrentPage] = useState<number | string | null>(1);
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());

  useEffect(() => {
    setCurrentPage(searchParams.get("page"));
  }, [searchParams, currentPage]);

  const { checkUser } = useCheckUser();
  const router = useRouter();

  // Get from SWR
  const { question, questionError, isQuestion, questionMutate } = useQuestions(
    countryOrSlug,
    currentPage
  );
  
  const questionSwr = question?.items;

  const test = questionSwr?.length || 3;

  // Up vote
  const { vote, isVoteLoading } = usePostUpVote(questionMutate);

  // Down vote
  const downVote = usePostDownVote(questionMutate);


  if (isQuestion) {
    return (
      <div className="_QuestionCard min-h-[20rem] w-full max-w-[72rem] bg-white flex flex-col justify-between items-center">
        {Array.from({ length: test }).map((_, index) => (
          <SkeletonQuestionCard key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className="_QuestionCard min-h-[20rem] w-full max-w-[72rem] bg-white flex flex-col justify-between items-center">
      {/* If questionSwr is empty */}
      {questionSwr?.length === 0 ? (
        <div className="text-center my-auto">
          <h2 className="text-lg font-bold">هیچ سؤالی یافت نشد</h2>
          <p className="text-gray-600">
            در حال حاضر هیچ سؤالی در این بخش موجود نیست.
          </p>
        </div>
      ) : (
        questionSwr?.map((question) => (
          <div
            key={question.id}
            className="w-full bg-blue-50 rounded-xl p-4 mb-4"
          >
            <div className="_QuestionCard-header flex py-2 border-b-2 border-dotted border-gray-300 justify-between items-center">
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
                      {question?.botUser?.firstname}{" "}
                      {question?.botUser?.lastname}{" "}
                    </h2>
                    <span className="flex text-sm sm:text-md">{`ساکن ${question.country.name}`}</span>
                  </div>
                </div>
              </div>
              {/* Date */}
              <span className="text-sm xl:text-md text-gray-500">
                {timeAgo(question.createdDate)}
              </span>
            </div>
            {/* Question and Description */}
            <div className="QuestonCard-body mt-3 mb-2">
              <h2 className="text-lg font-bold xl:text-xl">{question.title}</h2>
              <p className="mt-1 text-sm xl:text-lg text-gray-700">
                {question.text}
              </p>
            </div>
            {/* Topic and Up Vote */}
            <div className="QuestionCard-footer flex items-center justify-between mt-5">
              <div className="text-gray-600">
                <span className="flex font-bold xl:gap-2">
                  <Tag
                    size={18}
                    color="#262526"
                    weight="duotone"
                    className="xl:hidden"
                  />
                  <Tag
                    size={25}
                    color="#262526"
                    weight="duotone"
                    className="hidden xl:block"
                  />

                  <h3 className="text-[.7rem] xl:text-base">
                    {question.topic.title}
                  </h3>
                </span>
              </div>
              <div className="flex items-center gap-1 xl:gap-4">
                <div className="font-bold w-auto py-1 mr-1 h-auto items-center justify-center flex rounded-xl text-[.7rem] bg-blue-200">
                  <div
                    className="flex"
                    // href={`/${countryOrSlug}/community/${question.id}`}
                  >
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
                          params.delete("sort");
                          router.push(
                            `/${countryOrSlug}/community/${question.id}/`
                          );
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
                        {`${question.answers.length} پاسخ`}
                      </p>
                    </button>
                  </div>
                </div>
                <div className="font-bold w-auto py-1 text-gray-700 items-center flex rounded-xl text-xs bg-gray-200">
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
                        downVote(question.id);
                        checkUser();
                      }
                    }}
                    className="btn btn-ghost btn-square btn-xs xl:btn-sm  bg-transparent border-none font-medium"
                  >
                    <span className="flex justify-center items-center gap-1 px-2">
                      <ArrowFatDown
                        size={15}
                        color="#da3316"
                        weight="duotone"
                      />
                    </span>
                  </button>
                  |
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
                        vote(question.id);
                        checkUser();
                      }
                    }}
                    className={`${
                      isVoteLoading ? "animate-pulse" : ""
                    } btn btn-ghost w-auto btn-xs bg-transparent border-none font-medium `}
                  >
                    <span className="text-[.7rem] xl:text-base">
                      باهات موافقم
                    </span>
                    <span>
                      <ArrowFatUp size={15} color="#2ed90c" weight="duotone" />
                    </span>
                    <span className="font-bold text-[.7rem] xl:text-base">
                      {question.votes.filter((v) => v.type === "up").length}
                    </span>
                  </button>
                  {/* check user modal  */}
                  <CheckUserModal />
                </div>
              </div>
            </div>
          </div>
        ))
      )}
      {/* Add Pagination Component */}
      {question && <PaginationQ pages={question} />}
    </div>
  );
}
