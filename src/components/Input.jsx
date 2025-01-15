import React, { forwardRef, useId } from "react"

function Input({ label = "", type = "text", className = "", ...props }, ref) {
    const id = useId()

    return (
        <div>
            {label && (
                <div>
                    <label htmlFor={id} className="pr-4 font-semibold">
                        {label}
                    </label>
                </div>
            )}
            <input
                id={id}
                type={type}
                ref={ref}
                {...props}
                className={`rounded-lg px-3 py-1 ${className} bg-transparent focus:bg-slate-300`}
            />
        </div>
    )
}

export default forwardRef(Input)
