
const API_URL = process.env.API_URL
type requestCacheType = "default" | "force-cache" | "no-cache" | "no-store" | "only-if-cached" | "reload";

const baseFetch = async (path: string, method: string = "GET", cache: requestCacheType = "default", revalidate: number = 0): Promise<Response> => {
    return new Promise((resolve, reject) => {
        fetch(`${API_URL}/${path}`, { cache, next: { revalidate }, method })
            .then((res: Response) => {
                if(!res.ok){
                    reject()
                }
                resolve(res)
            })
            .catch(error => {
                reject(error)
            })
    })
}

export const API_ROUTES = {
    PAGES: {
        GET_ALL: (cache: requestCacheType = "default", revalidate: number = 0) => {
            return baseFetch("pages", "GET", cache, revalidate)
        },
        GET_ONE: (slugOrId: string ,cache: requestCacheType = "default", revalidate: number = 0) => {
            return baseFetch(`pages/${slugOrId}`, "GET", cache, revalidate)
        }
    },
    COUNTRIES: {
        GET_ALL: (cache: requestCacheType = "default", revalidate: number = 0) => {
            return baseFetch("countries", "GET", cache, revalidate)
        },
    }
}
