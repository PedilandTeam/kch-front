"use client";
import { useEffect, useState } from "react";
import { Bell, FadersHorizontal, SortAscending } from "@phosphor-icons/react";
import { number, string } from "yup";

export default function CommunityHeaderMobile() {
  const [filterDropdown, setFilterDropdown] = useState("ترتیب");
  const [colseFilterDropdown, setColseFilterDropdown] = useState(false);
  const [colseSortDropdown, setColseSortDropdown] = useState(false);

  // const [lastScrollY, setLastScrollY] = useState(0);
  const [topFix, setTopFix] = useState(18);
  const [fix, setfix] = useState(false);

  const [topFixXl, setTopFixXl] = useState<number | string>(5);

  // console.log(lastScrollY);
  const currentScrollY = window.scrollY;
  const handleScroll = () => {
    let currentScrollY = window.scrollY;
    if (currentScrollY > 100) {
      setfix(true);
    }

    if (currentScrollY <= 1) {
      setTopFix(18);
      setTopFixXl(5);
      setfix(false);
    } else {
      setTopFix(0);
      setTopFixXl(-5);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div className=" xl:bg-white  bg-white xl:mt-3 xl:border-t xl:border-gray-50 xl:shadow-md  xl:py-4 pr-4 pl-2 py-2 header w-full xl:max-w-[72rem] xl:rounded-t-2xl ">
        <div className=" flex flex-col gap-2 max-w-screen-xl mx-auto  ">
          <div className="flex items-center gap-1">
            <input
              type="text"
              placeholder="دنبال چی می گردی؟"
              className="input w-full bg-gray-50 rounded-[1rem] "
            />
            <button className="btn btn-ghost btn-square  rounded-[1rem]  ">
              <Bell size={33} color="#676567" />
            </button>
          </div>
        </div>
      </div>

      {/*  part2*/}
      <div
        className={`fixed top-${topFix}   transition-transform duration-300 shadow-md bg-white 
           xl:bg-white pr-4 pl-2 py-2 header w-full xl:py-4 xl:max-w-[72rem]  z-10 xl:rounded-b-2xl`}
      >
        <div className={`flex flex-col gap-2 max-w-screen- mx-auto  `}>
          <div className="flex justify-between">
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
              <div className="modal-box  ">
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
                    className="textarea pb-10 w-full bg-gray-50 rounded-[1rem]"
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
                      <button className="btn mb-1 btn-error rounded-[1rem]">
                        بستن
                      </button>
                    </form>
                  </div>
                  {/* if there is a button in form, it will close the modal */}
                </div>
              </div>
            </dialog>

            {/* filter  */}
            <div className="flex items-center ">
              <div className="dropdown dropdown-bottom dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  onClick={() => {
                    setColseFilterDropdown(!colseFilterDropdown);
                    setColseSortDropdown(false);
                  }}
                  className="btn btn-ghost  btn-sm dropdown-hover m- bg-transparent bg-contain border-none font-medium xl:text-base"
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
                  className="btn btn-ghost xl:text-base btn-sm dropdown-hover m- bg-transparent bg-contain border-none  font-medium font-sm"
                >
                  <SortAscending size={21} color="#676567" />
                  {filterDropdown}
                </div>
                {colseSortDropdown && (
                  <ul
                    onClick={() => setColseSortDropdown(!colseSortDropdown)}
                    tabIndex={0}
                    className=" menu dropdown-content bg-base-100 rounded-box  w-48 p-2 shadow"
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
