"use client";

import { timeAgo } from "@/lib/timeAgo";
import { AnswersList } from "./AnswersList";
import { LoginModal } from "./LoginModal";

import {
  ArrowFatLinesDownIcon,
  ArrowFatLinesUpIcon,
  ArrowRightIcon,
  ChatCircleDotsIcon,
  FlagIcon,
  ShareNetworkIcon,
} from "@phosphor-icons/react";

import { swrKeys } from "@/hooks/swr/swrKeys";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import { Avatar, AvatarFallback, AvatarImage, Button } from "../ui";

type QuestionDetailsSectionProps = {
  params?: { questionId: string; countryOrSlug: string };
};

export const QuestionDetails = ({ params }: QuestionDetailsSectionProps) => {
  const router = useRouter();

  const {
    data: question,
    error,
    isLoading,
  } = useSWR(
    params?.questionId ? swrKeys.question(Number(params.questionId)) : null,
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="flex h-full flex-col bg-gray-100">
      <div className="flex h-12 items-center px-4">
        <Button
          className="p-0"
          variant={"link"}
          type="button"
          onClick={() => router.back()}
        >
          <ArrowRightIcon size={20} />
          بازگشت
        </Button>
      </div>

      <div className="_question-info flex-1 rounded-t-2xl bg-white">
        <div className="_header flex items-center justify-between p-4">
          <div className="flex items-center gap-2">
            <div>
              <Avatar className="size-10">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
            <div className="_info space-y-0.5">
              <div className="text-sm">
                {`${question?.user?.firstname} ${question?.user?.lastname}`}{" "}
                ساکن {question?.country?.name}
              </div>
              <div className="text-xs text-gray-700">
                {timeAgo(question.createdDate)}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-gray-500">
            <ShareNetworkIcon size={19} />
            <FlagIcon size={19} />
          </div>
        </div>

        <div className="_content mb-6 px-4 text-sm">
          <h2 className="mb-1 font-semibold">{question.title}</h2>
          <p>{question.text}</p>
        </div>

        <div className="_tools flex items-center justify-between border-b px-4 py-2.5 text-[13px] text-gray-700">
          <div>{question.topic?.title}</div>

          <div className="_answers flex cursor-pointer gap-1.5 hover:text-blue-600">
            <ChatCircleDotsIcon size={18} weight="duotone" />
            <span>{question.answers?.length || 0}</span>
            <span>پاسخ</span>
          </div>

          <div className="_votes flex items-center gap-1.5">
            <Button className="hover:text-red-700">
              <ArrowFatLinesDownIcon
                size={18}
                weight="duotone"
                className="text-red-600"
              />
            </Button>
            <span>
              {question?.votes?.filter((v: any) => v.type === "down").length ||
                0}
            </span>
            <Button className="hover:text-green-700">
              <ArrowFatLinesUpIcon
                size={18}
                weight="duotone"
                className="text-green-600"
              />
            </Button>
          </div>
        </div>

        {/* <AnswerToQuestion openAnswer={openAnswer} questionId={question.id} /> */}

        {/* {params && (
          <div className="mt-6">
            <h2 className="mb-4 text-lg font-bold xl:text-xl">پاسخ‌ها</h2>
            <AnswersList params={params} />
          </div>
        )} */}
      </div>

      {/* Login Modal */}
      <LoginModal />
    </div>
  );
};
