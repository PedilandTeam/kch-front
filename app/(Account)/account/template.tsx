
import React from "react";
import SideMenu from "@app/layout/sideMenu";
import { SideMenuList } from "@app/layout/sideMenuList";
import { UserModule } from "@/modules/user.module";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
// import SideMenu from "../layout/side-menu";


export default async function Layout({ children }: { children: React.ReactNode }) {


  const cookieStore = cookies()
  const token = cookieStore.get('token')?.value
  const userModule = new UserModule(token || null)
  await userModule.fetchUser().
  catch(e => {
    if (e.response?.status === 401) {
      redirect('/login?notAuthenticated')
    }
  })

  if (!userModule.authenticated) {
    redirect('/login?notAuthenticated')
  }

  if (!userModule.verified) {
    redirect('/account?notVerified')
  }

  return (
    <div className={`grid grid-cols-5 gap-5`}>
      <div className="col-span-4">
        <div className="grid grid-cols-4 gap-5">
          <div className="col-span-1">
            <SideMenu SideMenuList={SideMenuList} />
            {/* <SideMenu /> */}
          </div>
          <div className={`col-span-3`}>
            {children}
          </div>
        </div>
      </div>
      <div className="col-span-1"></div>
    </div>
  )

}