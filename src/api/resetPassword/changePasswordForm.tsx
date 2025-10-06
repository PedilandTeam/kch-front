import { Button, Input } from "@/components";
import { REGEX } from "@/utils/regex";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import useChangePassword from "./useChangePassword";

type ChangePasswordForm = {
  token: string;
  email: string;
};

export default function ChangePasswordForm({
  token,
  email,
}: ChangePasswordForm) {
  const [newPassword, setNewPassword] = useState<string>("");
  const [repeatPassword, setRepeatPassword] = useState<string>("");

  const [isPasswordValid, setIsPasswordValid] = useState<boolean>();
  const isPasswordSame = repeatPassword === newPassword;

  const changePasswordHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const newPasswordValue = e.currentTarget.value;
    setNewPassword(newPasswordValue);
    setIsPasswordValid(REGEX.NOT_GLOBAL_PASSWORD.test(newPasswordValue));
  };

  const changeRepeatPasswordHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setRepeatPassword(e.currentTarget.value);
  };

  const { changePassword, loading, error } = useChangePassword();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    changePassword(token, email, newPassword);
    // Add logic for form submission here
  };

  useEffect(() => {
    if (!error) return;
    const data = error?.response?.data as { message?: string };
    toast.error(data?.message || "خطایی پیش آمد");
  }, [error]);

  return (
    <form className="flex h-full items-center" onSubmit={handleSubmit}>
      <div className="mx-auto w-4/12">
        <h1 className="font-semibold">رمز عبور جدید</h1>
        <p className="mb-3">رمز عبور جدیدی برای اکانت خود انتخاب کنید</p>
        <div className="grid gap-3">
          <Input
            onChange={changePasswordHandler}
            value={newPassword}
            placeholder="رمز عبور جدید"
            type="password"
          />
          <Input
            onChange={changeRepeatPasswordHandler}
            value={repeatPassword}
            placeholder="تکرار رمز عبور جدید"
            type="password"
          />
        </div>
        <div className="">
          <Button
            type="submit"
            className="btn-primary my-6 w-full"
            color="primary"
          >
            ارسال
          </Button>
        </div>
      </div>
    </form>
  );
}
