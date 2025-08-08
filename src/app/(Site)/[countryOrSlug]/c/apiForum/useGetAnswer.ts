import { fetcher } from "@/swr/fetcher";
import { AnswerNamespace } from "@/types/answer";
import useSWR from "swr";

function useGetAnswer(
  countryOrSlug: string,
  questionIidParam: string,
  currentPage: number | string | null
) {
  const page = currentPage ? currentPage : 1;
  const { data, isLoading, error, mutate } = useSWR<AnswerNamespace.GET>(
    `https://api.koochaa.com/forum/answers?limit=30&page=${page}&countryCode=${countryOrSlug}&questionId=${questionIidParam}`,
    fetcher
  );

  return { data, isLoading, error, mutate };
}

export default useGetAnswer;
