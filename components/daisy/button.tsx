
interface Button extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    isLoading?: boolean;
    loading?: 'ball' | 'dots' | 'ring' | 'bars' | 'spinner',
    isDisabled?: boolean,
    children?: React.ReactNode
}
export default function Button({
    className,
    isLoading = false,
    loading = 'spinner',
    children,
    isDisabled = false,
    ...buttonProps
}: Button) {
    return (
        <button
            className={`btn ${isDisabled ? 'btn-disabled' : ''} ${className}`}
            {...buttonProps}
        >
            {children} {isLoading ? <div className={`loading ${loading} loading- loading-spinner loading-ms`}></div> : ''}        
        </button>
    );
}