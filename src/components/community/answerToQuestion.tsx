import React, { useState } from "react";
import toast from "react-hot-toast";
import SpinnerBtn from "./SpinnerBtn";
import useSWRMutation from "swr/mutation";

// API function for posting answers
async function postAnswerAPI(url: string, { arg }: { arg: { text: string; questionId: string } }) {
  const response = await fetch(url, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(arg),
  });

  if (!response.ok) {
    throw new Error("Failed to post answer");
  }

  return response.text();
}

export default function AnswerToQuestion({
  openAnswer,
  questionId,
  onAnswerPosted,
}: {
  openAnswer: boolean;
  questionId: string;
  onAnswerPosted?: () => void;
}) {
  const [text, setText] = useState<string>("");
  
  const { trigger, isMutating } = useSWRMutation(
    `${process.env.NEXT_PUBLIC_API_URL}/forum/answers`,
    postAnswerAPI,
    {
      onSuccess: () => {
        toast.success("پاسخ شما با موفقیت ثبت شد و پس از تایید منتشر میگردد", {
          duration: 4000,
        });
        setText(""); // Clear the text after successful submission
        onAnswerPosted?.(); // Trigger refresh of answers list
      },
      onError: (err) => {
        console.error(err);
        toast.error("خطایی رخ داد");
      },
    }
  );

  const handleSubmit = async () => {
    if (!text.trim()) {
      toast.error("لطفاً متن پاسخ را وارد کنید");
      return;
    }

    await trigger({ text, questionId });
  };
  return (
    <div>
      {/* Answer Section */}
      {openAnswer && (
        <div className="answer-div mt-4 rounded-xl bg-blue-100 p-4">
          {/* <h3 className="text-lg font-bold mb-2">پاسخ شما</h3> */}
          <textarea
            className="textarea h-16 w-full rounded-md border border-gray-300 p-2"
            placeholder="پاسخ خود را اینجا بنویسید..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
          <button
            disabled={isMutating}
            onClick={handleSubmit}
            className="btn btn-primary btn-xs sm:btn-md mt-2 rounded-xl"
          >
            {isMutating ? <SpinnerBtn text="در حال ارسال" /> : " ارسال پاسخ"}
          </button>
        </div>
      )}
    </div>
  );
}
