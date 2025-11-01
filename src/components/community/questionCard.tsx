// src/components/Community/QuestionCard.tsx

import type { Question } from "@/schemas/community";
import { timeAgo } from "@/lib/timeAgo";

import { Avatar, AvatarFallback, AvatarImage } from "@components";
import {
  ArrowFatLineDownIcon,
  ArrowFatLineUpIcon,
  ChatCircleDotsIcon,
  FlagIcon,
  HashIcon,
  ShareNetworkIcon,
  TagIcon,
} from "@phosphor-icons/react";
import Link from "next/link";

export const QuestionCard = ({ data }: { data: Question[] }) => {
  return (
    <div className="flex flex-col gap-4">
      {data?.length === 0 ? (
        <p className="text-gray-600">
          در حال حاضر هیچ سؤالی در این بخش موجود نیست.
        </p>
      ) : (
        data?.map((q: Question) => (
          <Link key={q.id} href={`/${q.country?.code}/c/${q.id}`}>
            <div className="rounded-lg border">
              <div className="_header flex items-center justify-between p-3">
                <div className="flex items-center gap-2">
                  <div>
                    <Avatar className="size-8">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </div>

                  <div className="_info space-y-0.5 text-xs">
                    <div>
                      {`${q?.user?.firstname} ${q?.user?.lastname}`} ساکن{" "}
                      {q?.country?.name}
                    </div>
                    <div className="text-gray-600">
                      {timeAgo(q.createdDate)}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 text-gray-500">
                  <ShareNetworkIcon size={18} />
                  <FlagIcon size={18} />
                </div>
              </div>

              <div className="_content mb-3 px-3 text-sm">
                <h2 className="mb-1 font-semibold">{q.title}</h2>
                <p>{q.text}</p>
              </div>
              <div className="_tools flex items-center justify-between border-t bg-gray-50 px-3 py-2.5 text-gray-700">
                <div className="_answers flex flex-1 gap-1.5 text-xs">
                  <ChatCircleDotsIcon size={18} weight="duotone" />
                  <span>{q.answers.length}</span>
                  <span>پاسخ</span>
                </div>

                <div className="_votes flex flex-1 items-center justify-center gap-1.5">
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

                <div className="flex flex-1 items-center justify-end gap-1">
                  <span className="text-xs">{q.topic?.title}</span>
                  <HashIcon size={16} weight="duotone" />
                </div>
              </div>
            </div>
          </Link>
        ))
      )}
    </div>
  );
};
