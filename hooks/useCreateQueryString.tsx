import { useSearchParams } from "next/navigation";
import queryString from "query-string";
import { useCallback } from "react";


export default function useCreateQueryString(){


    const searchParams = useSearchParams()
    return useCallback(
        (name: string, value: string[]) => {
          // const params = queryString.parse(searchParams.toString());
          let params:any = {}
          let targetValues = params?.[name];
          const newValue = [...value];
          if (!targetValues) {
            params[name] = value;
            console.log("params[name]", params);
            console.log("queryString.stringify(params)", queryString.stringify(params, {arrayFormat: "comma"}));
            return queryString.stringify(params, {arrayFormat: "comma"});
          }
          if (!Array.isArray(targetValues)) {
            newValue.push(targetValues);
          } else {
            
            newValue.push(...targetValues);
          }
          params[name] = newValue;
          console.log("params[name]", params[name]);
          
          return queryString.stringify(params, { arrayFormat: "comma" });
        },
        [searchParams]
      );

}