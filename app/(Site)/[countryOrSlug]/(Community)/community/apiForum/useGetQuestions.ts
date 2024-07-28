import { fetcher } from "@/app/swr/fetcher";
import { QuestionNamespace } from "@/types/questions";
import useSWR from "swr";

export function useQuestions(
  countryOrSlug: string,
  currentPage: number | string | null
) {
  const page = currentPage ? currentPage : 1;
  const {
    data: question,
    error: questionError,
    isLoading: isQuestion,
    mutate: questionMutate,
  } = useSWR<QuestionNamespace.GET>(
    `https://api.koochaa.com/forum/questions?limit=3&page=${page}&countryCode=${countryOrSlug}`,
    fetcher
  );

  return {
    question,
    questionError,
    isQuestion: !question && !questionError,
    questionMutate,
  };
}
