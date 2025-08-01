"use client";
import React, { useEffect, useState } from "react";
import {
  ArrowFatDown,
  ArrowFatUp,
  ChatCircleDots,
  Tag,
} from "@phosphor-icons/react";
import { timeAgo } from "./changeDate";
import usePostUpVote from "../apiForum/usePostUpVote";
import { useQuestions } from "../apiForum/useGetQuestions";
import usePostDownVote from "../apiForum/usePostDownVote";
import useCheckUser from "../apiForum/useCheckUser";
import CheckUserModal from "../components/checkUserModal";
import { useRouter, useSearchParams } from "next/navigation";
import PaginationQ from "./pagination";
import SkeletonQuestionCard from "./skeletonQuestionCard";
import { CountryNamespace } from "@/types/country";
// import PaginationQ from "./PaginationQ";

export default function QuestionCard({
  countryOrSlug,
}: {
  countryOrSlug: string;
  country: CountryNamespace.GET;
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
    currentPage,
  );

  const questionSwr = question?.items;

  const test = questionSwr?.length || 3;

  // Up vote
  const { vote, isVoteLoading } = usePostUpVote(questionMutate);

  // Down vote
  const downVote = usePostDownVote(questionMutate);

  if (isQuestion) {
    return (
      <div className="_QuestionCard flex min-h-[20rem] w-full max-w-[72rem] flex-col items-center justify-between bg-white">
        {Array.from({ length: test }).map((_, index) => (
          <SkeletonQuestionCard key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className="_QuestionCard flex min-h-[20rem] w-full max-w-[72rem] flex-col items-center justify-between bg-white">
      {/* If questionSwr is empty */}
      {questionSwr?.length === 0 ? (
        <div className="my-auto text-center">
          <h2 className="text-lg font-bold">هیچ سؤالی یافت نشد</h2>
          <p className="text-gray-600">
            در حال حاضر هیچ سؤالی در این بخش موجود نیست.
          </p>
        </div>
      ) : (
        questionSwr?.map((question) => (
          <div
            key={question.id}
            className="mb-4 w-full rounded-xl bg-blue-50 p-4"
          >
            <div className="_QuestionCard-header flex items-center justify-between border-b-2 border-dotted border-gray-300 py-2">
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
                      {question?.botUser?.firstname}{" "}
                      {question?.botUser?.lastname}{" "}
                    </h2>
                    <span className="sm:text-md flex text-sm">{`ساکن ${question.country.name}`}</span>
                  </div>
                </div>
              </div>
              {/* Date */}
              <span className="xl:text-md text-sm text-gray-500">
                {timeAgo(question.createdDate)}
              </span>
            </div>
            {/* Question and Description */}
            <div className="QuestonCard-body mb-2 mt-3">
              <h2 className="text-lg font-bold xl:text-xl">{question.title}</h2>
              <p className="mt-1 text-sm text-gray-700 xl:text-lg">
                {question.text}
              </p>
            </div>
            {/* Topic and Up Vote */}
            <div className="QuestionCard-footer mt-5 flex items-center justify-between">
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
                <div className="mr-1 flex h-auto w-auto items-center justify-center rounded-xl bg-blue-200 py-1 text-[.7rem] font-bold">
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
                              "my_modal_3",
                            ) as HTMLFormElement
                          ).showModal();
                        } else {
                          params.delete("sort");
                          router.push(
                            `/${countryOrSlug}/community/${question.id}/`,
                          );
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
                        {`${question.answers.length} پاسخ`}
                      </p>
                    </button>
                  </div>
                </div>
                <div className="flex w-auto items-center rounded-xl bg-gray-200 py-1 text-xs font-bold text-gray-700">
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
                        downVote(question.id);
                        checkUser();
                      }
                    }}
                    className="btn btn-square btn-ghost btn-xs border-none bg-transparent font-medium xl:btn-sm"
                  >
                    <span className="flex items-center justify-center gap-1 px-2">
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
                            "my_modal_3",
                          ) as HTMLFormElement
                        ).showModal();
                      } else {
                        vote(question.id);
                        checkUser();
                      }
                    }}
                    className={`${
                      isVoteLoading ? "animate-pulse" : ""
                    } btn btn-ghost btn-xs w-auto border-none bg-transparent font-medium`}
                  >
                    <span className="text-[.7rem] xl:text-base">
                      باهات موافقم
                    </span>
                    <span>
                      <ArrowFatUp size={15} color="#2ed90c" weight="duotone" />
                    </span>
                    <span className="text-[.7rem] font-bold xl:text-base">
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
