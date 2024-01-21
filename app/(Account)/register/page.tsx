import RegisterForm from "./form";
import { API_ROUTES } from "@/routes";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const Register = async (param?: {
  searchParams?: { slug?: string; claimWay: string };
}) => {
  const slug = param?.searchParams?.slug;
  const claimWay = param?.searchParams?.claimWay;

  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;
  let haveAccess: boolean = true;
  if (token) {
    await API_ROUTES.AUTH.CHECK(token)
      .then(async (res) => {
        const data = await res.json();
        haveAccess = false;
      })
      .catch((e) => {
        if (e?.status == 401) {
          haveAccess = true;
        }
        console.log(e);
      });
  }

  if (!haveAccess) {
    redirect("/home/mybiz/add");
  }
  return <RegisterForm slug={slug} claimWay={claimWay} />;
};
export default Register;
