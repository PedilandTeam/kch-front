import Link from "next/link";
import React from "react";

export default function CheckUserModal() {
  return (
    <dialog id="my_modal_3" className="modal bg-opacity-50 bg-gray-800">
      <div className="modal-box rounded-lg shadow-lg p-6">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <div className="flex items-center justify-between border-b-3 border-dotted pb-4 mb-4">
            <button className="btn btn-sm btn-circle btn-ghost">✕</button>
            <h2 className="flex-grow text-center text-lg font-semibold ml-7">
              ورود/ثبت نام
            </h2>
          </div>
          <div className="flex flex-col gap-4 text-[14px] items-center w-full mt-4">
            <p className="text-center">
              وارد حساب کاربری خود شوید یا در صورت نداشتن حساب کاربری، ثبت نام
              کنید.
            </p>
            <Link href="/account"> <button className="btn btn-active btn-primary ">
              ثبت نام / ورود
            </button></Link>
           
          </div>
        </form>
      </div>
    </dialog>
  );
}
