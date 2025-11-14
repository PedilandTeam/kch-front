import RegisterForm from "./form";
import { AdsClubLogo } from "@/components/panel/adsClubLogo";
import { CreditDisplay } from "@/components/panel/CreditDisplay";

export default function RegisterPage() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="flex w-full items-center justify-between">
        <AdsClubLogo />
        <CreditDisplay />
      </div>

      <RegisterForm />
    </div>
  );
}
