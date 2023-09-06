import { useSearchParams } from "next/navigation";
import queryString from "query-string";
import { useCallback } from "react";



export default function useDeleteQueryString(){

    const searchParams = useSearchParams()
    return useCallback(
        (name: string, value?: string) => {
          const params = queryString.parse(searchParams.toString(), {
            arrayFormat: "comma",
          });
          let targetValues = params?.[name];
    
          if (!targetValues) {
            return;
          }
          if (!Array.isArray(targetValues)) {
            params.page = "1"
            delete params[name];
          } else {
            const indexofTarget = targetValues.findIndex((param) => param == value);
            if (indexofTarget == -1) return;
            targetValues.splice(indexofTarget, 1);
          }
          params.page = "1"
          return queryString.stringify(params, { arrayFormat: "comma" });
        },
        [searchParams]
      );

}