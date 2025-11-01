import toast from "react-hot-toast";

function usePostDownVoteAnswer(questionMutate: any) {
  async function downVote(id: string | number) {
    const url = `https://api.koochaa.com/forum/votes/answer/${id}/down`;

    try {
      const req = await fetch(url, {
        method: "post",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const res = await req.text();
      questionMutate();
    } catch (err) {
      console.error(err);
      toast.error("خطا");
    }
  }
  return downVote;
}

export default usePostDownVoteAnswer;
