
const API_URL = process.env.API_URL
type requestCacheType = "default" | "force-cache" | "no-cache" | "no-store" | "only-if-cached" | "reload";
type paramType = {
    [key: string]: string | number
}
type configType = {cache?: requestCacheType, revalidate?: number}
type requestType = {
    path: string, method: string, params?: paramType, body?: any
}

const baseFetch = async ({path, method = "GET", params, body}: requestType, {cache = "default", revalidate}: configType): Promise<Response> => {
    return new Promise((resolve, reject) => {

        let queryParametrs: URLSearchParams | undefined
        if(params){
            queryParametrs = new URLSearchParams()  
            for(const param in params){
                queryParametrs.append(param, `${params[param]}`)
            }
        }
        
        let url = queryParametrs ? `${API_URL}/${path}?${queryParametrs}` : `${API_URL}/${path}`
        fetch(url, {body, cache, next: { ...revalidate && {revalidate} }, method, })
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
        GET_ALL: (page: number, limit: number, slug?: string, cache: requestCacheType = "default", revalidate?: number) => {
            return baseFetch({path:"pages", method:"GET", params:{page, limit, ...slug && {slug}}}, {cache, revalidate})
        },
        GET_ONE: (id: string ,cache: requestCacheType = "default", revalidate?: number) => {
            return baseFetch({path: `pages/${id}`, method: "GET"}, {cache, revalidate})
        }
    },
    COUNTRIES: {
        GET_ALL: (cache: requestCacheType = "default", revalidate?: number) => {
            return baseFetch({path: "countries", method: "GET"}, {cache, revalidate})
        },
    }
}
