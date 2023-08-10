import { koochaaConfig } from "./koochaa.config";

const API_URL = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL
const API_KEY = process.env.API_KEY!
type requestCacheType = "default" | "force-cache" | "no-cache" | "no-store" | "only-if-cached" | "reload";
type paramType = {
    [key: string]: string | number
}
type configType = {cache?: requestCacheType, revalidate?: number}
type requestType = {
    path: string, method?: string, params?: paramType, body?: any
    headers?: HeadersInit
}

const baseFetch = async ({path, method = "GET", params, body, headers}: requestType, {cache, revalidate}: configType): Promise<Response> => {
    
    return new Promise((resolve, reject) => {

        let queryParametrs: URLSearchParams | undefined
        
        if(params){
            queryParametrs = new URLSearchParams() 
            if(!koochaaConfig.modules.status.enabled){
                queryParametrs.append("status", "0")
            }
            for(const param in params){
                queryParametrs.append(param, `${params[param]}`)
            }
        }
        
        let url = queryParametrs ? `${API_URL}/${path}?${queryParametrs}` : `${API_URL}/${path}`
        console.log(url);
        
        fetch(url, {body, cache, next: { ...revalidate && {revalidate} }, method,headers})    
            
            .then((res: Response) => {
                if(!res.ok){
                    res.json().then(res => console.log(res))
                    reject()
                }
                resolve(res)
            })
            .catch(error => {
                console.log(error);                
                reject(error)
            })
    })
}

export const API_ROUTES = {
    PAGES: {
        GET_ALL: (page: number, limit: number, slug?: string, revalidate?: number, cache?: requestCacheType) => {
            return baseFetch({path:"pages", method:"GET", params:{page, limit, ...slug && {slug}}, headers: {"api-key": API_KEY}},  {...cache && {cache}, ...revalidate && {revalidate}})
        },
        GET_ALL_PREVIEW: (page: number, limit: number, slug?: string, revalidate?: number, cache?: requestCacheType) => {
            return baseFetch({path:"pages", method:"GET", params:{page, limit, ...slug && {slug}}},  {...cache && {cache}, ...revalidate && {revalidate}})
        },
        GET_ONE: (id: string , revalidate?: number, cache?: requestCacheType) => {
            return baseFetch({path: `pages/${id}`, method: "GET", headers: {"api-key": API_KEY}},  {...cache && {cache}, ...revalidate && {revalidate}})
        }
    },
    COUNTRIES: {
        GET_ALL: (revalidate?: number, cache?: requestCacheType) => {
            return baseFetch({path: "countries", method: "GET"},  {...cache && {cache}, ...revalidate && {revalidate}})
        },
    },
    CITIES: {
        GET_ALL: (page: number = 1, limit: number = 20, countryCode?: string ,revalidate?: number, cache?: requestCacheType) => {
            return baseFetch({path: "cities", method: "GET", params:{page, limit, ...countryCode && {countryCode}}}, {...cache && {cache}, ...revalidate && {revalidate}})
        }
    },
    UNITS: {
        GET_ALL: (revalidate?: number, cache?: requestCacheType) => {
            return baseFetch({path: "units"}, {...cache && {cache}, ...revalidate && {revalidate}})
        }
    },
    CATEGOREIS: {
        GET_ALL: (page: number, limit: number, slug?: string, unitId?: number, revalidate?: number, cache?: requestCacheType) => {
            return baseFetch({path: "categories", params: { page, limit,...slug &&{slug},...unitId && {unitId}}}, {...cache && {cache}, ...revalidate && {revalidate}})
        },
        RECENTLY_UPDATED: (revalidate?: number, cache?: requestCacheType) => {
            return baseFetch({path: "categories/recentlyUpdated"}, {...cache && {cache}, ...revalidate && {revalidate}})
        },
        MOST_USED: (countryCode?: string, limit: number = 1, revalidate?: number, cache?: requestCacheType) => {
            return baseFetch({path: "categories/mostUsed", params:{limit, ...countryCode && {countryCode}}}, {...cache && {cache}, ...revalidate && {revalidate}})
        }
    },
    STATS: {
        OVERVIEW: (revalidate?: number, cache?: requestCacheType) => {
            return baseFetch({path: "stats"}, {...cache && {cache}, ...revalidate && {revalidate}})
        },
        COUNTRY_STATS: (countryCode: string, revalidate?: number, cache?: requestCacheType) => {
            return baseFetch({path: `stats/${countryCode}`}, {...cache && {cache}, ...revalidate && {revalidate}})
        },
    }
} 



export enum UNITS_LIST {
    BUSINESSES = "businesses",
    DOCTORS = "doctors",
    COMMUNITIES = "associations",
    FREELANCERS = "freelancers"
}

export const UNITS_LIST_ARRAY = [
    {
        "id": 1,
        "name": "مشاغل",
        "slug": "businesses",
        "createdDate": "2023-04-26T10:40:01.149Z",
        "updateDate": "2023-04-26T10:40:01.149Z",
        "categories": [
            {
                "id": 1,
                "name": "آژانس مسافرتی",
                "slug": "آژانس_مسافرتی",
                "createdDate": "2023-04-27T00:50:55.808Z",
                "updateDate": "2023-04-27T00:50:55.808Z"
            },
            {
                "id": 2,
                "name": "آتلیه عکاسی",
                "slug": "آتلیه_عکاسی",
                "createdDate": "2023-04-27T00:50:55.813Z",
                "updateDate": "2023-04-27T00:50:55.813Z"
            },
            {
                "id": 3,
                "name": "آموزشگاه رانندگی",
                "slug": "آموزشگاه_رانندگی",
                "createdDate": "2023-04-27T00:50:55.925Z",
                "updateDate": "2023-04-27T00:50:55.925Z"
            },
            {
                "id": 4,
                "name": "آموزشگاه",
                "slug": "آموزشگاه",
                "createdDate": "2023-04-27T00:50:56.008Z",
                "updateDate": "2023-04-27T00:50:56.008Z"
            },
            {
                "id": 5,
                "name": "سالن زیبایی",
                "slug": "سالن_زیبایی",
                "createdDate": "2023-04-27T00:50:57.019Z",
                "updateDate": "2023-04-27T00:50:57.019Z"
            },
            {
                "id": 6,
                "name": "کافه و رستوران",
                "slug": "کافه_و_رستوران",
                "createdDate": "2023-04-27T00:50:57.021Z",
                "updateDate": "2023-04-27T00:50:57.021Z"
            },
            {
                "id": 7,
                "name": "صرافی",
                "slug": "صرافی",
                "createdDate": "2023-04-27T00:50:57.412Z",
                "updateDate": "2023-04-27T00:50:57.412Z"
            },
            {
                "id": 8,
                "name": "سوپرمارکت",
                "slug": "سوپرمارکت",
                "createdDate": "2023-04-27T00:50:57.414Z",
                "updateDate": "2023-04-27T00:50:57.414Z"
            },
            {
                "id": 9,
                "name": "کتاب فروشی",
                "slug": "کتاب_فروشی",
                "createdDate": "2023-04-27T00:50:57.417Z",
                "updateDate": "2023-04-27T00:50:57.417Z"
            },
            {
                "id": 10,
                "name": "فرش فروشی",
                "slug": "فرش_فروشی",
                "createdDate": "2023-04-27T00:50:57.418Z",
                "updateDate": "2023-04-27T00:50:57.418Z"
            },
            {
                "id": 11,
                "name": "تعمیرات",
                "slug": "تعمیرات",
                "createdDate": "2023-04-27T00:50:57.420Z",
                "updateDate": "2023-04-27T00:50:57.420Z"
            },
            {
                "id": 12,
                "name": "تشریفات مجالس",
                "slug": "تشریفات_مجالس",
                "createdDate": "2023-04-27T00:50:57.421Z",
                "updateDate": "2023-04-27T00:50:57.421Z"
            },
            {
                "id": 13,
                "name": "خدمات آنلاین",
                "slug": "خدمات_آنلاین",
                "createdDate": "2023-04-27T00:50:57.424Z",
                "updateDate": "2023-04-27T00:50:57.424Z"
            },
            {
                "id": 14,
                "name": "املاک",
                "slug": "املاک",
                "createdDate": "2023-04-27T00:50:57.515Z",
                "updateDate": "2023-04-27T00:50:57.515Z"
            },
            {
                "id": 15,
                "name": "خدمات بیمه",
                "slug": "خدمات_بیمه",
                "createdDate": "2023-04-27T00:50:57.626Z",
                "updateDate": "2023-04-27T00:50:57.626Z"
            },
            {
                "id": 16,
                "name": "کتابخانه",
                "slug": "کتابخانه",
                "createdDate": "2023-04-27T00:50:57.627Z",
                "updateDate": "2023-04-27T00:50:57.627Z"
            },
            {
                "id": 17,
                "name": "کامپیوتر و موبایل",
                "slug": "کامپیوتر_و_موبایل",
                "createdDate": "2023-04-27T00:50:57.722Z",
                "updateDate": "2023-04-27T00:50:57.722Z"
            },
            {
                "id": 18,
                "name": "مهاجرت و اقامت",
                "slug": "مهاجرت_و_اقامت",
                "createdDate": "2023-04-27T00:50:58.317Z",
                "updateDate": "2023-04-27T00:50:58.317Z"
            },
            {
                "id": 19,
                "name": "مترجم رسمی",
                "slug": "مترجم_رسمی",
                "createdDate": "2023-04-27T00:50:58.318Z",
                "updateDate": "2023-04-27T00:50:58.318Z"
            },
            {
                "id": 20,
                "name": "نان و شیرینی",
                "slug": "نان_و_شیرینی",
                "createdDate": "2023-04-27T00:50:58.318Z",
                "updateDate": "2023-04-27T00:50:58.318Z"
            },
            {
                "id": 21,
                "name": "هتل و هاستل",
                "slug": "هتل_و_هاستل",
                "createdDate": "2023-04-27T00:50:58.320Z",
                "updateDate": "2023-04-27T00:50:58.320Z"
            },
            {
                "id": 22,
                "name": "مینی مارکت",
                "slug": "مینی_مارکت",
                "createdDate": "2023-04-27T00:50:58.321Z",
                "updateDate": "2023-04-27T00:50:58.321Z"
            },
            {
                "id": 23,
                "name": "خدمات مالی و بانکی",
                "slug": "خدمات_مالی_و_بانکی",
                "createdDate": "2023-04-27T00:50:58.322Z",
                "updateDate": "2023-04-27T00:50:58.322Z"
            },
            {
                "id": 24,
                "name": "وکیل",
                "slug": "وکیل",
                "createdDate": "2023-04-27T00:50:58.409Z",
                "updateDate": "2023-04-27T00:50:58.409Z"
            },
            {
                "id": 25,
                "name": "کلینیک زیبایی",
                "slug": "کلینیک_زیبایی",
                "createdDate": "2023-04-27T00:50:58.410Z",
                "updateDate": "2023-04-27T00:50:58.410Z"
            },
            {
                "id": 26,
                "name": "شرکت ساختمانی",
                "slug": "شرکت_ساختمانی",
                "createdDate": "2023-04-27T00:50:58.413Z",
                "updateDate": "2023-04-27T00:50:58.413Z"
            },
            {
                "id": 31,
                "name": "تعمیرات ساختمانی",
                "slug": "تعمیرات_ساختمانی",
                "createdDate": "2023-04-27T00:50:59.413Z",
                "updateDate": "2023-04-27T00:50:59.413Z"
            },
            {
                "id": 32,
                "name": "تحصیلی و آموزشی",
                "slug": "تحصیلی_و_آموزشی",
                "createdDate": "2023-04-27T00:50:59.414Z",
                "updateDate": "2023-04-27T00:50:59.414Z"
            },
            {
                "id": 33,
                "name": "خدمات خودرو",
                "slug": "خدمات_خودرو",
                "createdDate": "2023-04-27T00:50:59.415Z",
                "updateDate": "2023-04-27T00:50:59.415Z"
            },
            {
                "id": 34,
                "name": "آرایشگاه مردانه",
                "slug": "آرایشگاه_مردانه",
                "createdDate": "2023-04-27T00:50:59.418Z",
                "updateDate": "2023-04-27T00:50:59.418Z"
            },
            {
                "id": 72,
                "name": "کافه و رستوران بیرون بر",
                "slug": "کافه_و_رستوران_بیرون_بر",
                "createdDate": "2023-04-27T00:51:00.912Z",
                "updateDate": "2023-04-27T00:51:00.912Z"
            },
            {
                "id": 76,
                "name": "آرایشگاه ",
                "slug": "آرایشگاه_",
                "createdDate": "2023-04-27T00:51:01.007Z",
                "updateDate": "2023-04-27T00:51:01.007Z"
            },
            {
                "id": 77,
                "name": "فروشگاه",
                "slug": "فروشگاه",
                "createdDate": "2023-04-27T00:51:01.016Z",
                "updateDate": "2023-04-27T00:51:01.016Z"
            },
            {
                "id": 78,
                "name": "نمایشگاه ماشین",
                "slug": "نمایشگاه_ماشین",
                "createdDate": "2023-04-27T00:51:01.111Z",
                "updateDate": "2023-04-27T00:51:01.111Z"
            },
            {
                "id": 79,
                "name": "پرده سرا",
                "slug": "پرده_سرا",
                "createdDate": "2023-04-27T00:51:01.112Z",
                "updateDate": "2023-04-27T00:51:01.112Z"
            },
            {
                "id": 80,
                "name": "انتشارات و چاپ",
                "slug": "انتشارات_و_چاپ",
                "createdDate": "2023-04-27T00:51:01.113Z",
                "updateDate": "2023-04-27T00:51:01.113Z"
            },
            {
                "id": 81,
                "name": "خیاطی",
                "slug": "خیاطی",
                "createdDate": "2023-04-27T00:51:01.114Z",
                "updateDate": "2023-04-27T00:51:01.114Z"
            },
            {
                "id": 82,
                "name": "گلفروشی",
                "slug": "گلفروشی",
                "createdDate": "2023-04-27T00:51:01.206Z",
                "updateDate": "2023-04-27T00:51:01.206Z"
            },
            {
                "id": 208,
                "name": "خدمات نظافتی و ساختمان",
                "slug": "خدمات_نظافتی_و_ساختمان",
                "createdDate": "2023-05-16T15:41:24.948Z",
                "updateDate": "2023-05-16T15:41:24.948Z"
            },
            {
                "id": 209,
                "name": "مددکار اجتماعی ",
                "slug": "مددکار_اجتماعی_",
                "createdDate": "2023-05-16T15:41:25.801Z",
                "updateDate": "2023-05-16T15:41:25.801Z"
            },
            {
                "id": 210,
                "name": "سوپرمارکت اینترنتی",
                "slug": "سوپرمارکت_اینترنتی",
                "createdDate": "2023-05-16T15:44:41.522Z",
                "updateDate": "2023-05-16T15:44:41.522Z"
            },
            {
                "id": 211,
                "name": "آبمیوه و بستنی",
                "slug": "آبمیوه_و_بستنی",
                "createdDate": "2023-05-16T15:44:41.968Z",
                "updateDate": "2023-05-16T15:44:41.968Z"
            },
            {
                "id": 232,
                "name": "آژانس هواپیمایی",
                "slug": "آژانس_هواپیمایی",
                "createdDate": "2023-05-16T15:44:43.872Z",
                "updateDate": "2023-05-16T15:44:43.872Z"
            },
            {
                "id": 233,
                "name": "صنایع دستی",
                "slug": "صنایع_دستی",
                "createdDate": "2023-05-16T15:44:43.916Z",
                "updateDate": "2023-05-16T15:44:43.916Z"
            },
            {
                "id": 243,
                "name": "بوتیک لباس ، کیف ، کفش",
                "slug": "بوتیک_لباس_،_کیف_،_کفش",
                "createdDate": "2023-05-22T04:01:53.655Z",
                "updateDate": "2023-05-22T04:01:53.655Z"
            },
            {
                "id": 244,
                "name": "آرایشی ، بهداشتی ، درمانی",
                "slug": "آرایشی_،_بهداشتی_،_درمانی",
                "createdDate": "2023-05-22T04:07:24.719Z",
                "updateDate": "2023-05-22T04:10:27.594Z"
            },
            {
                "id": 248,
                "name": "مهندس معمار ، طراحی داخلی",
                "slug": "مهندس_معمار_،_طراحی_داخلی",
                "createdDate": "2023-05-24T05:01:15.896Z",
                "updateDate": "2023-05-24T05:01:15.896Z"
            },
            {
                "id": 249,
                "name": "آژانس تبلیغاتی",
                "slug": "آژانس_تبلیغاتی",
                "createdDate": "2023-05-24T09:21:23.959Z",
                "updateDate": "2023-05-24T09:21:23.959Z"
            },
            {
                "id": 253,
                "name": "باشگاه ورزشی",
                "slug": "باشگاه_ورزشی",
                "createdDate": "2023-06-07T09:43:05.902Z",
                "updateDate": "2023-06-07T09:43:05.902Z"
            },
            {
                "id": 254,
                "name": "خشکشویی",
                "slug": "خشکشویی",
                "createdDate": "2023-06-08T05:54:27.250Z",
                "updateDate": "2023-06-08T05:54:27.250Z"
            }
        ]
    },
    {
        "id": 4,
        "name": "پزشکان",
        "slug": "doctors",
        "createdDate": "2023-04-26T10:40:36.927Z",
        "updateDate": "2023-04-26T10:40:36.927Z",
        "categories": [
            {
                "id": 49,
                "name": "پزشک هسته ای",
                "slug": "پزشک_هسته_ای",
                "createdDate": "2023-04-27T00:51:00.313Z",
                "updateDate": "2023-04-27T00:51:00.313Z"
            },
            {
                "id": 51,
                "name": "جراح عمومی",
                "slug": "جراح_عمومی",
                "createdDate": "2023-04-27T00:51:00.319Z",
                "updateDate": "2023-04-27T00:51:00.319Z"
            },
            {
                "id": 52,
                "name": "پیراپزشکی",
                "slug": "پیراپزشکی",
                "createdDate": "2023-04-27T00:51:00.320Z",
                "updateDate": "2023-04-27T00:51:00.320Z"
            },
            {
                "id": 53,
                "name": "جراح فک و صورت",
                "slug": "جراح_فک_و_صورت",
                "createdDate": "2023-04-27T00:51:00.321Z",
                "updateDate": "2023-04-27T00:51:00.321Z"
            },
            {
                "id": 54,
                "name": "جراح مغز و اعصاب",
                "slug": "جراح_مغز_و_اعصاب",
                "createdDate": "2023-04-27T00:51:00.322Z",
                "updateDate": "2023-04-27T00:51:00.322Z"
            },
            {
                "id": 55,
                "name": "دندانپزشک",
                "slug": "دندانپزشک",
                "createdDate": "2023-04-27T00:51:00.515Z",
                "updateDate": "2023-04-27T00:51:00.515Z"
            },
            {
                "id": 56,
                "name": "رادیولوژیست",
                "slug": "رادیولوژیست",
                "createdDate": "2023-04-27T00:51:00.525Z",
                "updateDate": "2023-04-27T00:51:00.525Z"
            },
            {
                "id": 57,
                "name": "روانپزشک",
                "slug": "روانپزشک",
                "createdDate": "2023-04-27T00:51:00.608Z",
                "updateDate": "2023-04-27T00:51:00.608Z"
            },
            {
                "id": 58,
                "name": "داروخانه",
                "slug": "داروخانه",
                "createdDate": "2023-04-27T00:51:00.609Z",
                "updateDate": "2023-04-27T00:51:00.609Z"
            },
            {
                "id": 59,
                "name": "روانشناس",
                "slug": "روانشناس",
                "createdDate": "2023-04-27T00:51:00.610Z",
                "updateDate": "2023-04-27T00:51:00.610Z"
            },
            {
                "id": 60,
                "name": "کلینیک درمانی",
                "slug": "کلینیک_درمانی",
                "createdDate": "2023-04-27T00:51:00.612Z",
                "updateDate": "2023-04-27T00:51:00.612Z"
            },
            {
                "id": 61,
                "name": "متخصص زنان و زایمان",
                "slug": "متخصص_زنان_و_زایمان",
                "createdDate": "2023-04-27T00:51:00.613Z",
                "updateDate": "2023-04-27T00:51:00.613Z"
            },
            {
                "id": 62,
                "name": "متخصص ارتوپد",
                "slug": "متخصص_ارتوپد",
                "createdDate": "2023-04-27T00:51:00.614Z",
                "updateDate": "2023-04-27T00:51:00.614Z"
            },
            {
                "id": 63,
                "name": "متخصص پوست و مو",
                "slug": "متخصص_پوست_و_مو",
                "createdDate": "2023-04-27T00:51:00.615Z",
                "updateDate": "2023-04-27T00:51:00.615Z"
            },
            {
                "id": 64,
                "name": "متخصص داخلی",
                "slug": "متخصص_داخلی",
                "createdDate": "2023-04-27T00:51:00.616Z",
                "updateDate": "2023-04-27T00:51:00.616Z"
            },
            {
                "id": 65,
                "name": "متخصص چشم",
                "slug": "متخصص_چشم",
                "createdDate": "2023-04-27T00:51:00.617Z",
                "updateDate": "2023-04-27T00:51:00.617Z"
            },
            {
                "id": 66,
                "name": "متخصص کلیه",
                "slug": "متخصص_کلیه",
                "createdDate": "2023-04-27T00:51:00.817Z",
                "updateDate": "2023-04-27T00:51:00.817Z"
            },
            {
                "id": 67,
                "name": "متخصص کودکان",
                "slug": "متخصص_کودکان",
                "createdDate": "2023-04-27T00:51:00.817Z",
                "updateDate": "2023-04-27T00:51:00.817Z"
            },
            {
                "id": 68,
                "name": "متخصص مغز و اعصاب",
                "slug": "متخصص_مغز_و_اعصاب",
                "createdDate": "2023-04-27T00:51:00.818Z",
                "updateDate": "2023-04-27T00:51:00.818Z"
            },
            {
                "id": 69,
                "name": "متخصص قلب و عروق",
                "slug": "متخصص_قلب_و_عروق",
                "createdDate": "2023-04-27T00:51:00.819Z",
                "updateDate": "2023-04-27T00:51:00.819Z"
            },
            {
                "id": 70,
                "name": "متخصص روماتولوژی",
                "slug": "متخصص_روماتولوژی",
                "createdDate": "2023-04-27T00:51:00.820Z",
                "updateDate": "2023-04-27T00:51:00.820Z"
            },
            {
                "id": 71,
                "name": "جراح پلاستیک و زیبایی",
                "slug": "جراح_پلاستیک_و_زیبایی",
                "createdDate": "2023-04-27T00:51:00.822Z",
                "updateDate": "2023-04-27T00:51:00.822Z"
            },
            {
                "id": 73,
                "name": "متخصص گوش و حلق و بینی",
                "slug": "متخصص_گوش_و_حلق_و_بینی",
                "createdDate": "2023-04-27T00:51:00.821Z",
                "updateDate": "2023-04-27T00:51:00.821Z"
            },
            {
                "id": 74,
                "name": "جراح و متخصص اورولوژی",
                "slug": "جراح_و_متخصص_اورولوژی",
                "createdDate": "2023-04-27T00:51:00.923Z",
                "updateDate": "2023-04-27T00:51:00.923Z"
            },
            {
                "id": 75,
                "name": "دامپزشک",
                "slug": "دامپزشک",
                "createdDate": "2023-04-27T00:51:00.924Z",
                "updateDate": "2023-04-27T00:51:00.924Z"
            },
            {
                "id": 83,
                "name": "پزشک عمومی",
                "slug": "پزشک_عمومی",
                "createdDate": "2023-04-27T00:51:01.207Z",
                "updateDate": "2023-04-27T00:51:01.207Z"
            },
            {
                "id": 206,
                "name": "جراح کلیه و مجاری ادراری",
                "slug": "جراح_کلیه_و_مجاری_ادراری",
                "createdDate": "2023-05-16T15:38:20.870Z",
                "updateDate": "2023-05-16T15:38:20.870Z"
            },
            {
                "id": 207,
                "name": "جراح گوارش",
                "slug": "جراح_گوارش",
                "createdDate": "2023-05-16T15:38:20.951Z",
                "updateDate": "2023-05-16T15:38:20.951Z"
            },
            {
                "id": 212,
                "name": "متخصص پاتولوژی و آناتومی",
                "slug": "متخصص_پاتولوژی_و_آناتومی",
                "createdDate": "2023-05-16T15:44:42.211Z",
                "updateDate": "2023-05-16T15:44:42.211Z"
            },
            {
                "id": 213,
                "name": "متخصص بیهوشی",
                "slug": "متخصص_بیهوشی",
                "createdDate": "2023-05-16T15:44:42.226Z",
                "updateDate": "2023-05-16T15:44:42.226Z"
            },
            {
                "id": 214,
                "name": "چشم پزشک",
                "slug": "چشم_پزشک",
                "createdDate": "2023-05-16T15:44:42.315Z",
                "updateDate": "2023-05-16T15:44:42.315Z"
            },
            {
                "id": 215,
                "name": "اندوسکوپی گوارشی",
                "slug": "اندوسکوپی_گوارشی",
                "createdDate": "2023-05-16T15:44:42.367Z",
                "updateDate": "2023-05-16T15:44:42.367Z"
            },
            {
                "id": 216,
                "name": "هماتوبیولوژیست",
                "slug": "هماتوبیولوژیست",
                "createdDate": "2023-05-16T15:44:42.382Z",
                "updateDate": "2023-05-16T15:44:42.382Z"
            },
            {
                "id": 217,
                "name": "هماتولوژیست",
                "slug": "هماتولوژیست",
                "createdDate": "2023-05-16T15:44:42.399Z",
                "updateDate": "2023-05-16T15:44:42.399Z"
            },
            {
                "id": 218,
                "name": "متخصص سرطان",
                "slug": "متخصص_سرطان",
                "createdDate": "2023-05-16T15:44:42.446Z",
                "updateDate": "2023-05-16T15:44:42.446Z"
            },
            {
                "id": 219,
                "name": "فیزیوتراپیست",
                "slug": "فیزیوتراپیست",
                "createdDate": "2023-05-16T15:44:42.515Z",
                "updateDate": "2023-05-16T15:44:42.515Z"
            },
            {
                "id": 220,
                "name": "متخصص توانبخشی",
                "slug": "متخصص_توانبخشی",
                "createdDate": "2023-05-16T15:44:42.564Z",
                "updateDate": "2023-05-16T15:44:42.564Z"
            },
            {
                "id": 221,
                "name": "متخصص ریه و دستگاه تنفسی",
                "slug": "متخصص_ریه_و_دستگاه_تنفسی",
                "createdDate": "2023-05-16T15:44:42.609Z",
                "updateDate": "2023-05-16T15:44:42.609Z"
            },
            {
                "id": 222,
                "name": "متخصص بیماری های عفونی",
                "slug": "متخصص_بیماری_های_عفونی",
                "createdDate": "2023-05-16T15:44:42.752Z",
                "updateDate": "2023-05-16T15:44:42.752Z"
            },
            {
                "id": 223,
                "name": "ایمونولوژیست",
                "slug": "ایمونولوژیست",
                "createdDate": "2023-05-16T15:44:42.768Z",
                "updateDate": "2023-05-16T15:44:42.768Z"
            },
            {
                "id": 224,
                "name": "متخصص بیماری های کبد و معده",
                "slug": "متخصص_بیماری_های_کبد_و_معده",
                "createdDate": "2023-05-16T15:44:42.825Z",
                "updateDate": "2023-05-16T15:44:42.825Z"
            },
            {
                "id": 225,
                "name": "پزشک اورژانس",
                "slug": "پزشک_اورژانس",
                "createdDate": "2023-05-16T15:44:43.000Z",
                "updateDate": "2023-05-16T15:44:43.000Z"
            },
            {
                "id": 226,
                "name": "نفرولوژیست",
                "slug": "نفرولوژیست",
                "createdDate": "2023-05-16T15:44:43.042Z",
                "updateDate": "2023-05-16T15:44:43.042Z"
            },
            {
                "id": 227,
                "name": "روانکاو",
                "slug": "روانکاو",
                "createdDate": "2023-05-16T15:44:43.378Z",
                "updateDate": "2023-05-16T15:44:43.378Z"
            },
            {
                "id": 228,
                "name": "روان درمانگر",
                "slug": "روان_درمانگر",
                "createdDate": "2023-05-16T15:44:43.490Z",
                "updateDate": "2023-05-16T15:44:43.490Z"
            },
            {
                "id": 230,
                "name": "داروساز",
                "slug": "داروساز",
                "createdDate": "2023-05-16T15:44:43.750Z",
                "updateDate": "2023-05-16T15:44:43.750Z"
            },
            {
                "id": 231,
                "name": "پرستار",
                "slug": "پرستار",
                "createdDate": "2023-05-16T15:44:43.816Z",
                "updateDate": "2023-05-16T15:44:43.816Z"
            },
            {
                "id": 237,
                "name": "جراح شکم",
                "slug": "جراح_شکم",
                "createdDate": "2023-05-16T15:44:44.510Z",
                "updateDate": "2023-05-16T15:44:44.510Z"
            },
            {
                "id": 238,
                "name": "جراح قلب، عروق ، قفسه سینه",
                "slug": "جراح_قلب،_عروق_،_قفسه_سینه",
                "createdDate": "2023-05-16T15:44:44.523Z",
                "updateDate": "2023-05-16T15:44:44.523Z"
            },
            {
                "id": 239,
                "name": "جراح کودکان",
                "slug": "جراح_کودکان",
                "createdDate": "2023-05-16T15:44:44.544Z",
                "updateDate": "2023-05-16T15:44:44.544Z"
            },
            {
                "id": 240,
                "name": "جراح چشم",
                "slug": "جراح_چشم",
                "createdDate": "2023-05-16T15:44:44.564Z",
                "updateDate": "2023-05-16T15:44:44.564Z"
            },
            {
                "id": 241,
                "name": "جراح ارتوپد",
                "slug": "جراح_ارتوپد",
                "createdDate": "2023-05-16T15:44:44.575Z",
                "updateDate": "2023-05-16T15:44:44.575Z"
            },
            {
                "id": 242,
                "name": "جراح زنان و زایمان",
                "slug": "جراح_زنان_و_زایمان",
                "createdDate": "2023-05-16T15:44:44.597Z",
                "updateDate": "2023-05-16T15:44:44.597Z"
            },
            {
                "id": 245,
                "name": "علوم آزمایشگاهی",
                "slug": "علوم_آزمایشگاهی",
                "createdDate": "2023-05-23T05:59:53.432Z",
                "updateDate": "2023-05-23T05:59:53.432Z"
            },
            {
                "id": 246,
                "name": "متخصص مامائی",
                "slug": "متخصص_مامائی",
                "createdDate": "2023-05-24T04:09:35.640Z",
                "updateDate": "2023-05-24T04:09:35.640Z"
            },
            {
                "id": 247,
                "name": "انکولوژیست",
                "slug": "انکولوژیست",
                "createdDate": "2023-05-24T04:27:06.867Z",
                "updateDate": "2023-05-24T04:27:06.867Z"
            },
            {
                "id": 252,
                "name": "اورولوژیست",
                "slug": "اورولوژیست",
                "createdDate": "2023-06-07T09:37:49.814Z",
                "updateDate": "2023-06-07T09:37:49.814Z"
            },
            {
                "id": 255,
                "name": "فوق تخصص روان درمانی",
                "slug": "فوق_تخصص_روان_درمانی",
                "createdDate": "2023-06-10T05:34:07.267Z",
                "updateDate": "2023-06-10T05:34:07.267Z"
            }
        ]
    },
    {
        "id": 2,
        "name": "فریلنسرها",
        "slug": "freelancers",
        "createdDate": "2023-04-26T10:40:13.188Z",
        "updateDate": "2023-04-26T10:40:13.188Z",
        "categories": [
            {
                "id": 27,
                "name": "طراح گرافیک",
                "slug": "طراح_گرافیک",
                "createdDate": "2023-04-27T00:50:58.414Z",
                "updateDate": "2023-04-27T00:50:58.414Z"
            },
            {
                "id": 28,
                "name": "منتور",
                "slug": "منتور",
                "createdDate": "2023-04-27T00:50:59.319Z",
                "updateDate": "2023-04-27T00:50:59.319Z"
            },
            {
                "id": 29,
                "name": "حمل و نقل و باربری",
                "slug": "حمل_و_نقل_و_باربری",
                "createdDate": "2023-04-27T00:50:59.410Z",
                "updateDate": "2023-04-27T00:50:59.410Z"
            },
            {
                "id": 35,
                "name": "بلاگر",
                "slug": "بلاگر",
                "createdDate": "2023-04-27T00:50:59.419Z",
                "updateDate": "2023-04-27T00:50:59.419Z"
            },
            {
                "id": 36,
                "name": "آرایشگر",
                "slug": "آرایشگر",
                "createdDate": "2023-04-27T00:50:59.811Z",
                "updateDate": "2023-04-27T00:50:59.811Z"
            },
            {
                "id": 37,
                "name": "تولیدکننده محتوا",
                "slug": "تولیدکننده_محتوا",
                "createdDate": "2023-04-27T00:50:59.813Z",
                "updateDate": "2023-04-27T00:50:59.813Z"
            },
            {
                "id": 38,
                "name": "عکاس",
                "slug": "عکاس",
                "createdDate": "2023-04-27T00:50:59.815Z",
                "updateDate": "2023-04-27T00:50:59.815Z"
            },
            {
                "id": 39,
                "name": "کوچ",
                "slug": "کوچ",
                "createdDate": "2023-04-27T00:50:59.816Z",
                "updateDate": "2023-04-27T00:50:59.816Z"
            },
            {
                "id": 40,
                "name": "مربی",
                "slug": "مربی",
                "createdDate": "2023-04-27T00:50:59.907Z",
                "updateDate": "2023-04-27T00:50:59.907Z"
            },
            {
                "id": 41,
                "name": " نقاشی",
                "slug": "_نقاشی",
                "createdDate": "2023-04-27T00:51:00.008Z",
                "updateDate": "2023-04-27T00:51:00.008Z"
            },
            {
                "id": 42,
                "name": "مشاور",
                "slug": "مشاور",
                "createdDate": "2023-04-27T00:51:00.010Z",
                "updateDate": "2023-04-27T00:51:00.010Z"
            },
            {
                "id": 43,
                "name": "فروشنده آنلاین",
                "slug": "فروشنده_آنلاین",
                "createdDate": "2023-04-27T00:51:00.011Z",
                "updateDate": "2023-04-27T00:51:00.011Z"
            },
            {
                "id": 44,
                "name": "موسیقی",
                "slug": "موسیقی",
                "createdDate": "2023-04-27T00:51:00.013Z",
                "updateDate": "2023-04-27T00:51:00.013Z"
            },
            {
                "id": 45,
                "name": "آشپزی و شیرینی پزی",
                "slug": "آشپزی_و_شیرینی_پزی",
                "createdDate": "2023-04-27T00:51:00.305Z",
                "updateDate": "2023-04-27T00:51:00.305Z"
            },
            {
                "id": 46,
                "name": "خدمات چاپ و گرافیک",
                "slug": "خدمات_چاپ_و_گرافیک",
                "createdDate": "2023-04-27T00:51:00.307Z",
                "updateDate": "2023-04-27T00:51:00.307Z"
            },
            {
                "id": 234,
                "name": "تعمیرکار",
                "slug": "تعمیرکار",
                "createdDate": "2023-05-16T15:44:43.959Z",
                "updateDate": "2023-05-16T15:44:43.959Z"
            },
            {
                "id": 235,
                "name": "لوله کشی",
                "slug": "لوله_کشی",
                "createdDate": "2023-05-16T15:44:44.004Z",
                "updateDate": "2023-05-16T15:44:44.004Z"
            },
            {
                "id": 236,
                "name": "رفوکار و روتوش فرش",
                "slug": "رفوکار_و_روتوش_فرش",
                "createdDate": "2023-05-16T15:44:44.019Z",
                "updateDate": "2023-05-16T15:44:44.019Z"
            },
            {
                "id": 250,
                "name": "خدمات ناخن",
                "slug": "خدمات_ناخن",
                "createdDate": "2023-06-06T07:56:58.813Z",
                "updateDate": "2023-06-06T07:56:58.813Z"
            },
            {
                "id": 251,
                "name": "خدمات کراتین و احیای مو",
                "slug": "خدمات_کراتین_و_احیای_مو",
                "createdDate": "2023-06-06T07:57:12.618Z",
                "updateDate": "2023-06-06T07:57:12.618Z"
            }
        ]
    },
    {
        "id": 3,
        "name": "جوامع",
        "slug": "associations",
        "createdDate": "2023-04-26T10:40:26.549Z",
        "updateDate": "2023-04-26T10:40:26.549Z",
        "categories": [
            {
                "id": 30,
                "name": "کلیسای فارسی زبان",
                "slug": "کلیسای_فارسی_زبان",
                "createdDate": "2023-04-27T00:50:59.412Z",
                "updateDate": "2023-04-27T00:50:59.412Z"
            },
            {
                "id": 47,
                "name": "انجمن دانشجویی",
                "slug": "انجمن_دانشجویی",
                "createdDate": "2023-04-27T00:51:00.309Z",
                "updateDate": "2023-04-27T00:51:00.309Z"
            },
            {
                "id": 48,
                "name": "انجمن فرهنگی هنری",
                "slug": "انجمن_فرهنگی_هنری",
                "createdDate": "2023-04-27T00:51:00.311Z",
                "updateDate": "2023-04-27T00:51:00.311Z"
            },
            {
                "id": 50,
                "name": "امور خیریه",
                "slug": "امور_خیریه",
                "createdDate": "2023-04-27T00:51:00.314Z",
                "updateDate": "2023-04-27T00:51:00.314Z"
            },
            {
                "id": 229,
                "name": "انجمن پزشکان",
                "slug": "انجمن_پزشکان",
                "createdDate": "2023-05-16T15:44:43.647Z",
                "updateDate": "2023-05-16T15:44:43.647Z"
            }
        ]
    },
]