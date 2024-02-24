
export const fetcher = (
    ...args: [RequestInfo] | [URL, init?: RequestInit] | any[]
) => fetch(...args, {credentials: true}).then((res) => res.json());
