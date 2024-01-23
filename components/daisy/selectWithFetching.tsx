'use client'
import { fetcher } from "@/app/swr/fetcher";
import { memo, startTransition, useEffect } from "react";
import useSWR from "swr";
import { CircleFlag } from "next-circle-flags";
import Select from "@daisyComponents/select";
import Option from '@daisyComponents/option'


type SelectWithFetching = {
  route: string;
  label: string;
  paginated?: boolean;
  name: string;
  isDisabled?: boolean;
  circleFlag?: boolean;
  formErrors: any;
  setFieldValue: (name: string, value: any) => void;
  className?: string;
  value?: any;
  bordered?: boolean
}
export default memo(function SelectWithFetching<T extends { items: any }>({ route, label, paginated = false, name, isDisabled = false, circleFlag = false, formErrors, setFieldValue, className , value, bordered}: SelectWithFetching) {

  const { data, isLoading, error } = useSWR<T>(route ? `${process.env.NEXT_PUBLIC_API_URL}${route}` : null, fetcher)

  return (
    <Select
      className={className}
      dir="ltr"
      items={data ? (paginated ? data?.items : data) : []}
      onChange={(e, value) => setFieldValue(name, value)}
      isLoading={isLoading}
      isDisabled={isDisabled}
      errorMessage={formErrors![name]}
      isInvalid={!!formErrors![name] ? true : false}
      label={label}
      value={value}
      bordered={bordered}
    >
      {
        (item: any) => (
          <Option key={item.id} value={item.id} startContent={circleFlag ? <CircleFlag countryCode={item.code} height={20} width={20} alt={`پرچم کشور ${item.name}`}/> : null}>{item.name}</Option>
        )
      }
    </Select>
  )

})