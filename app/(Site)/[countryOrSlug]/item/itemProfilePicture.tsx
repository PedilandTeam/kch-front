import { AdNamespace } from '@/types/ad';
import { PageNamespace } from '@/types/page';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

type itemProfilePictureType = {
    adData: AdNamespace.IAd
    height?: number;
    width?: number;
    className?: string;
};
export default function ItemProfilePicture({
    adData,
    height,
    width,
    className,
}: itemProfilePictureType) {
    return (
        <Image
            loading='lazy'
            alt='logo'
            src={
                adData.pictures?.length > 0
                    ? `${process.env.NEXT_PUBLIC_DL_URL}/ads/${adData.id}/${adData.pictures[0]}`
                    : '/images/list/logo/logo-placeholder.webp'
            }
            width={width ?? 160}
            height={height ?? 160}
            className={className}
        />
    );
}
