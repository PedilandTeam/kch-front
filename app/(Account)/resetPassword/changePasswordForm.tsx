import React, { useState, ChangeEvent, FormEvent } from "react";
import { REGEX } from "@/utils/regex";
import useChangePassword from "./useChangePassword";
import Input from "@/components/daisy/input";
import Button from "@/components/daisy/button";


type ChangePasswordForm = {
  token: string;
  email: string
}

export default function ChangePasswordForm({token, email}: ChangePasswordForm) {
  const [newPassword, setNewPassword] = useState<string>("");
  const [repeatPassword, setRepeatPassword] = useState<string>("");
  
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>()
  const isPasswordSame = repeatPassword === newPassword;

  const changePasswordHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const newPasswordValue = e.currentTarget.value;
    setNewPassword(newPasswordValue);
    setIsPasswordValid(REGEX.NOT_GLOBAL_PASSWORD.test(newPasswordValue));
  };

  const changeRepeatPasswordHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setRepeatPassword(e.currentTarget.value);
  };

  const {changePassword, loading} = useChangePassword()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    changePassword(token, email, newPassword)
    // Add logic for form submission here
  };

  return (
    <form className="h-full flex items-center" onSubmit={handleSubmit}>
      <div className="w-4/12 mx-auto">
        <h1 className="font-semibold">رمز عبور جدید</h1>
        <p className="mb-3">رمز عبور جدیدی برای اکانت خود انتخاب کنید</p>
        <div className="grid gap-3">
          <Input
            onChange={changePasswordHandler}
            value={newPassword}
            placeholder="رمز عبور جدید"
            type="password"
            errorMessage={!isPasswordValid && 'رمز باید حداقل ۸ کاراکتر و شامل حداقل یک حرف بزرگ و یک عدد باشد'}
            bordered
          />
          <Input
            onChange={changeRepeatPasswordHandler}
            value={repeatPassword}
            placeholder="تکرار رمز عبور جدید"
            type="password"
            errorMessage={!isPasswordSame && 'رمز عبور و تکرار آن یکسان نیست'}
            bordered
          />
        </div>
        <div className="">
          <Button  type="submit" className="my-6 w-full btn-primary" color="primary" isLoading={loading} isDisabled={!isPasswordValid || !isPasswordSame}>
            ارسال
          </Button>
        </div>
      </div>
    </form>
  );
}
