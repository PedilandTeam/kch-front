import useAdPicture from '@/store/useAdPicture';
import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function useUploadAdPictures() {
    const [loading, setLoading] = useState<boolean>(false);
    const { pictures, clearPictures } = useAdPicture();

    const uploadAdPictures = async (adId: string): Promise<any> => {

        // Upload Ad pictures
        const form = new FormData();

        for (const picture of pictures) {
            form.append('images', picture.file);
        }

        setLoading(true);
        return await axios
            .post(
                `${process.env.NEXT_PUBLIC_API_URL}/ads/${adId}/pictures`, form,
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                }
            )
            .then((res) => {
                return res.data?.id;
            })
            .catch((err) => {
                toast.error(
                    err.response.data?.message ||
                        'خطایی در هنگام أپلود پیش آمد'
                );

                throw Error('خطایی در هنگام آپلود پیش آمد');
            })
            .finally(() => {
                setLoading(false);
            });
    };
    return {
        uploadAdPicturesLoading: loading,
        uploadAdPictures,
    };
}
