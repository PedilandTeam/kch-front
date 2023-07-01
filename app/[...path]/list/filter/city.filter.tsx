"use client"


import {
    Checkbox,
    CheckboxGroup, Stack
} from "@client-packages/chakra-ui/components";
import { GENERAL } from "../../../../components/allTexts";
import { CityNamespace } from "@/types/city";
  
  

type CityFilterType = {
    cities: CityNamespace.GET[]
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
                cities?.map((city: CityNamespace.GET) => {
                  return (
                    <div key={city.name} className="item flex justify-between items-center">
                      <Checkbox>
                        <span className="text-sm">{city.name}</span>
                      </Checkbox>
                      
                    </div>

                  )
                })
              }
          </Stack>
        </CheckboxGroup>
      </div>
    )

}