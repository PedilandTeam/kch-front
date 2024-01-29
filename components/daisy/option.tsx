import { forwardRef, useRef } from 'react';
export interface Option extends React.LiHTMLAttributes<HTMLLIElement> {
    className?: string;
    children?: React.ReactNode;
    value: string | number;
    startContent?: React.ReactNode;
    endContent?: React.ReactNode;
}
export default function Option({
    className,
    children,
    value,
    startContent,
    endContent,
    ...optionProps
}: Option) {
    const ref = useRef<HTMLSpanElement>(null);

    const handleClick = (e: React.MouseEvent<HTMLSpanElement>) => {
        e.stopPropagation();
        ref.current?.click();
    };

    return (
        <span
            ref={ref}
            data-value={value}
            className={`option relative select-none rounded-md px-1 py-3 duration-75 hover:bg-gray-100 active:scale-95 ${className}`}
            {...optionProps}
        >
            {startContent && (
                <span
                    onClick={handleClick}
                    className={` flex items-center px-3`}
                >
                    {startContent}
                </span>
            )}
            {endContent && (
                <span
                    onClick={handleClick}
                    className={` flex items-center px-3 `}
                >
                    {endContent}
                </span>
            )}
            {children}
        </span>
    );
}
