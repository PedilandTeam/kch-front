
import RegisterForm from "./form";
import { API_ROUTES } from "@/routes";
import axios from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation"; 

const Register = async (param?: {
  searchParams?: { slug?: string; claimWay: string };
}) => {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;
  let haveAccess: boolean = true;

  if (token) {
    await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/user/check`, {
      headers: {
        Cookie: `token=${token}`
      }
    })
    .then(res => {
      haveAccess = false;
    })
    .catch(e => {
      console.log(e);
    })
  }

  if (!haveAccess) {
    redirect("/account");
  }
  return <RegisterForm />;
};
export default Register;
