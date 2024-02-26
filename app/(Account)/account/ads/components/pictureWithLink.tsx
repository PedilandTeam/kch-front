import useAdPicture from "@/store/useAdPicture";
import { TrashIcon } from "@heroicons/react/24/outline";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { mutate } from "swr";

export default function PictureWithLink({link, adId, pictureId }: {link?: string, adId: string, pictureId: string}) {


    const [deleteLoading, setDeleteLoading] = useState<boolean>(false)

    const deletePictureHandler = async() => {
        setDeleteLoading(true)
        toast.promise(
            axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/ads/${adId}/pictures/${pictureId}`, {
                withCredentials: true,
            })
            .then(res => {
                mutate(`${process.env.NEXT_PUBLIC_API_URL}/ads/${adId}`)
            })
            .catch((e: AxiosError) => {
                const data = e.response?.data as {message: string}
                toast.error(`خطایی رخ داد ${data?.message}`)
            })
            .finally(() => {
                setDeleteLoading(false)
            }),
            {
                loading: 'درحال حذف عکس',
                success: 'با موفقیت حذف شد',
                error: 'حذف عکس با خطا مواجه شد'
            }
        )
    }

    return (
        <div
            className={`relative h-28 w-28 overflow-hidden rounded-xl ${deleteLoading && 'transform-cpu animate-pulse'} `}
        >
            <div onClick={deletePictureHandler} className='absolute left-2 top-2 rounded-lg bg-black/40 p-1 text-white active:scale-95'>
                <TrashIcon className='h-4 w-4' />
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element*/}
            <img
                className='h-28 w-full flex-'
                src={`${process.env.NEXT_PUBLIC_DL_URL}/ads/${adId}/${pictureId}`}
                alt=''
            />
        </div>
    );
}
