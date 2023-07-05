"use client"


import {
  Checkbox,
  CheckboxGroup, Stack
} from "@client-packages/chakra-ui/components";
import { GENERAL } from "../../../../components/allTexts";
import { CityNamespace } from "@/types/city";
import CityFilterItem from "./city.filter.item";
import { useEffect, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import queryString from "query-string";
import { useRouter } from "next/navigation";
import CityFilterSelectedItem from "./city.filter.selected.item";



type CityFilterType = {
  cities: CityNamespace.city[]
}
export default function CityFilter({ cities }: CityFilterType) {

  const [modifiedCities, setModifiedCities] = useState(cities)
  const citySearchHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!cities) return;
    const find = cities.filter(city => city.name.includes(event.currentTarget.value))
    setModifiedCities(find)
  }
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const citiesInQuery = queryString.parse(searchParams.toString(), {arrayFormat: "comma"}).city


  const deleteAllCityHandler = () => {
    const query = queryString.parse(searchParams.toString())
    if (query.city) {
      delete query.city
    }
    router.replace(`${pathname}?${queryString.stringify(query)}`)
  }

  return (
    <div className="filter-section mb-3">
      <h3 className="font-medium mb-2">{GENERAL.CITY_NAME}</h3>

      {/* The button to open modal */}
      <label htmlFor="my_modal_7" className="btn btn-primary btn-outline btn-wide">انتخاب شهر</label>
      {
        Array.isArray(citiesInQuery) ? citiesInQuery.map(cityId => {
          if(!cityId)return;
          const city = cities.find(city => city.id == +cityId)
          if(!city)return;
          return (
            <CityFilterSelectedItem city={city}/>
          )
        })
        :
        citiesInQuery && cities.find(city => city.id == +citiesInQuery)  ?  <CityFilterSelectedItem city={cities.find(city => city.id == +citiesInQuery)!}/> : null
      }

      {/* Put this part before </body> tag */}
      <input type="checkbox" id="my_modal_7" className="modal-toggle" />
      <div className="modal">
        <div className=" modal-box p-0 max-h-[550px] ">
          <div className=" py-5 px-8 bg-white w-full">
            <h3 className="text-lg font-bold">انتخاب شهر <span onClick={deleteAllCityHandler} className=" cursor-pointer text-sm font-normal text-pink-800">حذف همه</span></h3>
            <p className="py-4">از بین شهر های زیر میتوانید یک یا چندمورد را انتخاب کنید</p>
            <input onChange={citySearchHandler} type="text" placeholder="جستجو در شهرها" className="input input-bordered w-full" />
          </div>
          <div className="px-8 h-[16rem] overflow-y-scroll">
            {
              modifiedCities?.map((city: CityNamespace.city) => {
                return (
                  <CityFilterItem key={city.name} city={city} />
                )
              })
            }
          </div>

          <div className="modal-action box-border w-full p-3 px-8 flex justify-between items-center bg-white shadow-2xl ">
            <label htmlFor="my_modal_7" className="btn btn-primary w-full bottom-0">تایید</label>
          </div>
        </div>
        <label className="modal-backdrop" htmlFor="my_modal_7">بستن</label>
      </div>
    </div>
  )

}