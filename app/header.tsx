"use client"

import { LogoTop } from "./layout/logo";
import { TopTools } from "./layout/toptools";
import { OffCanvas } from "./layout/offcanvas";
import { API_ROUTES } from "@/routes";
import { storeType } from "@/store/store";
import { countryCodeList } from "@/utils/countryCodeList";
import { useParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { CircleFlag } from "react-circle-flags";
import { useSelector } from "react-redux";


type HeaderProps = {
  children: React.ReactNode
}

export const Header = ({children}: HeaderProps) => {
  const params = useParams()
  const country = useSelector((state: storeType) => state.stateSlice.country)

  const [countryCodeFromParams, setCountryCodeFromParams]= useState<string>("")
  const [isMainPage, setIsMainPage] = useState(false)

  useEffect(() => {
    const countryOrSlug = params.countryOrSlug as string
    if(countryOrSlug){
      setIsMainPage(false)
      setCountryCodeFromParams(countryOrSlug)
      return;
    }
    setIsMainPage(true)
    setCountryCodeFromParams("")
  },[params])

  // useEffect(() => {
  //   console.log(params);
    
  //   if(typeof params?.path == "string"){
  //     setCountryCodeFromParams(params?.path?.split("/")?.[0])
  //     console.log(!params?.path?.split("/")?.[0]);
      
  //     setIsMainPage(!params?.path?.split("/")?.[0])
  //   } 
  // },[params.path])
  const isPathHaveCountry = countryCodeList.find(code => code == countryCodeFromParams)

  const haveCountry = (countryOrSlug: string) => {
    return countryCodeList.some(code => code == countryOrSlug)
  }

  const [countryCode, setCountryCode] = useState("")
  useEffect(() => {
    setCountryCode(isMainPage ? "un" : haveCountry(params?.countryOrSlug as string) ? params.countryOrSlug as string : country ? country :  isPathHaveCountry ? countryCodeFromParams : "un")
  },[params, country, isMainPage,isPathHaveCountry,countryCodeFromParams])



  return (
    <header>
      <div className="container mx-auto max-w-[1144px]">
        <div className="flex justify-between py-3 mx-3 sm:mx-0">
          <LogoTop />
          <TopTools isMainPage={isMainPage} countryCode={countryCode} />
        </div>
      </div>
      <OffCanvas countryCode={countryCode} />
      {children}
    </header>
  );
};
