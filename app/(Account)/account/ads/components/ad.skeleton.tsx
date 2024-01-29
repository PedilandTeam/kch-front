import { memo } from "react";

function AdSkeleton() {
    return (
        <>
            {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className='flex w-11/12 shrink-0 flex-col justify-between gap-y-6 rounded-lg border px-5 py-5 md:h-36 md:w-7/12 md:flex-row '>
                    <div className='flex items-center'>
                        <div className='skeleton relative h-28 w-28 overflow-hidden rounded-lg'></div>
                        <div className='flex h-full flex-col items-start justify-center pr-4'>
                            <div className='skeleton min-h-[1.5rem] w-24 rounded-md'></div>
                            <div className=' mt-4 text-gray-700'>
                                <p className='skeleton min-h-[1rem] w-24'></p>
                                <p className='skeleton mt-1 min-h-[1rem] w-24'></p>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col items-center justify-center gap-y-2 '>
                        <p className='skeleton min-h-[1.5rem] w-24'></p>
                        <div className='skeleton h-10 w-full rounded-md'></div>
                    </div>
                </div>
            ))}
        </>
    );
}

export default memo(AdSkeleton)
