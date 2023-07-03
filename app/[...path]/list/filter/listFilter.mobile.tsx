"use client"


import {
    Checkbox,
    CheckboxGroup, Stack
} from "@client-packages/chakra-ui/components";
import { GENERAL } from "../../../../components/allTexts";
import { CityNamespace } from "@/types/city";
import CityFilterItem from "./city.filter.item";
  
  

type CityFilterType = {
    cities: CityNamespace.city[]
}
export default function CityFilter({cities}: CityFilterType){

    return(
        <div className="filter-section mb-3">
        <h3 className="font-medium mb-2">{GENERAL.CITY_NAME}</h3>
        <CheckboxGroup colorScheme="blue">
          <Stack
            spacing={[2, 1]}
            direction={["column", "column"]}
            className=" text-gray-600 "
          >
              {
                cities?.map((city: CityNamespace.city) => {
                  return (
                    <CityFilterItem key={city.name} city={city} />
                  )
                })
              }
          </Stack>
        </CheckboxGroup>
      </div>
    )

}