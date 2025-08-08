"use client";
import { CommunityQuestion } from "@/types/community";
import { Country } from "@/types/country";
import {
  ArrowFatLineDownIcon,
  ArrowFatLineUpIcon,
  ChatCircleDotsIcon,
  FlagIcon,
  ShareNetworkIcon,
} from "@phosphor-icons/react/dist/ssr";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import useCheckUser from "../../app/(Site)/[countryOrSlug]/c/apiForum/useCheckUser";
import { useQuestions } from "../../app/(Site)/[countryOrSlug]/c/apiForum/useGetQuestions";
import usePostDownVote from "../../app/(Site)/[countryOrSlug]/c/apiForum/usePostDownVote";
import usePostUpVote from "../../app/(Site)/[countryOrSlug]/c/apiForum/usePostUpVote";
import { timeAgo } from "../../app/(Site)/[countryOrSlug]/c/components/changeDate";
import PaginationQ from "../../app/(Site)/[countryOrSlug]/c/components/pagination";
import SkeletonQuestionCard from "../../app/(Site)/[countryOrSlug]/c/components/skeletonQuestionCard";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
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
            data?.map((q: CommunityQuestion) => (
              <div key={q.id} className="rounded-lg border p-3">
                <div className="_header mb-3 flex items-center gap-2">
                  <div>
                    <Avatar className="size-8">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </div>

                  <div className="_info space-y-0.5 text-xs text-gray-700">
                    <div>
                      {`${q?.user?.firstname} ${q?.user?.lastname}`} ساکن{" "}
                      {q?.country?.name}
                    </div>
                    <div>
                      {timeAgo(q.createdDate)} در {q.topic.title}
                    </div>
                  </div>
                </div>

                <div className="_content mb-5 text-sm">
                  <h2 className="mb-1 font-semibold">{q.title}</h2>
                  <p>{q.text}</p>
                </div>

                <div className="_tools flex items-center justify-between text-[13px] text-gray-700">
                  <div className="_share flex items-center gap-1">
                    <FlagIcon size={18} weight="duotone" />
                    گزارش
                  </div>

                  <div className="_share flex items-center gap-1">
                    <ShareNetworkIcon size={18} weight="duotone" />
                    اشتراک
                  </div>

                  <div className="_answers flex gap-1.5">
                    <ChatCircleDotsIcon size={18} weight="duotone" />
                    <span>{q.answers.length}</span>
                    <span>پاسخ</span>
                  </div>

                  <div className="_votes flex items-center gap-1.5">
                    <ArrowFatLineDownIcon
                      size={18}
                      weight="duotone"
                      className="text-red-600"
                    />
                    <span>0</span>
                    <ArrowFatLineUpIcon
                      size={18}
                      weight="duotone"
                      className="text-green-600"
                    />
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
