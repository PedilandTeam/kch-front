import useAdPicture from "@/store/useAdPicture";
import { TrashIcon } from "@heroicons/react/24/outline";

export default function Picture({ blob, file, id }: {blob: Blob, file: File, id: string}) {

    const { removePicture } = useAdPicture()
    const deleteHandler = () => {
        removePicture(id)
    }

    return (
        <div
            className='relative h-28 w-28 overflow-hidden rounded-xl'
        >
            <div onClick={deleteHandler} className='absolute left-2 top-2 rounded-lg bg-black/40 p-1 text-white active:scale-95'>
                <TrashIcon className='h-4 w-4' />
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element*/}
            <img
                className='h-28 w-full flex-'
                src={URL.createObjectURL(file)}
                alt=''
            />
        </div>
    );
}
