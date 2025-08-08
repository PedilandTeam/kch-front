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
import CheckUserModal from "./checkUserModal";
import { useRouter, useSearchParams } from "next/navigation";
import PaginationQ from "./pagination";
import SkeletonQuestionCard from "./skeletonQuestionCard";
import { Country } from "@/types/country";
import { Question } from "@/types/answer";
import Image from "next/image";
// import PaginationQ from "./PaginationQ";

export default function QuestionCard({
  data,
  countryOrSlug,
}: {
  data: any;
  countryOrSlug: string;
  country: Country;
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

  console.log(data);

  return (
    <div className="_question-card">
      <div className="container">
        <div className="flex flex-col gap-3">
          {data?.length === 0 ? (
            <p className="text-gray-600">
              در حال حاضر هیچ سؤالی در این بخش موجود نیست.
            </p>
          ) : (
            data?.map((q: Question) => (
              <div key={q.id} className="rounded-lg border p-3">
                <div className="_header flex items-center gap-3 bg-red-200">
                  <div>
                    <img
                      className="size-10 rounded-full"
                      width={500}
                      height={500}
                      src="https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg"
                      alt="User Avatar"
                    />
                  </div>

                  <div className="space-y-0.5 text-xs">
                    <div>
                      {`${q?.botUser?.firstname} ${q?.botUser?.lastname}`} ساکن{" "}
                      {q.country.name}
                    </div>
                    <div>
                      {timeAgo(q.createdDate)} در {q.topic.title}
                    </div>
                  </div>
                </div>

                <div className="_content">
                  <h2>{q.title}</h2>
                  <p>{q.text}</p>
                </div>

                <div className="_tools"></div>

                {/* Topic and Up Vote */}
                <div className="QuestionCard-footer mt-5 flex items-center justify-between">
                  <div className="text-gray-600">
                    <span className="flex font-bold xl:gap-2">
                      <h3 className="text-[.7rem] xl:text-base">
                        {q.topic.title}
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
                                `/${countryOrSlug}/community/${q.id}/`,
                              );
                            }
                          }}
                          className="btn btn-ghost btn-xs xl:btn-sm rounded-xl bg-transparent font-medium"
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
                            {/* {`${q.answers.length} پاسخ`} */}
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
                            downVote(q.id);
                            checkUser();
                          }
                        }}
                        className="btn btn-square btn-ghost btn-xs xl:btn-sm border-none bg-transparent font-medium"
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
                            vote(q.id);
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
                          <ArrowFatUp
                            size={15}
                            color="#2ed90c"
                            weight="duotone"
                          />
                        </span>
                        <span className="text-[.7rem] font-bold xl:text-base">
                          {q.votes.filter((v) => v.type === "up").length}
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
      </div>
    </div>
  );
}
