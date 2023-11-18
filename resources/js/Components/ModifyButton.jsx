export default function ModifyButton({className = '', disabled = false, children, type = 'submit', ...props}) {
    return (
        <button 
            {...props}
            className={
                `
                inline-flex items-center px-4 py-2 bg-green-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-green-500 hiver:text-black focus:bg-green-700 active:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-800 focus:ring-offset-2 transition ease-in-out duration-150
                ${disabled && `opacity-25`}
                ` + className
            }
            type={type}
            disabled={disabled}
        >
            {children}
        </button>
    )
}