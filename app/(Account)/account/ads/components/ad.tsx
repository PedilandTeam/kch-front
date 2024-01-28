import Button from '@/components/daisy/button';
import { AdNamespace } from '@/types/ad';
import moment from 'moment';
import Image from 'next/image';

export default function Ad({ data }: { data: AdNamespace.IAd }) {

    console.log(data);
    

    return (
        <div className='flex flex-col md:flex-row md:h-36 gap-y-6 w-11/12 md:w-7/12 shrink-0 justify-between rounded-lg border px-5 py-5 '>
            <div className='flex items-center'>
                <div className='relative h-28 w-28 overflow-hidden rounded-lg'>
                    <Image
                        src={
                            data.pictures?.[0]
                                ? `${process.env.NEXT_PUBLIC_DL_URL}/ads/${data.id}/${data.pictures?.[0]}`
                                : '/images/list/logo/logo-placeholder.webp'
                        }
                        alt='عکس آگهی'
                        fill
                    />
                </div>
                <div className='flex h-full flex-col items-start justify-center pr-4'>
                    <p className='text-xl font-medium'>{data.title}</p>
                    <div className=' text-gray-700 mt-4'>
                        <p>{data.price ? `${data?.price.toLocaleString()} دلار` : 'توافقی'}</p>
                        <p>{moment(data.createdDate).calendar()} در {data.city?.name}</p>
                    </div>
                </div>
            </div>
            <div className='flex flex-col gap-y-2 justify-center items-center'>
                <p>وضعیت: {data.availability ? <span className='text-green-700'>منتشر شده</span> : <span className='text-red-500'>تعلیق</span>}</p>
                <Button className='btn-outline btn-primary w-full'>ویرایش آگهی</Button>
            </div>
        </div>
    );
}
