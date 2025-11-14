import type { MethodsGet } from "@/types/methods";
import fetchWrapper from "./fetchWrapper";

export default async function fetchMethods(): Promise<MethodsGet> {
  return fetchWrapper<MethodsGet>(`/users/methodsOfImmigrate`);
}
