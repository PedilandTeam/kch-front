import fetchWrapper from "./fetchWrapper";
import type { User } from "@/schemas/user";

export default async function fetchUser(): Promise<
  { ok: true; user: User; isActive: boolean } | { ok: false; error: string }
> {
  const token = localStorage.getItem("token");

  try {
    const user = await fetchWrapper<User>("/auth/user/data", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!user.authorized) {
      return { ok: false, error: "Unauthorized" };
    }

    return { ok: true, user, isActive: user.status === "active" };
  } catch (error) {
    return { ok: false, error: "Internal Server Error" };
  }
}
