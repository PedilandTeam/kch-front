
import { forwardRef } from 'react'
export interface Option extends React.LiHTMLAttributes<HTMLLIElement> {

    className?: string,
    children: React.ReactNode,
    value: string | number,

}
export default forwardRef(function Option({
    className,
    children,
    value,
    ...optionProps
}: Option, ref: React.Ref<HTMLSpanElement>) {
    return (
        <span
            ref={ref}
            className={`option hover:bg-gray-100 active:scale-95 duration-75 select-none rounded-md py-3 px-1 ${className}`}
            {...optionProps}
        >
            {value}
        </span>
    );
})