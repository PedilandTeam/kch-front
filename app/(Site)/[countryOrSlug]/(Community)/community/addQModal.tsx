import { values } from "lodash";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useCheckUser from "./apiForum/useCheckUser";
import CheckUserModal from "./component/checkUserModal";
import SpinnerBtn from "./component/SpinnerBtn";
import useGetTopic from "./apiForum/useGetTopic";
interface Topic {
  id: string;
  slug: string;
  title: string;
  description: string;
}

export default function AddQModal() {
  const [title, setTitle] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [selectedTopic, setSelectedTopic] = useState<string>("");
  const { checkUser } = useCheckUser();

  //   get topic
  const { data:topics, isLoading: isTopicLoading, mutate } = useGetTopic();
  
  // post
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const fetchData = () => {
    setIsLoading(true);
    fetch("https://api.koochaa.com/forum/questions", {
      method: "POST",
      body: JSON.stringify({
        countryId: 4,
        topicId: selectedTopic,
        title,
        text,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((response) => response.json())
      .then((result) => {
        // console.log(result);
        toast.success("سوال شما با موفقیت ثبت شد و پس از تایید منتشر میگردد", {
          duration: 4000, // Duration in milliseconds (4 seconds)
        });
      })
      .catch((error) => {
        console.error(error);
        toast.error("خطایی رخ داد");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const handleCreateQuestionClick = async () => {
    const isUserAuthenticated = await checkUser();
    if (!isUserAuthenticated) {
      (document.getElementById("my_modal_3") as HTMLFormElement).showModal();
    } else {
      (document.getElementById("my_modal_5") as HTMLFormElement).showModal();
    }
  };
  return (
    <>
      <button
        className="btn btn-warning rounded-[1rem] "
        onClick={handleCreateQuestionClick}
      >
        <h2 className="font-bold"> + ایجاد سوال</h2>
      </button>
      <dialog
        id="my_modal_5"
        className="modal md:modal-middle modal-bottom h-[100vh]"
      >
        <div className="modal-box">
          {/* header */}
          <h2 className="font-bold text-lg">ثبت سوال</h2>
          {/* body */}
          <div className="modal-action gap-3 flex flex-col">
            <select
              onChange={(e) => {
                setSelectedTopic((e.target as HTMLSelectElement).value);
              }}
              defaultValue=""
              className="select mb-3 bg-gray-50 w-full rounded-[1rem]"
            >
              <option value="" disabled>
                انتخاب تاپیک
              </option>
              {topics?.items.map((topic: any) => (
                <option key={topic.id} value={topic.id}>
                  {topic.title}
                </option>
              ))}
            </select>
            {/* Q */}
            <input
              type="text"
              placeholder="سوال"
              className="input w-full mb-3 input-lg bg-gray-50 rounded-[1rem]"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
            {/* textArea */}
            <textarea
              className="textarea pb-10 w-full bg-gray-50 rounded-[1rem]"
              placeholder="توضیحات"
              onChange={(e) => {
                setText(e.target.value);
              }}
            ></textarea>
            {/* submit */}
            <div className="flex mt-3">
              <button
                disabled={isLoading}
                onClick={(e) => {
                  e.preventDefault();
                  fetchData();
                }}
                className="btn ml-3 btn-warning rounded-[1rem]"
              >
                <h2 className="font-bold">
                  {isLoading ? <SpinnerBtn text="در حال ثبت" /> : "ثبت سوال"}
                </h2>
              </button>
              <form method="dialog">
                <button className="btn mb-1 btn rounded-[1rem]">بستن</button>
              </form>
            </div>
          </div>
        </div>
      </dialog>
      <CheckUserModal />
    </>
  );
}
