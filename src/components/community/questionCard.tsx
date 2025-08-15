// src/components/Community/QuestionCard.tsx

import { Question } from "@/lib/schemas/community";
import { timeAgo } from "@/lib/timeAgo";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/index";
import {
  ArrowFatLineDownIcon,
  ArrowFatLineUpIcon,
  ChatCircleDotsIcon,
  FlagIcon,
  ShareNetworkIcon,
} from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

export const QuestionCard = ({ data }: { data: Question[] }) => {

  console.log(data);

  return (
    <div className="container">
      <div className="flex flex-col gap-4">
        {data?.length === 0 ? (
          <p className="text-gray-600">
            در حال حاضر هیچ سؤالی در این بخش موجود نیست.
          </p>
        ) : (
          data?.map((q: Question) => (
            <Link key={q.id} href={`/${q.country?.code}/c/${q.id}`}>
              <div className="rounded-lg border">
                <div className="_header flex items-center gap-2 p-3">
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
                      {timeAgo(q.createdDate)} در {q.topic?.title}
                    </div>
                  </div>
                </div>

                <div className="_content mb-3 px-3 text-sm">
                  <h2 className="mb-1 font-semibold">{q.title}</h2>
                  <p>{q.text}</p>
                </div>

                <div className="_tools flex items-center justify-between border-t bg-gray-50 px-3 py-2.5 text-[13px] text-gray-700">
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
            </Link>
          ))
        )}
      </div>
    </div>
  );
};
