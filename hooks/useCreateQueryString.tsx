import { useSearchParams } from 'next/navigation';
import queryString from 'query-string';
import { useCallback } from 'react';

export default function useCreateQueryString() {
  const searchParams = useSearchParams();
  return useCallback(
    (name: string, value: string[]) => {
      const params = queryString.parse(searchParams.toString());
      // let params:any = {}
      let targetValues = params?.[name];
      const newValue = [...value];
      if (!targetValues) {
        params[name] = value;
        params.page = '1';
        return queryString.stringify(params, { arrayFormat: 'comma' });
      }
      if (!Array.isArray(targetValues)) {
        for (const targetValue of targetValues) {
          if (!newValue.includes(targetValue)) {
            newValue.push();
          }
        }
      } else {
        //@ts-expect-error
        newValue.push(...targetValues);
      }
      params[name] = newValue;
      params.page = '1';
      return queryString.stringify(params, { arrayFormat: 'comma' });
    },
    [searchParams]
  );
}
