'use client';

import PictureUploader from '@/components/global/pictureUploader/pictureUploader';
import useAdPicture from '@/store/useAdPicture';
import Picture from './picture';
import { memo, useEffect } from 'react';
import PictureWithLink from './pictureWithLink';
function Pictures({ currentPicturesPath = [], adId }: { currentPicturesPath?: string[], adId: string }) {
    const { pictures, removePicture } = useAdPicture();

    return (
        <div className='flex w-full flex-col items-center justify-center'>
            <p className='text-lg font-bold text-black/80'>عکس آگهی</p>
            <p>عکس مربوط به آگهی خود را در قسمت پایین اپلود کنید</p>
            <div className='mb-3'></div>
            <div className='flex flex-wrap items-center justify-center gap-2 '>
                <PictureUploader />
                {pictures.length > 0 &&
                    pictures.map((pic, index) => (
                        <Picture
                            file={pic.file}
                            blob={pic.blob}
                            id={pic.id}
                            key={pic.id}
                        />
                    ))}
                {
                    currentPicturesPath?.length > 0 &&
                    currentPicturesPath.map((picPath, index) => (
                        <PictureWithLink
                            adId={adId}
                            pictureId={picPath}
                            key={index}
                        />
                    ))
                }
            </div>
        </div>
    );
}

export default memo(Pictures);
