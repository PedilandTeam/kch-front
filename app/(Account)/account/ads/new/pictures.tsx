'use client';

import PictureUploader from '@/components/global/pictureUploader/pictureUploader';
import useAdPicture from '@/store/useAdPicture';
import { TrashIcon } from '@heroicons/react/24/solid';
import Picture from './picture';
import { useEffect } from 'react';
export default function Pictures() {
    const { pictures, removePicture } = useAdPicture();

    return (
        <div className='w-full flex flex-col justify-center items-center'>
            <p className='text-lg font-bold text-black/80'>عکس آگهی</p>
            <p>عکس مربوط به آگهی خود را در قسمت پایین اپلود کنید</p>
            <div className='mb-3'></div>
            <div className='flex flex-wrap items-center justify-center gap-2 '>
                <PictureUploader />
                {pictures.length > 0 &&
                    pictures.map((pic, index) => (
                        <Picture file={pic.file} blob={pic.blob} id={pic.id} key={pic.id} />
                    ))}
            </div>
        </div>
    );
}
