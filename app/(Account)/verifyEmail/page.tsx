import { cookies } from "next/headers";
import VerifyEmailForm from "./form";
import { API_ROUTES } from "@/routes";
import { redirect } from "next/navigation";
import { IUser } from "@/types/user";



export default async function VerifyEmailPage() {

    const cookieStore = cookies()
    const token = cookieStore.get('token')?.value
    let haveAccess: boolean = false
    let user: IUser;

    // if (!token) {
    //     redirect('/login')
    // }

    // if (token) {
    //     await API_ROUTES.AUTH.CHECK(token)
    //         .then(async res => {
    //             const response = await res.json()
    //             if (res.ok) {
    //                 haveAccess = true
    //                 user = response;
    //             }
    //         })
    //         .catch(e => {
    //             if (e?.status == 401) {
    //                 haveAccess = false
    //             };
    //             console.log(e);
    //         })
    // }

    // if (!haveAccess) {
    //     redirect(`/login`)
    // }
    if (user?.emailVerified) {
        return (
            <h1>حساب شما تایید شده است</h1>
        )
    }


    return (
        <VerifyEmailForm email={user?.email} />
    )

}