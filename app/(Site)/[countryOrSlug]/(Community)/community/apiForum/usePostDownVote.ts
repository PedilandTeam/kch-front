import toast from "react-hot-toast";

function usePostDownVote(questionMutate: any) {
  async function downVote(id: string | number) {
    const url = `https://api.koochaa.com/forum/votes/question/${id}/down`;

    try {
      const req = await fetch(url, {
        method: "post",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const res = await req.text();
      // console.log(res);
      toast.success("با موفیت ثبت شد");
      questionMutate();
    } catch (err) {
      console.error(err);
      toast.error("خطا");
    }
  }
  return downVote;
}

export default usePostDownVote;
