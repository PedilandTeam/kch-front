
import { forwardRef, useRef } from 'react'
export interface Option extends React.LiHTMLAttributes<HTMLLIElement> {

    className?: string,
    children: React.ReactNode,
    value: string | number,
    startContent?: React.ReactNode,
    endContent?: React.ReactNode

}
export default function Option({
    className,
    children,
    value,
    startContent,
    endContent,
    ...optionProps
}: Option) {

    const ref = useRef<HTMLSpanElement>(null)

    const handleClick = (e: React.MouseEvent<HTMLSpanElement>) => {
        e.stopPropagation()
        ref.current?.click()
    }

    return (

        <span
            ref={ref}
            className={`option relative hover:bg-gray-100 active:scale-95 duration-75 select-none rounded-md py-3 px-1 ${className}`}
            {...optionProps}
        >
            {startContent && (
                <span onClick={handleClick} className={` px-3 flex items-center`}>
                    {startContent}
                </span>
            )}
            {endContent && (
                <span  onClick={handleClick} className={` px-3 flex items-center `}>
                    {endContent}
                </span>
            )}
            {value}
        </span>
    );
}