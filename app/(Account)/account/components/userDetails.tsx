import { useUser } from "@/store/useUser";
import { UserIcon } from "@phosphor-icons/react/dist/ssr";

export default function UserDetails({ className }: { className?: string }) {
  const { user } = useUser();

  return (
    <div
      className={`${className ? className : ""} mb-4 grid h-16 select-none grid-cols-9 grid-rows-1 items-center gap-x-10 rounded-xl px-2 duration-75 hover:bg-gray-100`}
    >
      <div className="col-span-1">
        <UserIcon className="h-7 w-7 text-slate-600" />
      </div>
      <div className="col-span-8">
        {user ? (
          <>
            <p className="text-slate-800">
              {user?.firstname} {user?.lastname}
            </p>
            <p className="text-slate-600">{user?.email}</p>
          </>
        ) : (
          <span className="loading loading-dots loading-sm text-slate-500"></span>
        )}
      </div>
    </div>
  );
}
