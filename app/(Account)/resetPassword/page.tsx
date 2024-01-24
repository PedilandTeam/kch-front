"use client";
import { useSearchParams } from "next/navigation";
import SendLinkForm from "./sendLinkform";
import ChangePasswordForm from "./changePasswordForm";

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  if (!!token && !!email) {
    return <ChangePasswordForm token={token} email={email} />;
  }

  return <SendLinkForm />;
}
