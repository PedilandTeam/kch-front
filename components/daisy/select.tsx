'use client'

import { Dispatch, SetStateAction, useState } from "react";
import {ChevronDownIcon} from '@heroicons/react/24/outline'

interface Select extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  children: (item: any, setSelectedValue: Dispatch<SetStateAction<any>>) => React.ReactNode;
  isDisabled?: boolean;
  bordered?: boolean;
  isInvalid?: boolean;
  errorMessage?: string | boolean;
  value?: any;
  items: any[] | undefined  ;
  name?: string;
  isLoading?: boolean;
}
export default function Select({
  className,
  isDisabled = false,
  bordered = false,
  isInvalid = false,
  errorMessage = false,
  value,
  items = [],
  children,
  name,
  isLoading = false,
  ...selectProps
}: Select) {

  const [open, setOpen] = useState(false)
  const [selectedValue, setSelectedValue] = useState<string | null>('')

const clickHandler = (e: React.MouseEvent<HTMLLIElement>) => {  
  setOpen((old) => !old);
  const target = e.target as HTMLLIElement;
  setSelectedValue(target.textContent || null);
}


  return (
    <div className={`form-control w-full max-w-full ${className}`}>
      <div className="dropdown dropdown-bottom w-full select-none" onClick={() => setOpen(!open)}>
        <div tabIndex={0} role="button" className={`input ${bordered && 'input-bordered'} ${isInvalid && 'input-error'} flex justify-between items-center`}>
          <p>{selectedValue ? selectedValue : 'انتخاب کشور'}</p>
          {isLoading ? <span className="loading loading-spinner loading-md text-gray-500"></span> : <ChevronDownIcon className="w-5 h-5 ml-2" />}
        </div>

        <ul tabIndex={0} className={` ${!open || isLoading ? 'opacity-0 invisible' : 'opacity-1 visible'} duration-300 transform-cpu dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-full`}>    
          {
            items.map((item, index) => (
              <li key={index} onClick={clickHandler}>
                {children(item, setSelectedValue)}
              </li>
            ))
          }
        </ul>
      </div>
      {
        !!errorMessage && isInvalid ?
          <label className="label">
            {isInvalid && errorMessage && (
              <span className="label-text-alt text-error min-h-[1 ch]">{errorMessage}</span>
            )}
          </label>

          : ''
      }
    </div>
  );
}