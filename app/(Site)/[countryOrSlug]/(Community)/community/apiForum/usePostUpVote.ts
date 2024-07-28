import toast from "react-hot-toast";
import { useQuestions } from "./useGetQuestions";
import { useState } from "react";

function usePostUpVote(questionMutate: any) {
  const [loading, setLoading] = useState(false);

  async function vote(id: string | number) {
    setLoading(true);
    const url = `https://api.koochaa.com/forum/votes/question/${id}/up`;

    try {
      const req = await fetch(url, {
        method: "post",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const res = await req.text();
      console.log(res);
      toast.success("با موفیت ثبت شد");
      questionMutate();
    } catch (err) {
      console.error(err);
      toast.error("خطا");
    } finally {
      setLoading(false);
    }
  }

  return { vote, isVoteLoading: loading };
}

export default usePostUpVote;
