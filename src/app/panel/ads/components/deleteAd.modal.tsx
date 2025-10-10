"use client";

import useDeleteAd from "../hooks/useDeleteAd";
import toast from "react-hot-toast";
import { useRef } from "react";
import { mutate } from "swr";
import { useRouter } from "next/navigation";
import { Button } from "@components";

type DeleteAdModal = {};
export default function DeleteAdModal({ adId }: { adId: string }) {
  const closeRef = useRef<HTMLLabelElement>(null);
  const { deleteAd } = useDeleteAd();
  const router = useRouter();
  const deleteAdHandler = () => {
    deleteAd(adId).then(() => {
      toast.success("با موفقیت حذف شد");
      closeRef.current?.click();
      router.push("/account/ads");
      mutate(`${process.env.NEXT_PUBLIC_CHECKAUTH_URL}`);
    });
  };

  return (
    <>
      <input type="checkbox" id="delete_ad_modal" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <h3 className="text-lg font-bold">حذف آگهی</h3>
          <p className="py-4">آیا از حذف آگهی اطمینان دارید؟</p>
          <div className="mt-6 flex w-full items-center justify-end gap-x-2">
            <Button
              onClick={deleteAdHandler}
              className="btn-error bg-red-500 text-white"
            >
              حذف شود
            </Button>
            <label htmlFor="delete_ad_modal" className="btn btn-ghost w-3/12">
              انصراف
            </label>
          </div>
        </div>
        <label
          ref={closeRef}
          className="modal-backdrop"
          htmlFor="delete_ad_modal"
        ></label>
      </div>
    </>
  );
}
