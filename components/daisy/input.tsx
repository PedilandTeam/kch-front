interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    endContent?: React.ReactNode;
    startContent?: React.ReactNode;
    isInvalid?: boolean;
    errorMessage?: string | boolean;
    bordered?: boolean;
    label?: string
}

export default function Input({
    startContent,
    endContent,
    className,
    isInvalid,
    errorMessage = false,
    bordered,
    label,
    ...inputProps
}: InputProps) {

    return (
        <div className={`form-control w-full max-w-full ${className}`}>
            <div className={`input relative overflow-hidden ${className} ${bordered ? 'input-bordered' : ''} ${isInvalid ? 'input-error' : ''}`}>
                {startContent && (
                    <span className={`absolute inset-y-0 left-0 top-0 bottom-0 px-3 flex items-center bg-white`}>
                        {startContent}
                    </span>
                )}
                {endContent && (
                    <span className={`absolute inset-y-0 left-0 top-0 bottom-0 px-3 flex items-center bg-white`}>
                        {endContent}
                    </span>
                )}
                <input
                    className="w-full h-full z-10"
                    {...inputProps}
                />
            </div>
            <label className="label">
                <span className="label-text min-h-[1 ch]">{label ? label : ''}</span>
                <span className="label-text-alt text-error min-h-[1 ch]">{isInvalid && errorMessage ? errorMessage : ''}</span>
            </label>
        </div>
    );
}