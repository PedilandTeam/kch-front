interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  endContent?: React.ReactNode;
  startContent?: React.ReactNode;
  isInvalid?: boolean;
  errorMessage?: string | boolean;
  bordered?: boolean;
}

export default function Input({
  startContent,
  endContent,
  className,
  isInvalid,
  errorMessage = false,
  bordered,
  ...inputProps
}: InputProps) {
  return (
    <div className={`form-control w-full max-w-full ${className}`}>
      <div
        className={`input relative overflow-hidden ${className} ${bordered ? 'input-bordered' : ''} ${isInvalid ? 'input-error' : ''}`}
      >
        {startContent && (
          <span
            className={`absolute inset-y-0 bottom-0 left-0 top-0 flex items-center bg-white px-3`}
          >
            {startContent}
          </span>
        )}
        {endContent && (
          <span
            className={`absolute inset-y-0 bottom-0 left-0 top-0 flex items-center bg-white px-3`}
          >
            {endContent}
          </span>
        )}
        <input className='z-10 h-full w-full' {...inputProps} />
      </div>
      {!!errorMessage && isInvalid ? (
        <label className='label'>
          {/* {label && (
                            <span className="label-text min-h-[1 ch]">{label}</span>                
                        )} */}
          {isInvalid && errorMessage && (
            <span className='min-h-[1 ch] label-text-alt text-error'>
              {errorMessage}
            </span>
          )}
        </label>
      ) : (
        ''
      )}
    </div>
  );
}
