
export const fetcherJustOk = (
    ...args: [RequestInfo] | [URL, init?: RequestInit] | any[]
) => fetch(...args).then(async (res) => {
    if (!res.ok) {
        throw new Error(await res.json())
    }
    return res.json()
});
