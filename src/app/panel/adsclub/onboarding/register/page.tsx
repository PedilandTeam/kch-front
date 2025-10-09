"use client";

import RegisterForm from "./form";
import { AdsClubLogo, CreditDisplay } from "@components/index";
import { usePointsStore } from "@/store/usePointsStore";
import { useEffect } from "react";

export default function RegisterPage() {
  const { addPoints } = usePointsStore();

  useEffect(() => {
    addPoints(45);
  }, []);

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
