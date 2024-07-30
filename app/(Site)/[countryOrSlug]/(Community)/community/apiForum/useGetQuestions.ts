import { fetcher } from "@/app/swr/fetcher";
import { QuestionNamespace } from "@/types/questions";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import useSWR from "swr";

export function useQuestions(
  countryOrSlug: string,
  currentPage: number | string | null
) {
  const searchParams = useSearchParams();

  // get filter query
  const [filter, setFilter] = useState<string | null>(null);
  useEffect(() => {
    setFilter(searchParams.get("filter"));
  }, [searchParams]);
  const filterQuery = filter ? `topicId=${filter}` : "";

  // get sort query
  const [sort, setSort] = useState<string | null>("");
  useEffect(() => {
    setSort(searchParams.get("sort"));
  }, [searchParams]);
  const sortQuery = sort ? `orderBy=${sort}` : "";

  const page = currentPage ? currentPage : 1;

  const {
    data: question,
    error: questionError,
    isLoading: isQuestion,
    mutate: questionMutate,
  } = useSWR<QuestionNamespace.GET>(
    `https://api.koochaa.com/forum/questions?limit=3&page=${page}&countryCode=${countryOrSlug}&${filterQuery}&${sortQuery}`,
    fetcher
  );

  return {
    question,
    questionError,
    isQuestion: !question && !questionError,
    questionMutate,
  };
}
// ${orderBy ? '&orderBy' : ''}
// &topicId=1f3a5261-c810-46ec-a4b2-b9bf95c08fd0
