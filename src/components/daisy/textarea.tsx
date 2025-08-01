interface Textarea extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
}
export default function Textarea({ label, className, ...inputProps }: Textarea) {
    return (
        <div className={`form-control w-full max-w-full ${className}`}>
            {label ? (
                <label className='label'>
                    <span className='min-h-[1 ch] text-md label-text font-bold'>
                        {label}
                    </span>
                </label>
            ) : null}
            <textarea
                className='textarea textarea-bordered w-full resize-none'
                rows={4}
                {...inputProps}
            />
        </div>
    );
}
