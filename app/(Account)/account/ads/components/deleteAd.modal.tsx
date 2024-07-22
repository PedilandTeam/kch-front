'use client'

import Button from "@/components/daisy/button";
import axios from "axios";
import useDeleteAd from "../hooks/useDeleteAd";
import toast from "react-hot-toast";
import { useRef } from "react";
import { mutate } from "swr";
import { useRouter } from "next/navigation";


type DeleteAdModal =  {

}
export default function DeleteAdModal({adId}: {adId: string}) {

    const closeRef = useRef<HTMLLabelElement>(null);
    const { deleteAd, deleteAdLoading } = useDeleteAd()
    const router = useRouter()
    const deleteAdHandler = () => {

        deleteAd(adId)
        .then(() => {
            toast.success('با موفقیت حذف شد')
            closeRef.current?.click()
            router.push('/account/ads')
            mutate(`${process.env.NEXT_PUBLIC_CHECKAUTH_URL}`)
        })

    }

    return (
        <>
            <input type='checkbox' id='delete_ad_modal' className='modal-toggle' />
            <div className='modal' role='dialog'>
                <div className='modal-box'>
                    <h3 className='text-lg font-bold'>حذف آگهی</h3>
                    <p className='py-4'>
                        آیا از حذف آگهی اطمینان دارید؟
                    </p>
                    <div className="w-full flex justify-end items-center gap-x-2 mt-6">
                        <Button
                            onClick={deleteAdHandler}
                            isLoading={deleteAdLoading}
                            className="btn-error bg-red-500 text-white"
                        >
                            حذف شود
                        </Button>
                        <label
                            htmlFor='delete_ad_modal'
                            className="btn btn-ghost w-3/12"
                        >
                            انصراف
                        </label>
                    </div>
                </div>
                <label ref={closeRef} className='modal-backdrop' htmlFor='delete_ad_modal'>
                    
                </label>
            </div>
        </>
    );
}
