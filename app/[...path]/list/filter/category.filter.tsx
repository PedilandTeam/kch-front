"use client"
import {
    Badge, Checkbox,
    CheckboxGroup, Stack
} from "@client-packages/chakra-ui/components";
import { CATEGORY, GENERAL } from "../../../../components/allTexts";
import { CategoryNamespace } from "@/types/category";
import CategoryFilterItem from "./category.filter.item";


type CategoryFilterProps = {
  categories: CategoryNamespace.GET[]
}
export default function CategoryFilter({categories}: CategoryFilterProps){
    return (
        <div className="filter-section mb-3 pb-4 border-dashed border-b border-gray-300  ">
        <h3 className="font-medium mb-2">{GENERAL.CATEGORY}</h3>
        <CheckboxGroup colorScheme="blue">
          <Stack
            spacing={[2, 1]}
            direction={["column", "column"]}
            className=" text-gray-600"
          >
            {
              categories.map(category => {
                return (
                  <CategoryFilterItem key={category.id} category={category} />
                )
              })
            } 
          </Stack>
        </CheckboxGroup>
      </div>
    )
}