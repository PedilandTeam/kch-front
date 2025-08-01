"use client";

import {
  Dispatch,
  SetStateAction,
  memo,
  useEffect,
  useRef,
  useState,
  forwardRef,
  LegacyRef,
  MouseEvent,
  FocusEvent,
} from "react";
import { ChevronDownIcon } from "@phosphor-icons/react/dist/ssr";
import SelectSearch from "./selectSearch";

interface Select
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children" | "onChange"> {
  children: (
    item: any,
    setSelectedValue: Dispatch<SetStateAction<any>>,
  ) => React.ReactNode;
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
  setSearch?: Dispatch<SetStateAction<string>>;
  defaultValue?: any;
}
const Select = forwardRef<HTMLDivElement, Select>(
  (
    {
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
      setSearch,
      defaultValue,
      ...selectProps
    },
    lastItemRef,
  ) => {
    const [open, setOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState<string | null>("");
    const ulRef = useRef<HTMLUListElement>(null);
    const divRef = useRef<HTMLDivElement>(null);

    /**
     * Handles the click event on the item.
     *
     * @param {React.MouseEvent<HTMLLIElement>} e - The mouse event
     * @return {void}
     */
    const itemClickHandler = (e: React.MouseEvent<HTMLLIElement>) => {
      if (isDisabled) return;

      // Close Dropdown
      (document?.activeElement as HTMLElement)?.blur();

      e.stopPropagation();

      // Set the selected value
      const target = e.target as HTMLLIElement;
      setSelectedValue(target.textContent || null);

      // Trigger onChange Props
      if (typeof onChange == "function") onChange(e, target.dataset?.value);
    };

    const onOpen = (e: MouseEvent<HTMLDivElement>) => {
      if (isDisabled) return;
      e.stopPropagation();
      setOpen(true);
    };

    /**
     * Update the selected value if it has changed in another component
     */
    useEffect(() => {
      if (!ulRef.current) return;
      const ul = ulRef.current as HTMLSpanElement;
      Array.from(ul.children).map((item: any) => {
        Array.from(item.children as HTMLCollectionOf<HTMLSpanElement>).map(
          (child: HTMLSpanElement) => {
            if (child.dataset.value == value) {
              setSelectedValue(child.textContent || null);
            }
          },
        );
      });
    }, [value]);

    useEffect(() => {
      setSelectedValue(null);
    }, [items]);

    useEffect(() => {
      if (!defaultValue) return;
      const defaultItem = items.find((item) => item.id == defaultValue);
      if (defaultItem) {
        setSelectedValue(defaultItem.name || defaultItem.title);
      }
    }, [defaultValue, items]);

    return (
      <div
        className={`form-control w-full max-w-full ${className}`}
        data-type="container"
      >
        <div
          ref={divRef}
          className={`dropdown dropdown-bottom w-full select-none p-0`}
        >
          <div
            tabIndex={0}
            role="button"
            className={`input ${bordered && "input-bordered"} ${isInvalid && "input-error"} flex items-center justify-between ${isDisabled && "cursor-not-allowed border-0 bg-gray-200"}`}
          >
            <p>{selectedValue ? selectedValue : label}</p>
            {isLoading ? (
              <span className="loading loading-spinner loading-md text-gray-500"></span>
            ) : (
              !isDisabled && <ChevronDownIcon className="ml-2 h-5 w-5" />
            )}
          </div>

          <ul
            tabIndex={0}
            className={`scrollbar-hide menu dropdown-content z-[1] grid h-64 w-full transform-cpu grid-cols-1 place-content-start overflow-y-scroll rounded-box bg-base-100 p-0 shadow duration-300`}
          >
            {!!setSearch && <SelectSearch setSearch={setSearch} />}

            <div className="p-2">
              {[...items].map((item, index) => {
                return (
                  <li
                    data-value={item.id}
                    className="w-full"
                    key={index}
                    onClick={itemClickHandler}
                  >
                    {children(item, setSelectedValue)}
                  </li>
                );
              })}
            </div>
            {Array.isArray(items) && items.length > 5 ? (
              <div className="sticky bottom-0 z-10 h-5 w-full bg-gradient-to-t from-black/5 to-slate-50/10 backdrop-blur-[2px]"></div>
            ) : null}
          </ul>
        </div>
        {!!errorMessage && isInvalid ? (
          <label className="label">
            {isInvalid && errorMessage && (
              <span className="min-h-[1 ch] label-text-alt text-error">
                {errorMessage}
              </span>
            )}
          </label>
        ) : (
          ""
        )}
      </div>
    );
  },
);

Select.displayName = "Select";

export default memo(Select);
