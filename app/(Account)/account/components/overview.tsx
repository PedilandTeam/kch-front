import DataBox from "@/components/global/dataBox"
import { useUser } from "@/store/useUser"
import { ChevronLeftIcon } from '@heroicons/react/24/solid'
import Link from "next/link"


export default function Overview (){

    const { user } = useUser()
    
    return (
        <div className="w-full flex flex-col pt-12 pr-5 justify-center items-center lg:items-start">
            <p className="text-xl font-medium">خوش اومدی {user?.firstname} {user?.lastname}!</p>
            <p>از اینجا میتونی یکسری اطلاعات راجب آگهی‌هات ببینی</p>

            <div className="mt-12"></div>
            <div className="flex flex-col lg:flex-row  w-full gap-x-2">
                <DataBox title="کل آگهی های تایید شده شما:" data={20} link={'/account/ads'} linkText={'مشاهده'} />
                <DataBox title="اعتبار" data={40000} link={'/account/balance'} linkText={'مدیریت‌مالی'} />
            </div>
        </div>
    )

}