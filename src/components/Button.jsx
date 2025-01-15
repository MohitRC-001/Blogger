import React from "react"
import { twMerge } from "tailwind-merge"

function Button({
    type = "button",
    text = "button",
    className = "",
    bgColor = " bg-blue-400",
    textColor = " text-white",
    ...props
}) {
    const str = "sjd"
    str.includes()
    return (
        <button
            type={type}
            className={twMerge(
                `rounded-xl border-2 border-transparent px-4 py-2 font-semibold shadow-sm shadow-black duration-200 hover:border-orange-400 hover:shadow-md hover:shadow-black active:shadow-none`,
                `${className} ${bgColor} ${textColor}`,
            )}
            {...props}
        >
            {text}
        </button>
    )
}

export default Button
