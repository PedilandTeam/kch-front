
import {
  Badge, Checkbox,
  CheckboxGroup, Stack
} from "@client-packages/chakra-ui/components";
import { CATEGORY, GENERAL } from "../../../../components/allTexts";
import { FunnelIcon } from "@heroicons/react/24/solid";
import { API_ROUTES } from "@/routes";
import FilterMobile from "./filter.mobile";
import { CityNamespace } from "@/types/city";
import CityFilter from "./city.filter";


async function getCities() {
  try{
    return await (await API_ROUTES.CITIES.GET_ALL(1, 100, "de", 10)).json()
  }catch(e){
    console.log(e);
    return null
  }
}
export default async function ListFilter() {


  const cities = (await getCities())

  return (
    <div className="filter-wrap">

      <FilterMobile />

      <div className="filter-title w-full hidden md:flex md:items-center border-b pb-2">
        <FunnelIcon className="h-4 w-4 ml-2" />
        <span className="font-semibold">{GENERAL.FILTERS}</span>
      </div>

      <div className="filter-body pt-3 hidden md:block">


      <CityFilter cities={cities?.items} />

        <div className="filter-section mb-3 pb-4 border-dashed border-b border-gray-300  ">
          <h3 className="font-medium mb-2">{GENERAL.CATEGORY}</h3>
          <CheckboxGroup colorScheme="blue">
            <Stack
              spacing={[2, 1]}
              direction={["column", "column"]}
              className=" text-gray-600"
            >
              <div className="item flex justify-between items-center">
                <Checkbox>
                  <span className="text-sm">{CATEGORY.RESTAURANT}</span>
                </Checkbox>
                <Badge>20</Badge>
              </div>
              <div className="item flex justify-between items-center">
                <Checkbox>
                  <span className="text-sm">{CATEGORY.DRIVING_SCHOOL}</span>
                </Checkbox>
                <Badge>75</Badge>
              </div>
              <div className="item flex justify-between items-center">
                <Checkbox>
                  <span className="text-sm">{CATEGORY.ZANAN}</span>
                </Checkbox>
                <Badge>103</Badge>
              </div>
              <div className="item flex justify-between items-center">
                <Checkbox>
                  <span className="text-sm">{CATEGORY.GOOSH}</span>
                </Checkbox>
                <Badge>210</Badge>
              </div>
            </Stack>
          </CheckboxGroup>
        </div>
      </div>
    </div>
  );
};
