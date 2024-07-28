import React, { useState } from "react";
import toast from "react-hot-toast";

export default function AnswerToQuestion({
  openAnswer,
  questionId,
}: {
  openAnswer: boolean;
  questionId: string;
}) {
  // post
  const [text, setText] = useState<string>("");

  async function postAnswer() {
    const url = `https://api.koochaa.com/forum/answers`;
    try {
      const req = await fetch(url, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text,
          questionId,
        }),
      });
      const res = await req.text();
      console.log(res);
      toast.success("پاسخ شما با موفقیت ثبت شد و پس از تایید منتشر میگردد", {
        duration: 4000, 
      });    } catch (error) {
      console.error(error);
      toast.error("خطایی رخ داد")
    }
  }
  return (
    <div>
      {/* Answer Section */}
      {openAnswer && (
        <div className="answer-div bg-blue-100 p-4 mt-4 rounded-xl">
          {/* <h3 className="text-lg font-bold mb-2">پاسخ شما</h3> */}
          <textarea
            className="textarea w-full h-16 p-2 rounded-md border border-gray-300"
            placeholder="پاسخ خود را اینجا بنویسید..."
            onChange={(e) => {
              setText(e.target.value);
            }}
          ></textarea>
          <button
            onClick={() => postAnswer()}
            className="btn btn-primary mt-2 rounded-xl btn-xs sm:btn-md"
          >
            ارسال پاسخ
          </button>
        </div>
      )}
    </div>
  );
}
