'use client';
import useAdPicture from '@/store/useAdPicture';
import { PlusIcon } from '@heroicons/react/24/solid';
import { useEffect } from 'react';

export default function PictureUploader() {

    const { addPicture, pictures } = useAdPicture()

    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const fileReader = new FileReader()
        if (!e.target.files) return;
        const file = e.target.files[0];
        if(!file) return;
        fileReader.readAsBinaryString(file);
        fileReader.onload = (event: ProgressEvent<FileReader>) => {
            const blob = new Blob([event.target?.result as BlobPart], { type: file.type })
            addPicture(blob, file)
        }
    };

    return (
        <>
            <label htmlFor='newpic' className='flex h-28 w-28 items-center justify-center rounded-xl border-2 border-dotted'>
                <PlusIcon className='h-12 w-12 text-primary' />
            </label>
            <input onChange={onFileChange} accept='.jpg, .jpeg, .png, .webp' id='newpic' type="file" className='hidden' />
        </>
    );
}
