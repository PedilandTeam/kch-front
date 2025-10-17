import { UserCheckNamespace } from "@/types/checkUser";
import { useState } from "react";

export default function useCheckUser() {
  async function checkUser() {
    const url = `https://api.koochaa.com/auth/user/check`;
    return await fetch(url, { credentials: "include", method: "GET" })
      .then(async (response) => {
        await response.json();
        return response?.status === 200 ? true : false
      })
      .catch((err) => console.error(err));
  }
  return { checkUser };
}
