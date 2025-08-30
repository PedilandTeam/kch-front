import { fetcher } from "@/hooks/fetcher";
import { Question } from "@/types/answer";
import useSWR from "swr";

function useGetQuestion(questionIdParams: string) {
  const {
    data: question,
    error: questionError,
    isLoading: questionIsLoading,
    mutate: mutateQuestion,
  } = useSWR<Question | null>(
    `https://api.koochaa.com/forum/questions/${questionIdParams}`,
    fetcher
  );
  return { question, questionError, questionIsLoading, mutateQuestion };
}

export default useGetQuestion;
