'use client'

import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { ChevronDownIcon } from '@heroicons/react/24/outline'

interface Select extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children' | 'onChange'> {
  children: (item: any, setSelectedValue: Dispatch<SetStateAction<any>>) => React.ReactNode;
  isDisabled?: boolean;
  bordered?: boolean;
  isInvalid?: boolean;
  errorMessage?: string | boolean;
  value?: any;
  items: any[] | undefined;
  name?: string;
  isLoading?: boolean;
  label: string;
  onChange?: (e: React.MouseEvent<HTMLLIElement>, value: any) => void;
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
  label,
  isLoading = false,
  onChange,
  ...selectProps
}: Select) {

  const [open, setOpen] = useState(false)
  const [selectedValue, setSelectedValue] = useState<string | null>('')
  const ulRef = useRef<HTMLUListElement>(null)

  /**
   * Handles the click event on the item.
   *
   * @param {React.MouseEvent<HTMLLIElement>} e - The mouse event
   * @return {void} 
   */
  const itemClickHandler = (e: React.MouseEvent<HTMLLIElement>) => {
    if (isDisabled) return;
    setOpen((old) => !old);
    const target = e.target as HTMLLIElement;
    setSelectedValue(target.textContent || null);
    if(typeof onChange == 'function') onChange(e, target.dataset?.value);
  }

  const onOpen = () => {
    if (isDisabled) return;
    setOpen(!open)
  }
  

  /**
   * Update the selected value if it has changed in another component
   */
  useEffect(() => {
    if(!ulRef.current) return;
    const ul = ulRef.current as HTMLSpanElement;
    Array.from((ul.children)).map((item: any) => {
      Array.from((item.children as HTMLCollectionOf<HTMLSpanElement>)).map((child: HTMLSpanElement) => {
          if (child.dataset.value == value) {
            setSelectedValue(child.textContent || null)
          }
      })
    })  
  }, [value])

  return (
    <div className={`form-control w-full max-w-full ${className}`}>
      <div className={`dropdown dropdown-bottom w-full select-none`} onClick={onOpen}>
        <div tabIndex={0} role="button" className={`input ${bordered && 'input-bordered'} ${isInvalid && 'input-error'} flex justify-between items-center ${isDisabled && 'bg-gray-200 border-0 cursor-not-allowed'}`}>
          <p>{selectedValue ? selectedValue : label}</p>
          {(isLoading ? <span className="loading loading-spinner loading-md text-gray-500"></span> : !isDisabled && <ChevronDownIcon className="w-5 h-5 ml-2" />)}
        </div>

        <ul ref={ulRef} tabIndex={0} className={` ${!open || isLoading ? 'opacity-0 invisible' : 'opacity-1 visible'} duration-300 transform-cpu dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-full`}>
          {
            items.map((item, index) => (
              <li key={index} onClick={itemClickHandler}>
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