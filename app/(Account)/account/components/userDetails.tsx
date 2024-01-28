import { useUser } from "@/store/useUser"
import {UserIcon} from '@heroicons/react/24/outline'


export default function UserDetails() {

    const { user } = useUser()

    return (
        <div className="h-16 px-2 grid grid-cols-9 grid-rows-1 gap-x-10 items-center hover:bg-gray-100 duration-75 rounded-xl mb-4">
            <div className="col-span-1">
                <UserIcon className="w-7 h-7 text-slate-600"/>
            </div>            
            <div className="col-span-8">
                {
                    user?
                    <>
                        <p className="text-slate-800">{user?.firstname} {user?.lastname}</p>
                        <p className="text-slate-600">{user?.email}</p>                
                    </>
                    :
                    <span className="loading loading-dots loading-sm  text-slate-500"></span>
                }
            </div>
        </div>
    )
}