"use client";
import { useState } from "react";
import { Bell, FadersHorizontal, SortAscending } from "@phosphor-icons/react";

export default function CommunityHeader() {
  const [filterDropdown, setFilterDropdown] = useState("ترتیب");

  const [colseFilterDropdown, setColseFilterDropdown] = useState(false);
  const [colseSortDropdown, setColseSortDropdown] = useState(false);

  return (
    <>
      <div className=" header fixed top-0 w-full  bg-white z-50 shadow-md">
        <div className="p-4 flex flex-col gap-3 max-w-screen-xl mx-auto ">
          <div className="flex items-center gap-3">
            <input
              type="text"
              placeholder="دنبال چی می گردی؟"
              className="input  w-full bg-gray-50 rounded-[1rem] "
            />

            <button className="btn btn-ghost btn-square  rounded-[1rem]  ">
              <Bell size={33} color="#676567" />
            </button>
          </div>
          {/*  */}
          <div className="flex  justify-between mt-3 ">
            <button
              className="btn btn-warning rounded-[1rem] "
              onClick={() => {
                (
                  document.getElementById("my_modal_5") as HTMLFormElement
                ).showModal();
              }}
            >
              <h2 className="font-bold"> + ایجاد سوال</h2>
            </button>
            <dialog
              id="my_modal_5"
              className="modal md:modal-middle modal-bottom h-[100vh]"
            >
              <div className="modal-box">
                {/*header */}
                <h2 className="font-bold text-lg">ثبت سوال</h2>
                {/* body */}
                <div className="modal-action gap-3 flex flex-col">
                  {" "}
                  <select className="select mb-3 bg-gray-50 w-full rounded-[1rem]">
                    <option disabled selected>
                      انتخاب تاپیک{" "}
                    </option>
                    <option>Homer</option>
                    <option>Marge</option>
                    <option>Bart</option>
                    <option>Lisa</option>
                    <option>Maggie</option>
                  </select>
                  {/* Q */}
                  <input
                    type="text"
                    placeholder="سوال"
                    className="input w-full mb-3  input-lg bg-gray-50 rounded-[1rem] "
                  />
                  {/* textArea */}
                  <textarea
                    className="textarea h-[6rem] w-full bg-gray-50 rounded-[1rem]"
                    placeholder="توضیحات"
                  ></textarea>
                  {/* submit */}
                  <div className="flex mt-3">
                    {" "}
                    <button className="btn ml-3  btn-warning rounded-[1rem] ">
                      <h2 className="font-bold"> ثبت سوال</h2>
                    </button>{" "}
                    <form method="dialog">
                      {" "}
                      <button className="btn mb-1 btn-error rounded-[1rem]  h-[1rem]">
                        بستن
                      </button>
                    </form>
                  </div>
                  {/* if there is a button in form, it will close the modal */}
                </div>
              </div>
            </dialog>

            {/* filter  */}
            <div className="flex items-center gap-2">
              <div className="dropdown dropdown-bottom dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  onClick={() => {
                    setColseFilterDropdown(!colseFilterDropdown);
                    setColseSortDropdown(false);
                  }}
                  className="btn btn-ghost  btn-sm dropdown-hover m- bg-transparent bg-contain border-none  font-medium font-sm"
                >
                  <FadersHorizontal size={21} color="#676567" />
                  فیلتر
                </div>
                {colseFilterDropdown && (
                  <ul
                    onClick={() => setColseFilterDropdown(!colseFilterDropdown)}
                    tabIndex={0}
                    className="menu dropdown-content bg-base-100 rounded-box z-[1] w-48 p-2 shadow"
                  >
                    <li>
                      <a>Item 1</a>
                    </li>
                    <li>
                      <a>Item 2</a>
                    </li>
                  </ul>
                )}
              </div>

              {/* sort */}
              <div className="dropdown dropdown-bottom dropdown-end">
                <div
                  onClick={() => {
                    setColseSortDropdown(!colseSortDropdown);
                    setColseFilterDropdown(false);

                  }}
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost  btn-sm dropdown-hover m- bg-transparent bg-contain border-none  font-medium font-sm"
                >
                  <SortAscending size={21} color="#676567" />
                  {filterDropdown}
                </div>
                {colseSortDropdown && (
                  <ul
                    onClick={() => setColseSortDropdown(!colseSortDropdown)}
                    tabIndex={0}
                    className=" menu dropdown-content bg-base-100 rounded-box z-[1] w-48 p-2 shadow"
                  >
                    <li>
                      <a>Item 1</a>
                    </li>
                    <li>
                      <a>Item 2</a>
                    </li>
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
