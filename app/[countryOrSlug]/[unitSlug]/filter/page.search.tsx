import useCreateQueryString from "@/hooks/useCreateQueryString";
import useDeleteQueryString from "@/hooks/useDeleteQueryString";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import queryString from "query-string";
import { ChangeEvent, useEffect, useState } from "react";



type ParsedSearchParamsType = {
    city?: string[] | string;
    category?: string[] | string;
    search?: string;
};
export default function PageSearch() {

    const [parsedSearchParams, setParsedSearchParams] = useState<ParsedSearchParamsType>({})
    const searchParams = useSearchParams() as unknown as URLSearchParams;
    const [search, setSearch] = useState<string>()
    const router = useRouter()
    const pathname = usePathname()
    const createQueryString = useCreateQueryString()
    const deleteQueryString = useDeleteQueryString()

    useEffect(() => {
        setParsedSearchParams(
            queryString.parse(searchParams.toString(), { arrayFormat: "comma" })
        );
    }, [searchParams]);

    useEffect(() => {
        parsedSearchParams.search && setSearch(parsedSearchParams.search)
    }, [parsedSearchParams]);

    useEffect(() => {

        const timeOut = setTimeout(() => {
            if(search){
                router.push(
                    `${pathname}?${createQueryString("search", [search])}`,{
                        scroll: true
                    }
                  );
            }else if(!search && parsedSearchParams.search){
                router.push(
                    `${pathname}?${deleteQueryString("search")}`, {
                        scroll: true
                    }
                  );
            }
        }, 700);

        return () => {
            clearTimeout(timeOut)
        }

    }, [search]);


    const searchChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }


    return (
        <input
            type="text"
            onChange={searchChangeHandler}
            value={search || ""}
            placeholder="جستجو"
            className="input input-bordered w-full mb-3"
        />
    )
}