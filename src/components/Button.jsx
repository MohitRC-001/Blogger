import React from "react"

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
            className={`rounded-xl px-4 py-2 font-semibold duration-200 hover:border-orange-400 hover:shadow-md hover:shadow-black active:shadow-none ${className} ${bgColor} ${textColor}`}
            {...props}
        >
            {text}
        </button>
    )
}

export default Button
